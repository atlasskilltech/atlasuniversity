'use client';

import { useSyncExternalStore } from 'react';
import { THEME_STORAGE_KEY } from './theme';
import { MoonIcon, SunIcon, SystemIcon } from './Icons';
import { cx, FOCUS } from './ui';

/**
 * System / Light / Dark. "System" (the default) stores nothing and removes the attribute, so the page
 * follows prefers-color-scheme; an explicit choice is stored in localStorage and applied to the News
 * root before paint on the next visit (THEME_SCRIPT). Changes in another tab are mirrored here.
 */
const CHANGE = 'atlas-news-theme-change';
const OPTIONS = [
  { value: 'system', label: 'Use system theme', Icon: SystemIcon },
  { value: 'light', label: 'Light theme', Icon: SunIcon },
  { value: 'dark', label: 'Dark theme', Icon: MoonIcon },
];

function read() {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : 'system';
  } catch {
    return 'system';
  }
}

function apply(value) {
  for (const root of document.querySelectorAll('[data-news-root]')) {
    if (value === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', value);
  }
}

function subscribe(callback) {
  const onStorage = (e) => {
    if (e.key !== null && e.key !== THEME_STORAGE_KEY) return;
    apply(read());
    callback();
  };
  window.addEventListener('storage', onStorage);
  window.addEventListener(CHANGE, callback);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(CHANGE, callback);
  };
}

export default function ThemeToggle({ className, tone = 'default' }) {
  const theme = useSyncExternalStore(subscribe, read, () => 'system');

  function choose(value) {
    try {
      if (value === 'system') localStorage.removeItem(THEME_STORAGE_KEY);
      else localStorage.setItem(THEME_STORAGE_KEY, value);
    } catch {
      /* storage unavailable: the choice still applies for this page view */
    }
    apply(value);
    window.dispatchEvent(new Event(CHANGE));
  }

  const onNight = tone === 'night';
  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className={cx('inline-flex items-center gap-0.5 rounded-full border p-0.5', onNight ? 'border-white/20' : 'border-news-line', className)}
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => choose(value)}
            className={cx(
              'grid h-7 w-7 place-items-center rounded-full transition-colors duration-200',
              FOCUS,
              onNight
                ? active
                  ? 'bg-white text-news-night'
                  : 'text-white/70 hover:text-white'
                : active
                  ? 'bg-news-ink text-news-paper'
                  : 'text-news-muted hover:text-news-ink',
            )}
          >
            <Icon className="h-[15px] w-[15px]" />
          </button>
        );
      })}
    </div>
  );
}
