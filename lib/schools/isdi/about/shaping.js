/*
 * Shaping a Viksit Bharat, Together — about-us/index.php:77-160. `variant` is each
 * card's `data-wf--content-card-b--variant`; `background` its `card-cnt-bgcolor`,
 * which the inline script paints (its `data-card-cint-b-bg` is never set, so the
 * image layer is `url(null)` and only the colour shows).
 */
export const isdiAboutShaping = {
  heading: 'Shaping a Viksit Bharat, Together',
  sub: 'Social Impact That Aligns With India’s Vision 2047',
  cards: [
    {
      variant: 'pink-top',
      background: '#DF287B',
      title: 'Empowering Youth through Skill Development',
      text: 'ATLAS ISDI’s student-led initiative, Rover Angels, is empowering schoolgirls to explore science, technology, engineering, and mathematics through engaging workshops and hands-on learning. By making STEM education more accessible and inspiring,',
      image: {
        src: '/assets/images/about/shaping/shaping-img-1.webp',
        width: 683,
        height: 479,
        alt: '',
        srcSet:
          '/assets/images/about/shaping/shaping-img-1-p-500.webp 500w, /assets/images/about/shaping/shaping-img-1.webp 683w',
        sizes: '100vw',
      },
    },
    {
      variant: 'switch-isdi',
      background: '#193e90',
      title: 'Promoting Inclusive and Quality Education',
      text: 'Aligned with the National Education Policy (NEP) 2020, ATLAS ISDI emphasizes an inclusive education model that caters to students from diverse socio-economic backgrounds.',
      image: {
        src: '/assets/images/about/shaping/shaping-img-2.png',
        width: 683,
        height: 482,
        alt: '',
        srcSet:
          '/assets/images/about/shaping/shaping-img-2-p-500.png 500w, /assets/images/about/shaping/shaping-img-2.png 683w',
        sizes: '100vw',
      },
    },
    {
      variant: 'default',
      background: '#DF287B',
      title: 'Supporting Sustainable Development Goals',
      text: 'ATLAS ISDI integrates sustainability and social responsibility into its curriculum and community outreach, supporting goals such as Quality Education, Decent Work and Economic Growth, and Reduced Inequalities, which align with India’s commitments under the UN SDGs.',
      image: {
        src: '/assets/images/about/shaping/shaping-img-3.png',
        width: 684,
        height: 482,
        alt: '',
        srcSet:
          '/assets/images/about/shaping/shaping-img-3-p-500.png 500w, /assets/images/about/shaping/shaping-img-3.png 684w',
        sizes: '100vw',
      },
    },
    {
      variant: 'bottom-switch',
      background: '#193E90',
      title: 'Advancing Holistic Education',
      text: 'Team MUSHAK’s NASA journey reflects ATLAS’s vision of education that blends innovation, design, and impact. As India’s first team in the HERC RC Division, their 5th place finish and Social Media Award highlight how interdisciplinary learning and community outreach can drive real-world change and inspire future-ready minds.',
      image: {
        src: '/assets/images/about/shaping/shaping-img-4.png',
        width: 683,
        height: 480,
        alt: '',
        srcSet:
          '/assets/images/about/shaping/shaping-img-4-p-500.png 500w, /assets/images/about/shaping/shaping-img-4.png 683w',
        sizes: '100vw',
      },
    },
  ],
};
