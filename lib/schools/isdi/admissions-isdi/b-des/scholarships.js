/*
* "ATLAS Scholarships" — three `.scholarship-card.bgN.isdi`s. The
 * colour and wash come from the card's own modifier (`.bg1`/`.bg3` pink under `Vector--d`,
 * `.bg2` navy under `Vector`), so both travel as data.
 */
export const isdiAdmBdesScholarships = {
  heading: 'ATLAS Scholarships',
  sub: 'Enabling bright minds to go further.',
  button: {
    label: 'Know more about ATLAS Scholarship',
    href: '/scholarships-and-financial-aid',
    variant: 'pink-cta',
  },
  cards: [
    {
      number: '#1',
      title: 'Merit-Based and Talent Scholarships',
      text: 'ATLAS SkillTech University recognises and rewards exceptional talent and academic excellence through its Merit-Based and\nTalent Scholarships.\n\nWhether you shine in academics, sports, entrepreneurship, or digital skills.',
      background: '#df287b',
      image: '/assets/images/schools/isdi/about/beliefs/vector-d.png',
      position: '100% 100%',
    },
    {
      number: '#2',
      title: 'Give Back to Society Scholarships',
      text: 'Special Category Scholarships at ATLAS SkillTech University honour the unique contributions of educators, defence personnels, and philanthropic donors across the country.\n\nThese scholarships support the children of teachers and armed forces members, etc.',
      background: '#103380',
      image: '/assets/images/schools/isdi/programs/pss/summer-school/highlights/vector.png',
      position: '50% 100%',
    },
    {
      number: '#3',
      title: 'Need-Based and Support Scholarships',
      text: 'Our Need-Based and Support Scholarships are committed to making quality education accessible to deserving students, regardless of their financial background.\n\nATLAS SkillTech University offers tuition fee waivers, interest-free loan support.',
      background: '#df287b',
      image: '/assets/images/schools/isdi/about/beliefs/vector-d.png',
      position: '100% 100%',
    },
  ],
};
