/**
 * ATLAS News — shared layout and type tokens (class strings). The News publication has its own visual
 * system and never uses the university site's CONTAINER / SectionHead tokens.
 */
export const NEWS_CONTAINER = 'mx-auto w-full max-w-[1320px] px-5 md:px-8 xl:px-10';

/** Serif display headlines. Arbitrary sizes on purpose: the project's named sizes pin line-height 1.5. */
export const DISPLAY_XL = 'font-news-serif text-[36px] leading-[1.06] tracking-[-0.015em] sm:text-[44px] md:text-[54px] xl:text-[64px]';
export const DISPLAY_L = 'font-news-serif text-[30px] leading-[1.1] tracking-[-0.01em] md:text-[40px] xl:text-[46px]';
export const HEAD_M = 'font-news-serif text-[23px] leading-[1.18] tracking-[-0.005em] md:text-[26px]';
export const HEAD_S = 'font-news-serif text-[19px] leading-[1.25] md:text-[20px]';
export const HEAD_XS = 'font-news-serif text-[17px] leading-[1.3]';

/** Sans UI type. */
export const KICKER = 'font-sans text-[11px] font-bold uppercase leading-none tracking-[0.16em]';
export const META = 'font-sans text-[12.5px] leading-[1.4] text-news-muted';
export const DECK = 'font-news-serif text-[19px] leading-[1.5] text-news-muted md:text-[21px]';

/** Animated underline on a headline inside a `group` link. */
export const HOVER_LINE =
  'bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_1px] group-focus-visible:bg-[length:100%_1px] motion-reduce:transition-none';

/** Focus ring used by every interactive element. */
export const FOCUS = 'outline-none focus-visible:ring-2 focus-visible:ring-news-accent focus-visible:ring-offset-2 focus-visible:ring-offset-news-paper';

export { cx } from '@/lib/cx';
