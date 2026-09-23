import { IMG } from './paths';

const IMAGE = {
  src: `${IMG}/section/faq-img.png`,
  srcSet: `${IMG}/section/faq-img-p-500.png 500w, ${IMG}/section/faq-img.png 601w`,
};

/* 9. index.php:2545-2556 */
export const isdiClassOf2025 = {
  heading: 'Class of 2025: Ready to \nRedefine What’s Next',
  button: { label: 'Check Class of 2025', href: '/schools/isdi/success-stories/success-snapshot/' },
  image: IMAGE,
};

/*
 * 11. index.php:3012-3023. The button is authored `href="#home-faq"`, an id that
 * exists nowhere on the page (the FAQ below is `section#faq`), so on the live
 * site it does nothing. It points at the FAQ it was written for.
 */
export const isdiFaqBanner = {
  heading: 'Everything you wanted to know about ISDI, but were afraid to ask.',
  button: { label: 'Check out our FAQs', href: '#faq' },
  image: IMAGE,
};
