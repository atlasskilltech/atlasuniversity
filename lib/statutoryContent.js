/*
 * The five statutory / compliance pages linked from the ATLAS footer, transcribed 1:1 from the
 * production view-source captures in reference/<slug>/index.html:
 *
 *   /nirf                          National Institutional Ranking Framework (NIRF)
 *   /ombudsperson                  Ombudsperson
 *   /anti-ragging-committee        Anti-Ragging Committee
 *   /internal-complaint-committee  Internal Complaint Committee
 *   /women-development-cell        Women Development Cell
 *
 * Every page is the /examination shell: `section.main-cover-section-isme` (the same
 * mandatory-disclosure-1 photograph) over `.container > .section`.
 *
 * Rich text is a run list: a string is text, `{ b: runs }` is <strong>, `{ br: true }` a line break
 * and `{ a: href, runs }` a link. Spelling, spacing and capitalisation are the reference's own
 * ("Presiding Offi cer", "Member (non+teaching)", "Ms.Khushi Sharma", …).
 *
 * The e-mail addresses are behind Cloudflare's e-mail obfuscation on production
 * (`/cdn-cgi/l/email-protection#…` + `data-cfemail`); they are decoded here. On the Anti-Ragging page
 * the link's href decodes to helpline@antiragging.in while its visible text decodes to
 * antiragging@c4yindia.org, and "www.c4yindia.org" links to http://www.antiragging.in/ — both
 * transcribed as authored.
 */
const IMG = '/assets/images/examination';
const DOCS = '/assets/documents';

/* the same cover as /examination; three pages author the 1439/1365.95 `sizes`, NIRF the 1366 one */
const cover = (sizes = '(max-width: 1439px) 100vw, 1365.9549560546875px') => ({
  src: `${IMG}/mandatory-disclosure-1.png`,
  srcSet: `${IMG}/mandatory-disclosure-1-p-500.png 500w, ${IMG}/mandatory-disclosure-1-p-800.png 800w, ${IMG}/mandatory-disclosure-1-p-1080.png 1080w, ${IMG}/mandatory-disclosure-1.png 1366w`,
  sizes,
  alt: '',
});

const ROLE_HEAD = ['Sr no.', 'Name', 'Position in the Committee'];
const rows = (list) => list.map(([name, role], i) => [String(i + 1), name, role]);

export const nirf = {
  meta: {
    title: ' ATLAS SkillTech University',
    description: 'Get in touch with Atlas Skilltech.',
    canonical: 'https://atlasuniversity.edu.in/nirf/',
  },
  hero: { title: 'National Institutional Ranking Framework (NIRF)', image: cover('(max-width: 1366px) 100vw, 1366px') },
  /* ref .section.extraspace > .links-wrapper.no-mar > ul.list-4 — the hrefs are relative to /nirf/ on
     production; the files are this site's own byte-identical copies */
  links: [
    { label: 'NIRF Management 2025', href: `${DOCS}/nirf/nirf-management-2025.pdf`, newTab: true },
    { label: 'NIRF Management  2026', href: `${DOCS}/nirf/nirf-management-2026.pdf`, newTab: true },
    { label: 'NIRF Skill University 2026', href: `${DOCS}/nirf/nirf-skill-university-2026.pdf`, newTab: true },
    { label: 'PATENT DETAILS', href: `${DOCS}/nirf/format-patent-details.xlsx`, newTab: true },
  ],
};

export const ombudsperson = {
  meta: {
    title: ' Ombudsperson & Student Advocacy  – ATLAS SkillTech University',
    description:
      'Learn how the ombudsperson supports student concerns, mediation, conflict resolution and impartial guidance to ensure fair campus processes.',
    canonical: 'https://atlasuniversity.edu.in/ombudsperson/',
  },
  hero: { title: 'Ombudsperson', image: cover() },
  blocks: [
    {
      type: 'text',
      wrapper: false,
      items: [
        {
          kind: 'mrgbtm',
          runs: [
            'In compliance with the UGC regulations on Appointment of Ombudsperson(s) as provided in the University Grants Commission (Redressal of Grievances of Students) Regulations, 2023, Chief Executive officer at Save The Children India, Dr. Subhadra Anand, Former Principal of R. D. National College, is appointed as Ombudsperson at ATLAS SKILLTECH UNIVERSITY.',
          ],
        },
        {
          kind: 'plain',
          runs: [
            { b: ['Mobile No:'] },
            ' +91 9821316810',
            { br: true },
            { b: ['Email ID:'] },
            ' ',
            /* plain text, not a link: Cloudflare wrapped a plain-text address in its obfuscation anchor,
               and its decoder replaces that anchor with the text again (the other pages author real
               mailto: links, which stay links) */
            'shubhadra.anand@savethechildrenindia.org',
          ],
        },
      ],
    },
  ],
};

export const antiRagging = {
  meta: {
    title: ' Anti-Ragging Committee & Policies  – ATLAS SkillTech University',
    description:
      'Read anti-ragging policies, reporting procedures, support systems and resources that ensure a safe, inclusive and respectful campus environment for all students.',
    canonical: 'https://atlasuniversity.edu.in/anti-ragging-committee/',
  },
  hero: { title: 'Anti-Ragging \nCommittee', image: cover() },
  blocks: [
    {
      type: 'table',
      heading: 'Anti-ragging committee',
      headingMargin: 'mrg24',
      head: ['S.No', 'Name', 'Position in the Committee'],
      rows: rows([
        ['Dr. Rajan Welukar', 'Presiding Officer/ Chairperson'],
        ['Dr. Shashikant Patil', 'Member (Faculty)'],
        ['Dr. Zuleika Homavazir', 'Member (Faculty)'],
        ['Ms. Vaibhav Mohite', 'Member (Faculty)'],
        ['Ms. Meena Krishna', 'Member (non-teaching)'],
        ['Ms. Bhargavi Deshpande', 'Member (non-teaching)'],
        ['Ms. Nandita Deora', 'Member (non-teaching)'],
        ['Mr. Harshit Raichura', 'Member (non-teaching)'],
        ['Ms. Jyoti Nathani', 'Member (non-teaching)'],
        ['Ms. Payal Raheja', 'Member (Parent)'],
        ['Mr. Rajiv Punwani', 'Member (Parent)'],
        ['Mr. Prashant Prabhakar Rao Chavan', 'Police Administration'],
        ['Mr. Rajdeep Banerjee', 'Civil Administration'],
        ['Mr. Iftikar Khan', 'Local Media'],
        ['Ms. Freyaz Shroff', 'NGO involved in Youth activities'],
        ['Mr. Ved Shetty', 'Student Representative-ISDI'],
        ['Ms. Lavanya Shinde', 'Student Representative-BBA'],
        ['Ms.Khushi Sharma', 'Student Representative-MBA'],
        ['Mr.Himanshu', 'Student Representative-Ugdx'],
        ['Ms. Eshwari Shelatkar', 'Student Representative-School of Law'],
      ]),
    },
    {
      type: 'table',
      heading: 'Anti-Ragging Squad',
      headingMargin: 'mrg24',
      head: ['S.No', 'Name', 'Position in the Committee'],
      rows: rows([
        ['Dr. Zuleika Homavazir', 'Member (Faculty)'],
        ['Dr.Varsha Agarwal', 'Member (Faculty)'],
        ['Dr.Rabinder Henry', 'Member (Faculty)'],
        ['Mr.Vaibhav Mohite', 'Member (Faculty)'],
        ['Ms. Bhargavi Deshpande', 'Member (Non-teaching)'],
        ['Mr.Kunal Ramchandani', 'Member (Non-teaching)'],
        ['Ms.Nandita Deora', 'Member (Non-teaching)'],
        ['Mr. Harshit Raichura', 'Member (Non-teaching)'],
        ['Ms. Jyoti Nathani', 'Member (Non-teaching)'],
        ['Mr.Uday Dalvi', 'Member (Non-teaching)'],
        ['Mr.Zaid Desai', 'Member (Non-teaching)'],
      ]),
    },
    {
      type: 'text',
      wrapper: true,
      items: [
        { kind: 'h3', runs: ['NATIONAL RAGGING PREVENTION PROGRAMME'] },
        { kind: 'mrgbtm32', runs: ['24×7 Toll Free : 1800-180-5522'] },
        {
          kind: 'mrgbtm32',
          runs: [
            { b: ['UGC Monitoring Agency'] },
            { br: true },
            'Centre for Youth (C4Y)1800-180-5522',
            { br: true },
            { a: 'mailto:helpline@antiragging.in', runs: ['antiragging@c4yindia.org'] },
            ' | ',
            { a: 'http://www.antiragging.in/', runs: ['www.c4yindia.org'] },
          ],
        },
        {
          kind: 'mrgbtm32',
          runs: [{ b: ['Contact Details of the Nodal Officers of Anti-Ragging Committee and SquadAnti-Ragging '] }, 'Committee (ARC) | Anti-Ragging Squad (ARS)'],
        },
        {
          kind: 'mrgbtm32',
          runs: [
            { b: ['RAGGING IS A CRIMINAL OFFENCE AND THE CULPRITS WILL ATTRACT ', { br: true }, 'PUNITIVE ACTION AS MENTIONED IN THE UGC REGULATIONS '] },
            { br: true },
            '(',
            { a: 'http://www.antiragging.in/assets/pdf/annexure/Annexure-I.pdf', runs: ['www.antiragging.in/assets/pdf/annexure/Annexure-I.pdf'] },
            ')',
          ],
        },
        { kind: 'mrgbtm', runs: [{ b: ['Nodal Officer: '] }, 'Ms Bhargavi Deshpande  (+91 9920887730)'] },
        { kind: 'plain', runs: [{ a: 'https://www.ugc.ac.in/', runs: [{ b: ['www.ugc.ac.in'] }] }] },
      ],
    },
  ],
};

export const internalComplaint = {
  meta: {
    title: ' Internal Complaint Committee & Policies  – ATLAS SkillTech University',
    description:
      'Understand internal complaint procedures, committee roles, anti-harassment policies and support services that protect student rights and campus safety.',
    canonical: 'https://atlasuniversity.edu.in/internal-complaint-committee/',
  },
  hero: { title: 'Internal Complaint \nCommittee', image: cover() },
  blocks: [
    {
      type: 'table',
      head: ROLE_HEAD,
      rows: rows([
        ['Dr. Simarjeet Makkar', 'Chairperson'],
        ['Dr. Shreya Banerjee', 'Member (Faculty)'],
        ['Ms. Hansika Disawala', 'Member (Faculty)'],
        ['Mr. Kunal Ramchandani', 'Member (Non-teaching)'],
        ['Ms. Asha Uchil', 'Member (Non-teaching)'],
        ['Ms. Prajakta Shirud', 'External Member'],
        ['Ms. Keya Gala', 'Student Representative'],
        ['Ms. Reva Shroff', 'Student Representative'],
        ['Mr. Parth Sanghavi', 'Student Representative'],
      ]),
    },
    {
      type: 'text',
      wrapper: true,
      items: [
        { kind: 'h3', runs: ['DEFINITION:'] },
        {
          kind: 'mrgbtm32',
          runs: [
            '“Internal Complaints Committee” (ICC) is constituted in higher education institutions under sub- regulation (1) of regulations of University Grants Commission of India in Gazette Notification Dated 2nd May 2016 for Prevention, Prohibition, and Redressal of sexual harassment of women employees and students in higher educational institutions, Regulations 2015. Any existing body already functioning with the same objective (like the Gender Sensitization Committee Against Sexual Harassment (GSCASH)) is reconstituted as the ICC.',
          ],
        },
        {
          kind: 'mrgbtm32',
          runs: [
            { a: `${DOCS}/internal-complaint-committee/ugc-guidelines-for-icc_.pdf`, runs: [{ b: ['Click here for UGC Notification', { br: true }] }] },
            { a: `${DOCS}/internal-complaint-committee/university-icc.pdf`, runs: [{ b: ['Click here for University Notification'] }] },
          ],
        },
        {
          kind: 'plain',
          runs: [
            { b: ['Nodal Officer: Dr. Simarjeet Makkar', { br: true }] },
            'For any concerns or to report an incident, please email us at ',
            { a: 'mailto:icc@atlasuniversity.edu.in', runs: ['icc@atlasuniversity.edu.in'] },
          ],
        },
      ],
    },
  ],
};

export const womenDevelopment = {
  meta: {
    title: ' Women Development Cell & Support  – ATLAS SkillTech University',
    description: 'Explore women empowerment initiatives, safety measures, counselling support and student welfare programs.',
    canonical: 'https://atlasuniversity.edu.in/women-development-cell/',
  },
  hero: { title: 'Women \nDevelopment Cell', image: cover() },
  blocks: [
    {
      type: 'table',
      heading: 'Composition of Women Development Cell',
      headingMargin: 'mrg16',
      head: ROLE_HEAD,
      rows: rows([
        ['Dr. Zuleika Homavazir', 'Presiding Offi cer/ Chairperson'],
        ['Dr. Shashikant Patil', 'Member (Faculty)'],
        ['Dr. Varsha Agarwal', 'Member (Faculty)'],
        ['Dr. Simarjeet Makkar', 'Member (Faculty)'],
        ['Ms. Divya Vijaychandran', 'Member (Faculty)'],
        ['Mr.  Harshit Raichura', 'Member (non+teaching)'],
        ['Ms. Agrata Agarwal', 'Student Representative'],
        ['Ms. Sharon Pereira', 'Student Representative'],
        ['Ms. Neelima Deshpande', 'Member Secretary'],
      ]),
    },
    {
      type: 'text',
      wrapper: true,
      items: [
        {
          kind: 'plain',
          runs: [
            'For any concerns or to report an incident, please email us at',
            { b: [' '] },
            { a: 'mailto:wdc@atlasuniversity.edu.in', runs: [{ b: ['wdc@atlasuniversity.edu.in'] }] },
          ],
        },
      ],
    },
  ],
};
