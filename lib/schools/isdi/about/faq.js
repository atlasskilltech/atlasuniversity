import { faq } from '@/lib/designInnovationContent';

/*
 * Questions? We can read your mind — assets/include/faq.php, included at the foot of
 * about-us/index.php with `$arrow = "isdi-down-arrow.svg"`. The include is
 * database-driven; on this page it renders FAQ master 1, the ISDI set — its 24
 * questions and answers compared against the rendered production page and found
 * identical to the set /programs/ug/ug-design-and-innovation already transcribes,
 * so that transcription is re-used. Only the arrow differs (this page reads
 * `$arrow`), and the heading is printed without the trailing space.
 */
export const isdiAboutFaq = {
  ...faq,
  heading: 'Questions? We can read your mind',
  arrow: '/assets/images/schools/isdi/home/faq/isdi-down-arrow.svg',
};
