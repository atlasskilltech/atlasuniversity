/**
 * ISME homepage — "What Makes ATLAS ISME Different? Everything." (reference/schools/isme/index.php,
 * the first `div.section` after the outcomes stack). Card copy is transcribed as authored: a string
 * is text (`\n` = an authored <br>), `{ strong }` is a <strong> run. All nine photographs and the
 * card vector are byte-identical to /advantages/atlas-advantages' and are reused.
 */
const C = '/assets/images/advantages/core';

export const ismeDifferent = {
  heading: 'What Makes ATLAS ISME Different? Everything.',
  sub: 'Everything about ATLAS is designed to mirror the real world — from Mumbai’s location advantage to CXO-led learning, global immersions, and a startup-powered culture.',
  button: { label: 'Join ATLAS ISME', href: 'https://atlasuniversity.edu.in/applicationform', variant: 'mint' },
  background: '/assets/images/advantages/css/cool-shape-vector.png',
  cards: [
    {
      number: '#1',
      title: 'Located in the heart of Mumbai’s business district',
      text: ['With 500+ companies and Mumbai’s business pulse all around Global names like Netflix, Google, Amazon, and Deloitte—opportunity doesn’t knock, it’s already\nnext door.'],
      image: `${C}/core-bg-img.png`,
    },
    {
      number: '#2',
      title: 'Industry-Led Curriculum',
      text: [{ strong: 'Classes taught by real business leaders. ' }, 'Bridging the gap between academics and the real world through hands-on projects, expert-led sessions, and immersive industry exposure.'],
      image: `${C}/core-bg-img-2.png`,
    },
    {
      number: '#3',
      title: 'Entrepreneurial Ecosystem',
      text: [{ strong: 'Launch your venture from day one.' }, ' \nWe believe college life should be a blend of purpose, play, and personal growth. From taking the stage to leading a cause, from late-night brainstorming to spontaneous celebrations — every experience shapes who you become.'],
      image: `${C}/core-bg-img-3.png`,
    },
    {
      number: '#4',
      title: 'Hands-on Learning\n',
      rows: [
        { label: [{ strong: 'From pitch decks to prototypes.' }] },
        { value: '1200+ ', label: [' On Campus Interviews'] },
        { value: '100+ ', label: [' Where Student Work'] },
        { value: '50+ ', label: [' Recruiters On Campus '] },
      ],
      image: `${C}/hands-on-learning.png`,
    },
    {
      number: '#5',
      title: 'New Age Tech-led Infrastructure',
      text: [{ strong: 'Boardroom-style classrooms, coworking vibes. ' }, 'Our campus is designed for the future, equipped with advanced multimedia systems to make learning dynamic and engaging.'],
      image: `${C}/core-bg-img-8.png`,
    },
    {
      number: '#6',
      title: 'Deeply Student-Centric',
      text: ['Every aspect of the ATLAS ISME experience is designed with the student at its core.'],
      image: `${C}/core-bg-img-6.png`,
    },
    {
      number: '#7',
      title: 'Multidisciplinary Electives',
      text: [{ strong: 'Choose from 45+ courses across fields.' }, ' \nATLAS ISME empowers you to shape your own journey with flexible specializations, dual majors, and personalized career tracks.'],
      image: `${C}/7-inter-elec.png`,
    },
    {
      number: '#8',
      title: 'Career Support\nfrom Day One',
      text: [{ strong: 'Placement, Mentorship & Real Outcomes. ' }, 'Research and Development Cell, is a dynamic and vibrant platform within our university that empowers students.'],
      image: `${C}/7-career-serv.png`,
    },
    {
      number: '#9',
      title: 'Global Exposure',
      text: [{ strong: '60+ University MoUs. Study Worldwide.' }, '\nWe believe that learning goes beyond borders, which is why we actively immerse students in international experiences that shape their worldviews.'],
      image: `${C}/core-bg-img-4.png`,
    },
  ],
};
