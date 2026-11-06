/*
 * /green-campus — transcribed 1:1 from reference/green-campus.php (measured against
 * https://atlasuniversity.edu.in/green-campus).
 *
 * Copy is the reference's own, including what reads as placeholder upstream: the "Strategic
 * Location" panel repeats one paragraph about ATLAS ISME's Rover Angels initiative three times, the
 * first sustainability card is titled "Energy Saving LED bulbs" over the solar-plant text, and the
 * last is titled "Green Campus" over the LED text. A `\n` is the reference's own `<br>`.
 *
 * ── Assets ────────────────────────────────────────────────────────────────
 * Every file was compared by SHA-256 against assets.manifest.json and public/assets before anything
 * was copied. Reused at their existing paths (already on S3): the video poster, the story photograph
 * and its two -p- twins, solar.png (+ -p-500), green-camp-3.webp (+ -p-500), the three residence
 * card photographs, both residence-card washes and the banner image. The remaining 17 files exist
 * nowhere else and live in public/assets/green-campus/: the four hero videos, the map, two card
 * photographs with their -p-500 twins, four accessibility photographs and four health photographs.
 * The reference's local copies (reference/assets/images/green-campus/) are byte-identical to
 * production's.
 */
const IMG = '/assets/images';
const NEW = '/assets/green-campus';

/* The four sustainability cards' text panel colour (card-cnt-bgcolor) and the page-level image well. */
const CARD_BG = '#41418E';
export const PANEL_NAVY = '#1E226B';

export const greenCampus = {
  meta: {
    title: 'Green Campus | Atlas University Mumbai',
    description:
      "Atlas University's green campus in Mumbai — a sustainable university committed to eco-friendly infrastructure and environmental responsibility programs.",
    canonical: 'https://atlasuniversity.edu.in/green-campus',
  },

  /* ref .inner-header-wrapper.full-ht — two background videos, one per side of 767px */
  hero: {
    poster: `${IMG}/hero-poster.jpg`,
    desktop: [`${NEW}/green-campus-video-for-web.mp4`, `${NEW}/green-campus-video-for-web.webm`],
    mobile: [`${NEW}/green-campus-video-for-mobile.mp4`, `${NEW}/green-campus-video-for-mobile.webm`],
  },

  story: {
    heading: 'The Story Behind ATLAS',
    text:
      'ATLAS SkillTech University was born from a bold vision — to reimagine higher education for the 21st century. \n\nA vision that believes India deserves a new kind of university: one that breaks traditional silos, bridges academia and industry, and prepares students for a future defined by innovation, technology, & global opportunity.',
    image: {
      src: `${IMG}/about/about-img-1.webp`,
      srcSet: `${IMG}/about/about-img-1-p-500.webp 500w, ${IMG}/about/about-img-1-p-800.webp 800w, ${IMG}/about/about-img-1.webp 848w`,
      sizes: '(max-width: 767px) 100vw, (max-width: 991px) 727.96875px, 848px',
      alt: '',
    },
  },

  location: {
    title: 'Strategic Location',
    background: PANEL_NAVY,
    text: [
      'ATLAS ISME’s student-led initiative, Rover Angels, is empowering school girls to explore science, technology, engineering, and mathematics through engaging workshops and hands-on learning. By making STEM education more accessible and inspiring, this program fosters curiosity, confidence, and future opportunities for young minds from diverse backgrounds.',
      'ATLAS ISME’s student-led initiative, Rover Angels, is empowering school girls to explore science, technology, engineering, and mathematics through engaging workshops and hands-on learning. By making STEM education more accessible and inspiring, this program fosters curiosity, confidence, and future opportunities for young minds from diverse backgrounds.',
      'ATLAS ISME’s student-led initiative, Rover Angels, is empowering school girls to explore science, technology, engineering, and mathematics through engaging workshops and hands-on learning. By making STEM education more accessible and inspiring, this program fosters curiosity, confidence, and future opportunities for young minds from diverse backgrounds.',
    ],
    /* the reference's srcset pairs this map with an unrelated 500w photograph (About's
       shaping-img-1) — see GreenCampus/StrategicLocation for why only the map ships */
    image: { src: `${NEW}/location.svg`, alt: '' },
  },

  green: {
    id: 'campus-green',
    heading: 'Live where you learn. Grow where you stay.',
    subheading:
      'ATLAS isn’t just future-facing in tech and business — it’s future-conscious in infrastructure too. Our green campus uses smart systems to reduce waste and emissions daily.',
    cards: [
      {
        variant: 'default',
        title: 'Energy Saving LED bulbs',
        text: 'ATLAS is deeply committed to sustainability, championing the use of renewable energy to power our campus responsibly. Our on-campus solar power plant harnesses the sun’s energy to generate clean, green electricity, significantly reducing our dependence on conventional power sources and lowering our carbon footprint.',
        background: CARD_BG,
        image: {
          src: `${IMG}/campus/green/solar.png`,
          srcSet: `${IMG}/campus/green/solar-p-500.png 500w, ${IMG}/campus/green/solar.png 619w`,
          alt: '',
        },
      },
      {
        variant: 'switch',
        title: 'Energy Saving LED bulbs',
        text: 'To promote energy efficiency, we have adopted LED bulbs and power-efficient equipment across campus. These energy-saving technologies help reduce electricity consumption, lower carbon emissions, and contribute to a more sustainable campus environment.',
        background: CARD_BG,
        image: {
          src: `${NEW}/green-camp-2.webp`,
          srcSet: `${NEW}/green-camp-2-p-500.webp 500w, ${NEW}/green-camp-2.webp 619w`,
          alt: '',
        },
      },
      {
        variant: 'default',
        title: 'Sensor Based Energy Conservation',
        text: 'We are leveraging sensor-based technologies to optimize energy usage across campus, promoting sustainability and reducing energy waste. These smart solutions contribute to our commitment to sustainability by conserving resources while maintaining comfort and functionality on campus.',
        background: CARD_BG,
        image: {
          src: `${IMG}/campus/green/green-camp-3.webp`,
          srcSet: `${IMG}/campus/green/green-camp-3-p-500.webp 500w, ${IMG}/campus/green/green-camp-3.webp 619w`,
          alt: '',
        },
      },
      {
        variant: 'switch',
        title: 'Green Campus',
        text: 'To promote energy efficiency, we have adopted LED bulbs and power-efficient equipment across campus. These energy-saving technologies help reduce electricity consumption, lower carbon emissions, and contribute to a more sustainable campus environment.',
        background: CARD_BG,
        image: {
          src: `${NEW}/garden.png`,
          srcSet: `${NEW}/garden-p-500.png 500w, ${NEW}/garden.png 619w`,
          alt: '',
        },
      },
    ],
  },

  housing: {
    id: 'campus-housing',
    heading: 'Live Where You Learn',
    subheading:
      'UpGrad Living offers comfort and convenience in Mumbai. Stay just steps away from your classes — in modern, secure student residences that feel like home.',
    embed: 'https://www.youtube.com/embed/SZ3t1snaf_w?rel=0&controls=0&autoplay=1&mute=1&start=0',
    embedTitle: 'ATLAS Hostel - Sneak Peak',
    /* the three residence cards are /campus-atlas's, word for word and image for image (SHA-256),
       so they are taken from lib/campusContent rather than transcribed twice — see app/green-campus */
    mosaicId: 'differently-abled',
    /* ref .belief-cards-1-camp > img-5 / img-6 / (img-7, img-8) — the page's own <style> paints each
       cell with a rgba(0,0,0,.6) wash over its photograph; img-7 is centred, the rest sit at 0 0 */
    mosaic: [
      { label: 'Washroom for differently abled with ramp', image: `${NEW}/washroom-for-differently-abled-with-ramp.jpeg` },
      { label: 'Barrier free entrance', image: `${NEW}/barrier-free-entrance.jpeg` },
      { label: '', image: `${NEW}/ramp-at-back-entrance.jpeg`, position: 'center' },
      { label: 'Washroom for differently abled', image: `${NEW}/washroom-for-differently-abled.jpeg` },
    ],
  },

  health: {
    id: 'health-facility',
    heading: 'Health Facilities',
    /* two columns of two; the captions are commented out upstream, so each photograph carries only
       the empty .inst-text-wrap gradient */
    columns: [
      [`${NEW}/hf-1.jpeg`, `${NEW}/hf-2.jpeg`],
      [`${NEW}/hf-3.jpeg`, `${NEW}/hf-4.jpeg`],
    ],
  },
};
