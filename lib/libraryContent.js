/* /library — transcribed 1:1 from reference/library.php (production: /library/).
   Every image is the reference's own file from `reference/wordpress-custom-image/library/library/`,
   SHA-1-identical to what production serves, copied to /assets/images/library/ (the upstream
   `section-8/peolple/` folder is spelt `people/` here). A `\n` stands for an authored `<br>`.
   Entries the reference comments out (two e-resource tiles, the radio rows of three search
   panels, a Google "A-Z eJournals" link) are not transcribed. */
const IMG = '/assets/images/library';

export const hero = {
  title: 'ATLAS Library',
  sub: 'Your Hub for Research, Learning & Discovery',
  desktop: `${IMG}/section-1/herobanner.webp`,
  mobile: `${IMG}/section-1/herobannermobile.webp`,
};

/* The five search tabs. `radios` is set only on the two panels whose radio row is live markup;
   the other three author theirs inside HTML comments. Every placeholder is the hero's line. */
const PLACEHOLDER = 'Hub for Research, Learning & Discovery';
const RADIOS = ['Keywords', 'Title', 'Author'];
export const search = {
  background: `${IMG}/search-section/desktop.webp`,
  icon: `${IMG}/search-section/search.svg`,
  tabs: [
    {
      id: 'catalog',
      label: 'Catalog',
      color: 'catalog',
      form: { action: 'https://library.atlasuniversity.co.in/cgi-bin/koha/opac-search.pl', method: 'get' },
      input: { name: 'q', placeholder: PLACEHOLDER },
      radios: RADIOS,
      advanced: 'https://library.atlasuniversity.co.in/cgi-bin/koha/opac-search.pl',
    },
    {
      id: 'ebsco',
      label: 'EBSCO',
      color: 'ebsco',
      form: { action: 'https://research.ebsco.com/c/kfhbf5/search/results', method: 'get' },
      input: { name: 'q', placeholder: PLACEHOLDER, ariaLabel: 'Search for digital articles, books, authors, topics, etc...' },
      radios: RADIOS,
      /* as authored: EBSCO's "Advanced Search" points at the Koha catalogue, not at EBSCO */
      advanced: 'https://library.atlasuniversity.co.in/cgi-bin/koha/opac-search.pl',
    },
    {
      id: 'mason',
      label: 'Mason open Educational Resources',
      color: 'mason',
      form: { action: 'https://oer.deepwebaccess.com/oer/desktop/en/search.html', method: 'post' },
      input: { name: 'fullRecord', placeholder: PLACEHOLDER, ariaLabel: 'Search' },
      advanced: 'https://mom.gmu.edu',
    },
    {
      id: 'google',
      label: 'Google Scholar',
      color: 'google',
      form: { action: 'https://scholar.google.com/scholar', method: 'get' },
      input: { name: 'q', placeholder: PLACEHOLDER },
      advanced: 'https://scholar.google.com/',
    },
    {
      id: 'shodhganga',
      label: 'Shodhganga',
      color: 'shodhganga',
      form: { action: 'https://shodhganga.inflibnet.ac.in/simple-search', method: 'get' },
      input: { name: 'query', placeholder: PLACEHOLDER },
      advanced: 'https://shodhganga.inflibnet.ac.in/',
    },
  ],
};

export const about = {
  heading: 'Library',
  text:
    'The library is the academic heart of ATLAS SkillTech University, fostering a rich environment for learning, research, and personal development. We are dedicated to supporting the university’s mission by providing access to a comprehensive collection of resources and services. The library collection is meticulously curated to support the academic and professional development of students and faculty. The resources are distributed amongst the schools at ATLAS SkillTech University such as ISME, ISDI, and uGDX. It includes comprehensive resources covering various aspects of management, business disciplines, design disciplines and technological fields.',
  desktop: `${IMG}/section-2/desktop.png`,
  mobile: `${IMG}/section-2/mobile.png`,
};

export const services = {
  heading: 'Service & Facilities',
  desktop: `${IMG}/section-3/desktop.png`,
  mobile: `${IMG}/section-3/mobile.png`,
  items: [
    { title: 'Online Membership', text: 'Offers convenient access to library resources, allowing students and faculty to register and manage their library accounts online.' },
    { title: 'Book Borrowing facility', text: 'Students and faculty can borrow books and other materials using their borrowers card.' },
    { title: 'Inter Library Loan', text: 'We provide interlibrary loan services to extend our collection through partnerships with other libraries.' },
    { title: 'Open Access System', text: 'Enables users to freely browse and access a wide range of library materials without restrictions, promoting easy and unrestricted use of resources.' },
    { title: 'WebOPAC', text: 'Provides an online catalog where users can search for books and other resources available in the library, enhancing discoverability and ease of access.' },
    { title: 'Remote Access (Knimbus)', text: 'Access journals, and databases from anywhere via online portal and remote access login.' },
    { title: 'Digital Library (DSpace)', text: 'Hosts a digital repository of e-resources, including dissertations, question papers, newsletters, and publications' },
    { title: 'RFID facility', text: 'Uses RFID technology for efficient book lending, returns, and security, ensuring a smooth library experience.' },
    /* authored `I.DrillBit<br>II.Turnitin`; the card's text box is a flex row, so the two runs sit
       side by side on production, and the same child list renders the same way here */
    { title: 'Plagiarism Check Service', text: 'I.DrillBit\nII.Turnitin' },
    { title: 'Book Bank Facility for BBA students', text: 'A dedicated collection of essential textbooks for BBA students, available for long-term borrowing to support their academic needs.' },
    { title: 'Reference Services', text: 'The library staff are available to assist with research queries and to help locate resources.' },
    { title: 'Referral Service', text: 'Guides students and faculty to locate and access specialized resources and materials within and outside the library' },
    { title: 'Current Awareness Services (CAS)', text: 'Keeping users updated with the latest information and developments in their field, ensuring they stay informed and knowledgeable.' },
    { title: 'Selective Dissemination of Information (SDI)', text: 'Tailoring and delivering relevant information to specific users based on their interests, increasing the efficiency of information retrieval.' },
    { title: 'Library Orientation Programme', text: 'Introduces new students and faculty to the library’s resources, services, and facilities, ensuring they can make the most of what the library offers.' },
    { title: 'Reading Hall', text: 'A spacious reading hall with comfortable seating and a quiet atmosphere.' },
    { title: 'Research Area', text: 'Provides a quiet, dedicated space for PhD scholars to conduct research, with complete access to necessary resources and support.' },
    { title: 'E-Zone', text: 'Provides desktop computers with essential software and internet access for a convenient workspace.' },
    { title: 'Internet Connectivity with High Speed', text: 'Ensures fast and reliable internet access, enabling users to efficiently conduct research, access online resources, and communicate.' },
    { title: 'Helpdesk & dedicated machine for Swayam & NPTEL course', text: 'Provides assistance in registering for online courses, helping users enhance their knowledge and skills through additional learning platforms.' },
    { title: 'Display of New Arrivals', text: 'Showcases the latest additions to the library’s collection, keeping users informed about new and relevant materials available for borrowing.' },
    { title: 'Book Club', text: 'Facilitates discussions on books and hosts events, fostering a community of readers and promoting a culture of continuous learning and intellectual exchange.' },
    /* as authored: the 23rd card's description repeats its title */
    { title: 'Self Check Service with Smartphone', text: 'Self Check Service with Smartphone' },
  ].map((item, i) => ({ ...item, image: `${IMG}/section-3/facilities/${i + 1}.png` })),
};

export const resources = {
  heading: 'Resources:',
  text:
    'The ATLAS Library is home to some of the most critical literature in the form of books, e-books, journals, DVDs, and other resources. To streamline the process for students, the library also provides students easy access to readings compiled for their specific courses.',
  desktop: `${IMG}/section-4/desktop.png`,
  mobile: `${IMG}/section-4/mobile.png`,
  boxes: [
    {
      image: `${IMG}/section-4/box/1.png`,
      bg: 1,
      title: 'Reference Books and Indian Knowledge Systems:',
      text: 'The reference section includes dictionaries, encyclopedias, and handbooks across various subjects, providing quick access to essential information. We also have a dedicated collection on Indian Knowledge Systems (IKS), featuring works on traditional sciences, arts, culture, and philosophy, highlighting India’s rich intellectual heritage.',
    },
    {
      image: `${IMG}/section-4/box/2.png`,
      bg: 2,
      title: 'Theses and Dissertations:',
      text: 'The library maintains a comprehensive collection of student theses and dissertations. These documents are invaluable resources for current students and faculty, providing insights into previous research and methodologies. They serve as references for developing new research projects and academic papers.',
    },
    {
      image: `${IMG}/section-4/box/3.png`,
      bg: 3,
      title: 'Multimedia Collection:',
      text: 'The library boasts a diverse collection of CDs and DVDs, including those that accompany books, enhancing the learning experience with multimedia content. Additionally, our collection features a wide range of movie and music CDs and DVDs, providing both educational and recreational resources for students and faculty. This multimedia collection enriches the library’s offerings, supporting various learning styles and interests.',
    },
  ],
};

/* In the reference's order; `wide` is `.eResourcesBoxCol-9` (grid-column: span 2). The file names
   are the reference's own — brand/10 is authored before brand/9. */
export const eResources = {
  heading: 'E-Resources:',
  items: [
    { href: 'https://delnet.in/', image: 1 },
    { href: 'https://hbr.org/magazine', image: 3 },
    { href: 'https://club.ndl.iitkgp.ac.in/club-home', image: 4 },
    { href: 'https://epgp.inflibnet.ac.in/Home/Download', image: 5 },
    { href: 'https://swayam.gov.in/', image: 6 },
    { href: 'https://atlasskilltech.app/campusLibrary/library-list-of-subscribed-print-&-e-journals-2025-.pdf', image: 7 },
    { href: 'https://app.myloft.xyz/user/login?fromPreference=true&institute=cmclh7vkj039mriuwbi4l7mt5', image: 8 },
    { href: 'https://atlasuniversitylibraryir.in/home', image: 10 },
    { href: 'https://library.atlasuniversity.co.in/', image: 9, wide: true },
    { href: 'https://epwrfits.in/', image: 11 },
    { href: 'https://www.perlego.com/', image: 12 },
  ].map((item) => ({ ...item, image: `${IMG}/section-5/brand/${item.image}.png` })),
};

/* A rule's body is a list of runs (a string is text, `{ strong }` is bold) or `{ list: [...] }`,
   whose items are runs too. */
export const rules = {
  heading: 'Rules and Regulations',
  lead: 'To ensure a conducive environment for study and research, the library follows these rules and regulations:',
  items: [
    {
      title: 'Library Timings',
      body: ['The circulation desk operates from ', { strong: '8:00 AM to 6:00 PM' }, ' and Reading Hall is open from ', { strong: '7:00 AM to 10:00 PM' }, ' except for Sundays and Holidays.'],
    },
    { title: 'Membership', body: ['All students, faculty, visiting faculty, and staff of the institution are entitled to library membership.'] },
    {
      title: 'Borrowing Privileges',
      body: {
        list: [
          [{ strong: 'Students:' }, ' Can borrow up to 2 books for 7 days.'],
          [{ strong: 'Faculty:' }, ' Can borrow up to 4 books for 15 days.'],
          [{ strong: 'Visiting Faculty:' }, ' Can borrow up to 2 books for 15 days'],
          [{ strong: 'Staff:' }, ' Can borrow up to 2 books for 7 days.'],
        ],
      },
    },
    { title: 'Renewals and Reservations', body: ['Books can be renewed if not reserved by others. Reservations can be made for books.'] },
    { title: 'Overdue Charges', body: ['A fine of Rs. 10 per day per book will be charged for overdue books. The overdue charges are for students only'] },
    { title: 'Reference Materials', body: ['Reference books, thesis, journals, and periodicals are not available for loan and must be used within the library premises.'] },
    {
      title: 'Conduct in the Library',
      body: {
        list: [
          ['Silence must be maintained.'],
          ['Mobile phones should be on silent mode.'],
          ['Eating and drinking are not allowed.'],
          ['Personal belongings should be kept in designated areas.'],
        ],
      },
    },
    { title: 'Use of Computers and Internet', body: ['The library provides access to computers and the internet for academic purposes. Misuse of these facilities may result in restricted access.'] },
    { title: 'Loss or Damage', body: ['Borrowers are responsible for the materials they borrow. Any loss or damage must be reported immediately and compensated as per library policy.'] },
    { title: 'Clearance', body: ['Students must return all borrowed materials and clear any dues before the completion of their courses.'] },
  ],
};

export const eContent = {
  heading: 'ATLAS E-Content',
  lead:
    'At ATLAS SkillTech University, we recognize that learning is a lifelong journey. The E-Content system, enriched with Swayam courses and supported by our specialized lecture capturing technology, is a testament to our commitment to providing students with the best possible resources for their educational journey. By making quality education accessible and flexible, we empower our students to achieve academic excellence and professional success.',
  items: [
    /* as authored: the first href carries a doubled slash after the host */
    { href: 'https://onlinecourses.swayam2.ac.in//imb24_mg124/preview', name: 'Dr. Yukti\nKhajanchi', image: `${IMG}/section-7/e-content/Dr-yukti-khajanchi.png`, tone: 1 },
    { href: 'https://onlinecourses.swayam2.ac.in/imb24_mg123/preview', name: 'Dr. Kajal\nChheda', image: `${IMG}/section-7/e-content/dr-kajal-chheda.png`, tone: 2 },
    { href: 'https://onlinecourses.swayam2.ac.in/imb24_mg126/preview', name: 'Prof. \nSumitra\nIyer', image: `${IMG}/section-7/e-content/sumitra-iyer.png`, tone: 3 },
  ],
  label: 'Swayam Course by',
};

/* `image: null` is the one portrait the reference cannot show: it points at a third-party stock
   image (betterstudio.com/wp-content/uploads/2019/05/1-1-instagram-1024x1024.jpg) that answers 404,
   so production paints a broken image. The slot is kept at its size, empty. */
const P = `${IMG}/section-8/people`;
export const awards = [
  {
    tone: 1,
    title: 'Best Reader Award',
    text: 'The Best Reader Award is given to individuals who demonstrate a remarkable commitment to reading and knowledge acquisition. This award recognizes those who consistently borrow and read a wide variety of books, showcasing their dedication to continuous learning.',
    years: [
      {
        year: '2024',
        people: [
          { name: 'Shevaun Pimenta \n(Student)', image: `${P}/shevun.png` },
          { name: 'Dr. Mehrunnisa \nAnsari', image: `${P}/mehrunisa.png` },
          { name: 'Calista Moraes \n(Student)', image: `${P}/calista.png` },
          { name: 'Prof. Garima \nAgarwal', image: `${P}/garima.png` },
          { name: 'Prof. Ramakrishnan \n(Interlibrary Loan)', image: null },
        ],
      },
      {
        year: '2023',
        people: [
          { name: 'Prof. Kanika \nMakhija', image: `${P}/kanika.png` },
          { name: 'Danielle Flanagan \n(Staff)', image: `${P}/danielle.png` },
          { name: 'Prof. Nishith \nMehta', image: `${P}/nishith.png` },
        ],
      },
    ],
  },
  {
    tone: 2,
    title: 'Best User Award',
    text: 'The Best User Award honors individuals who maximize the library’s services, including reference and interlibrary loans, events, facilities, and digital resources, showcasing the importance of utilizing all available resources for academic and personal development.',
    years: [
      {
        year: '2024',
        people: [
          { name: 'Prof. Malvika \nMahidhar', image: `${P}/malvika.png` },
          { name: 'Harmisha Jain \n(Interlibrary Loan)', image: `${P}/harmisha.png` },
        ],
      },
    ],
  },
];
