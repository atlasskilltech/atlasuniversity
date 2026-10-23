<!-- ISDI 19 PROGRAMMES SECTION START -->
<!--
	HOW TO USE
	1. Paste everything between "SECTION START" and "SECTION END" into your page.
	2. Tailwind CSS must be available on the page. All classes are standard Tailwind
	   (no custom theme needed). If your Tailwind build scans files for class names,
	   make sure this file / the page it is pasted into is included in that scan.
	3. The <script> at the bottom starts the section by calling initISDIProgrammesSection().
	   If you insert the section dynamically (e.g. with innerHTML, or in Next.js), scripts inside
	   it will not run automatically - load the script yourself and call
	   initISDIProgrammesSection() after the section is in the page. Calling it twice is safe.
-->

<!-- ===== PREVIEW ONLY - NOT PART OF THE SECTION =====
     Loads Tailwind so this file can be opened on its own in a browser.
     DELETE this <script> if the website already has Tailwind CSS. -->
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
<!-- ===== END PREVIEW ONLY ===== -->


<section id="isdi-programmes-section" class="overflow-x-clip bg-white font-['Poppins',ui-sans-serif,system-ui,sans-serif] antialiased">

	<!-- Font used by this section -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap">

	<!-- Section-only CSS (the only non-Tailwind styling).
	     Many sites already style `.container` (Tailwind, Bootstrap, Webflow) with different widths.
	     The #isdi-programmes-section selector keeps this section's container exactly as designed
	     and never affects any other .container on the page. -->
	<style>
		#isdi-programmes-section > .container {
			box-sizing: border-box;
			width: 100%;
			max-width: 1280px;
			margin-left: auto;
			margin-right: auto;
			padding: 56px 16px 64px;
		}
		@media (min-width: 768px) {
			#isdi-programmes-section > .container {
				padding: 78px 32px 80px;
			}
		}
		@media (min-width: 1280px) {
			#isdi-programmes-section > .container {
				padding-left: 16px;
				padding-right: 16px;
			}
		}
	</style>

	<div class="container">

		<!-- ---------- SECTION HEADING ---------- -->
		<p class="text-[13px] leading-5 font-semibold text-[#EC1376] uppercase md:text-[14px]">
			Our Programmes
		</p>

		<h2 class="mt-6 text-[36px] leading-[1.1] font-bold text-[#193E90] sm:text-[46px] md:mt-10 md:text-[54px] md:leading-[60px]">
			19 programmes.<br>
			Five worlds.<br>
			Choose your path.
		</h2>

		<p class="mt-6 text-[16px] leading-[26px] text-[#2B2B2B] md:mt-[41px] md:text-[20px] md:leading-7">
			Build products. Shape fashion. Create stories. Reimagine spaces. Launch ventures.
		</p>

		<!-- ---------- PROGRAMME WORLD CARDS ----------
		     Cards are rendered by JavaScript from the PROGRAMME DATA below.

		     Mobile  (< 768px) : one card per row.
		     Tablet  (768px+)  : World 01 + 03 side by side, World 02 full width,
		                         World 04 and 05 full width.
		     Desktop (1280px+) : Row 1 = 01 | 02 | 03, Row 2 = 04 | 05 (as in the design).
		-->
		<div class="mt-8 flex flex-col gap-4 md:mt-[42px]">
			<!-- Row 1: grid-flow-row-dense lets World 03 fill the gap next to World 01 on tablet -->
			<div id="isdi-programme-row-1" class="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2 md:grid-flow-row-dense xl:grid-cols-[380fr_500fr_320fr]"></div>
			<!-- Row 2 -->
			<div id="isdi-programme-row-2" class="grid grid-cols-1 gap-x-6 gap-y-4 xl:grid-cols-[390fr_834fr]"></div>
		</div>

		<!-- ---------- PATHFINDER QUIZ ---------- -->
		<div id="path-finder" class="mt-12 scroll-mt-6 rounded-3xl border-2 border-[#F8B4D2] bg-[#FCEAF2] px-5 pt-7 pb-6 md:mt-[62px] md:px-[47px] md:pt-[46px] md:pb-[35px] xl:mx-[5px]">

			<!-- Quiz header -->
			<div class="flex flex-col gap-3 border-b-2 border-[#FAD4E6] pb-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:pb-[15px]">
				<h3 class="text-[24px] leading-[1.25] font-semibold text-[#EC1376] md:text-[32px] md:leading-[48px]">
					Can't decide which program is best for you?
				</h3>
				<div class="shrink-0">
					<p class="text-[19px] leading-7 font-bold text-[#2B2B2B] md:text-[24px] md:leading-[34px]">Check out ISDI's PathFinder</p>
					<p class="text-[14px] leading-5 text-[#5F5B5D] md:text-[15px] md:leading-[22px]">No complicated quizzes, just two steps!</p>
				</div>
			</div>

			<!-- STEP 1: interests -->
			<div id="isdi-quiz-step-1" class="pt-[18px]">
				<h4 class="text-[18px] leading-7 font-semibold text-[#2B2B2B] md:text-[20px]">What are 3 things that light you up?</h4>
				<div id="isdi-interest-list" class="mt-3 flex max-w-[940px] flex-wrap gap-x-2.5 gap-y-2.5 md:gap-x-[14px] md:gap-y-[13px]"></div>

				<div class="mt-5 flex justify-end md:mt-[15px]">
					<button type="button" id="isdi-quiz-next-button" disabled aria-label="Next step"
						class="flex size-12 cursor-pointer items-center justify-center rounded-full bg-[#EC1376] text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:[outline-style:solid] focus-visible:outline-offset-2 focus-visible:outline-[#193E90] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100">
						<svg class="h-3 w-[18px]" viewBox="0 0 18 12" fill="none" aria-hidden="true"><path d="M0 6h16.5M11.5 1l5 5-5 5" stroke="currentColor" stroke-width="1.6"/></svg>
					</button>
				</div>
			</div>

			<!-- STEP 2: dreams -->
			<div id="isdi-quiz-step-2" class="hidden pt-[18px]">
				<h4 class="text-[18px] leading-7 font-semibold text-[#2B2B2B] md:text-[20px]">Share 3 big dreams you are chasing</h4>
				<div id="isdi-dream-list" class="mt-3 flex max-w-[940px] flex-wrap gap-x-2.5 gap-y-2.5 md:gap-x-[14px] md:gap-y-[13px]"></div>

				<div class="mt-5 flex items-center justify-end gap-3 md:mt-[15px] md:gap-4">
					<button type="button" id="isdi-quiz-back-button" aria-label="Back to previous step"
						class="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-[#EC1376] text-[#EC1376] transition hover:bg-[#EC1376] hover:text-white focus-visible:outline-2 focus-visible:[outline-style:solid] focus-visible:outline-offset-2 focus-visible:outline-[#193E90]">
						<svg class="h-3 w-[18px] rotate-180" viewBox="0 0 18 12" fill="none" aria-hidden="true"><path d="M0 6h16.5M11.5 1l5 5-5 5" stroke="currentColor" stroke-width="1.6"/></svg>
					</button>
					<button type="button" id="isdi-quiz-results-button" disabled
						class="h-12 cursor-pointer rounded-full bg-[#EC1376] px-5 text-[15px] font-semibold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:[outline-style:solid] focus-visible:outline-offset-2 focus-visible:outline-[#193E90] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100 md:px-6 md:text-[17px]">
						Hit me with the results!
					</button>
				</div>
			</div>

			<!-- LOADING: drumroll -->
			<div id="isdi-quiz-loading" class="hidden py-6 text-center" role="status">
				<p class="text-[17px] leading-7 text-[#2B2B2B] md:text-[20px]">Drumroll in progress... your future is loading</p>
				<img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/691bf0c4d90556cf449f5a1c_drum-animation.gif"
					alt="" width="450" height="450" class="mx-auto mt-4 aspect-square w-[450px] max-w-full object-contain">
			</div>

			<!-- STEP 3: results -->
			<div id="isdi-quiz-step-3" class="hidden pt-[18px]">
				<h4 class="text-[18px] leading-7 font-semibold text-[#2B2B2B] md:text-[20px]">Here's where we think you will shine!</h4>
				<div id="isdi-quiz-results" class="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6"></div>

				<div class="mt-6 flex justify-end">
					<button type="button" id="isdi-quiz-start-over-button"
						class="h-12 cursor-pointer rounded-full border-2 border-[#EC1376] px-6 text-[15px] font-semibold text-[#EC1376] transition hover:bg-[#EC1376] hover:text-white focus-visible:outline-2 focus-visible:[outline-style:solid] focus-visible:outline-offset-2 focus-visible:outline-[#193E90] md:text-[17px]">
						Start Over
					</button>
				</div>
			</div>

		</div>
	</div>
</section>

<script>
	// =====================================================================
	// ISDI 19 PROGRAMMES + PATHFINDER
	// Everything lives inside initISDIProgrammesSection(), so nothing leaks
	// into the rest of the website. All element lookups are scoped to
	// #isdi-programmes-section. The only global is the init function itself.
	// =====================================================================
	function initISDIProgrammesSection() {
		const section = document.getElementById("isdi-programmes-section");

		// Not on this page, or already initialised -> do nothing
		if (!section || section.dataset.isdiInitialized === "true") return;
		section.dataset.isdiInitialized = "true";

		// =====================================================================
		// <!-- PROGRAMME DATA -->
		// All 19 programmes, grouped into the five "worlds" shown on the cards.
		// Edit names, degrees, durations and URLs here.
		//
		//   row       : 1 or 2 – which desktop row the card sits in
		//   columns   : 1 or 2 – number of programme columns inside the card (tablet + desktop)
		//   colorClass: card background colour (Tailwind class)
		//   gridClass : extra grid placement classes for the card (optional)
		//   descriptionClass: extra classes for the description text (optional)
		//   id        : unique programme id – used by the quiz mapping further below
		// =====================================================================
		const worlds = [
			{
				number: "01",
				title: "Design + Product and Technology",
				description: "Build intelligent products, tools and systems.",
				row: 1,
				columns: 1,
				colorClass: "bg-[#0011C2]",
				gridClass: "",
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
				colorClass: "bg-[#911151]",
				gridClass: "md:col-span-2 xl:col-span-1",
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
				colorClass: "bg-[#883994]",
				gridClass: "",
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
				descriptionClass: "md:max-w-[215px]", // optional: forces the line break seen in the design
				row: 2,
				columns: 1,
				colorClass: "bg-[#BC3FDE]",
				gridClass: "",
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
				colorClass: "bg-[#40AAB9]",
				gridClass: "",
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


		// =====================================================================
		// <!-- QUIZ DATA -->
		// Kept from the old PathFinder (old-design-code.html).
		// Step 1 = interests, Step 2 = dreams. The user must pick exactly 3 in each step.
		// =====================================================================
		const REQUIRED_SELECTIONS = 3;
		const DRUMROLL_DURATION = 2500; // ms the "drumroll" loader is shown before results

		// Step 1 options (labels as shown in the new design)
		const interests = [
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

		// Step 2 options
		const dreams = [
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

		// Interest score matrix – unchanged from the old PathFinder.
		// Each option gives points (0–3) to the 7 "score keys".
		const interestMatrix = {
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

		// Dream score matrix – unchanged from the old PathFinder.
		const dreamMatrix = {
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


		// =====================================================================
		// <!-- QUIZ → PROGRAMME MAPPING -->
		// The old PathFinder scored 7 courses. Each of the 19 programmes now says
		// which of those 7 score keys it is built from, and how strongly (weight).
		//
		// A programme's score = weighted average of its keys' totals.
		//   e.g. { fashionComm: 1, strategicDesign: 1 } = half Fashion Comm, half Strategic Design
		//        { productDesign: 2, interiorDesign: 1 } = mostly Product Design, some Interior Design
		//
		// Score keys: fashionDesign, fashionComm, commDesign, productDesign,
		//             interiorDesign, strategicDesign, animationVFX
		//
		// Programmes that directly replace an old course use only that course's key.
		// Change the weights here to tune the recommendations.
		// =====================================================================
		const programmeScoreProfiles = {
			// World 01 – Product and Technology
			"product-design":                         { productDesign: 1 },
			"design-engineering":                     { productDesign: 2, interiorDesign: 1 },
			"ai-engineering":                         { productDesign: 1, commDesign: 1 },

			// World 02 – Fashion and Commerce
			"fashion-design-technology":              { fashionDesign: 1 },
			"fashion-communication-styling":          { fashionComm: 1 },
			"fashion-brand-management":               { fashionComm: 1, strategicDesign: 1 },
			"luxury-brand-strategy":                  { fashionDesign: 1, strategicDesign: 1 },
			"accessory-design-craft":                 { fashionDesign: 1, productDesign: 1 },

			// World 03 – Communication and Media
			"communication-design-new-media":         { commDesign: 1 },
			"animation-vfx-gaming":                   { animationVFX: 1 },
			"design-futures":                         { strategicDesign: 1, animationVFX: 1 }, // = "Work on projects that feel different"

			// World 04 – Space and Environment
			"interior-design-built-environment":      { interiorDesign: 1 },
			"interior-styling-spatial-curation":      { interiorDesign: 1, fashionComm: 1 },

			// World 05 – Business and Entrepreneurship
			"strategic-design-innovation-management": { strategicDesign: 1 },
			"service-experience-design":              { strategicDesign: 1, commDesign: 1 },
			"health-care-design":                     { productDesign: 1, strategicDesign: 1 },
			"design-management-strategy":             { strategicDesign: 2, productDesign: 1 },
			"event-experience-design":                { interiorDesign: 1, commDesign: 1 },
			"creative-entrepreneurship":              { strategicDesign: 2, commDesign: 1 }
		};


		// =====================================================================
		// <!-- PROGRAMME FILTER LOGIC -->
		// =====================================================================

		// Flat list of all programmes, each one knowing which world it belongs to.
		const allProgrammes = worlds.flatMap(function (world) {
			return world.programmes.map(function (programme) {
				return { ...programme, world: world };
			});
		});

		// Returns every programme with a score, highest first.
		// Same approach as the old PathFinder: add up the matrix rows for the chosen
		// interests + dreams, then sort (stable sort, so ties keep the list order above).
		function calculateProgrammeScores(selectedInterests, selectedDreams) {
			const totals = {
				fashionDesign: 0,
				fashionComm: 0,
				commDesign: 0,
				productDesign: 0,
				interiorDesign: 0,
				strategicDesign: 0,
				animationVFX: 0
			};

			// Interest scores
			selectedInterests.forEach(function (id) {
				const row = interestMatrix[id];
				if (!row) return;
				Object.keys(row).forEach(function (key) { totals[key] += row[key]; });
			});

			// Dream scores
			selectedDreams.forEach(function (id) {
				const row = dreamMatrix[id];
				if (!row) return;
				Object.keys(row).forEach(function (key) { totals[key] += row[key]; });
			});

			// Programme score = weighted average of its score keys
			const results = allProgrammes.map(function (programme) {
				const profile = programmeScoreProfiles[programme.id] || {};
				let weightedTotal = 0;
				let weightSum = 0;

				Object.keys(profile).forEach(function (key) {
					weightedTotal += totals[key] * profile[key];
					weightSum += profile[key];
				});

				return { ...programme, score: weightSum ? weightedTotal / weightSum : 0 };
			});

			results.sort(function (a, b) { return b.score - a.score; });
			return results;
		}


		// =====================================================================
		// <!-- UI RENDERING -->
		// =====================================================================

		const ARROW_ICON = '<svg class="h-2 w-3 shrink-0" viewBox="0 0 12 8" fill="none" aria-hidden="true"><path d="M0 4h11M8 1l3 3-3 3" stroke="currentColor" stroke-width="1.1"/></svg>';

		// "B.DES • 4 YEARS"
		function renderMeta(programme) {
			return programme.degree + '<span class="mx-1.5" aria-hidden="true">•</span>' + programme.duration;
		}

		// One programme row inside a world card: name + arrow on the first line, "B.DES • 4 YEARS" below
		function renderProgrammeItem(programme) {
			return `
				<li class="border-b border-white/20 last:border-b-0">
					<a href="${programme.url}" class="group block py-2 focus-visible:outline-2 focus-visible:[outline-style:solid] focus-visible:outline-offset-2 focus-visible:outline-white">
						<span class="flex items-center justify-between gap-2">
							<span class="min-w-0 text-[14.5px] leading-5 font-semibold text-pretty text-white group-hover:underline group-hover:underline-offset-2">${programme.name}</span>
							<span class="mr-[3px] text-white transition-transform group-hover:translate-x-1">${ARROW_ICON}</span>
						</span>
						<span class="mt-1 block text-[10px] leading-[14px] font-medium text-white/70 uppercase">${renderMeta(programme)}</span>
					</a>
				</li>`;
		}

		// The programme list(s) inside a world card – one column, or two with a divider line
		function renderProgrammeList(world) {
			if (world.columns === 1) {
				return `<ul>${world.programmes.map(renderProgrammeItem).join("")}</ul>`;
			}

			const half = Math.ceil(world.programmes.length / 2);
			const firstColumn = world.programmes.slice(0, half);
			const secondColumn = world.programmes.slice(half);

			return `
				<div class="flex flex-col md:flex-row">
					<ul class="min-w-0 flex-1 md:pr-[18px]">${firstColumn.map(renderProgrammeItem).join("")}</ul>
					<ul class="min-w-0 flex-1 border-t border-white/20 md:border-t-0 md:border-l md:pl-[18px]">${secondColumn.map(renderProgrammeItem).join("")}</ul>
				</div>`;
		}

		// A full world card
		function renderWorldCard(world) {
			const count = world.programmes.length;

			return `
				<article class="relative isolate overflow-hidden rounded-xl px-5 pt-5 pb-3 ${world.colorClass} ${world.gridClass}">
					<!-- Big faded number -->
					<span class="pointer-events-none absolute top-[3px] right-[9px] -z-10 text-[72px] leading-none font-bold tracking-[-0.02em] text-white/15 select-none" aria-hidden="true">${world.number}</span>

					<p class="text-[11px] leading-4 font-medium text-white/80 uppercase">
						World ${world.number}<span class="mx-[5px]" aria-hidden="true">•</span>${count} ${count === 1 ? "Programme" : "Programmes"}
					</p>
					<h3 class="mt-[5px] text-[20px] leading-[26px] font-bold text-white">${world.title}</h3>
					<p class="mt-1 text-[11.5px] leading-[15px] text-white/90 ${world.descriptionClass || ""}">${world.description}</p>

					<div class="mt-3">${renderProgrammeList(world)}</div>
				</article>`;
		}

		function renderWorldCards() {
			section.querySelector("#isdi-programme-row-1").innerHTML = worlds.filter(function (w) { return w.row === 1; }).map(renderWorldCard).join("");
			section.querySelector("#isdi-programme-row-2").innerHTML = worlds.filter(function (w) { return w.row === 2; }).map(renderWorldCard).join("");
		}

		// Quiz option pill: a real (visually hidden) checkbox + a styled label
		function renderOptionPill(option, groupName) {
			return `
				<label class="block cursor-pointer">
					<input type="checkbox" class="peer sr-only isdi-quiz-${groupName}" value="${option.id}">
					<span class="block rounded-full border border-[#193E90] px-4 py-2.5 text-[14px] leading-5 text-[#193E90] transition-colors select-none hover:bg-[#193E90]/5 peer-checked:bg-[#193E90] peer-checked:text-white peer-checked:hover:bg-[#193E90] peer-focus-visible:outline-2 peer-focus-visible:[outline-style:solid] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#EC1376] peer-disabled:cursor-not-allowed peer-disabled:opacity-60 peer-disabled:hover:bg-transparent md:px-5 md:py-[14px] md:text-[15px] md:leading-[20px]">${option.text}</span>
				</label>`;
		}

		// Result card for one recommended programme
		function renderResultCard(programme) {
			return `
				<a href="${programme.url}" class="group relative flex min-h-[160px] flex-col justify-between gap-6 overflow-hidden rounded-xl p-5 text-white transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:[outline-style:solid] focus-visible:outline-offset-2 focus-visible:outline-[#193E90] lg:min-h-[220px] lg:p-6 ${programme.world.colorClass}">
					<span class="flex items-start justify-between gap-4">
						<span class="text-[11px] leading-4 font-medium text-white/80 uppercase">
							World ${programme.world.number}<span class="mx-1.5" aria-hidden="true">•</span>${renderMeta(programme)}
						</span>
						<span class="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15 transition group-hover:bg-white/25">${ARROW_ICON}</span>
					</span>
					<span class="isdi-result-name text-[22px] leading-7 font-bold break-words md:text-[24px] md:leading-[30px]">${programme.name}</span>
				</a>`;
		}


		// =====================================================================
		// <!-- QUIZ LOGIC -->
		// Same flow as the old PathFinder:
		// Step 1 (3 interests) → Step 2 (3 dreams) → drumroll → Step 3 (top 3 results) → Start Over
		// =====================================================================

		const step1 = section.querySelector("#isdi-quiz-step-1");
		const step2 = section.querySelector("#isdi-quiz-step-2");
		const step3 = section.querySelector("#isdi-quiz-step-3");
		const loading = section.querySelector("#isdi-quiz-loading");
		const interestList = section.querySelector("#isdi-interest-list");
		const dreamList = section.querySelector("#isdi-dream-list");
		const resultsContainer = section.querySelector("#isdi-quiz-results");
		const nextButton = section.querySelector("#isdi-quiz-next-button");
		const backButton = section.querySelector("#isdi-quiz-back-button");
		const resultsButton = section.querySelector("#isdi-quiz-results-button");
		const startOverButton = section.querySelector("#isdi-quiz-start-over-button");

		let drumrollTimer = null;

		function showStep(stepToShow) {
			[step1, step2, loading, step3].forEach(function (step) {
				step.classList.toggle("hidden", step !== stepToShow);
			});
		}

		// Ids of the checked options, e.g. getSelectedIds(".isdi-quiz-interest") → [1, 5, 9]
		function getSelectedIds(selector) {
			return Array.from(section.querySelectorAll(selector + ":checked")).map(function (input) {
				return Number(input.value);
			});
		}

		// Allow exactly 3 selections: lock the rest once 3 are picked and
		// enable the step button only when the count is exactly 3.
		function updateSelectionState(selector, button) {
			const inputs = section.querySelectorAll(selector);
			const selectedCount = getSelectedIds(selector).length;
			const limitReached = selectedCount >= REQUIRED_SELECTIONS;

			inputs.forEach(function (input) {
				if (!input.checked) input.disabled = limitReached;
			});
			button.disabled = selectedCount !== REQUIRED_SELECTIONS;
		}

		// ---------- Selection limits ----------
		interestList.addEventListener("change", function () {
			updateSelectionState(".isdi-quiz-interest", nextButton);
		});

		dreamList.addEventListener("change", function () {
			updateSelectionState(".isdi-quiz-dream", resultsButton);
		});

		// ---------- Step 1 → Step 2 ----------
		nextButton.addEventListener("click", function () {
			if (getSelectedIds(".isdi-quiz-interest").length !== REQUIRED_SELECTIONS) return;
			showStep(step2);
		});

		// ---------- Step 2 → Step 1 (selections are kept) ----------
		backButton.addEventListener("click", function () {
			showStep(step1);
			updateSelectionState(".isdi-quiz-interest", nextButton);
		});

		// ---------- Step 2 → Results ----------
		resultsButton.addEventListener("click", function () {
			const selectedInterests = getSelectedIds(".isdi-quiz-interest");
			const selectedDreams = getSelectedIds(".isdi-quiz-dream");

			if (selectedInterests.length !== REQUIRED_SELECTIONS || selectedDreams.length !== REQUIRED_SELECTIONS) return;

			const topThree = calculateProgrammeScores(selectedInterests, selectedDreams).slice(0, 3);
			resultsContainer.innerHTML = topThree.map(renderResultCard).join("");

			showStep(loading);

			clearTimeout(drumrollTimer);
			drumrollTimer = setTimeout(function () {
				drumrollTimer = null;
				showStep(step3);
			}, DRUMROLL_DURATION);
		});

		// ---------- Start Over ----------
		startOverButton.addEventListener("click", function () {
			clearTimeout(drumrollTimer);
			drumrollTimer = null;

			section.querySelectorAll(".isdi-quiz-interest, .isdi-quiz-dream").forEach(function (input) {
				input.checked = false;
				input.disabled = false;
			});
			resultsContainer.innerHTML = "";
			nextButton.disabled = true;
			resultsButton.disabled = true;

			showStep(step1);
		});


		// =====================================================================
		// INITIAL RENDER
		// =====================================================================
		renderWorldCards();
		interestList.innerHTML = interests.map(function (option) { return renderOptionPill(option, "interest"); }).join("");
		dreamList.innerHTML = dreams.map(function (option) { return renderOptionPill(option, "dream"); }).join("");

		// Helps when editing: warn if a programme has no quiz mapping
		allProgrammes.forEach(function (programme) {
			if (!programmeScoreProfiles[programme.id]) {
				console.warn("PathFinder: no score profile for programme id \"" + programme.id + "\"");
			}
		});
	}

	initISDIProgrammesSection();
</script>
<!-- ISDI 19 PROGRAMMES SECTION END -->
