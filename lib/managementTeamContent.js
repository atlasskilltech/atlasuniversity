/*
 * /management-team — transcribed 1:1 from reference/management-team.php (measured against
 * https://atlasuniversity.edu.in/management-team).
 *
 * Sixteen people, in the reference's own order. Three more cards (Dr. Shashikant Patil, Imran
 * Kapadia, Neelima Deshpande) are commented out upstream and are not rendered or shipped.
 *
 * The heading and lead are the reference's own copy — "From ATLAS ISME to the World's Best
 * Universities" over a management team is an upstream copy-paste, transcribed as authored, and so is
 * the `id="pro-vice-chancellor"` it carries. Names and roles keep the reference's spelling ("Dr
 * Malcom Homavazir", "Dr Parag Amin" without a stop); a `\n` is the reference's own `<br />`.
 *
 * Images: ten portraits are byte-identical (SHA-256) to files this project already ships, and are
 * referenced at their existing paths rather than copied again; the six that exist nowhere else live
 * in public/assets/management-team/. The cover is the /examination photograph, also already shipped.
 */
const IMG = '/assets/images';
const NEW = '/assets/management-team';

export const managementTeam = {
  meta: {
    title: 'ATLAS ISME Leadership & Management Team',
    description:
      'Learn about Atlas ISME’s leadership team, vision, academic excellence, industry experience and commitment to student success.',
    canonical: 'https://atlasuniversity.edu.in/management-team',
  },

  hero: {
    title: 'Our Management Team',
    image: {
      src: `${IMG}/examination/mandatory-disclosure-1.png`,
      srcSet: `${IMG}/examination/mandatory-disclosure-1-p-500.png 500w, ${IMG}/examination/mandatory-disclosure-1-p-800.png 800w, ${IMG}/examination/mandatory-disclosure-1-p-1080.png 1080w, ${IMG}/examination/mandatory-disclosure-1.png 1366w`,
      sizes: '(max-width: 1366px) 100vw, 1366px',
      alt: '',
    },
  },

  team: {
    id: 'pro-vice-chancellor',
    heading: 'From ATLAS ISME to the World’s Best Universities',
    subheading: 'Create impact across industries and communities worldwide',
    people: [
      { name: 'Prof. Heena Thakur', role: 'Director, IQAC', image: `${IMG}/schools/isme/pages/heena-thakur.png` },
      { name: 'Prof. Bulbul Chaudhary', role: 'Pro-Vice Chancellor \nOutreach', image: `${IMG}/schools/isme/pages/bulls.png` },
      { name: 'Prof. Meena Krishna', role: 'Pro-Vice Chancellor', image: `${NEW}/meena-k.jpg` },
      { name: 'Dr Parag Amin', role: 'Registrar', image: `${IMG}/schools/isdi/about/management/parag-amin.png` },
      { name: 'Prof. Bhargavi Deshpande', role: 'Director, Student Welfare', image: `${IMG}/schools/isdi/about/management/prof-bhargavi-deshpande.png` },
      { name: 'Sagar Nichani', role: 'Director, Career Services & Corporate Relations', image: `${IMG}/schools/isme/pages/sagar-nichani-2.png` },
      { name: 'Sweety Sethi', role: 'Director, International Relations', image: `${IMG}/schools/isme/pages/sweety-sethi.webp` },
      { name: 'Alok Baptist', role: 'Executive Director, Outreach & Admissions', image: `${IMG}/schools/isme/pages/alok.png` },
      { name: 'Dr Malcom Homavazir', role: 'Director of Academic Excellence', image: `${IMG}/schools/isme/pages/malcom.png` },
      {
        id: 'director-board-of-assessment',
        name: 'Dr. Hemal Thakkar',
        role: 'Director, Board of Assessment & Evaluation',
        image: `${IMG}/schools/isme/pages/dr-hemal-thakkar.png`,
      },
      { name: 'Dr. Meena Desai', role: 'Director, Alumni Affairs', image: `${IMG}/schools/isme/pages/dr-meena-desai.png` },
      { name: 'Dr. Varsha Agarwal', role: 'Director, Doctoral Programs', image: `${NEW}/dr-varsha-agarwal.png` },
      { name: 'Dr. Debasish Ray', role: 'Director, Human Resources', image: `${NEW}/dr-debashish.png` },
      { id: 'chief-finance', name: 'Subodh Khanna', role: 'Chief Finance & Accounts Officer', image: `${NEW}/subodh-khanna.png` },
      { name: 'Dr. Vinima Gambhir', role: 'IQAC Coordinator \n– Academics', image: `${NEW}/dr-vinima.png` },
      { name: 'Dr. Zuleika Homavazir', role: 'General Secretary', image: `${NEW}/zuleika-homavazir.png` },
    ],
  },
};
