import { IMG, VID } from './paths';

const card = (title, path, poster = true) => ({
  title,
  video: `${VID}/choose-your-minor/${path}/1.mp4`,
  poster: poster ? `${IMG}/choose-your-minor/${path}/1.png` : null,
});

/*
 * 7. Choose Your Minor — index.php:1785-2516.
 *
 * Tabs in menu order. The menu marks "Tab 5" current while the markup marks the
 * "Tab 1" pane active; Webflow's tab script follows the current link, so the
 * page opens on "Tech, AI & Emerging Experiences" (verified on production).
 *
 * Every card is a looping muted video. The reference names a `1.png` poster for
 * each, but the nine under human-centered-and-social-design/ and
 * tech-ai--emerging-experiences/ do not exist — production answers them with an
 * HTML page — so those cards carry no poster, as the live page shows none.
 * Titles are transcribed as authored ("Organisational Behavior", "spacial").
 */
export const isdiMinors = {
  heading: 'Choose Your Minor',
  sub: 'Pair your specialization with a minor of your choice and \ngraduate with a well-rounded degree',
  tabs: [
    {
      label: 'Tech, AI & Emerging Experiences',
      cards: [
        card('Data-Driven Design', 'tech-ai-emerging-experiences/data-driven-design', false),
        card('Design for Emerging Media', 'tech-ai-emerging-experiences/design-for-emerging-media', false),
        card('Virtual Environments', 'tech-ai-emerging-experiences/virtual-environments', false),
        card('Concept Art & World Building', 'tech-ai-emerging-experiences/concept-art-and-world-building', false),
        card('Creative Computing', 'tech-ai-emerging-experiences/creative-computing', false),
      ],
    },
    {
      label: 'Digital Media & Communication',
      cards: [
        card('Digital Strategies', 'digital-media-communication/digital-strategies'),
        card('Digital Journalism', 'digital-media-communication/digital-journalism'),
        card('Mobile Game Design', 'digital-media-communication/mobile-game-design'),
        card('Spatial Graphic Design', 'digital-media-communication/spacial-graphic-design'),
        card('Popular Media Culture', 'digital-media-communication/popular-media-culture'),
      ],
    },
    {
      label: 'Human-Centered and Social Design',
      cards: [
        card('Leadership and Organisational Behavior', 'human-centered-and-social-design/leadership-organizational-behaviour', false),
        card('Universal Design', 'human-centered-and-social-design/universal-design', false),
        card('Textile Design', 'human-centered-and-social-design/textile-design', false),
        card('Crafts and Design', 'human-centered-and-social-design/crafts-and-design', false),
      ],
    },
    {
      label: 'Creative Arts & Lifestyle',
      cards: [
        card('Costume Design', 'creative-arts-lifestyle/costume-design'),
        card('Fashion & Lifestyle Design', 'creative-arts-lifestyle/fashion-lifestyle-design'),
        card('Hair And Makeup Artistry', 'creative-arts-lifestyle/hair-and-makeup-artistry'),
        card('Product Styling And Accessory Design', 'creative-arts-lifestyle/product-styling-and-accessory-design'),
        card('Toy Design', 'creative-arts-lifestyle/toy-design'),
      ],
    },
  ],
};
