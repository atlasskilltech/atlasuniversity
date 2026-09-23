import { IMG } from './paths';

/*
 * 3. ATLAS Outcomes — index.php:501-1502. Two top-level blocks:
 *    `.section.extraspace` (the heading; its `.outcome-wrap` of three legacy
 *    cards is `display: none` in the sheet and never renders) and
 *    `.page-wrapper-stack` (three sticky `.stack_card`s).
 *
 * Marquee lists are in authored order with the authored alt text (typos
 * included). Three authored images are left out because production 404s them
 * (it answers with an HTML page), so they only ever paint as broken images:
 * card1/logov2/canterbury.png, card1/logov2/arts-university-bournemouth.png and
 * card1/student/sanvukta-mathure.jpg.
 */
const OUT = `${IMG}/scroll-section`;
const items = (dir, names) =>
  names.map((entry) => {
    const [file, alt] = Array.isArray(entry) ? entry : [entry, entry.replace(/\.(png|jpg)$/, '')];
    return { src: `${OUT}/atlas-outcomes/${dir}/${file}`, alt };
  });

export const isdiOutcomes = {
  heading: 'ATLAS Outcomes: Measurable Impact, Proven ROI',
  cards: [
    {
      id: 'first',
      image: {
        src: `${OUT}/image-1185.webp`,
        srcSet: `${OUT}/image-1185-p-500.webp 500w, ${OUT}/image-1185.webp 773w`,
        alt: 'Design student smiling in front of Royal College of Art',
      },
      title: 'Your Path to World-class Universities',
      badge: 'ISDI to The World',
      stats: [
        {
          numbers: ['65+ University Partnerships'],
          subtext: '',
          marquee: {
            kind: 'logo',
            placement: 'aside',
            items: items('card1/logov2', [
              'scad.png', 'royal-college-of-art.png', 'polimoda.png', 'national-university-of-singapore.png',
              'mica-maryland-institute-college-of-art.png', 'johns-hopkins-university.png',
              'california-college-of-the-arts.png', 'aalto-university-school-of-arts-design-and-architecture.png',
              'us.png', 'university-of-applied-sciences-windesheim.png', 'ulster-university.png', 'ual.png',
              'rmit.png', 'nyfa.png', 'nottingham.png', 'newparsons.png', 'massey-university.png',
              'leeds-arts-university.png', 'ifa-paris.png', 'goldsmithoflondon.png', 'ecole.png', 'domus.png',
              'college-for-creative-studies.png', 'citygeorge.png',
            ]),
          },
        },
        {
          bg: 'bg-2',
          numbers: ['1:3 Each applicant', 'gets atleast 3 offers'],
          subtext: '',
          subtextIsdi: true,
          marquee: {
            kind: 'circle',
            placement: 'aside',
            items: items('card1/student', [
              'aryaman-jacob.jpg', 'babita-sharma.jpg', 'deep-tambde.jpg', 'jhanvi-lathia.jpg', 'kavya-kadakia.jpg',
              ['lamiya-sakarwala.jpg', 'lamiya-sakawala'], 'malvika-kudale.jpg', 'manvi-poddar.jpg', 'nehal-modi.jpg',
              'niharika-mathur.jpg', 'raashi-sheth.jpg', 'rahul-juneja.jpg', 'rahul-nayak.jpg', 'raunaq-sandhu.jpg',
              'saachi-sharma.jpg', 'sanjana-punjabi.jpg', 'sayali-deshpande.jpg', 'shifaan-zeri.jpg',
              'shivalika-tandon.jpg', 'urvi-thakker.jpg', 'vritika-lalwani.jpg',
            ]),
          },
        },
      ],
    },
    {
      id: 'second',
      image: {
        src: `${OUT}/IBM-LADY.webp`,
        srcSet: `${OUT}/IBM-LADY-p-500.png 500w, ${OUT}/IBM-LADY.webp 773w`,
        alt: 'Isdi student smiling in front of IBM',
      },
      // ref wraps this title in <strong class="outcome-header isdi">
      title: 'Launching Successful Careers',
      titleStrong: true,
      badge: 'ISDI to Industry',
      stats: [
        {
          bg: 'bg-3',
          numbers: ['1200+'],
          subtext: 'On Campus Interviews',
          marquee: {
            kind: 'logo',
            placement: 'inside',
            items: items('card2/logo', [
              'aditya-birla-capital.jpg', 'bcg.jpg', ['chaviva-havelah.jpg', 'chaviva-havelan'], 'deloitte.jpg',
              'dr-reddys.jpg', 'ey.jpg', 'godrej-capital.jpg', 'goldman-sachs.jpg', 'google.jpg',
              'icici-lombard-general-insurance.jpg', 'landor.jpg', 'leo-burnett.jpg', 'levis.jpg',
              'manish-malhotra.jpg', 'ogilvy.jpg', 'sap.jpg', ['schbang.jpg', 'scbhang'], 'tech-mahindra.jpg',
              'tira.jpg', 'verizon.jpg',
            ]),
          },
        },
        {
          bg: 'bg-4',
          numbers: ['50+'],
          subtext: 'Recruiters on Campus',
          subtextIsdi: true,
          marquee: {
            kind: 'circle',
            placement: 'aside',
            items: items('card2/student', [
              'aditya-arjugade.jpg', 'anantika-sethi.jpg', 'disha-bajaj.jpg', 'diva-ghanshani.jpg', 'kriti-arora.jpg',
              'mishka-kavarana.jpg', 'nidhi-santwani.jpg', 'niharika-aggarwal.jpg', 'rishtika-satyarthi.jpg',
              ['roshel-chawala.jpg', 'roshel-chawla'], 'sai-shinde.jpg', 'sakshi-jain.jpg', 'sanjana-mehta.jpg',
              'sayali-deshpande.jpg', 'tanish-malji.jpg', 'tanya-pradhan.jpg', 'tausif-manjothi.jpg',
            ]),
          },
        },
      ],
    },
    {
      id: 'third',
      image: {
        src: `${OUT}/isdi-outcome-1.webp`,
        srcSet: `${OUT}/isdi-outcome-1-p-500.png 500w, ${OUT}/isdi-outcome-1.webp 773w`,
        alt: 'ISDI design school student with Peyush Bansal on Shark tank',
      },
      title: 'Turning Ideas into Ventures',
      badge: 'ISDI to Innovation',
      stats: [
        {
          numbers: ['1200+'],
          subtext: 'Alumni Start-ups',
          marquee: {
            kind: 'logo',
            placement: 'inside',
            items: items('card3/logo', [
              'dz-nr.jpg', 'eisa-associates.jpg', 'enclothe.jpg', 'gro.jpg', 'manuhita-gupta-studio.jpg',
              'misfits.jpg', 'mix.co.jpg', 'non-zero.jpg', 'noor.jpg', 'parikhyat-living.jpg', 'pasana.jpg',
              'pocket-gluca.jpg', 'polish-me-pretty.jpg', 'pur-form.jpg', 'ss.jpg', 'stature.jpg',
              'studioorbis.jpg', 'ux.jpg',
            ]),
          },
        },
        {
          bg: 'bg-2',
          numbers: ['50+'],
          subtext: 'Start-up Showcases & Masterclasses',
          subtextIsdi: true,
          marquee: {
            kind: 'circle',
            placement: 'aside',
            items: items('card3/student', [
              'aayushi-kuwadia.jpg', 'aditya-pai.jpg', 'ahilya-rajani.jpg', 'akshit-bhasin.jpg', 'ananya-thakker.jpg',
              'anik-jain.jpg', 'anoushka-rele.jpg', 'gun-agarwal.jpg', 'hemani-bhalotia.jpg', 'itija-banerjee.jpg',
              'kavya-tamboli.jpg', 'maahi-lakhani.jpg', 'manuhita-gupta.jpg', 'saloni-parasrampuria.jpg',
              'samir-kothari.jpg', 'vidhi-parikh.jpg', 'yashabh-srivastava.jpg', 'zara-eisa.jpg',
            ]),
          },
        },
      ],
    },
  ],
};
