/**
 * Copy for /mandatory_disclosures, transcribed from reference/mandatory_disclosures/index.php.
 *
 * Ten accordion sections, in the reference's order, each a list of disclosure entries. An entry is:
 *
 *   { link: Item }                      the bold row  (`li > a`)
 *   { text: string, textLink?: Item }   a bold row that is not a link (`p.noHover`), optionally
 *                                       closing with a link of its own (the sponsoring-body row)
 *   + any of:
 *   subs:   Item[]                      the regular-weight links under a row (`li > p > a`)
 *   lines:  string[]                    plain paragraphs under a row (`li > p`)
 *   nested: Item[]                      a nested list of regular-weight links (`li > ul`)
 *   groups: { label, links: Item[] }[]  a bold label and a `|`-separated run of inline links,
 *                                       with a rule between groups (Prospectus)
 *
 *   Item = { label, href, newTab? }
 *
 * Links:
 *  - Pages this site already serves are written as site paths (/about-us, /ombudsperson, …); everything
 *    else keeps the production URL the reference authors, because the page or document lives there.
 *  - The ten PDFs the reference ships in its own folder are served from /assets/mandatory-disclosures/
 *    (byte-identical to production's copies). Every other document link keeps its production URL.
 *  - `target="blank"` / `target="_blank"` both become newTab; a link authored without a target opens
 *    in the same tab, as upstream.
 *  - Entries commented out in the reference (Annual Accounts, Registrar, Chief Finance & Accounts
 *    Officer, Director BoAE, Academic Leadership, faculty/staff details, Central facilities, Equal
 *    Opportunity Cell, SEDG Cell, Announcements, Newsletters, International Students) are not rendered.
 *
 * Deviations, each deliberate:
 *  - "Academic Calendar" (Academics) authors `Academic-Calendar--AY-2025-26-a1429.pdf`, which does not
 *    exist: production answers it with its homepage HTML (a soft 404). It points at
 *    `Academic-Calendar--AY-2025-26.pdf`, the AY 2025-26 calendar the Information Corner links.
 *  - Three rows author `href="#"` ("Admission process and guidelines", "Hostel details : Not
 *    Applicable", "Circulars and Notices"); a link to nowhere is rendered as the same bold row
 *    without a link.
 *
 * Transcribed as authored: "Academic Calender 2025", "Independance Day 2025", the U+2060 word joiner
 * opening "Master of Business Administration (MBA)", and "Placement Cell and its activities" linking to
 * production's /placement/ — which answers with the homepage today.
 */

const PROD = 'https://atlasuniversity.edu.in';
const PROD_WWW = 'https://www.atlasuniversity.edu.in';
const DOC = '/assets/mandatory-disclosures';

export const mandatoryDisclosures = {
  meta: {
    title: 'Mandatory Disclosure & Compliance  – ATLAS SkillTech University',
    description:
      'Access mandatory disclosures, compliance information, institutional policies and statutory details required for transparency and regulatory adherence.',
    keywords: 'atlas, contact',
    canonical: `${PROD}/mandatory_disclosures`,
  },

  sections: [
    {
      title: 'About HEI',
      entries: [
        { link: { label: 'About us: Overview', href: '/about-us', newTab: true } },
        {
          link: { label: 'Act and Statutes or MoA', href: '/about-us#recognition', newTab: true },
          subs: [
            { label: 'Maharashtra Act No. XV of 2021', href: `${PROD_WWW}/act/`, newTab: true },
            { label: 'Notification on Enforcement of the Act', href: `${PROD_WWW}/enfact/`, newTab: true },
            { label: 'Notification on Operationalisation of the University', href: `${PROD_WWW}/opeact/`, newTab: true },
            { label: 'Maharashtra Skills University Umbrella Act 2024', href: 'https://online.fliphtml5.com/vrcjg/rnzq/#p=1', newTab: true },
            { label: 'AIU Letter for Granting the Membership', href: `${PROD_WWW}/aiu/`, newTab: true },
          ],
        },
        { link: { label: 'Institutional Development Plan', href: `${DOC}/institutional-development-plan.pdf`, newTab: true } },
        {
          text: 'Constituent Units/ Affiliated Colleges, Affiliating University (in case of Colleges) Off-campus/Off-shore campus/Learning Support Centres under ODL mode (Wherever applicable) : Not Applicable',
        },
        { link: { label: 'Accreditation/ Ranking status (NAAC)', href: `${PROD}/naac-accreditation/certificate/`, newTab: true } },
        { link: { label: 'Recognition / Approval (2(f))', href: `${DOC}/2-F.pdf`, newTab: true } },
        { link: { label: 'Annual Reports', href: `${PROD}/annual-reports.pdf`, newTab: true } },
        {
          text: 'Sponsoring body details, if any',
          textLink: { label: '(Future Technology Skills Foundation)', href: 'https://online.fliphtml5.com/vrcjg/nijb', newTab: true },
        },
      ],
    },
    {
      title: 'Administration',
      entries: [
        { link: { label: 'President / Chancellor', href: '/schools/isdi/about-us#our-leadership' } },
        { link: { label: 'Executive President', href: '/schools/isdi/about-us#executive-president' } },
        { link: { label: 'Vice-Chancellor', href: '/schools/isdi/about-us#vice-chancellor' } },
        { link: { label: 'Our Management Team', href: `${PROD}/management-team` } },
        { link: { label: 'Ombudsperson', href: '/ombudsperson' } },
        {
          text: 'Executive Council | Board of Governors | Board of Management | Academic Council | Board of Studies | Finance Committee – composition and members with particulars',
          nested: [
            { label: 'Governing Body Composition', href: `${PROD}/committess/1_gverning_body_composition.pdf`, newTab: true },
            { label: 'Board of Management Composition', href: `${PROD}/committess/2_board_management_composition.pdf`, newTab: true },
            { label: 'Finance Committee Composition', href: `${PROD}/committess/3_finance_committee_composition.pdf`, newTab: true },
            { label: 'Fee Fixation Committee Composition', href: `${PROD}/committess/4_fee_fixation_committee_composition.pdf`, newTab: true },
            { label: 'Academic Council Composition', href: `${PROD}/committess/5_academic_council_composition.pdf`, newTab: true },
            { label: 'Board of Studies ISDI Composition', href: `${PROD}/committess/6_board_of_studies_isdi_composition.pdf`, newTab: true },
            { label: 'Board of Studies ISME Composition', href: `${DOC}/Board_of_Studies_ISME_Composition.pdf`, newTab: true },
            { label: 'Board of Studies uGDX Composition', href: `${DOC}/8_Board_of_Studies_UGDX_Composition.pdf`, newTab: true },
            { label: 'Board of Studies LAW Composition', href: `${DOC}/BOS_Law_School_Composition.pdf`, newTab: true },
            { label: 'Internal Quality Assurance Cell Composition', href: `${PROD}/committess/11_internal_quality_assurance_cell_composition.pdf`, newTab: true },
          ],
        },
        { link: { label: 'Internal Complaint Committee', href: '/internal-complaint-committee' } },
      ],
    },
    {
      title: 'Academics',
      entries: [
        { link: { label: 'Details of Academic Programs', href: '/#academic-programs', newTab: true } },
        { link: { label: 'Academic Calendar', href: `${DOC}/Academic-Calendar--AY-2025-26.pdf`, newTab: true } },
        {
          link: { label: 'Statutes | Ordinances pertaining to Academics/Examinations', href: '/' },
          subs: [
            { label: 'Statutes', href: `${PROD}/mandatory-disclosure/act/statutes`, newTab: true },
            { label: 'Ordinances', href: `${PROD}/mandatory-disclosure/act/ordinances`, newTab: true },
          ],
        },
        { link: { label: 'Schools/Departments/Centres', href: '/#academic-programs', newTab: true } },
        {
          text: 'List of UGC-recognized ODL/Online programs',
          lines: ['Bachelor of Business Administration (BBA)', '⁠Master of Business Administration (MBA)'],
        },
        { link: { label: 'Internal Quality Assurance Cell (IQAC)', href: `${PROD}/iqac` } },
        { link: { label: 'Library', href: '/library' } },
        { link: { label: 'Academic collaborations', href: '/advantages/atlas-internationalisation' } },
      ],
    },
    {
      title: 'Admissions & Fee',
      entries: [
        {
          link: { label: 'Prospectus', href: `${PROD}/fee-structure/bdes/` },
          groups: [
            {
              label: 'Undergraduate:',
              links: [
                { label: 'B.Des', href: `${PROD}/brochure/ATLAS%20B.Des_Brochure.pdf`, newTab: true },
                { label: 'BBA', href: `${PROD}/brochure/BBA_Brochure_Final.pdf`, newTab: true },
                { label: 'BBA DB & Advt', href: `${PROD}/brochure/2025/BBA%20-%20Digital%20Branding%20&%20Advertising_Small_2025.pdf`, newTab: true },
                { label: 'BBA AIET', href: `${PROD}/brochure/2025/BBA%20%E2%80%93%20Artificial%20Intelligence%20and%20Emerging%20Technologies_small_2025.pdf`, newTab: true },
                { label: 'B.Sc Finance', href: `${PROD}/brochure/B_Sc_Finance_Brochure.pdf`, newTab: true },
                { label: 'B.Tech (CS,AI & ML)', href: `${PROD}/brochure/2025/uGDX_BTech_CS_AI_And_ML_Brochure.pdf`, newTab: true },
                { label: 'B.Tech (CS,AI & Robotics)', href: `${PROD}/brochure/uGDX_Brochure_Robotics.pdf`, newTab: true },
                { label: 'B.Tech (CIT,AI & CS)', href: `${PROD}/brochure/2025/uGDX_BTECH_IT_AI_CYBERSECURITY.pdf`, newTab: true },
                { label: 'BBA LL.B.(Honours)', href: `${PROD}/brochure/BBA_LLB_Brochure_Lowres_Sigal_Page.pdf`, newTab: true },
                { label: 'B.Tech (CIT,AI & DS)', href: `${PROD}/brochure/2025/uGDX_BTECH_CS_AI_DATA_SCIENCE.pdf`, newTab: true },
              ],
            },
            {
              label: 'Postgraduate:',
              links: [
                { label: 'Executive MBA', href: `${PROD}/brochure/atlas-executive-mba-brochure.pdf`, newTab: true },
                { label: 'MBA Investment Banking', href: `${PROD}/brochure/ATLAS_MBA_Investment_Banking.pdf`, newTab: true },
                { label: 'MBA Fintech', href: `${PROD}/brochure/MBA_in_FinTech.pdf`, newTab: true },
                { label: 'MBA', href: `${PROD}/brochure/MBA%20in%20Mgmt.%20&%20Entr.%20Brochure%20v2.0_SoMgmt.pdf`, newTab: true },
                { label: 'M.Des', href: `${PROD}/brochure/ISDI_PGP_DI_Brochure.pdf`, newTab: true },
                { label: 'MBA DMST', href: `${PROD}/brochure/Design-Management-&-Strategic-Thinking.pdf`, newTab: true },
              ],
            },
          ],
        },
        { link: { label: 'Fee structure', href: `${PROD}/flipbook/fee-structure/`, newTab: true } },
        {
          text: 'Admission process and guidelines',
          subs: [
            { label: 'Undergraduate', href: `${PROD}/admissions-policy`, newTab: true },
            { label: 'Postgraduate', href: `${PROD}/flipbook/pg-policy/`, newTab: true },
          ],
        },
        { link: { label: 'Fee refund policy', href: `${PROD_WWW}/refundpolicy/` } },
      ],
    },
    {
      title: 'Research',
      entries: [
        {
          link: {
            label: 'Research and Development Cell (including Research and Consultancy Projects, Foreign Collaboration Industry Collaborations)',
            href: '/centre_for_research',
            newTab: true,
          },
        },
        { link: { label: 'Incubation Centre/Start-ups/Entrepreneurship Cell', href: '/advantages/atlas-enterprenurship' } },
      ],
    },
    {
      title: 'Student Life',
      entries: [
        { link: { label: 'Sports facilities', href: '/campus-atlas#sports-facilities', newTab: true } },
        { link: { label: 'NCC/NSS - Details', href: `${DOC}/SFU-letter.pdf`, newTab: true } },
        { text: 'Hostel details : Not Applicable' },
        { link: { label: 'Placement Cell and its activities', href: `${PROD}/placement/` } },
        {
          link: {
            label: 'Details of Student Grievance Redressal Committee (SGRC) and Ombudsperson',
            href: `${PROD_WWW}/mandatory-disclosure/policies/policies11`,
            newTab: true,
          },
        },
        { link: { label: 'Health facilities', href: `${PROD}/green-campus#health-facility`, newTab: true } },
        { link: { label: 'Internal Complaint Committee', href: '/internal-complaint-committee' } },
        { link: { label: 'Anti-Ragging Cell', href: '/anti-ragging-committee' } },
        { link: { label: 'Green Campus', href: '/schools/isdi/campus#campus-green', newTab: true } },
        { link: { label: 'Facilities for differently-abled', href: `${PROD}/green-campus#differently-abled`, newTab: true } },
      ],
    },
    {
      title: 'Alumni',
      entries: [{ link: { label: 'Alumni Association with details', href: '/atlas-alumni-corner' } }],
    },
    {
      title: 'Information Corner',
      entries: [
        {
          text: 'Circulars and Notices',
          subs: [
            { label: 'Holiday List 2025', href: `${DOC}/Schedule-of-Holidays-2025-26.pdf`, newTab: true },
            { label: 'Academic Calender 2025', href: `${DOC}/Academic-Calendar--AY-2025-26.pdf`, newTab: true },
            { label: 'Independance Day 2025', href: `${DOC}/Notice_15th_August_independance_day.pdf`, newTab: true },
            { label: 'Days to be Observed', href: `${DOC}/Days_to_be_observed.pdf`, newTab: true },
          ],
        },
        { link: { label: 'News, Recent events & Achievements', href: `${PROD}/news` } },
        { link: { label: 'Job openings', href: '/job-openings' } },
      ],
    },
    {
      title: 'Picture Gallery',
      entries: [{ link: { label: 'Picture Gallery', href: '/#picture-gallery', newTab: true } }],
    },
    {
      title: 'Contact us',
      entries: [
        {
          link: {
            label: 'Details with Phone Number, Official Email ID and Address, Location map',
            href: '/#contact-details',
            newTab: true,
          },
        },
      ],
    },
  ],
};
