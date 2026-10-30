/*
 * Data for the ISDI homepage '19 programmes. Five worlds.' section + its PathFinder quiz
 * (reference/schools/isdi/assets/include/19-programmesv2.php, the include that replaced the old
 * 'Our Programs' section). Transcribed verbatim from the reference <script>: five worlds (19
 * programmes linking to the built programme pages), the 16 interests + 10 dreams, their score
 * matrices and the per-programme score profiles.
 */
export const worlds = [
        {
          number: "01",
          title: "Design + Product and Technology",
          description: "Build intelligent products, tools and systems.",
          row: 1,
          columns: 1,
          color: "#0011c2",
          wide: false,
          programmes: [
            {
              id: "product-design",
              name: "Product Design",
              degree: "B.Des",
              duration: "4 Years",
              url: "https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/b-des/b-des-in-product-design"
            },
            {
              id: "design-engineering",
              name: "Design Engineering",
              degree: "B.Tech",
              duration: "4 Years",
              url: "https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/btech/btech-design-engineering"
            },
            {
              id: "ai-engineering",
              name: "AI Engineering & Intelligent Products",
              degree: "B.Tech",
              duration: "4 Years",
              url: "https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/btech/btech-ai-integrated-design"
            }
          ]
        },
        {
          number: "02",
          title: "Design + Fashion and Commerce",
          description: "Shape fashion, identity and creative commerce.",
          row: 1,
          columns: 2,
          color: "#911151",
          wide: true,
          programmes: [
            {
              id: "fashion-design-technology",
              name: "Fashion Design & Technology",
              degree: "B.Des",
              duration: "4 Years",
              url: "https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/b-des/b-des-in-fashion-design-&-technology"
            },
            {
              id: "fashion-communication-styling",
              name: "Fashion Communication and Styling",
              degree: "B.Des",
              duration: "4 Years",
              url: "https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/b-des/b-des-in-fashion-communication-&-styling"
            },
            {
              id: "fashion-brand-management",
              name: "Fashion Brand Management",
              degree: "B.Des",
              duration: "4 Years",
              url: "https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/b-des/fashion-brand-management"
            },
            {
              id: "luxury-brand-strategy",
              name: "Luxury Brand Strategy",
              degree: "B.Des",
              duration: "4 Years",
              url: "https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/b-des/luxury-brand-strategy-&-experience-design"
            },
            {
              id: "accessory-design-craft",
              name: "Accessory Design & Craft",
              degree: "B.Des",
              duration: "4 Years",
              url: "https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/b-des/accessory-design-&-craft"
            }
          ]
        },
        {
          number: "03",
          title: "Design + Communication and Media",
          description: "Create stories, media and immersive experiences.",
          row: 1,
          columns: 1,
          color: "#883994",
          wide: false,
          programmes: [
            {
              id: "communication-design-new-media",
              name: "Communication Design & New Media",
              degree: "B.Des",
              duration: "4 Years",
              url: "https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/b-des/b-des-in-communication-design-&-new-media"
            },
            {
              id: "animation-vfx-gaming",
              name: "Animation, VFX and Gaming",
              degree: "B.Des",
              duration: "4 Years",
              url: "https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/b-des/b-des-in-animation-&-vfx-&-gaming"
            },
            {
              id: "design-futures",
              name: "Design Futures",
              degree: "M.Des",
              duration: "2 Years",
              url: "https://atlasuniversity.edu.in/schools/isdi/programs/postgraduate/mdes/design-futures-2-years"
            }
          ]
        },
        {
          number: "04",
          title: "Design + Space and Environment",
          description: "Shape interiors, spatial experiences and the environments around us.",
          descriptionNarrow: true, /* keeps the line break seen in the design */
          row: 2,
          columns: 1,
          color: "#bc3fde",
          wide: false,
          programmes: [
            {
              id: "interior-design-built-environment",
              name: "Interior Design & Built Environment",
              degree: "B.Des",
              duration: "4 Years",
              url: "https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/b-des/b-des-in-interior-design-&-built-environment"
            },
            {
              id: "interior-styling-spatial-curation",
              name: "Interior Styling & Spatial Curation",
              degree: "PG Diploma",
              duration: "1 Year",
              url: "https://atlasuniversity.edu.in/schools/isdi/programs/postgraduate-diploma/pg-interior-styling-&-space-curation"
            }
          ]
        },
        {
          number: "05",
          title: "Design + Business and Entrepreneurship",
          description: "Turn creative thinking into strategy, services and ventures.",
          row: 2,
          columns: 2,
          color: "#40aab9",
          wide: false,
          programmes: [
            {
              id: "strategic-design-innovation-management",
              name: "Strategic Design & Innovation Management",
              degree: "B.Des",
              duration: "4 Years",
              url: "https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/b-des/b-des-in-strategic-design-&-innovation-management"
            },
            {
              id: "service-experience-design",
              name: "Service & Experience Design",
              degree: "B.Des",
              duration: "4 Years",
              url: "https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/b-des/service-&-experience-design"
            },
            {
              id: "health-care-design",
              name: "Health & Care Design",
              degree: "B.Des",
              duration: "4 Years",
              url: "https://atlasuniversity.edu.in/schools/isdi/programs/undergraduate/b-des/health-care-design"
            },
            {
              id: "design-management-strategy",
              name: "Design Management and Strategy",
              degree: "MBA",
              duration: "2 Years",
              url: "https://atlasuniversity.edu.in/schools/isdi/programs/postgraduate/mba/mba-design-led-strategy-&-transformation"
            },
            {
              id: "event-experience-design",
              name: "Event & Experience Design",
              degree: "MBA",
              duration: "2 Years",
              url: "https://atlasuniversity.edu.in/schools/isdi/programs/postgraduate/mba/mba-in-event-&-experience-design"
            },
            {
              id: "creative-entrepreneurship",
              name: "Creative Entrepreneurship",
              degree: "PG Diploma",
              duration: "1 Year",
              url: "https://atlasuniversity.edu.in/schools/isdi/programs/postgraduate-diploma/mba-creative-entrepreneurship"
            }
          ]
        }
      ];

      /* =====================================================================
         QUIZ DATA
         Step 1 = interests, Step 2 = dreams. Exactly 3 picks in each step.
         ===================================================================== */
export const REQUIRED_SELECTIONS = 3;
export const DRUMROLL_DURATION = 2500; /* ms the drumroll loader is shown */
export const interests = [
        { id: 1, text: "Making art & craft" },
        { id: 2, text: "Scrolling through Instagram & Pinterest" },
        { id: 3, text: "Mixing bold outfits" },
        { id: 4, text: "Selling my work" },
        { id: 5, text: "Building things from scratch" },
        { id: 6, text: "Playing video games" },
        { id: 7, text: "Rearranging my room from time to time" },
        { id: 8, text: "Experimenting with makeup and fashion" },
        { id: 9, text: "Tinkering with apps and gadgets" },
        { id: 10, text: "Telling stories" },
        { id: 11, text: "Daydreaming design ideas" },
        { id: 12, text: "Editing fun reels" },
        { id: 13, text: "Capturing candid moments" },
        { id: 14, text: "Flipping through fashion mags" },
        { id: 15, text: "Doodling in the margins" },
        { id: 16, text: "Curating mood boards" }
      ];
export const dreams = [
        { id: 1, text: "Push boundaries of fashion" },
        { id: 2, text: "Be part of creative magic in media" },
        { id: 3, text: "Make fashion more sustainable & cool" },
        { id: 4, text: "Invent cool products people need" },
        { id: 5, text: "Start my own brand or company" },
        { id: 6, text: "Work on projects that feel different" },
        { id: 7, text: "Design with a purpose" },
        { id: 8, text: "Bring characters & worlds to life" },
        { id: 9, text: "Create campaigns that stop scrolling" },
        { id: 10, text: "Design magazine-worthy spaces" }
      ];

      /* Interest score matrix - unchanged. Each option gives 0-3 points to the 7 score keys. */
export const interestMatrix = {
        1: { fashionDesign: 2, fashionComm: 1, commDesign: 2, productDesign: 2, interiorDesign: 1, strategicDesign: 1, animationVFX: 1 },
        2: { fashionDesign: 1, fashionComm: 3, commDesign: 2, productDesign: 0, interiorDesign: 1, strategicDesign: 1, animationVFX: 2 },
        3: { fashionDesign: 3, fashionComm: 3, commDesign: 1, productDesign: 0, interiorDesign: 0, strategicDesign: 0, animationVFX: 2 },
        4: { fashionDesign: 1, fashionComm: 2, commDesign: 2, productDesign: 2, interiorDesign: 1, strategicDesign: 3, animationVFX: 1 },
        5: { fashionDesign: 1, fashionComm: 0, commDesign: 1, productDesign: 3, interiorDesign: 3, strategicDesign: 2, animationVFX: 1 },
        6: { fashionDesign: 0, fashionComm: 1, commDesign: 3, productDesign: 2, interiorDesign: 0, strategicDesign: 1, animationVFX: 3 },
        7: { fashionDesign: 0, fashionComm: 0, commDesign: 1, productDesign: 1, interiorDesign: 3, strategicDesign: 1, animationVFX: 0 },
        8: { fashionDesign: 3, fashionComm: 3, commDesign: 1, productDesign: 0, interiorDesign: 0, strategicDesign: 0, animationVFX: 1 },
        9: { fashionDesign: 0, fashionComm: 0, commDesign: 3, productDesign: 2, interiorDesign: 0, strategicDesign: 2, animationVFX: 2 },
        10: { fashionDesign: 1, fashionComm: 3, commDesign: 3, productDesign: 0, interiorDesign: 0, strategicDesign: 2, animationVFX: 3 },
        11: { fashionDesign: 1, fashionComm: 2, commDesign: 2, productDesign: 2, interiorDesign: 2, strategicDesign: 1, animationVFX: 1 },
        12: { fashionDesign: 0, fashionComm: 3, commDesign: 3, productDesign: 0, interiorDesign: 0, strategicDesign: 1, animationVFX: 1 },
        13: { fashionDesign: 1, fashionComm: 3, commDesign: 2, productDesign: 0, interiorDesign: 0, strategicDesign: 1, animationVFX: 2 },
        14: { fashionDesign: 3, fashionComm: 3, commDesign: 2, productDesign: 0, interiorDesign: 0, strategicDesign: 0, animationVFX: 0 },
        15: { fashionDesign: 2, fashionComm: 2, commDesign: 3, productDesign: 1, interiorDesign: 0, strategicDesign: 1, animationVFX: 3 },
        16: { fashionDesign: 1, fashionComm: 3, commDesign: 2, productDesign: 1, interiorDesign: 1, strategicDesign: 1, animationVFX: 1 }
      };

      /* Dream score matrix - unchanged. */
export const dreamMatrix = {
        1: { fashionDesign: 3, fashionComm: 3, commDesign: 1, productDesign: 0, interiorDesign: 0, strategicDesign: 0, animationVFX: 0 },
        2: { fashionDesign: 1, fashionComm: 3, commDesign: 3, productDesign: 0, interiorDesign: 0, strategicDesign: 1, animationVFX: 3 },
        3: { fashionDesign: 3, fashionComm: 3, commDesign: 1, productDesign: 0, interiorDesign: 0, strategicDesign: 2, animationVFX: 0 },
        4: { fashionDesign: 0, fashionComm: 0, commDesign: 1, productDesign: 3, interiorDesign: 1, strategicDesign: 2, animationVFX: 0 },
        5: { fashionDesign: 2, fashionComm: 2, commDesign: 2, productDesign: 2, interiorDesign: 1, strategicDesign: 3, animationVFX: 0 },
        6: { fashionDesign: 1, fashionComm: 2, commDesign: 2, productDesign: 2, interiorDesign: 1, strategicDesign: 3, animationVFX: 3 },
        7: { fashionDesign: 2, fashionComm: 2, commDesign: 2, productDesign: 2, interiorDesign: 2, strategicDesign: 3, animationVFX: 1 },
        8: { fashionDesign: 0, fashionComm: 2, commDesign: 3, productDesign: 1, interiorDesign: 0, strategicDesign: 1, animationVFX: 3 },
        9: { fashionDesign: 1, fashionComm: 3, commDesign: 3, productDesign: 0, interiorDesign: 0, strategicDesign: 1, animationVFX: 0 },
        10: { fashionDesign: 0, fashionComm: 0, commDesign: 0, productDesign: 1, interiorDesign: 3, strategicDesign: 1, animationVFX: 0 }
      };

      /* =====================================================================
         QUIZ -> PROGRAMME MAPPING
         The PathFinder scores 7 courses. Each of the 19 programmes says which
         of those 7 score keys it is built from, and how strongly (weight).

         A programme score = weighted average of its keys totals.
           { fashionComm: 1, strategicDesign: 1 }  = half Fashion Comm, half Strategic Design
           { productDesign: 2, interiorDesign: 1 } = mostly Product Design, some Interior Design
         ===================================================================== */
export const programmeScoreProfiles = {
        /* World 01 - Product and Technology */
        "product-design":                         { productDesign: 1 },
        "design-engineering":                     { productDesign: 2, interiorDesign: 1 },
        "ai-engineering":                         { productDesign: 1, commDesign: 1 },

        /* World 02 - Fashion and Commerce */
        "fashion-design-technology":              { fashionDesign: 1 },
        "fashion-communication-styling":          { fashionComm: 1 },
        "fashion-brand-management":               { fashionComm: 1, strategicDesign: 1 },
        "luxury-brand-strategy":                  { fashionDesign: 1, strategicDesign: 1 },
        "accessory-design-craft":                 { fashionDesign: 1, productDesign: 1 },

        /* World 03 - Communication and Media */
        "communication-design-new-media":         { commDesign: 1 },
        "animation-vfx-gaming":                   { animationVFX: 1 },
        "design-futures":                         { strategicDesign: 1, animationVFX: 1 },

        /* World 04 - Space and Environment */
        "interior-design-built-environment":      { interiorDesign: 1 },
        "interior-styling-spatial-curation":      { interiorDesign: 1, fashionComm: 1 },

        /* World 05 - Business and Entrepreneurship */
        "strategic-design-innovation-management": { strategicDesign: 1 },
        "service-experience-design":              { strategicDesign: 1, commDesign: 1 },
        "health-care-design":                     { productDesign: 1, strategicDesign: 1 },
        "design-management-strategy":             { strategicDesign: 2, productDesign: 1 },
        "event-experience-design":                { interiorDesign: 1, commDesign: 1 },
        "creative-entrepreneurship":              { strategicDesign: 2, commDesign: 1 }
      };
