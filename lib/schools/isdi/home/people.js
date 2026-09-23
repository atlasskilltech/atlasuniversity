/*
 * 19. The People Who Know Us Best — index.php:3749-3827.
 *
 * The four clips are the ATLAS homepage's parent testimonials, byte-identical
 * (reused from /assets/videos/testimonials/). Each authors an mp4 then a webm,
 * so the mp4 is what plays — except Varsha Sharma's, whose mp4 answers 403 on
 * the CDN and whose webm is what production plays (see CLAUDE.md,
 * /admissions/pg-admissions). The first card's `.stname` is empty and its name
 * sits in the role line above "Goa", as authored.
 */
export const isdiPeople = {
  heading: 'The People Who Know Us Best',
  sub: 'Hear directly from our students and parents as they share authentic stories of growth, learning, and transformation that define the ATLAS experience.',
  quoteIcon: '/assets/images/testimonials/quote.svg',
  bgImage: '/assets/images/testimonials/testimonial-vector.png',
  cards: [
    {
      name: '',
      role: 'Bijal Vasaria\nGoa',
      text: 'I loved seeing the work of students, it was very professional and well curated. Heavily impressed with the work they have done',
      video: { src: '/assets/videos/testimonials/parents-1.mp4', type: 'video/mp4', poster: '/assets/images/testimonials/parents-1-poster.jpg' },
    },
    {
      name: 'Varsha Sharma',
      role: 'Student',
      text: 'The fact that he’s already working on real industry projects while still in college makes me feel like he’s headed in the right direction.',
      video: { src: '/assets/videos/testimonials/varsha-sharma.webm', type: 'video/webm', poster: '/assets/images/testimonials/varsha-sharma-poster.jpg' },
    },
    {
      name: 'Amit and Ankita Jeriwala',
      role: 'Parent',
      text: 'I am very impressed to see the creativity and work that has been put up. The complete experience here has been amazing',
      video: { src: '/assets/videos/testimonials/parents-2.mp4', type: 'video/mp4', poster: '/assets/images/testimonials/parents-2-poster.jpg' },
    },
    {
      name: 'Nevil Karvalo',
      role: 'Parent',
      text: 'It was very insightful to watch and I am very happy with the out of the box approach',
      video: { src: '/assets/videos/testimonials/parents-3.mp4', type: 'video/mp4', poster: '/assets/images/testimonials/parents-3-poster.jpg' },
    },
  ],
};
