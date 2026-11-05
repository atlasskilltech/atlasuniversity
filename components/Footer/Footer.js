import Image from 'next/image';
import SmartLink from '@/components/SmartLink';
import {
  campus,
  socialLinks,
  phoneColumns,
  complianceColumns,
} from '@/lib/footerContent';
import VideoModal from './VideoModal';
import * as s from './styles';

/**
 * Site footer — port of reference/assets/include/footer.php.
 *
 *   .content-left-atlas   30%  logo, copyright, address, map, contact, social
 *   .content-mid-atlas    35%  programme phone directory (2 columns)
 *   .content-right-atlas  35%  statutory / compliance links (2 columns)
 *   <= 767px stacks to a single column
 *
 * A server component; only the video modal needs the client.
 */

/** One entry in the phone directory. */
function PhoneEntry({ entry }) {
  if (entry.kind === 'spacer') {
    // ref ships an empty .ft-link-at here purely as a gap
    return <div className={s.FT_LINK} aria-hidden="true" />;
  }
  if (entry.kind === 'heading') {
    return (
      <div className={s.FT_LINK}>
        <strong>{entry.strong}</strong>
      </div>
    );
  }
  return (
    <a href={`tel:${entry.tel}`} className={s.FT_LINK_A}>
      {entry.strong ? <strong>{entry.strong}</strong> : null}
      {entry.text}
    </a>
  );
}

export default function Footer() {
  return (
    <section id="contact-details" className={s.FOOTER}>
      {/* ── column 1 — brand, address, map, contact, social ───────────────── */}
      <div className={s.COL_LEFT}>
        <div className={s.COPYRIGHT_BLOCK}>
          <Image
            src={campus.logo.src}
            alt={campus.logo.alt}
            width={campus.logo.width}
            height={campus.logo.height}
            loading="lazy"
          />
          <div className={s.CP_TEXT}>{campus.copyright}</div>
        </div>

        <div className={s.MEETUS}>
          <div className={s.FT_HEAD}>Find Us</div>
          {/* ref .address — no dedicated rule; inherits 16px/1.5 white */}
          <div>{campus.address}</div>

          <div className={s.MAP_WRAP}>
            <div className="relative">
              <iframe
                src={campus.mapEmbed}
                width="400"
                height="400"
                className="border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={campus.mapTitle}
              />
            </div>
          </div>
        </div>

        <div className={s.MEETUS}>
          <div className={s.FT_HEAD_MRGTP}>Contact Us</div>
          <a href={`mailto:${campus.email}`} className={s.FT_LINK_A}>
            {campus.email}
          </a>
        </div>

        <div className={s.SOCIAL_ROW}>
          {socialLinks.map((item) => (
            <a key={item.href} href={item.href} aria-label={item.label} className={s.SOCIAL_LINK}>
              <img src={item.icon} loading="lazy" alt="" width={24} height={25} />
            </a>
          ))}
        </div>
      </div>

      {/* ── column 2 — programme phone directory ──────────────────────────── */}
      <div className={s.COL_MID}>
        <div className={s.FOOT_LINKS}>
          {phoneColumns.map((column, i) => (
            <div key={i} className={s.LINKS_COL}>
              {column.map((entry, j) => (
                <PhoneEntry key={`${entry.strong || entry.text || 'spacer'}-${j}`} entry={entry} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── column 3 — statutory / compliance links ───────────────────────── */}
      <div className={s.COL_RIGHT}>
        <div className={s.FOOT_LINKS}>
          {complianceColumns.map((column, i) => (
            <div key={i} className={s.LINKS_COL}>
              {column.map((link) => (
                <SmartLink
                  key={link.label}
                  href={link.href}
                  external={link.external}
                  newTab={link.newTab}
                  className={s.FT_LINK_A}
                >
                  {link.label}
                </SmartLink>
              ))}
            </div>
          ))}
        </div>
      </div>

      <VideoModal />
    </section>
  );
}
