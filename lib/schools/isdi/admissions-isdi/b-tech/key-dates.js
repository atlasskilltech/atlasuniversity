/*
* "Key Dates & Deadlines" — one Bootstrap table in the ATLAS
 * `.df-container-atlas` frame, with a `.buttons-wrapper` under it.
 *
 * The table is the B.Des one with two changes: the caption names B.Tech (authored
 * with a LEADING SPACE inside its `<strong>`), and the fourth row reads "Technical
 * Aptitude Test" where B.Des reads "Design Aptitude Test & Portfolio" — and it
 * carries no `<br class="br">`, so that row stays one line at every width.
 * The button's label spells the programme "B.tech", which is what upstream prints.
 */
export const isdiAdmBtechKeyDates = {
  heading: 'Key Dates & Deadlines',
  /* `keydates/bdes-btech.php` authors no `<br><br>` after the button row where
     `keydates/bdes.php` does — 48px of block height at every width */
  trailingBreaks: false,
  rows: [
    {
      height: 33,
      cells: [
        {
          runs: [
            ' B.Tech Admissions Calendar for July 2027 Intake',
          ],
          text: ' B.Tech Admissions Calendar for July 2027 Intake',
          header: true,
          align: 'center',
          colspan: 2,
        },
      ],
    },
    {
      height: 33,
      cells: [
        {
          runs: [
            'Cycle',
          ],
          text: 'Cycle',
          bold: true,
          align: 'left',
        },
        {
          runs: [
            'Cycle 1',
          ],
          text: 'Cycle 1',
          bold: true,
          align: 'center',
        },
      ],
    },
    {
      height: 33,
      cells: [
        {
          /*
           * ref `<b>Applications <br class="br"> Opened</b> <b>(11<sup>th</sup> Sep 2026)</b>`
           * — TWO bold groups in one cell. The include's recolouring script tests each
           * `td b` on its own text, and "(11th Sep 2026)" matches its
           * `<day><suffix> <Month> <year>` pattern, so only the second group is green.
           */
          groups: [
            {
              runs: [
                'Applications ',
                {
                  br: true,
                },
                ' Opened',
              ],
              bold: true,
            },
            {
              runs: [
                ' (11',
                {
                  sup: 'th',
                },
                ' Sep 2026)',
              ],
              bold: true,
              tone: 'green',
            },
          ],
          text: 'Applications\nOpened (11th Sep 2026)',
          align: 'left',
        },
        {
          runs: [
            ' Applications Open ',
          ],
          text: 'Applications Open',
          bold: true,
          tone: 'green',
          align: 'center',
        },
      ],
    },
    {
      height: 64,
      cells: [
        {
          runs: [
            'Technical Aptitude Test ',
          ],
          text: 'Technical Aptitude Test',
          bold: true,
          align: 'left',
        },
        {
          runs: [
            '11',
            {
              sup: 'th',
            },
            ' Sep to 24',
            {
              sup: 'th',
            },
            ' Oct 2026',
          ],
          text: '11th Sep to 24th Oct 2026',
          bold: true,
          tone: 'green',
          align: 'center',
        },
      ],
    },
    {
      height: 33,
      cells: [
        {
          runs: [
            'Personal ',
            {
              br: true,
            },
            'Interview ',
          ],
          text: 'Personal\nInterview',
          bold: true,
          align: 'left',
        },
        {
          runs: [
            '26',
            {
              sup: 'th',
            },
            ' Oct to 27',
            {
              sup: 'th',
            },
            ' Nov 2026',
          ],
          text: '26th Oct to 27th Nov 2026',
          bold: true,
          tone: 'green',
          align: 'center',
        },
      ],
    },
    {
      height: 33,
      cells: [
        {
          runs: [
            'Result ',
            {
              br: true,
            },
            'Announcement',
          ],
          text: 'Result\nAnnouncement',
          bold: true,
          align: 'left',
        },
        {
          runs: [
            '10',
            {
              sup: 'th',
            },
            ' Dec 2026',
          ],
          text: '10th Dec 2026',
          bold: true,
          tone: 'green',
          align: 'center',
        },
      ],
    },
    {
      height: 33,
      cells: [
        {
          runs: [
            'Acceptance ',
            {
              br: true,
            },
            'Deadline',
          ],
          text: 'Acceptance\nDeadline',
          bold: true,
          align: 'left',
        },
        {
          runs: [
            '15',
            {
              sup: 'th',
            },
            ' Jan 2027',
          ],
          text: '15th Jan 2027',
          bold: true,
          tone: 'green',
          align: 'center',
        },
      ],
    },
    {
      height: 64,
      cells: [
        {
          runs: [
            'Semester Fee',
            {
              br: true,
            },
            ' Payment Deadline',
          ],
          text: 'Semester Fee\nPayment Deadline',
          bold: true,
          align: 'left',
        },
        {
          runs: [
            '31',
            {
              sup: 'st',
            },
            ' May 2027',
          ],
          text: '31st May 2027',
          bold: true,
          tone: 'green',
          align: 'center',
        },
      ],
    },
  ],
  buttons: [
    {
      label: 'Learn More About B.tech Admissions',
      /*
       * The reference authors `.../schools/isdi/schools/isdi/admissions/undergraduate/b-tech`
       * — the site path doubled, because an absolute URL was typed into a field the
       * template already prefixes with `$domain`. Production answers 200 on it but serves
       * the ATLAS HOMEPAGE, not this page: a catch-all soft-404 (verified — the response is
       * byte-for-byte the homepage apart from its echoed canonical, and contains no "Key
       * Dates"). Reproducing it would ship a button whose label promises B.Des admissions
       * and lands the visitor on the homepage, so the authored intent — `$domain` +
       * `admissions/undergraduate/b-des`, i.e. this page — is what the port links to.
       */
      href: '/schools/isdi/admissions/undergraduate/b-tech',
      /* ref .btn-primary:where(.w-variant-9df390f6-…) — #02b3c3 with black text, NOT the
         base #d20158 pill the hero uses */
      variant: 'atlas',
    },
  ],
};
