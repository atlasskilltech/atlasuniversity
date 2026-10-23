<section id="isdi-programmes-section">

	<!-- ===================================================================
	     ISDI - 19 PROGRAMMES SECTION (section snippet, not a full page)
	     ===================================================================
	     HOW TO USE
	     1. Paste this whole file into the page where the section should appear.
	     2. Nothing external is required. The parent page already loads
	        Bootstrap 5.3.8 + Webflow + the site CSS, and this snippet does NOT
	        load any of them again. No Tailwind is used anywhere.
	     3. All CSS lives in the <style> block at the bottom of the section and
	        every selector is scoped to #isdi-programmes-section, so it cannot
	        affect anything else on the page (and the page cannot affect it).
	     4. The <script> at the bottom runs itself. If the section is injected
	        later (innerHTML / AJAX / CMS), inline scripts do not auto-run -
	        call window.initISDIProgrammesSection() once it is in the DOM.
	        Calling it twice is safe.
	     5. Font: the site already uses "Poppins, sans-serif" on ISDI pages, so
	        no font file is requested here. If a page ever needs it, uncomment
	        the <link> just below - it is the only optional external resource.
	     =================================================================== -->

	<!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"> -->

	<div class="isdi-container">

		<!-- ================= SECTION HEADING ================= -->
		<p class="isdi-eyebrow">Our Programmes</p>

		<h2 class="isdi-title">
			19 programmes.<br>
			Five worlds.<br>
			Choose your path.
		</h2>

		<p class="isdi-description">
			Build products. Shape fashion. Create stories. Reimagine spaces. Launch ventures.
		</p>

		<!-- ================= PROGRAMME WORLD CARDS =================
		     Rendered by JavaScript from the PROGRAMME DATA in the script below.

		     Mobile   (< 768px)  : one card per row.
		     Tablet   (768px+)   : World 01 + 03 side by side, World 02 full width,
		                           World 04 and 05 full width.
		     Desktop  (1280px+)  : Row 1 = 01 | 02 | 03,  Row 2 = 04 | 05.
		================================================================= -->
		<div class="isdi-worlds">
			<div class="isdi-worlds-row isdi-worlds-row--one" id="isdi-programme-row-1"></div>
			<div class="isdi-worlds-row isdi-worlds-row--two" id="isdi-programme-row-2"></div>
		</div>

		<!-- ================= PATHFINDER QUIZ ================= -->
		<div class="isdi-pathfinder" id="isdi-path-finder">

			<!-- Quiz header -->
			<div class="isdi-pathfinder-head">
				<h3 class="isdi-pathfinder-title">Can't decide which program is best for you?</h3>
				<div class="isdi-pathfinder-intro">
					<p class="isdi-pathfinder-intro-title">Check out ISDI's PathFinder</p>
					<p class="isdi-pathfinder-intro-text">No complicated quizzes, just two steps!</p>
				</div>
			</div>

			<!-- ---------- STEP 1: interests ---------- -->
			<div class="isdi-quiz-step" id="isdi-quiz-step-1">
				<h4 class="isdi-quiz-question">What are 3 things that light you up?</h4>
				<div class="isdi-quiz-options" id="isdi-interest-list"></div>

				<div class="isdi-quiz-actions">
					<button type="button" class="isdi-quiz-icon-button" id="isdi-quiz-next-button" disabled aria-label="Next step">
						<svg class="isdi-arrow-lg" viewBox="0 0 18 12" fill="none" aria-hidden="true" focusable="false"><path d="M0 6h16.5M11.5 1l5 5-5 5" stroke="currentColor" stroke-width="1.6"/></svg>
					</button>
				</div>
			</div>

			<!-- ---------- STEP 2: dreams ---------- -->
			<div class="isdi-quiz-step isdi-is-hidden" id="isdi-quiz-step-2">
				<h4 class="isdi-quiz-question">Share 3 big dreams you are chasing</h4>
				<div class="isdi-quiz-options" id="isdi-dream-list"></div>

				<div class="isdi-quiz-actions">
					<button type="button" class="isdi-quiz-icon-button isdi-quiz-icon-button--ghost" id="isdi-quiz-back-button" aria-label="Back to previous step">
						<svg class="isdi-arrow-lg isdi-arrow-lg--back" viewBox="0 0 18 12" fill="none" aria-hidden="true" focusable="false"><path d="M0 6h16.5M11.5 1l5 5-5 5" stroke="currentColor" stroke-width="1.6"/></svg>
					</button>
					<button type="button" class="isdi-quiz-button" id="isdi-quiz-results-button" disabled>
						Hit me with the results!
					</button>
				</div>
			</div>

			<!-- ---------- LOADING: drumroll ---------- -->
			<div class="isdi-quiz-loading isdi-is-hidden" id="isdi-quiz-loading" role="status">
				<p class="isdi-quiz-loading-text">Drumroll in progress... your future is loading</p>
				<img class="isdi-quiz-loading-image"
					src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/691bf0c4d90556cf449f5a1c_drum-animation.gif"
					alt="" width="450" height="450" loading="lazy">
			</div>

			<!-- ---------- STEP 3: results ---------- -->
			<div class="isdi-quiz-step isdi-is-hidden" id="isdi-quiz-step-3">
				<h4 class="isdi-quiz-question">Here's where we think you will shine!</h4>
				<div class="isdi-quiz-results" id="isdi-quiz-results"></div>

				<div class="isdi-quiz-actions">
					<button type="button" class="isdi-quiz-button isdi-quiz-button--ghost" id="isdi-quiz-start-over-button">
						Start Over
					</button>
				</div>
			</div>

		</div>
	</div>

	<!-- ===================================================================
	     SECTION CSS
	     Plain CSS only (no Tailwind). Every selector starts with
	     #isdi-programmes-section so nothing here can leak into the rest of
	     the page, and the page global rules (.container, h2, p, a, ul,
	     Bootstrap, Webflow) cannot change this section either.

	     Design values reused from the existing site CSS:
	       font-family : Poppins, sans-serif
	       container   : max-width 1366px, padding 62px / 30px / 22px
	       section pad : 60px
	       breakpoints : 767px, 991px, 479px (written here as min-width 768/992)
	       colours     : #193e90 (blue), #ec1376 (pink), #2b2b2b (text)
	     =================================================================== -->
	<style>
		/* ---------- tokens + local reset (scoped) ---------- */
		#isdi-programmes-section {
			--isdi-blue: #193e90;
			--isdi-pink: #ec1376;
			--isdi-text: #2b2b2b;
			--isdi-muted: #5f5b5d;
			--isdi-white: #fff;
			--isdi-quiz-bg: #fceaf2;
			--isdi-quiz-border: #f8b4d2;
			--isdi-quiz-divider: #fad4e6;
			--isdi-card-radius: 12px;
			--isdi-card-color: #193e90;

			background-color: #fff;
			color: var(--isdi-text);
			font-family: Poppins, sans-serif;
			font-size: 16px;
			font-weight: 400;
			line-height: 1.5;
			display: block;
			padding-top: 60px;
			padding-bottom: 60px;
			overflow-x: clip;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
		}

		#isdi-programmes-section *,
		#isdi-programmes-section *::before,
		#isdi-programmes-section *::after {
			box-sizing: border-box;
		}

		#isdi-programmes-section .isdi-is-hidden {
			display: none !important;
		}

		/* ---------- container (never uses the site / Bootstrap .container) ---------- */
		#isdi-programmes-section .isdi-container {
			position: relative;
			width: 100%;
			max-width: 1366px;
			margin-left: auto;
			margin-right: auto;
			padding-left: 22px;
			padding-right: 22px;
		}

		/* ---------- heading ---------- */
		#isdi-programmes-section .isdi-eyebrow {
			margin: 0;
			color: var(--isdi-pink);
			font-size: 13px;
			font-weight: 600;
			line-height: 20px;
			letter-spacing: .04em;
			text-transform: uppercase;
		}

		#isdi-programmes-section .isdi-title {
			margin: 24px 0 0;
			color: var(--isdi-blue);
			font-family: Poppins, sans-serif;
			font-size: 36px;
			font-weight: 700;
			line-height: 1.1;
			letter-spacing: -.01em;
		}

		#isdi-programmes-section .isdi-description {
			margin: 24px 0 0;
			max-width: 980px;
			color: var(--isdi-text);
			font-size: 16px;
			font-weight: 400;
			line-height: 26px;
		}

		/* ---------- world card grid ---------- */
		#isdi-programmes-section .isdi-worlds {
			display: flex;
			flex-direction: column;
			gap: 16px;
			margin-top: 32px;
		}

		#isdi-programmes-section .isdi-worlds-row {
			display: grid;
			grid-template-columns: 1fr;
			column-gap: 24px;
			row-gap: 16px;
		}

		/* ---------- world card ---------- */
		#isdi-programmes-section .isdi-world-card {
			position: relative;
			overflow: hidden;
			border-radius: var(--isdi-card-radius);
			background-color: var(--isdi-card-color);
			padding: 20px 20px 12px;
			color: var(--isdi-white);
		}

		#isdi-programmes-section .isdi-world-number {
			position: absolute;
			top: 3px;
			right: 9px;
			color: rgba(255, 255, 255, .15);
			font-size: 72px;
			font-weight: 700;
			line-height: 1;
			letter-spacing: -.02em;
			pointer-events: none;
			-webkit-user-select: none;
			user-select: none;
		}

		#isdi-programmes-section .isdi-world-body {
			position: relative;
		}

		#isdi-programmes-section .isdi-world-meta {
			margin: 0;
			color: rgba(255, 255, 255, .8);
			font-size: 11px;
			font-weight: 500;
			line-height: 16px;
			letter-spacing: .03em;
			text-transform: uppercase;
		}

		#isdi-programmes-section .isdi-world-title {
			margin: 5px 0 0;
			color: var(--isdi-white);
			font-family: Poppins, sans-serif;
			font-size: 20px;
			font-weight: 700;
			line-height: 26px;
		}

		#isdi-programmes-section .isdi-world-description {
			margin: 4px 0 0;
			color: rgba(255, 255, 255, .9);
			font-size: 11.5px;
			font-weight: 400;
			line-height: 15px;
		}

		/* ---------- programme list inside a card ---------- */
		#isdi-programmes-section .isdi-programme-columns {
			display: flex;
			flex-direction: column;
			margin-top: 12px;
		}

		#isdi-programmes-section .isdi-programme-list {
			list-style: none;
			margin: 0;
			padding: 0;
			min-width: 0;
			flex: 1 1 0%;
		}

		#isdi-programmes-section .isdi-programme-list--second {
			border-top: 1px solid rgba(255, 255, 255, .2);
		}

		#isdi-programmes-section .isdi-programme-item {
			margin: 0;
			padding: 0;
			border-bottom: 1px solid rgba(255, 255, 255, .2);
		}

		#isdi-programmes-section .isdi-programme-item:last-child {
			border-bottom: 0;
		}

		#isdi-programmes-section .isdi-programme-link {
			display: block;
			padding: 8px 0;
			color: var(--isdi-white);
			text-decoration: none;
			background-color: transparent;
		}

		#isdi-programmes-section .isdi-programme-link:hover,
		#isdi-programmes-section .isdi-programme-link:focus {
			color: var(--isdi-white);
		}

		#isdi-programmes-section .isdi-programme-link:focus-visible {
			outline: 2px solid var(--isdi-white);
			outline-offset: 2px;
			border-radius: 4px;
		}

		#isdi-programmes-section .isdi-programme-top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 8px;
		}

		#isdi-programmes-section .isdi-programme-name {
			min-width: 0;
			color: var(--isdi-white);
			font-size: 14.5px;
			font-weight: 600;
			line-height: 20px;
			overflow-wrap: break-word;
		}

		#isdi-programmes-section .isdi-programme-link:hover .isdi-programme-name {
			text-decoration: underline;
			text-underline-offset: 2px;
		}

		#isdi-programmes-section .isdi-programme-arrow {
			display: flex;
			align-items: center;
			flex: none;
			margin-right: 3px;
			color: var(--isdi-white);
			transition: transform .2s ease;
		}

		#isdi-programmes-section .isdi-programme-link:hover .isdi-programme-arrow {
			transform: translateX(4px);
		}

		#isdi-programmes-section .isdi-arrow-sm {
			display: block;
			width: 12px;
			height: 8px;
			flex: none;
		}

		#isdi-programmes-section .isdi-programme-detail {
			display: block;
			margin-top: 4px;
			color: rgba(255, 255, 255, .7);
			font-size: 10px;
			font-weight: 500;
			line-height: 14px;
			letter-spacing: .04em;
			text-transform: uppercase;
		}

		#isdi-programmes-section .isdi-dot {
			margin: 0 6px;
		}

		/* ---------- pathfinder shell ---------- */
		#isdi-programmes-section .isdi-pathfinder {
			margin-top: 48px;
			scroll-margin-top: 24px;
			border: 2px solid var(--isdi-quiz-border);
			border-radius: 24px;
			background-color: var(--isdi-quiz-bg);
			padding: 28px 20px 24px;
		}

		#isdi-programmes-section .isdi-pathfinder-head {
			display: flex;
			flex-direction: column;
			gap: 12px;
			border-bottom: 2px solid var(--isdi-quiz-divider);
			padding-bottom: 20px;
		}

		#isdi-programmes-section .isdi-pathfinder-title {
			margin: 0;
			color: var(--isdi-pink);
			font-family: Poppins, sans-serif;
			font-size: 24px;
			font-weight: 600;
			line-height: 1.25;
		}

		#isdi-programmes-section .isdi-pathfinder-intro {
			flex: none;
		}

		#isdi-programmes-section .isdi-pathfinder-intro-title {
			margin: 0;
			color: var(--isdi-text);
			font-size: 19px;
			font-weight: 700;
			line-height: 28px;
		}

		#isdi-programmes-section .isdi-pathfinder-intro-text {
			margin: 0;
			color: var(--isdi-muted);
			font-size: 14px;
			font-weight: 400;
			line-height: 20px;
		}

		/* ---------- quiz steps ---------- */
		#isdi-programmes-section .isdi-quiz-step {
			padding-top: 18px;
		}

		#isdi-programmes-section .isdi-quiz-question {
			margin: 0;
			color: var(--isdi-text);
			font-family: Poppins, sans-serif;
			font-size: 18px;
			font-weight: 600;
			line-height: 28px;
		}

		#isdi-programmes-section .isdi-quiz-options {
			display: flex;
			flex-wrap: wrap;
			gap: 10px;
			max-width: 940px;
			margin-top: 12px;
		}

		/* ---------- selection pills ---------- */
		#isdi-programmes-section .isdi-quiz-option {
			display: block;
			max-width: 100%;
			margin: 0;
			cursor: pointer;
		}

		#isdi-programmes-section .isdi-quiz-option-input {
			position: absolute;
			width: 1px;
			height: 1px;
			margin: 0;
			padding: 0;
			border: 0;
			overflow: hidden;
			white-space: nowrap;
			clip: rect(0 0 0 0);
			clip-path: inset(50%);
		}

		#isdi-programmes-section .isdi-quiz-option-label {
			display: block;
			border: 1px solid var(--isdi-blue);
			border-radius: 999px;
			background-color: transparent;
			padding: 10px 16px;
			color: var(--isdi-blue);
			font-size: 14px;
			font-weight: 400;
			line-height: 20px;
			text-align: center;
			-webkit-user-select: none;
			user-select: none;
			transition: background-color .15s ease, color .15s ease;
		}

		#isdi-programmes-section .isdi-quiz-option-label:hover {
			background-color: rgba(25, 62, 144, .06);
		}

		#isdi-programmes-section .isdi-quiz-option-input:checked + .isdi-quiz-option-label,
		#isdi-programmes-section .isdi-quiz-option-input:checked + .isdi-quiz-option-label:hover {
			background-color: var(--isdi-blue);
			color: var(--isdi-white);
		}

		#isdi-programmes-section .isdi-quiz-option-input:disabled + .isdi-quiz-option-label {
			cursor: not-allowed;
			opacity: .6;
		}

		#isdi-programmes-section .isdi-quiz-option-input:disabled + .isdi-quiz-option-label:hover {
			background-color: transparent;
		}

		#isdi-programmes-section .isdi-quiz-option-input:focus-visible + .isdi-quiz-option-label {
			outline: 2px solid var(--isdi-pink);
			outline-offset: 2px;
		}

		/* ---------- quiz navigation ---------- */
		#isdi-programmes-section .isdi-quiz-actions {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			flex-wrap: wrap;
			gap: 12px;
			margin-top: 20px;
		}

		#isdi-programmes-section .isdi-quiz-icon-button,
		#isdi-programmes-section .isdi-quiz-button {
			font-family: Poppins, sans-serif;
			cursor: pointer;
			transition: background-color .15s ease, color .15s ease, filter .15s ease;
		}

		#isdi-programmes-section .isdi-quiz-icon-button {
			display: flex;
			align-items: center;
			justify-content: center;
			flex: none;
			width: 48px;
			height: 48px;
			border: 0;
			border-radius: 999px;
			background-color: var(--isdi-pink);
			color: var(--isdi-white);
			padding: 0;
		}

		#isdi-programmes-section .isdi-quiz-icon-button:hover {
			filter: brightness(1.1);
		}

		#isdi-programmes-section .isdi-quiz-icon-button--ghost {
			border: 2px solid var(--isdi-pink);
			background-color: transparent;
			color: var(--isdi-pink);
		}

		#isdi-programmes-section .isdi-quiz-icon-button--ghost:hover {
			background-color: var(--isdi-pink);
			color: var(--isdi-white);
			filter: none;
		}

		#isdi-programmes-section .isdi-quiz-button {
			min-height: 48px;
			border: 0;
			border-radius: 999px;
			background-color: var(--isdi-pink);
			padding: 12px 20px;
			color: var(--isdi-white);
			font-size: 15px;
			font-weight: 600;
			line-height: 20px;
		}

		#isdi-programmes-section .isdi-quiz-button:hover {
			filter: brightness(1.1);
		}

		#isdi-programmes-section .isdi-quiz-button--ghost {
			border: 2px solid var(--isdi-pink);
			background-color: transparent;
			color: var(--isdi-pink);
		}

		#isdi-programmes-section .isdi-quiz-button--ghost:hover {
			background-color: var(--isdi-pink);
			color: var(--isdi-white);
			filter: none;
		}

		/* disabled buttons: no hover feedback, clearly not clickable */
		#isdi-programmes-section .isdi-quiz-icon-button:disabled,
		#isdi-programmes-section .isdi-quiz-button:disabled,
		#isdi-programmes-section .isdi-quiz-icon-button:disabled:hover,
		#isdi-programmes-section .isdi-quiz-button:disabled:hover {
			cursor: not-allowed;
			opacity: .6;
			background-color: var(--isdi-pink);
			color: var(--isdi-white);
			filter: none;
		}

		#isdi-programmes-section .isdi-quiz-icon-button:focus-visible,
		#isdi-programmes-section .isdi-quiz-button:focus-visible {
			outline: 2px solid var(--isdi-blue);
			outline-offset: 2px;
		}

		#isdi-programmes-section .isdi-arrow-lg {
			display: block;
			width: 18px;
			height: 12px;
		}

		#isdi-programmes-section .isdi-arrow-lg--back {
			transform: rotate(180deg);
		}

		/* ---------- loading / drumroll ---------- */
		#isdi-programmes-section .isdi-quiz-loading {
			padding: 24px 0;
			text-align: center;
		}

		#isdi-programmes-section .isdi-quiz-loading-text {
			margin: 0;
			color: var(--isdi-text);
			font-size: 17px;
			line-height: 28px;
		}

		#isdi-programmes-section .isdi-quiz-loading-image {
			display: block;
			width: 450px;
			max-width: 100%;
			height: auto;
			aspect-ratio: 1 / 1;
			object-fit: contain;
			margin: 16px auto 0;
		}

		/* ---------- results ---------- */
		#isdi-programmes-section .isdi-quiz-results {
			display: grid;
			grid-template-columns: 1fr;
			gap: 16px;
			margin-top: 16px;
		}

		#isdi-programmes-section .isdi-result-card {
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			gap: 24px;
			overflow: hidden;
			min-height: 160px;
			border-radius: var(--isdi-card-radius);
			background-color: var(--isdi-card-color);
			padding: 20px;
			color: var(--isdi-white);
			text-decoration: none;
			transition: transform .15s ease;
		}

		#isdi-programmes-section .isdi-result-card:hover {
			transform: translateY(-2px);
			color: var(--isdi-white);
		}

		#isdi-programmes-section .isdi-result-card:focus-visible {
			outline: 2px solid var(--isdi-blue);
			outline-offset: 2px;
		}

		#isdi-programmes-section .isdi-result-top {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			gap: 16px;
		}

		#isdi-programmes-section .isdi-result-meta {
			color: rgba(255, 255, 255, .8);
			font-size: 11px;
			font-weight: 500;
			line-height: 16px;
			letter-spacing: .03em;
			text-transform: uppercase;
		}

		#isdi-programmes-section .isdi-result-arrow {
			display: flex;
			align-items: center;
			justify-content: center;
			flex: none;
			width: 36px;
			height: 36px;
			border-radius: 999px;
			background-color: rgba(255, 255, 255, .15);
			transition: background-color .15s ease;
		}

		#isdi-programmes-section .isdi-result-card:hover .isdi-result-arrow {
			background-color: rgba(255, 255, 255, .25);
		}

		#isdi-programmes-section .isdi-result-name {
			font-size: 22px;
			font-weight: 700;
			line-height: 28px;
			overflow-wrap: break-word;
		}

		/* =========================================================
		   TABLET AND UP (mirrors the site 767px breakpoint)
		   ========================================================= */
		@media screen and (min-width: 768px) {
			#isdi-programmes-section .isdi-container {
				padding-left: 30px;
				padding-right: 30px;
			}

			#isdi-programmes-section .isdi-eyebrow {
				font-size: 14px;
			}

			#isdi-programmes-section .isdi-title {
				margin-top: 40px;
				font-size: 46px;
			}

			#isdi-programmes-section .isdi-description {
				margin-top: 32px;
				font-size: 20px;
				line-height: 28px;
			}

			#isdi-programmes-section .isdi-worlds {
				margin-top: 42px;
			}

			/* World 01 + 03 share a row, World 02 spans the full width */
			#isdi-programmes-section .isdi-worlds-row--one {
				grid-template-columns: 1fr 1fr;
				grid-auto-flow: row dense;
			}

			#isdi-programmes-section .isdi-world-card--wide {
				grid-column: span 2;
			}

			/* two programme columns inside a card */
			#isdi-programmes-section .isdi-programme-columns--split {
				flex-direction: row;
			}

			#isdi-programmes-section .isdi-programme-columns--split .isdi-programme-list--first {
				padding-right: 18px;
			}

			#isdi-programmes-section .isdi-programme-columns--split .isdi-programme-list--second {
				border-top: 0;
				border-left: 1px solid rgba(255, 255, 255, .2);
				padding-left: 18px;
			}

			#isdi-programmes-section .isdi-world-description--narrow {
				max-width: 215px;
			}

			#isdi-programmes-section .isdi-pathfinder {
				margin-top: 56px;
				padding: 40px 32px 32px;
			}

			#isdi-programmes-section .isdi-pathfinder-title {
				font-size: 32px;
				line-height: 44px;
			}

			#isdi-programmes-section .isdi-pathfinder-intro-title {
				font-size: 24px;
				line-height: 34px;
			}

			#isdi-programmes-section .isdi-pathfinder-intro-text {
				font-size: 15px;
				line-height: 22px;
			}

			#isdi-programmes-section .isdi-quiz-question {
				font-size: 20px;
			}

			#isdi-programmes-section .isdi-quiz-options {
				gap: 13px 14px;
			}

			#isdi-programmes-section .isdi-quiz-option-label {
				padding: 14px 20px;
				font-size: 15px;
			}

			#isdi-programmes-section .isdi-quiz-actions {
				gap: 16px;
				margin-top: 15px;
			}

			#isdi-programmes-section .isdi-quiz-button {
				padding: 12px 24px;
				font-size: 17px;
			}

			#isdi-programmes-section .isdi-quiz-loading-text {
				font-size: 20px;
			}
		}

		/* =========================================================
		   SMALL DESKTOP AND UP (mirrors the site 991px breakpoint)
		   ========================================================= */
		@media screen and (min-width: 992px) {
			#isdi-programmes-section {
				padding-top: 80px;
				padding-bottom: 80px;
			}

			#isdi-programmes-section .isdi-container {
				padding-left: 62px;
				padding-right: 62px;
			}

			#isdi-programmes-section .isdi-title {
				font-size: 54px;
				line-height: 60px;
			}

			#isdi-programmes-section .isdi-description {
				margin-top: 41px;
			}

			#isdi-programmes-section .isdi-pathfinder {
				padding: 46px 47px 35px;
			}

			#isdi-programmes-section .isdi-pathfinder-head {
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				gap: 32px;
				padding-bottom: 15px;
			}

			#isdi-programmes-section .isdi-quiz-results {
				grid-template-columns: repeat(3, 1fr);
				gap: 24px;
			}

			#isdi-programmes-section .isdi-result-card {
				min-height: 220px;
				padding: 24px;
			}

			#isdi-programmes-section .isdi-result-name {
				font-size: 24px;
				line-height: 30px;
			}
		}

		/* =========================================================
		   FULL DESKTOP - the card layout from the design
		   Row 1 = 01 | 02 | 03      Row 2 = 04 | 05
		   ========================================================= */
		@media screen and (min-width: 1280px) {
			#isdi-programmes-section .isdi-worlds-row--one {
				grid-template-columns: 380fr 500fr 320fr;
			}

			#isdi-programmes-section .isdi-worlds-row--two {
				grid-template-columns: 390fr 834fr;
			}

			#isdi-programmes-section .isdi-world-card--wide {
				grid-column: span 1;
			}

			#isdi-programmes-section .isdi-pathfinder {
				margin-top: 62px;
				margin-left: 5px;
				margin-right: 5px;
			}
		}

		/* =========================================================
		   SMALL PHONES (mirrors the site 479px breakpoint)
		   ========================================================= */
		@media screen and (max-width: 479px) {
			#isdi-programmes-section .isdi-title {
				font-size: 30px;
			}

			#isdi-programmes-section .isdi-world-number {
				font-size: 58px;
			}

			#isdi-programmes-section .isdi-world-title {
				font-size: 18px;
				line-height: 24px;
			}

			#isdi-programmes-section .isdi-quiz-option {
				width: 100%;
			}

			#isdi-programmes-section .isdi-quiz-button {
				width: 100%;
			}

			#isdi-programmes-section .isdi-quiz-actions {
				justify-content: flex-start;
			}
		}

		/* ---------- reduced motion ---------- */
		@media (prefers-reduced-motion: reduce) {
			#isdi-programmes-section .isdi-programme-arrow,
			#isdi-programmes-section .isdi-result-card,
			#isdi-programmes-section .isdi-quiz-option-label,
			#isdi-programmes-section .isdi-quiz-button,
			#isdi-programmes-section .isdi-quiz-icon-button {
				transition: none;
			}
		}
	</style>

	<!-- ===================================================================
	     SECTION JAVASCRIPT
	     Everything runs inside one function and every DOM lookup is scoped to
	     #isdi-programmes-section. Nothing outside the section is touched
	     (no document.body, no nav/footer, no Bootstrap or Webflow widgets).
	     The only global is window.initISDIProgrammesSection, kept so the
	     section can still be started when it is injected dynamically.
	     =================================================================== -->
	<script>
	(function () {
		"use strict";

		function initISDIProgrammesSection() {
			var section = document.getElementById("isdi-programmes-section");

			/* Not on this page, or already initialised -> do nothing */
			if (!section || section.getAttribute("data-isdi-initialized") === "true") return;
			section.setAttribute("data-isdi-initialized", "true");

			/* =====================================================================
			   PROGRAMME DATA
			   All 19 programmes, grouped into the five "worlds" shown on the cards.
			   Edit names, degrees, durations, colours and URLs here.

			     row     : 1 or 2 - which desktop row the card sits in
			     columns : 1 or 2 - number of programme columns inside the card
			     color   : card background colour
			     wide    : true  - card spans the full width on tablet (World 02)
			     id      : unique programme id, used by the quiz mapping below
			   ===================================================================== */
			var worlds = [
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
			var REQUIRED_SELECTIONS = 3;
			var DRUMROLL_DURATION = 2500; /* ms the drumroll loader is shown */

			var interests = [
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

			var dreams = [
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
			var interestMatrix = {
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
			var dreamMatrix = {
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
			var programmeScoreProfiles = {
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

			/* =====================================================================
			   SCORING
			   ===================================================================== */

			/* Flat list of all programmes, each one knowing which world it belongs to. */
			var allProgrammes = [];
			worlds.forEach(function (world) {
				world.programmes.forEach(function (programme) {
					allProgrammes.push({
						id: programme.id,
						name: programme.name,
						degree: programme.degree,
						duration: programme.duration,
						url: programme.url,
						world: world
					});
				});
			});

			/* Add up the matrix rows for the chosen interests + dreams, then sort
			   (stable sort, so ties keep the programme order defined above). */
			function calculateProgrammeScores(selectedInterests, selectedDreams) {
				var totals = {
					fashionDesign: 0,
					fashionComm: 0,
					commDesign: 0,
					productDesign: 0,
					interiorDesign: 0,
					strategicDesign: 0,
					animationVFX: 0
				};

				function addRow(row) {
					if (!row) return;
					Object.keys(row).forEach(function (key) { totals[key] += row[key]; });
				}

				selectedInterests.forEach(function (id) { addRow(interestMatrix[id]); });
				selectedDreams.forEach(function (id) { addRow(dreamMatrix[id]); });

				var results = allProgrammes.map(function (programme) {
					var profile = programmeScoreProfiles[programme.id] || {};
					var weightedTotal = 0;
					var weightSum = 0;

					Object.keys(profile).forEach(function (key) {
						weightedTotal += totals[key] * profile[key];
						weightSum += profile[key];
					});

					return {
						id: programme.id,
						name: programme.name,
						degree: programme.degree,
						duration: programme.duration,
						url: programme.url,
						world: programme.world,
						score: weightSum ? weightedTotal / weightSum : 0
					};
				});

				results.sort(function (a, b) { return b.score - a.score; });
				return results;
			}

			/* =====================================================================
			   RENDERING HELPERS
			   ===================================================================== */
			function escapeHtml(value) {
				return String(value)
					.replace(/&/g, "&amp;")
					.replace(/</g, "&lt;")
					.replace(/>/g, "&gt;")
					.replace(/"/g, "&quot;")
					.replace(/'/g, "&#39;");
			}

			var ARROW_ICON = '<svg class="isdi-arrow-sm" viewBox="0 0 12 8" fill="none" aria-hidden="true" focusable="false"><path d="M0 4h11M8 1l3 3-3 3" stroke="currentColor" stroke-width="1.1"/></svg>';
			var DOT = '<span class="isdi-dot" aria-hidden="true">&bull;</span>';

			/* "B.DES - 4 YEARS" */
			function renderMeta(programme) {
				return escapeHtml(programme.degree) + DOT + escapeHtml(programme.duration);
			}

			/* One programme row inside a world card */
			function renderProgrammeItem(programme) {
				return '<li class="isdi-programme-item">' +
						'<a class="isdi-programme-link" href="' + escapeHtml(programme.url) + '">' +
							'<span class="isdi-programme-top">' +
								'<span class="isdi-programme-name">' + escapeHtml(programme.name) + '</span>' +
								'<span class="isdi-programme-arrow">' + ARROW_ICON + '</span>' +
							'</span>' +
							'<span class="isdi-programme-detail">' + renderMeta(programme) + '</span>' +
						'</a>' +
					'</li>';
			}

			/* The programme list(s) inside a world card - one column, or two with a divider */
			function renderProgrammeList(world) {
				if (world.columns === 1) {
					return '<div class="isdi-programme-columns">' +
							'<ul class="isdi-programme-list isdi-programme-list--first">' +
								world.programmes.map(renderProgrammeItem).join("") +
							'</ul>' +
						'</div>';
				}

				var half = Math.ceil(world.programmes.length / 2);
				var firstColumn = world.programmes.slice(0, half);
				var secondColumn = world.programmes.slice(half);

				return '<div class="isdi-programme-columns isdi-programme-columns--split">' +
						'<ul class="isdi-programme-list isdi-programme-list--first">' +
							firstColumn.map(renderProgrammeItem).join("") +
						'</ul>' +
						'<ul class="isdi-programme-list isdi-programme-list--second">' +
							secondColumn.map(renderProgrammeItem).join("") +
						'</ul>' +
					'</div>';
			}

			/* A full world card */
			function renderWorldCard(world) {
				var count = world.programmes.length;
				var cardClass = "isdi-world-card" + (world.wide ? " isdi-world-card--wide" : "");
				var descriptionClass = "isdi-world-description" + (world.descriptionNarrow ? " isdi-world-description--narrow" : "");

				return '<article class="' + cardClass + '" style="--isdi-card-color: ' + escapeHtml(world.color) + ';">' +
						'<span class="isdi-world-number" aria-hidden="true">' + escapeHtml(world.number) + '</span>' +
						'<div class="isdi-world-body">' +
							'<p class="isdi-world-meta">World ' + escapeHtml(world.number) + DOT + count + ' ' + (count === 1 ? "Programme" : "Programmes") + '</p>' +
							'<h3 class="isdi-world-title">' + escapeHtml(world.title) + '</h3>' +
							'<p class="' + descriptionClass + '">' + escapeHtml(world.description) + '</p>' +
							renderProgrammeList(world) +
						'</div>' +
					'</article>';
			}

			function renderWorldCards() {
				var rowOne = section.querySelector("#isdi-programme-row-1");
				var rowTwo = section.querySelector("#isdi-programme-row-2");

				rowOne.innerHTML = worlds.filter(function (w) { return w.row === 1; }).map(renderWorldCard).join("");
				rowTwo.innerHTML = worlds.filter(function (w) { return w.row === 2; }).map(renderWorldCard).join("");
			}

			/* Quiz option pill: a visually hidden checkbox + a styled label */
			function renderOptionPill(option, groupName) {
				return '<label class="isdi-quiz-option">' +
						'<input type="checkbox" class="isdi-quiz-option-input isdi-quiz-' + groupName + '" value="' + option.id + '">' +
						'<span class="isdi-quiz-option-label">' + escapeHtml(option.text) + '</span>' +
					'</label>';
			}

			/* Result card for one recommended programme */
			function renderResultCard(programme) {
				return '<a class="isdi-result-card" href="' + escapeHtml(programme.url) + '" style="--isdi-card-color: ' + escapeHtml(programme.world.color) + ';">' +
						'<span class="isdi-result-top">' +
							'<span class="isdi-result-meta">World ' + escapeHtml(programme.world.number) + DOT + renderMeta(programme) + '</span>' +
							'<span class="isdi-result-arrow">' + ARROW_ICON + '</span>' +
						'</span>' +
						'<span class="isdi-result-name">' + escapeHtml(programme.name) + '</span>' +
					'</a>';
			}

			/* =====================================================================
			   QUIZ LOGIC
			   Step 1 (3 interests) -> Step 2 (3 dreams) -> drumroll -> Step 3 (top 3) -> Start Over
			   ===================================================================== */
			var step1 = section.querySelector("#isdi-quiz-step-1");
			var step2 = section.querySelector("#isdi-quiz-step-2");
			var step3 = section.querySelector("#isdi-quiz-step-3");
			var loading = section.querySelector("#isdi-quiz-loading");
			var interestList = section.querySelector("#isdi-interest-list");
			var dreamList = section.querySelector("#isdi-dream-list");
			var resultsContainer = section.querySelector("#isdi-quiz-results");
			var nextButton = section.querySelector("#isdi-quiz-next-button");
			var backButton = section.querySelector("#isdi-quiz-back-button");
			var resultsButton = section.querySelector("#isdi-quiz-results-button");
			var startOverButton = section.querySelector("#isdi-quiz-start-over-button");

			var drumrollTimer = null;

			function showStep(stepToShow) {
				[step1, step2, loading, step3].forEach(function (step) {
					if (step === stepToShow) {
						step.classList.remove("isdi-is-hidden");
					} else {
						step.classList.add("isdi-is-hidden");
					}
				});
			}

			/* Ids of the checked options, e.g. getSelectedIds(".isdi-quiz-interest") -> [1, 5, 9] */
			function getSelectedIds(selector) {
				return Array.prototype.slice
					.call(section.querySelectorAll(selector + ":checked"))
					.map(function (input) { return Number(input.value); });
			}

			/* Allow exactly 3 selections: lock the rest once 3 are picked and enable
			   the step button only when the count is exactly 3. */
			function updateSelectionState(selector, button) {
				var inputs = section.querySelectorAll(selector);
				var selectedCount = getSelectedIds(selector).length;
				var limitReached = selectedCount >= REQUIRED_SELECTIONS;

				Array.prototype.forEach.call(inputs, function (input) {
					if (!input.checked) input.disabled = limitReached;
				});
				button.disabled = selectedCount !== REQUIRED_SELECTIONS;
			}

			/* ---------- selection limits ---------- */
			interestList.addEventListener("change", function () {
				updateSelectionState(".isdi-quiz-interest", nextButton);
			});

			dreamList.addEventListener("change", function () {
				updateSelectionState(".isdi-quiz-dream", resultsButton);
			});

			/* ---------- step 1 -> step 2 ---------- */
			nextButton.addEventListener("click", function () {
				if (getSelectedIds(".isdi-quiz-interest").length !== REQUIRED_SELECTIONS) return;
				showStep(step2);
				updateSelectionState(".isdi-quiz-dream", resultsButton);
			});

			/* ---------- step 2 -> step 1 (selections are kept) ---------- */
			backButton.addEventListener("click", function () {
				showStep(step1);
				updateSelectionState(".isdi-quiz-interest", nextButton);
			});

			/* ---------- step 2 -> results ---------- */
			resultsButton.addEventListener("click", function () {
				var selectedInterests = getSelectedIds(".isdi-quiz-interest");
				var selectedDreams = getSelectedIds(".isdi-quiz-dream");

				if (selectedInterests.length !== REQUIRED_SELECTIONS || selectedDreams.length !== REQUIRED_SELECTIONS) return;

				var topThree = calculateProgrammeScores(selectedInterests, selectedDreams).slice(0, 3);
				resultsContainer.innerHTML = topThree.map(renderResultCard).join("");

				showStep(loading);

				clearTimeout(drumrollTimer);
				drumrollTimer = setTimeout(function () {
					drumrollTimer = null;
					showStep(step3);
				}, DRUMROLL_DURATION);
			});

			/* ---------- start over ---------- */
			startOverButton.addEventListener("click", function () {
				clearTimeout(drumrollTimer);
				drumrollTimer = null;

				Array.prototype.forEach.call(
					section.querySelectorAll(".isdi-quiz-interest, .isdi-quiz-dream"),
					function (input) {
						input.checked = false;
						input.disabled = false;
					}
				);

				resultsContainer.innerHTML = "";
				nextButton.disabled = true;
				resultsButton.disabled = true;

				showStep(step1);
			});

			/* =====================================================================
			   INITIAL RENDER
			   ===================================================================== */
			renderWorldCards();

			interestList.innerHTML = interests.map(function (option) {
				return renderOptionPill(option, "interest");
			}).join("");

			dreamList.innerHTML = dreams.map(function (option) {
				return renderOptionPill(option, "dream");
			}).join("");

			/* Helps when editing: warn if a programme has no quiz mapping */
			allProgrammes.forEach(function (programme) {
				if (!programmeScoreProfiles[programme.id]) {
					window.console && console.warn('PathFinder: no score profile for programme id "' + programme.id + '"');
				}
			});
		}

		/* Exposed so the section can also be started after a dynamic insert. */
		window.initISDIProgrammesSection = initISDIProgrammesSection;

		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", initISDIProgrammesSection);
		} else {
			initISDIProgrammesSection();
		}
	})();
	</script>

</section>
<!-- ISDI 19 PROGRAMMES SECTION END -->
