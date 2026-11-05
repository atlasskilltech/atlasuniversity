'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';
import { toEmbedUrl } from '@/lib/videoEmbed';
import * as s from './styles';

/**
 * Global video modal.
 *
 * Lives in the footer in the reference and is opened by any element on the page
 * carrying `data-video="<url>"`. The listener is delegated on `document`, so
 * triggers rendered by later sections work without registering anything.
 */
export default function VideoModal() {
  const [src, setSrc] = useState('');
  const closeRef = useRef(null);
  const isOpen = src !== '';

  const close = useCallback(() => setSrc(''), []);

  useEffect(() => {
    const onClick = (e) => {
      const trigger = e.target.closest?.('[data-video]');
      if (!trigger) return;
      e.preventDefault();
      const embed = toEmbedUrl(trigger.getAttribute('data-video'));
      if (embed) setSrc(embed);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.classList.add('overflow-hidden');
    closeRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, close]);

  return (
    <section
      id="videoModal"
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
      aria-hidden={!isOpen}
      className={cx(s.MODAL, isOpen ? 'flex' : 'hidden')}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className={s.MODAL_INNER}>
        <button
          type="button"
          ref={closeRef}
          aria-label="Close video"
          className={s.MODAL_CLOSE}
          onClick={close}
        >
          &times;
        </button>
        <div className={s.MODAL_BODY}>
          {/* Only mounted while open, so closing stops playback. */}
          {isOpen && (
            <iframe
              id="videoIframe"
              src={src}
              title="Video player"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className={s.MODAL_IFRAME}
            />
          )}
        </div>
      </div>
    </section>
  );
}
