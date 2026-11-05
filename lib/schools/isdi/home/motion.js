import { IMG } from './paths';

const S = `${IMG}/slider`;

/*
 * 12. ISDI in Motion — index.php:3024-3127, in authored order (a commented-out
 * duplicate "Studio Day" is skipped). Titles and alt text as authored, including
 * the trailing space in "Masterclasses " and "Alumini"/"Isde".
 */
export const isdiMotion = {
  heading: 'ISDI in Motion',
  sub: 'Classroom breakthroughs to campus buzz',
  cards: [
    { title: 'Studio Day', image: `${S}/isdi-motion-2.webp`, alt: 'Students at a studio art' },
    { title: 'Portfolio Reviews', image: `${S}/isdi-motion-1.webp`, alt: 'Student presenting a brand strategy project in design class' },
    { title: 'Design Hackathon', image: `${S}/isdi-motion-3.webp`, alt: 'Students discussing in a design hackathon' },
    { title: 'Masterclasses ', image: `${S}/isdi-motion-4.webp`, alt: 'Students showing project at a masterclass' },
    { title: 'Alumni Talks', image: `${S}/isdi-motion-5.webp`, alt: 'Alumini talks at Atlas Isde school' },
    { title: 'Fashion Show', image: `${S}/isdi-motion-6.webp`, alt: 'Students discussing in a design hackathon' },
    { title: 'Portfolio Reviews', image: `${S}/isdi-motion-1.webp`, alt: 'Student presenting a brand strategy project in design class' },
    { title: 'Craft Collaborations - ABCD', image: `${S}/Craft-Collaborations.webp`, alt: 'Atlas design school students presenting woodcraft work to faculty and visitors' },
    { title: 'Masterclasses ', image: `${S}/isdi-motion-4.webp`, alt: 'Students showing project at a masterclass' },
    { title: 'Alumni Talks', image: `${S}/isdi-motion-5.webp`, alt: 'Alumini talks at Atlas Isde school' },
    { title: 'Fashion Show', image: `${S}/isdi-motion-6.webp`, alt: 'Students discussing in a design hackathon' },
    { title: 'Artisan Engagements - Hands of heritage', image: `${S}/motion-new-1.webp`, alt: 'Student hand-painting a traditional art motif in an ISDI design studio' },
    { title: 'Local Immersion', image: `${S}/motion-new-2.webp`, alt: 'ISDI design school students on a heritage study tour at an ancient temple' },
    { title: 'Global Immersion', image: `${S}/motion-new-3.webp`, alt: 'ISDI design school students on a global immersion trip in China' },
    { title: 'Skill-up workshops', image: `${S}/motion-new-4.webp`, alt: 'ISDI faculty delivering a lecture to students' },
    { title: 'Craft Collaborations - ABCD', image: `${S}/craft-collabration.webp`, alt: 'Atlas design school students presenting woodcraft work to faculty and visitors' },
    { title: 'Industry Projects', image: `${S}/industry-projects.webp`, alt: 'Atlas isdi student in front of digital impact' },
  ],
};
