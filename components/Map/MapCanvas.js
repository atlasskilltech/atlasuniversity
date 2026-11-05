'use client';

import { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState, forwardRef } from 'react';
import { layoutTree, NODE_H, COL_GAP } from '@/lib/map/layout';
import { NODE, SCHOOL } from './theme';

const MIN_K = 0.25;
const MAX_K = 1.6;
const clampK = (k) => Math.min(MAX_K, Math.max(MIN_K, k));

/**
 * The roadmap canvas: a left-to-right tree of the expanded branches, drawn as absolutely-placed
 * buttons over an SVG of connectors, inside a pannable / zoomable viewport.
 *
 * Input: drag the background (mouse, pen or one finger), wheel or pinch to zoom around the pointer,
 * the +/−/fit buttons, or +/−/0 on the keyboard while the canvas has focus. Every node is a real
 * <button>, so the whole map is reachable with Tab and Enter; a drag never fires a node's click.
 */
const MapCanvas = forwardRef(function MapCanvas({ byId, rootId, expanded, onToggle, selected, onSelect, dimmed }, ref) {
  const viewport = useRef(null);
  const [view, setView] = useState({ x: 24, y: 24, k: 1 });
  const viewRef = useRef(view);
  viewRef.current = view;
  const pointers = useRef(new Map());
  const gesture = useRef(null);
  const dragged = useRef(false);

  const layout = useMemo(() => layoutTree(byId, rootId, expanded), [byId, rootId, expanded]);

  /* `floor` keeps the opening view readable: if the tree only fits below it, stay at the floor
     and show its top-left instead; the Fit button passes no floor */
  const fit = useCallback(
    (floor = MIN_K) => {
      const el = viewport.current;
      if (!el) return;
      const { clientWidth: cw, clientHeight: ch } = el;
      const want = clampK(Math.min(1, (cw - 48) / layout.width, (ch - 48) / layout.height));
      if (want >= floor) {
        setView({ k: want, x: Math.max(16, (cw - layout.width * want) / 2), y: Math.max(16, (ch - layout.height * want) / 2) });
        return;
      }
      /* top-aligned, so the first branches (the schools) are what a visitor sees first */
      setView({ k: floor, x: 24, y: 24 });
    },
    [layout],
  );

  const centerOn = useCallback(
    (id) => {
      const el = viewport.current;
      const p = layout.pos.get(id);
      if (!el || !p) return;
      const k = Math.max(viewRef.current.k, 0.8);
      setView({ k, x: el.clientWidth / 2 - (p.x + p.w / 2) * k, y: el.clientHeight / 2 - (p.y + p.h / 2) * k });
    },
    [layout],
  );

  useImperativeHandle(ref, () => ({ fit, centerOn }), [fit, centerOn]);

  /* first paint: fit the opening tree to the viewport */
  const fitted = useRef(false);
  useEffect(() => {
    if (!fitted.current) {
      fitted.current = true;
      fit(0.85);
    }
  }, [fit]);

  const zoomAt = useCallback((factor, cx, cy) => {
    setView((v) => {
      const k = clampK(v.k * factor);
      const r = k / v.k;
      return { k, x: cx - (cx - v.x) * r, y: cy - (cy - v.y) * r };
    });
  }, []);

  /* wheel needs a non-passive listener to stop the page scrolling */
  useEffect(() => {
    const el = viewport.current;
    if (!el) return undefined;
    const onWheel = (e) => {
      e.preventDefault();
      const b = el.getBoundingClientRect();
      zoomAt(Math.exp(-e.deltaY * 0.0015), e.clientX - b.left, e.clientY - b.top);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [zoomAt]);

  const onPointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    dragged.current = false;
    const pts = [...pointers.current.values()];
    if (pts.length === 1) gesture.current = { type: 'pan', sx: e.clientX, sy: e.clientY, v: viewRef.current };
    if (pts.length === 2) {
      const b = viewport.current.getBoundingClientRect();
      gesture.current = {
        type: 'pinch',
        d: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y),
        cx: (pts[0].x + pts[1].x) / 2 - b.left,
        cy: (pts[0].y + pts[1].y) / 2 - b.top,
        v: viewRef.current,
      };
    }
  };
  const onPointerMove = (e) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;
    if (!g) return;
    if (g.type === 'pan') {
      const dx = e.clientX - g.sx;
      const dy = e.clientY - g.sy;
      if (!dragged.current && Math.hypot(dx, dy) < 5) return;
      if (!dragged.current) viewport.current.setPointerCapture?.(e.pointerId);
      dragged.current = true;
      setView({ ...g.v, x: g.v.x + dx, y: g.v.y + dy });
    } else {
      const pts = [...pointers.current.values()];
      if (pts.length < 2) return;
      dragged.current = true;
      const d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const k = clampK(g.v.k * (d / g.d));
      const r = k / g.v.k;
      setView({ k, x: g.cx - (g.cx - g.v.x) * r, y: g.cy - (g.cy - g.v.y) * r });
    }
  };
  const onPointerUp = (e) => {
    pointers.current.delete(e.pointerId);
    /* the click that ends a drag is swallowed (see `guard`); anything after it is a real click */
    if (dragged.current) setTimeout(() => (dragged.current = false), 0);
    if (pointers.current.size === 0) gesture.current = null;
    else if (pointers.current.size === 1) {
      const [p] = pointers.current.values();
      gesture.current = { type: 'pan', sx: p.x, sy: p.y, v: viewRef.current };
    }
  };

  const onKeyDown = (e) => {
    if (e.target !== viewport.current) return;
    const el = viewport.current;
    const cx = el.clientWidth / 2;
    const cy = el.clientHeight / 2;
    if (e.key === '+' || e.key === '=') zoomAt(1.2, cx, cy);
    else if (e.key === '-') zoomAt(1 / 1.2, cx, cy);
    else if (e.key === '0') fit();
    else if (e.key.startsWith('Arrow')) {
      const step = 60;
      setView((v) => ({ ...v, x: v.x + (e.key === 'ArrowLeft' ? step : e.key === 'ArrowRight' ? -step : 0), y: v.y + (e.key === 'ArrowUp' ? step : e.key === 'ArrowDown' ? -step : 0) }));
    } else return;
    e.preventDefault();
  };

  /* a keyboard-activated click (detail 0) is never a drag */
  const guard = (fn) => (e) => {
    if (dragged.current && e.detail !== 0) {
      e.preventDefault();
      return;
    }
    fn(e);
  };

  const dx = COL_GAP / 2;
  return (
    <div className="relative h-full w-full">
      <div
        ref={viewport}
        tabIndex={0}
        role="application"
        aria-roledescription="interactive map"
        aria-label="ATLAS University map. Drag or use arrow keys to move, plus and minus to zoom, 0 to fit. Tab moves between items."
        className="relative h-full w-full cursor-grab touch-none overflow-hidden bg-[#fbfbfd] bg-[radial-gradient(#d9d9e6_1px,transparent_1px)] bg-[length:22px_22px] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-atlas-teal active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: layout.width, height: layout.height, transform: `translate(${view.x}px, ${view.y}px) scale(${view.k})` }}
        >
          <svg className="pointer-events-none absolute left-0 top-0 overflow-visible" width={layout.width} height={layout.height} aria-hidden="true">
            {layout.edges.map(([a, b]) => {
              const p = layout.pos.get(a);
              const c = layout.pos.get(b);
              const x1 = p.x + p.w;
              const y1 = p.y + NODE_H / 2;
              const x2 = c.x;
              const y2 = c.y + NODE_H / 2;
              const isRef = byId.get(b).type === 'ref';
              const faded = dimmed && dimmed.has(b);
              return (
                <path
                  key={`${a}>${b}`}
                  d={`M${x1} ${y1} C${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`}
                  fill="none"
                  stroke="#41418e"
                  strokeOpacity={faded ? 0.12 : 0.45}
                  strokeWidth="1.6"
                  strokeDasharray={isRef ? '5 5' : undefined}
                />
              );
            })}
          </svg>

          {[...layout.pos.entries()].map(([id, p]) => {
            const n = byId.get(id);
            const kids = n.children.filter((c) => byId.has(c)).length;
            const open = expanded.has(id);
            const school = n.school && SCHOOL[n.school];
            const isSel = selected === id;
            const faded = dimmed && dimmed.has(id);
            return (
              <div
                key={id}
                className={`absolute flex items-stretch overflow-hidden rounded-lg shadow-[0_1px_2px_rgba(20,20,60,0.08)] transition-opacity ${NODE[n.type] || NODE.page} ${n.type === 'school' && school ? school.border : ''} ${isSel ? 'ring-[3px] ring-atlas-teal ring-offset-2' : ''} ${faded ? 'opacity-30' : 'opacity-100'}`}
                style={{ left: p.x, top: p.y, width: p.w, height: p.h }}
              >
                {(n.type === 'programme' || n.type === 'school') && school && <span className={`w-1.5 shrink-0 ${school.band}`} aria-hidden="true" />}
                <button
                  type="button"
                  onClick={guard(() => onSelect(id))}
                  aria-current={isSel ? 'true' : undefined}
                  className="flex min-w-0 flex-1 flex-col justify-center px-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-atlas-teal"
                >
                  <span className={`line-clamp-2 text-[13px] leading-[16px] ${n.type === 'university' || n.type === 'school' || n.type === 'group' ? 'font-bold' : 'font-medium'}`}>
                    {n.type === 'ref' && <span aria-hidden="true">↪ </span>}
                    {n.label}
                    {n.type === 'external' && <span aria-label=" (external site)"> ↗</span>}
                  </span>
                  {(n.opensLive || n.degree) && (
                    <span className="mt-0.5 truncate text-[10.5px] leading-[13px] text-[#6b6b7b]">
                      {[n.degree, n.opensLive ? 'on the live site' : null].filter(Boolean).join(' · ')}
                    </span>
                  )}
                </button>
                {kids > 0 && (
                  <button
                    type="button"
                    onClick={guard(() => onToggle(id))}
                    aria-expanded={open}
                    aria-label={`${open ? 'Collapse' : 'Expand'} ${n.label} (${kids} item${kids > 1 ? 's' : ''})`}
                    className={`flex w-9 shrink-0 flex-col items-center justify-center border-l text-[11px] font-bold leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-atlas-teal ${n.type === 'university' ? 'border-white/30 hover:bg-white/10' : 'border-black/10 hover:bg-black/5'}`}
                  >
                    <span aria-hidden="true" className="text-[15px]">{open ? '−' : '+'}</span>
                    <span aria-hidden="true">{kids}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-3 right-3 flex flex-col overflow-hidden rounded-lg border border-[#cfd0d8] bg-white shadow-md">
        {[
          ['Zoom in', '+', () => zoomAt(1.2, viewport.current.clientWidth / 2, viewport.current.clientHeight / 2)],
          ['Zoom out', '−', () => zoomAt(1 / 1.2, viewport.current.clientWidth / 2, viewport.current.clientHeight / 2)],
          ['Fit map to screen', '⤢', () => fit()],
        ].map(([label, glyph, fn]) => (
          <button key={label} type="button" onClick={fn} aria-label={label} title={label} className="h-10 w-10 border-b border-[#ececf2] text-[18px] font-bold text-atlas-footer last:border-b-0 hover:bg-[#f4f4fa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-atlas-teal">
            {glyph}
          </button>
        ))}
      </div>
    </div>
  );
});

export default MapCanvas;
