/*
 * Recognition that reflects our commitment — about-us/index.php:161-208. Webflow
 * tabs (`data-current="Tab 4"`, fade in 300ms / out 100ms), in authored order.
 * The four panes are three layouts; `pane.kind` picks one.
 */
export const isdiAboutRecognition = {
  heading: 'Recognition that reflects our commitment',
  sub: 'Recognitions & Affiliations',
  current: 0,
  overlay: '/assets/images/schools/isdi/about/recognition/naac-accredited-1.png',
  tabs: [
    {
      label: 'NAAC Accreditation',
      currentWeight: 500,
      smallText: false,
      pane: {
        kind: 'naac',
        award: {
          src: '/assets/images/schools/isdi/about/recognition/naac-award-isdi.png',
          width: 354,
          height: 139,
          alt: '',
        },
        text: 'India’s Youngest \nUniversity to Recieve \nNAAC Accreditation',
        image: {
          src: '/assets/images/about/recognition/naac-accredited.png',
          width: 1238,
          height: 574,
          alt: '',
          srcSet:
            '/assets/images/about/recognition/naac-accredited-p-500.png 500w, /assets/images/about/recognition/naac-accredited-p-800.png 800w, /assets/images/about/recognition/naac-accredited-p-1080.png 1080w, /assets/images/about/recognition/naac-accredited.png 1238w',
          sizes: '(max-width: 1238px) 100vw, 1238px',
        },
      },
    },
    {
      label: 'MoU’s',
      currentWeight: 500,
      smallText: true,
      pane: {
        kind: 'mou',
        text: 'ATLAS SkillTech University signs Memorandums of Understanding (MoUs) to foster academic collaboration, student exchange, research opportunities, and global exposure.',
        logos: [
          {
            src: '/assets/images/about/recognition/mou-logo-1.png',
            width: 47,
            height: 48,
            alt: '',
          },
          {
            src: '/assets/images/about/recognition/mou-logo-2.png',
            width: 111,
            height: 45,
            alt: '',
          },
          {
            src: '/assets/images/about/recognition/mou-logo-3.png',
            width: 160,
            height: 48,
            alt: '',
          },
          {
            src: '/assets/images/about/recognition/mou-logo-4.png',
            width: 133,
            height: 48,
            alt: '',
          },
          {
            src: '/assets/images/about/recognition/mou-logo-5.png',
            width: 156,
            height: 46,
            alt: '',
          },
          {
            src: '/assets/images/about/recognition/mou-logo-6.png',
            width: 56,
            height: 49,
            alt: '',
          },
          {
            src: '/assets/images/about/recognition/uni_logo_bath_1280_510-e1535972281573-1-1.png',
            width: 112,
            height: 45,
            alt: '',
          },
          {
            src: '/assets/images/about/recognition/rmit_university_logo-1-1.png',
            width: 121,
            height: 45,
            alt: '',
          },
          {
            src: '/assets/images/about/recognition/griffith_university_logo_variant_2022.svg-1-1.png',
            width: 48,
            height: 45,
            alt: '',
          },
          {
            src: '/assets/images/about/recognition/group-1272631427.png',
            width: 144,
            height: 53,
            alt: '',
          },
          {
            src: '/assets/images/about/recognition/d280023b-a34c-4ace-8ee2-0a50cb0c48d5-1-1.png',
            width: 137,
            height: 45,
            alt: '',
          },
          {
            src: '/assets/images/about/recognition/sheffield-1.png',
            width: 124,
            height: 45,
            alt: '',
          },
        ],
        image: {
          src: '/assets/images/about/recognition/mou-image.webp',
          width: 1024,
          height: 683,
          alt: '',
          srcSet:
            '/assets/images/about/recognition/mou-image-p-500.webp 500w, /assets/images/about/recognition/mou-image-p-800.webp 800w, /assets/images/about/recognition/mou-image.webp 1024w',
          sizes: '100vw',
        },
      },
    },
    {
      label: 'UGC Recognition',
      currentWeight: 500,
      smallText: true,
      pane: {
        kind: 'ugc',
        image: {
          src: '/assets/images/about/recognition/ugc-recog-img.png',
          width: 1238,
          height: 574,
          alt: '',
          srcSet:
            '/assets/images/about/recognition/ugc-recog-img-p-500.png 500w, /assets/images/about/recognition/ugc-recog-img-p-800.png 800w, /assets/images/about/recognition/ugc-recog-img-p-1080.png 1080w, /assets/images/about/recognition/ugc-recog-img.png 1238w',
          sizes: '100vw',
        },
        logo: {
          src: '/assets/images/about/recognition/uni-grant-commision.png',
          width: 154,
          height: 161,
          alt: '',
        },
        text: "ATLAS SkillTech University, established in 2021 under the Maharashtra Act No. XV, has been officially recognized by the University Grants Commission (UGC) under Section 2(f) of the UGC Act, 1956 . This recognition affirms the university's compliance with national higher education standards.",
      },
    },
    {
      label: 'Member of AIU',
      currentWeight: 400,
      smallText: true,
      pane: {
        kind: 'aiu',
        logo: {
          src: '/assets/images/about/recognition/logo-for-third-tab.png',
          width: 158,
          height: 158,
          alt: '',
        },
        text: 'ATLAS SkillTech University is a proud member of the Association of Indian Universities (AIU), a key national body that ensures academic credibility and degree equivalence across India and abroad.',
        image: {
          src: '/assets/images/about/recognition/member-aiu-img.png',
          width: 1238,
          height: 574,
          alt: '',
          srcSet:
            '/assets/images/about/recognition/member-aiu-img-p-500.png 500w, /assets/images/about/recognition/member-aiu-img-p-800.png 800w, /assets/images/about/recognition/member-aiu-img-p-1080.png 1080w, /assets/images/about/recognition/member-aiu-img.png 1238w',
          sizes: '100vw',
        },
      },
    },
  ],
};
