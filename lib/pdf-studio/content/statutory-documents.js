/* =====================================================================
   The statutory documents - ACT, ENFACT, OPEACT, UMBRELLA ACT and AIU.

   Unlike every other document in the studio these are not DESIGNED here:
   they are issued documents (Gazette publications, notifications, a
   letter), so the studio shows and hands over the documents themselves.
   Each one is a list of page images plus a ready-made PDF:

     pages  WebP (quality 93, full resolution) for the preview and the
            flipbook, in public/assets/pdf-studio/<category>/
     pdf    the download. For the four scans it carries the ORIGINAL
            high-resolution JPEGs from reference/mandatoryImage, embedded
            byte-for-byte on A4 pages; for UMBRELLA ACT it is the supplied
            PDF itself, unchanged.

   Sources (reference/):
     act           mandatoryImage/atlasskilltechuniversityact/1-29.jpg
     enfact        mandatoryImage/notification1/1-2.jpg
     opeact        mandatoryImage/notification2/1-2.jpg
     umbrella-act  umbrella-act/MH Skills Univrsity Umbrella Act 2024.pdf
     aiu           mandatoryImage/aiuletter/1.jpg
     naac          naac-accreditation/certificate/NAAC Certificate copy.pdf
     ftsf          1. Co Reg Certificate.pdf

   For naac and ftsf, as for umbrella-act, the download is the supplied
   PDF copied byte for byte (the FTSF certificate is digitally signed), and
   the page image is rendered from it: NAAC at its scan's own 2340 x 3310.

   Titles, numbers and dates are read off the documents. Nothing here
   describes layout.
   ===================================================================== */

const BASE = '/assets/pdf-studio';

/** The page list for a document: page-01.webp, page-02.webp, ... */
function pageList(category, count, width, height) {
  return Array.from({ length: count }, (_, i) => ({
    src: `${BASE}/${category}/page-${String(i + 1).padStart(2, '0')}.webp`,
    width,
    height,
  }));
}

export const STATUTORY_DOCUMENTS = [
  {
    id: 'act',
    kind: 'statutory',
    category: 'ACT',
    cardName: 'Maharashtra Act No. XV of 2021',
    docTitle: 'ATLAS SkillTech University, Mumbai Act, 2021',
    cardScope: 'Maharashtra Government Gazette, 16 July 2021',
    file: 'atlas-skilltech-university-act-2021.pdf',
    pdf: `${BASE}/act/atlas-skilltech-university-act-2021.pdf`,
    pages: pageList('act', 29, 1785, 2526),
  },
  {
    id: 'enfact',
    kind: 'statutory',
    category: 'ENFACT',
    cardName: 'Notification on Enforcement of the Act',
    docTitle: 'Notification on Enforcement of the ATLAS SkillTech University, Mumbai Act, 2021',
    cardScope: 'Skill Development, Employment and Entrepreneurship Department, 4 August 2021',
    file: 'notification-enforcement-of-the-act-2021.pdf',
    pdf: `${BASE}/enfact/notification-enforcement-of-the-act-2021.pdf`,
    pages: pageList('enfact', 2, 1785, 2526),
  },
  {
    id: 'opeact',
    kind: 'statutory',
    category: 'OPEACT',
    cardName: 'Notification on Operationalisation of the University',
    docTitle: 'Notification on Operationalisation of ATLAS SkillTech University, Mumbai',
    cardScope: 'Skill Development, Employment and Entrepreneurship Department, 18 August 2021',
    file: 'notification-operationalisation-of-the-university-2021.pdf',
    pdf: `${BASE}/opeact/notification-operationalisation-of-the-university-2021.pdf`,
    pages: pageList('opeact', 2, 1785, 2526),
  },
  {
    id: 'umbrella-act',
    kind: 'statutory',
    category: 'UMBRELLA ACT',
    cardName: 'Maharashtra Private Skills Universities (Establishment and Regulation) Act, 2024',
    docTitle: 'Maharashtra Private Skills Universities (Establishment and Regulation) Act, 2024',
    cardScope: 'Maharashtra Act No. XXXV of 2024',
    file: 'maharashtra-private-skills-universities-act-2024.pdf',
    pdf: `${BASE}/umbrella-act/maharashtra-private-skills-universities-act-2024.pdf`,
    pages: pageList('umbrella-act', 34, 1785, 2526),
  },
  {
    id: 'aiu',
    kind: 'statutory',
    category: 'AIU',
    cardName: 'AIU Letter for Granting the Membership',
    docTitle: 'Association of Indian Universities - Letter Granting Membership',
    cardScope: 'AIU/Meet/Mem/2021, 25 October 2021',
    file: 'aiu-membership-letter-2021.pdf',
    pdf: `${BASE}/aiu/aiu-membership-letter-2021.pdf`,
    // The letter is not A4-shaped; the sheet and the flipbook fit it whole.
    pages: pageList('aiu', 1, 1818, 2520),
  },
  {
    id: 'naac',
    kind: 'statutory',
    category: 'NAAC',
    cardName: 'NAAC Certificate of Accreditation',
    docTitle: 'National Assessment and Accreditation Council - Certificate of Accreditation',
    cardScope: 'Accredited with CGPA 3.04 at A grade, 8 August 2025, valid up to 7 August 2030',
    file: 'naac-accreditation-certificate-2025.pdf',
    pdf: `${BASE}/naac/naac-accreditation-certificate-2025.pdf`,
    pages: pageList('naac', 1, 2340, 3310),
  },
  {
    id: 'ftsf',
    kind: 'statutory',
    category: 'FTSF',
    cardName: 'Certificate of Incorporation - Future Technology Skills Foundation',
    docTitle: 'Certificate of Incorporation - Future Technology Skills Foundation',
    cardScope: 'Ministry of Corporate Affairs, CIN U80301MH2021NPL354978, 19 February 2021',
    file: 'ftsf-certificate-of-incorporation-2021.pdf',
    pdf: `${BASE}/ftsf/ftsf-certificate-of-incorporation-2021.pdf`,
    // US Letter, not A4: the sheet and the flipbook fit it whole.
    pages: pageList('ftsf', 1, 1785, 2310),
  },
];
