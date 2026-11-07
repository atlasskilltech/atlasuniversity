"use client";
/* eslint-disable @next/next/no-img-element -- static WebP exports with their own srcSet; next/image is not used for this standalone port */

/* Eona portfolio list (eona_core_portfolio_list) - a masonry grid, laid out exactly like the theme's
 * Isotope "masonry" mode: each item goes to the column group whose top is lowest (leftmost on a tie).
 *
 *   gutter "tiny": items padded 0 5px with 10px below, the row pulled out by -5px and the last 10px
 *     removed (qodef--no-bottom-space).
 *   cols: [[maxViewportWidth, columns], ...] - the theme's responsive classes are viewport media
 *     queries (custom: 1440/1366/1024/768/680/480; predefined: 1024/768/680), so they are matched
 *     against window.innerWidth, not the container.
 *   fixed: masonry_images_proportion "fixed" - every item is one column tall (column width - 10px) and a
 *     "landscape" item two columns wide; the image covers the box.
 *   variant:
 *     'fade-in'        white .82 panel that fades in and closes from inset 0 to inset 10px, title and
 *                      category rising 10px (homepage lists, hover_animation_info-on-hover "fade-in");
 *     'fade-in-invert' black .72 panel, white text (category archives);
 *     'below'          info-below + "zoom": the image scales 1.01 -> 1.03; the title/category block sits
 *                      under the image but the fixed square inner box clips it, so - exactly as on
 *                      production - it is never visible (photo gallery).
 *
 * Before hydration the items render in a plain wrapping row at the desktop column count, so the content
 * is never hidden; the masonry positions are applied on mount and on every resize. */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { H4, PLAY } from "@/lib/sensorium/ui";

const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;
const EASE = "ease-[cubic-bezier(.62,.15,0,.6)]";

function colsFor(cols, vw) {
  let n = cols[0][1];
  for (const [max, c] of cols) if (vw <= max) n = c;
  return n;
}

function layout(items, width, n, fixed) {
  const colW = width / n;
  const colY = new Array(n).fill(0);
  const pos = items.map((it) => {
    const span = it.size === "landscape" ? Math.min(2, n) : 1;
    const w = colW * span;
    const h = fixed ? colW - 10 : ((w - 10) * it.img.h) / it.img.w;
    let best = 0;
    let bestY = Infinity;
    for (let j = 0; j + span <= n; j++) {
      const y = Math.max(...colY.slice(j, j + span));
      if (y < bestY - 0.5) {
        bestY = y;
        best = j;
      }
    }
    for (let j = best; j < best + span; j++) colY[j] = bestY + h + 10;
    return { x: best * colW, y: bestY, w, h };
  });
  return { pos, height: Math.max(0, ...colY) };
}

export default function PortfolioList({
  items,
  cols,
  fixed = false,
  variant = "fade-in",
  sizes,
  onOpen,
}) {
  const ref = useRef(null);
  const [lay, setLay] = useState(null);

  useIso(() => {
    const el = ref.current;
    if (!el) return undefined;
    const run = () =>
      setLay(
        layout(
          items,
          el.getBoundingClientRect().width,
          colsFor(cols, window.innerWidth),
          fixed,
        ),
      );
    run();
    const ro = new ResizeObserver(run);
    ro.observe(el);
    window.addEventListener("resize", run);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", run);
    };
  }, [items, cols, fixed]);

  const base = cols[0][1];
  return (
    <div>
      <div className="-mb-[10px]">
        <div
          ref={ref}
          className={`relative -mx-[5px] ${lay ? "" : "flex flex-wrap"}`}
          style={lay ? { height: lay.height } : undefined}
        >
          {items.map((it, i) => {
            const p = lay?.pos[i];
            const style = p
              ? {
                  position: "absolute",
                  left: p.x,
                  top: p.y,
                  width: p.w,
                  height: p.h + 10,
                }
              : {
                  width: `${(100 / base) * (it.size === "landscape" ? 2 : 1)}%`,
                };
            return (
              <article
                key={`${it.href}-${i}`}
                className="group px-[5px] pb-[10px]"
                style={style}
              >
                <Card
                  it={it}
                  fixed={fixed}
                  variant={variant}
                  sizes={sizes}
                  onOpen={onOpen ? () => onOpen(i) : undefined}
                />
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Card({ it, fixed, variant, sizes, onOpen }) {
  const img = (
    <img
      src={it.img.src}
      srcSet={it.img.srcSet}
      sizes={sizes}
      width={it.img.w}
      height={it.img.h}
      alt={it.img.alt || ""}
      loading="lazy"
      className={`relative block ${fixed ? "h-full w-full object-fill" : "h-auto w-full"} ${
        variant === "below"
          ? "scale-[1.01] transition-transform duration-[400ms] ease-[cubic-bezier(.59,.02,.17,.95)] will-change-transform group-hover:scale-[1.03]"
          : ""
      }`}
    />
  );
  const Media = onOpen ? "button" : "a";
  const mediaProps = onOpen
    ? { type: "button", onClick: onOpen, "aria-label": it.title }
    : { href: it.href };

  if (variant === "below") {
    return (
      <div className={`relative ${fixed ? "h-full" : ""} overflow-hidden`}>
        <div className={`${fixed ? "h-full" : ""} overflow-hidden`}>
          <Media
            {...mediaProps}
            className={`block ${fixed ? "h-full" : ""} w-full`}
          >
            {img}
          </Media>
        </div>
        <div className="mt-[25px]">
          <h4 className={H4}>
            <a href={it.href}>{it.title}</a>
          </h4>
          <div>
            {it.cats.map((c) => (
              <a
                key={c.href}
                href={c.href}
                className={`${PLAY} text-[16px] italic leading-[1.412] tracking-[0.01em] text-[#9c9c9c] hover:text-black`}
              >
                {c.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const invert = variant === "fade-in-invert";
  const reveal = `invisible translate-y-[10px] opacity-0 transition-[opacity,visibility,transform] duration-300 ${EASE} group-hover:visible group-hover:translate-y-0 group-hover:opacity-100`;
  return (
    <div className={`relative ${fixed ? "h-full overflow-hidden" : ""}`}>
      <Media
        {...mediaProps}
        className={`block ${fixed ? "h-full" : ""} w-full`}
      >
        {img}
      </Media>
      <div
        className={`absolute bottom-0 left-0 h-full w-full opacity-0 transition-[opacity,clip-path] group-hover:opacity-100 ${
          invert
            ? "bg-[rgba(0,0,0,0.72)] duration-200 ease-out"
            : "bg-[rgba(255,255,255,0.82)] [clip-path:inset(0)] duration-200 ease-out group-hover:[clip-path:inset(10px)] group-hover:[transition:opacity_.2s_ease-out,clip-path_.4s_cubic-bezier(.59,.02,.17,.95)_.1s]"
        }`}
      >
        <div className="relative flex h-full w-full flex-col items-center justify-center p-[10px]">
          <a
            href={it.href}
            title={it.title}
            aria-hidden
            tabIndex={-1}
            className="absolute left-0 top-0 z-0 h-full w-full"
          />
          <h4
            className={`${H4} relative z-[1] text-center ${reveal} delay-200 ${invert ? "text-white" : ""}`}
          >
            <a href={it.href} className={invert ? "text-white" : "text-black"}>
              {it.title}
            </a>
          </h4>
          <div
            className={`relative z-[1] ${reveal} ${invert ? "group-hover:delay-200" : "group-hover:delay-300"}`}
          >
            {it.cats.map((c, k) => (
              <a
                key={c.href}
                href={c.href}
                className={`${PLAY} text-[16px] italic leading-[1.412] tracking-[0.01em] ${invert ? "text-white" : "text-black"}`}
              >
                {c.name}
                {k < it.cats.length - 1 ? "," : ""}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
