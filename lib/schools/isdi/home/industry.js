import { IMG } from './paths';

/*
 * 13. Why the industry can’t get enough of our students — index.php:3128-3232.
 * Only the `.common-swiper-full` renders; the `.testim-slide-wrapper.none` above
 * it (an older four-card layout) is `display: none` and is not ported. Copy and
 * alt text as authored ("Potrait", trailing spaces).
 */
export const isdiIndustry = {
  heading: 'Why the industry can’t get \nenough of our students',
  quoteIcon: '/assets/images/testimonials/quote.svg',
  bgImage: '/assets/images/testimonials/testimonial-vector.png',
  cards: [
    {
      name: 'Tim Cook',
      role: 'CEO, Apple',
      text: 'ISDI is helping the next generation of creatives. Thanks for sharing how you create those amazing designs using iPad!',
      image: { src: `${IMG}/slider-img/tim-cook-1.png`, alt: '' },
    },
    {
      name: 'Sarang Kulkarni',
      role: 'Founder, Ek Type',
      text: 'You need to know the language of Design. Scripts in every language differ and so does the typography',
      image: { src: `${IMG}/slider-img/sarang-kulkarni.png`, alt: 'picture of Isdi school teacher sarang kulkarni' },
    },
    {
      name: 'Sandeep Ozarde',
      role: 'Director, Leaf Design',
      text: 'Thank you so much for creating such a world-class design school, making us really proud indeed. ISDI has a clear leadership position in Mumbai.',
      image: { src: `${IMG}/slider-img/sandeep-ozarde-leaf.png`, alt: 'Potrait of Sandeep Ozarde ' },
    },
    {
      name: 'Pankaj Jhunja',
      role: 'IIT Professor, Ex-TATA EV',
      text: 'I was very impressed at the environment that has been created at the school, and the quality of work displayed',
      image: { src: `${IMG}/industry-voices/pankaj-junjha.png`, alt: 'Ex Tata Ev Pankaj Jhunjha ' },
    },
  ],
};
