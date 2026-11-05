/**
 * ISME homepage — "The People Who Know Us Best" (reference/schools/isme/index.php,
 * `.swiper.common-swiper-full > 4 x .testimonial-card.bgc1`). Each card is a looping muted
 * background video beside the quote, with a play icon that opens the YouTube film in the shared
 * VideoModal (`data-video`). The fourth card uses the plain quote glyph where the others use the
 * mint one — authored that way. The clips are this page's own files, byte-for-byte.
 */
export const ismePeople = {
  heading: 'The People Who Know Us Best',
  sub: 'Don’t take our word for it — hear what our students and parents have to say about their ATLAS journey, experience, and transformation.',
  bgImage: '/assets/images/schools/isdi/internationalisation/events/student-cd-bg.png',
  cards: [
    {
      text: 'The campus is safe, the people are supportive, & being in BKC just adds to the peace of mind. I know my daughter’s happy here.',
      name: 'Shweta Shingre',
      role: 'Parent\nGoa',
      quoteIcon: '/assets/images/schools/isme/home/people/quote-mint.svg',
      video: {
        poster:
          '/assets/images/schools/isme/home/people/shweta-shingre-parents-testimonials-poster-00001.jpg',
        sources: [
          {
            src: '/assets/videos/schools/isme/home/people/shweta-shingre-parents-testimonials-transcode.mp4',
            type: 'video/mp4',
          },
          {
            src: '/assets/videos/schools/isme/home/people/shweta-shingre-parents-testimonials-transcode.webm',
            type: 'video/webm',
          },
        ],
      },
      play: {
        url: 'https://www.youtube.com/watch?v=M-_ag4rHia0&list=PLlLPSlAVUtBpTSKKrBkFsR0QQ2YnmdgqL&index=2',
        icon: '/assets/images/schools/isme/home/advisory/play-button-isme.png',
      },
    },
    {
      text: 'Moving to Mumbai felt overwhelming at first, but with all support provided by ISME, the transition was surprisingly smooth',
      name: 'Diya',
      role: '2nd Year\nKolkata',
      quoteIcon: '/assets/images/schools/isme/home/people/quote-mint.svg',
      video: {
        poster: '/assets/images/schools/isme/home/people/kolkata-student-testimonials-poster-00001.jpg',
        sources: [
          {
            src: '/assets/videos/schools/isme/home/people/kolkata-student-testimonials-transcode.mp4',
            type: 'video/mp4',
          },
          {
            src: '/assets/videos/schools/isme/home/people/kolkata-student-testimonials-transcode.webm',
            type: 'video/webm',
          },
        ],
      },
      play: {
        url: 'https://www.youtube.com/watch?v=UulmDjKJQUo&list=PLlLPSlAVUtBpTSKKrBkFsR0QQ2YnmdgqL&index=3',
        icon: '/assets/images/schools/isme/home/advisory/play-button-isme.png',
      },
    },
    {
      text: 'The fact that he’s already working on real industry projects while still in college makes me feel like he’s headed in the right direction.',
      name: 'Utsav Pandey',
      role: 'Parent\nDelhi',
      quoteIcon: '/assets/images/schools/isme/home/people/quote-mint.svg',
      video: {
        poster: '/assets/images/schools/isme/home/people/utsav-pandey-parents-testimonials-poster-00001.jpg',
        sources: [
          {
            src: '/assets/videos/schools/isme/home/people/utsav-pandey-parents-testimonials-transcode.mp4',
            type: 'video/mp4',
          },
          {
            src: '/assets/videos/schools/isme/home/people/utsav-pandey-parents-testimonials-transcode.webm',
            type: 'video/webm',
          },
        ],
      },
      play: {
        url: 'https://www.youtube.com/watch?v=jmyvHk5k-ZQ&list=PLlLPSlAVUtBpTSKKrBkFsR0QQ2YnmdgqL&index=4',
        icon: '/assets/images/schools/isme/home/advisory/play-button-isme.png',
      },
    },
    {
      text: 'I’m so happy and satisfied. The faculty, staff, food, culture - everything is amazing. As a mother, I think my child is getting the best here.',
      name: 'Varsha Sharma',
      role: 'Parent',
      quoteIcon: '/assets/images/leadership-team/quote-icon.svg',
      video: {
        poster: '/assets/images/schools/isme/home/people/varsha-sharma-parents-testimonials-poster-00001.jpg',
        sources: [
          {
            src: '/assets/videos/schools/isme/home/people/varsha-sharma-parents-testimonials-transcode.mp4',
            type: 'video/mp4',
          },
          {
            src: '/assets/videos/schools/isme/home/people/varsha-sharma-parents-testimonials-transcode.webm',
            type: 'video/webm',
          },
        ],
      },
      play: {
        url: 'https://www.youtube.com/watch?v=9RQBN7kYPaY&list=PLlLPSlAVUtBpTSKKrBkFsR0QQ2YnmdgqL&index=1',
        icon: '/assets/images/schools/isme/home/advisory/play-button-isme.png',
      },
    },
  ],
};
