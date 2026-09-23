<?php
$title = "ATLAS SkillTech University";
$description = "Get in touch with Atlas Skilltech.";
$keywords = "atlas, contact";
$css = "atlass-fantastic-site-48323a.webflow.68edfd4bbb15da9c1d5debe1-b3dcdbb22.css";
$js = "https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/js/webflow.d24778d3.40ac20f70c8f030f.js";
$htmlDataId = "68edfd4bbb15da9c1d5debe1";
$body = "body isdi-page";

include "../assets/include/header.php" ?> 

<div class="section nopad">
	<div class="swiper swiperprogress">
		<div class="swiper-wrapper">
			<div class="swiper-slide">
				<div class="inner-header-wrapper under-grad">
					<div class="inner-header-cover padd">
						<div class="hero-text">
							<div class="h1-tag">Skill &amp; Tech Innovation</div>
							<div class="course-desc-isme big-txt">Skill &amp; Tech InnovationHands-on workshops, hackathons, and tech-driven explorations that blend design, innovation, and emerging technologies. Students experiment, prototype, and push boundaries to create future-ready solutions.</div>
						</div>
					</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ab0411ff93594173b7a7_skill-and-tech-hero-image.png" loading="lazy" sizes="(max-width: 1366px) 100vw, 1366px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ab0411ff93594173b7a7_skill-and-tech-hero-image-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ab0411ff93594173b7a7_skill-and-tech-hero-image-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ab0411ff93594173b7a7_skill-and-tech-hero-image-p-1080.png 1080w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ab0411ff93594173b7a7_skill-and-tech-hero-image.png 1366w" alt="" class="header-image-inner" />
				</div>
			</div>
			<div class="swiper-slide">
				<div class="inner-header-wrapper under-grad">
					<div class="inner-header-cover padd">
						<div class="hero-text">
							<div class="h1-tag">Skill &amp; Tech Innovation</div>
							<div class="course-desc-isme big-txt">Skill &amp; Tech InnovationHands-on workshops, hackathons, and tech-driven explorations that blend design, innovation, and emerging technologies. Students experiment, prototype, and push boundaries to create future-ready solutions.</div>
						</div>
					</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ab0454cb3da4a3f2fa89_skill-and-tech-hero-image-3.png" loading="lazy" sizes="(max-width: 1366px) 100vw, 1366px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ab0454cb3da4a3f2fa89_skill-and-tech-hero-image-3-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ab0454cb3da4a3f2fa89_skill-and-tech-hero-image-3-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ab0454cb3da4a3f2fa89_skill-and-tech-hero-image-3-p-1080.png 1080w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ab0454cb3da4a3f2fa89_skill-and-tech-hero-image-3.png 1366w" alt="" class="header-image-inner" />
				</div>
			</div>
			<div class="swiper-slide">
				<div class="inner-header-wrapper under-grad">
					<div class="inner-header-cover padd">
						<div class="hero-text">
							<div class="h1-tag">Skill &amp; Tech Innovation</div>
							<div class="course-desc-isme big-txt">Skill &amp; Tech InnovationHands-on workshops, hackathons, and tech-driven explorations that blend design, innovation, and emerging technologies. Students experiment, prototype, and push boundaries to create future-ready solutions.</div>
						</div>
					</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ab04d3ebce48e50b1526_skill-and-tech-hero-image-2.png" loading="lazy" sizes="(max-width: 1366px) 100vw, 1366px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ab04d3ebce48e50b1526_skill-and-tech-hero-image-2-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ab04d3ebce48e50b1526_skill-and-tech-hero-image-2-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ab04d3ebce48e50b1526_skill-and-tech-hero-image-2-p-1080.png 1080w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ab04d3ebce48e50b1526_skill-and-tech-hero-image-2.png 1366w" alt="" class="header-image-inner" />
				</div>
			</div>
		</div>
		<div class="custom-pagination"></div>
	</div>
	<div class="progress-swiper-code w-embed w-script">
		<style>
		.custom-pagination {
			display: flex;
			flex-direction: column;
			position: absolute;
			top: 50%;
			right: 80px;
			transform: translateY(-50%);
			z-index: 10;
			gap: 20px;
		}

		.progress-circle {
			width: 68px;
			height: 68px;
			border-radius: 50%;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
		}

		/* Small inner dot (for all circles) */
		.progress-circle::before {
			content: "";
			width: 8px;
			height: 8px;
			background-color: #fff;
			border-radius: 50%;
			position: absolute;
		}

		/* SVG Progress Ring */
		.progress-circle svg {
			width: 100%;
			height: 100%;
			position: absolute;
			transform: rotate(-90deg);
		}

		/* Background Ring (Thinner Stroke - Always visible) */
		.progress-circle svg .bg-ring {
			stroke: none;
			stroke-width: 1px;
			fill: none;
			stroke-dasharray: 62.8;
			stroke-dashoffset: 0;
		}

		.progress-circle.active svg .bg-ring {
			stroke: #FFFFFF66;
		}

		/* Foreground Ring (Thicker & Animates) */
		.progress-circle svg .fg-ring {
			stroke: #fff;
			stroke-width: 2px;
			fill: none;
			stroke-dasharray: 62.8;
			stroke-dashoffset: 62.8;
			transition: stroke-dashoffset 0.1s linear;
			transform-origin: center;
		}

		/* Only animate the active progress circle */
		.progress-circle.active .fg-ring {
			stroke-dashoffset: 0;
		}

		@media only screen and (max-width: 768px) {
			.custom-pagination {
				flex-direction: row;
				top: inherit;
				right: inherit;
				bottom: 2%;
				left: 50%;
				transform: translateX(-50%);
			}

			.inner-header-cover {
				padding-bottom: 40%;
			}
		}
		</style>
		<script>
		document.addEventListener("DOMContentLoaded", function() {
			const swiperProgress = new Swiper(".swiperprogress", {
				spaceBetween: 0,
				centeredSlides: true,
				autoplay: {
					delay: 10000,
					disableOnInteraction: false
				},
				on: {
					init: function() {
						const paginationContainer = document.querySelector(".custom-pagination");
						this.slides.forEach((_, index) => {
							const progressCircle = document.createElement("div");
							progressCircle.classList.add("progress-circle");
							progressCircle.innerHTML = `
                        <svg viewBox="0 0 24 24">
                            <circle class="bg-ring" cx="12" cy="12" r="10"></circle>
                            <circle class="fg-ring" cx="12" cy="12" r="10"></circle>
                        </svg>
                    `;
							progressCircle.addEventListener("click", function() {
								swiperProgress.slideTo(index);
							});
							paginationContainer.appendChild(progressCircle);
						});
					},
					autoplayTimeLeft: function(s, time, progress) {
						const progressCircles = document.querySelectorAll(".progress-circle");
						progressCircles.forEach((circle, index) => {
							const fgRing = circle.querySelector(".fg-ring");
							if(index === s.realIndex) {
								circle.classList.add("active");
								fgRing.style.strokeDashoffset = 62.8 * (progress);
							} else {
								circle.classList.remove("active");
								fgRing.style.strokeDashoffset = 62.8;
							}
						});
					}
				}
			});
		});
		</script>
	</div>
</div>
<div class="sticky-menus center"><a href="#hands-on-workshop" class="anchor-link isdi-anchor">Hands on workshop</a><a href="#design-hackathon" class="anchor-link isdi-anchor">Design Hackathon</a><a href="#tech-exploratorium" class="anchor-link isdi-anchor">Tech Exploratorium</a><a href="#hands-of-heritage" class="anchor-link isdi-anchor">Hands of Heritage</a><a href="#abcd" class="anchor-link isdi-anchor">ABCD</a><a href="#ink---imagination" class="anchor-link isdi-anchor">Ink &amp; Imagination - Caligraphy Day</a></div>
<div class="white-wrapper">
	<div class="container">
		<div id="hands-on-workshop" class="common-wrapper-lg">
			<h2 class="h2-tag mrg16 isdi">Hands on workshop</h2>
			<div class="sub-heading">Interactive sessions where students experiment with tools, techniques, and creative processes. Encourages practical skill-building and hands-on exploration.</div>
			<div class="swiper zoom-slider mrg56">
				<div class="swiper-wrapper">
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee01e6fe177493fc50caf5_event-skillandinnovation-2025-001.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee01e6a851480a3e2051a8_event-skillandinnovation-2025-002.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee01e519e615bc52da9e5c_event-skillandinnovation-2025-003.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee01e53f85f343c22b1bcd_event-skillandinnovation-2025-004.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee01e56df1cc984c0e157e_event-skillandinnovation-2025-005.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee01e66c73127b7f19a017_event-skillandinnovation-2025-006.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee01e7f39aed560baad90c_event-skillandinnovation-2025-007.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
				</div>
			</div>
		</div>
		<div id="design-hackathon" class="common-wrapper-lg">
			<h2 class="h2-tag mrg16 isdi">Design Hackathon</h2>
			<div class="sub-heading">Intensive design challenges where students ideate, prototype, and present solutions. Fosters teamwork, rapid problem-solving, and creative thinking.</div>
			<div class="instagram-wrapper mobile-vert-scroll mar-0">
				<div class="grid-gallery-flex mrgtp">
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6903632d6d0a48737f630946_grid-skill-tech-1-1.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6903632d473411f5c9cbd57e_grid-skill-tech-1-2.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6903632d40e072b03ea5430f_grid-skill-tech-1-3.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6903632d759ad8c8290ee975_grid-skill-tech-1-4.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6903632d1a28b68e5024f769_grid-skill-tech-1-5.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6903632d1a28b68e5024f794_grid-skill-tech-1-6.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6903632db1e32d78e601d8be_grid-skill-tech-1-7.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6903632d71cbbafa36ff533d_grid-skill-tech-1-8.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
				</div>
			</div>
		</div>
		<div id="tech-exploratorium" class="common-wrapper-lg">
			<h2 class="h2-tag mrg16 isdi">Tech Exploratorium</h2>
			<div class="sub-heading">An interactive showcase of emerging technologies and design tools. Students experiment with AI, AR/VR, and other innovations to push creative boundaries.</div>
			<div class="swiper zoom-slider-lg mrgtp">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<div data-slider-card-a-bg="Paste image url" class="slider-card-b isdi"><img sizes="(max-width: 802px) 100vw, 802px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee09195ff20ddd855acce8_event-skillandinnovation-swiper-last-001-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee09195ff20ddd855acce8_event-skillandinnovation-swiper-last-001-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee09195ff20ddd855acce8_event-skillandinnovation-swiper-last-001.png 802w" alt="" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee09195ff20ddd855acce8_event-skillandinnovation-swiper-last-001.png" loading="lazy" class="slide-card-b-image" /></div>
					</div>
					<div class="swiper-slide">
						<div data-slider-card-a-bg="Paste image url" class="slider-card-b isdi"><img sizes="(max-width: 802px) 100vw, 802px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee091922aaf969424afc45_event-skillandinnovation-swiper-last-002-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee091922aaf969424afc45_event-skillandinnovation-swiper-last-002-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee091922aaf969424afc45_event-skillandinnovation-swiper-last-002.png 802w" alt="" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee091922aaf969424afc45_event-skillandinnovation-swiper-last-002.png" loading="lazy" class="slide-card-b-image" /></div>
					</div>
					<div class="swiper-slide">
						<div data-slider-card-a-bg="Paste image url" class="slider-card-b isdi"><img sizes="(max-width: 802px) 100vw, 802px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee091922e8ef16e355d14a_event-skillandinnovation-swiper-last-003-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee091922e8ef16e355d14a_event-skillandinnovation-swiper-last-003-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee091922e8ef16e355d14a_event-skillandinnovation-swiper-last-003.png 802w" alt="" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee091922e8ef16e355d14a_event-skillandinnovation-swiper-last-003.png" loading="lazy" class="slide-card-b-image" /></div>
					</div>
					<div class="swiper-slide">
						<div data-slider-card-a-bg="Paste image url" class="slider-card-b isdi"><img sizes="(max-width: 802px) 100vw, 802px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee091925cc036a03654e78_event-skillandinnovation-swiper-last-004-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee091925cc036a03654e78_event-skillandinnovation-swiper-last-004-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee091925cc036a03654e78_event-skillandinnovation-swiper-last-004.png 802w" alt="" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee091925cc036a03654e78_event-skillandinnovation-swiper-last-004.png" loading="lazy" class="slide-card-b-image" /></div>
					</div>
					<div class="swiper-slide">
						<div data-slider-card-a-bg="Paste image url" class="slider-card-b isdi"><img sizes="(max-width: 802px) 100vw, 802px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee0918aedee4a7d5caa27c_event-skillandinnovation-swiper-last-005-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee0918aedee4a7d5caa27c_event-skillandinnovation-swiper-last-005-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee0918aedee4a7d5caa27c_event-skillandinnovation-swiper-last-005.png 802w" alt="" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee0918aedee4a7d5caa27c_event-skillandinnovation-swiper-last-005.png" loading="lazy" class="slide-card-b-image" /></div>
					</div>
				</div>
			</div>
		</div>
		<div id="hands-of-heritage" class="common-wrapper-lg">
			<h2 class="h2-tag mrg16 isdi">Hands of Heritage</h2>
			<div class="sub-heading">A workshop celebrating traditional crafts and techniques. Students explore heritage practices while integrating contemporary design perspectives.</div>
			<div class="instagram-wrapper mobile-vert-scroll mar-0">
				<div class="grid-gallery-flex mrgtp">
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee039b01147607ab10ae24_event-skillandinnovation-grid-1-007.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee039af2c4b77f20a80395_event-skillandinnovation-grid-1-004.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee039ab09951dd312b9b7c_event-skillandinnovation-grid-1-002.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee039b43e1a8e8d90b294b_event-skillandinnovation-grid-1-001.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee039a51cef1583b53b1f4_event-skillandinnovation-grid-1-005.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee039b38f467e2570b8c15_event-skillandinnovation-grid-1-008.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee039baf7ff65b50aad86e_event-skillandinnovation-grid-1-006.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee039a3d50b36ee8837c63_event-skillandinnovation-grid-1-003.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
				</div>
			</div>
		</div>
		<div id="abcd" class="common-wrapper-lg">
			<h2 class="h2-tag mrg16 isdi">ABCD</h2>
			<div class="sub-heading">Immersive experiences that explore local and global cultures. Students gain inspiration from traditions, arts, and social contexts.</div>
			<div class="swiper zoom-slider mrg56">
				<div class="swiper-wrapper">
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee04979d0da3d119011623_event-skillandinnovation-swiper-2-001.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee049585f7babff357ce07_event-skillandinnovation-swiper-2-002.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee0497c28c8b852818185b_event-skillandinnovation-swiper-2-003.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee0497d3073f2188026c6c_event-skillandinnovation-swiper-2-004.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee0496fc24f88cacca6cc7_event-skillandinnovation-swiper-2-005.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee0497dd4ebeea333b1bd7_event-skillandinnovation-swiper-2-006.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee0497c11de1624ef68009_event-skillandinnovation-swiper-2-007.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee049702a3f711349d2d3e_event-skillandinnovation-swiper-2-008.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee04973f3886084a6613e5_event-skillandinnovation-swiper-2-009.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee04979d0da3d119011623_event-skillandinnovation-swiper-2-001.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee049585f7babff357ce07_event-skillandinnovation-swiper-2-002.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee0497c28c8b852818185b_event-skillandinnovation-swiper-2-003.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee0497d3073f2188026c6c_event-skillandinnovation-swiper-2-004.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee0496fc24f88cacca6cc7_event-skillandinnovation-swiper-2-005.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee0497dd4ebeea333b1bd7_event-skillandinnovation-swiper-2-006.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee0497c11de1624ef68009_event-skillandinnovation-swiper-2-007.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee049702a3f711349d2d3e_event-skillandinnovation-swiper-2-008.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee04973f3886084a6613e5_event-skillandinnovation-swiper-2-009.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
				</div>
			</div>
		</div>
		<div id="ink---imagination" class="common-wrapper-lg">
			<h2 class="h2-tag mrg16 isdi">Ink &amp; Imagination - Caligraphy Day</h2>
			<div class="sub-heading">A creative day dedicated to exploring the art of calligraphy and expressive writing. Students learn techniques to blend artistry with storytelling.</div>
			<div class="instagram-wrapper mobile-vert-scroll mar-0">
				<div class="grid-gallery-flex mrgtp">
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee05eab702c1f04ddea076_event-skillandinnovation-grid-2-007.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee05e96df1cc984c0f343f_event-skillandinnovation-grid-2-004.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee05ea069a3e3c471decde_event-skillandinnovation-grid-2-002.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee05ea24b64f113ede3108_event-skillandinnovation-grid-2-001.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee05eacc3e57d65df09738_event-skillandinnovation-grid-2-005.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee05eae4de6fd9a806d0c7_event-skillandinnovation-grid-2-008.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee05ea19e615bc52dbc4db_event-skillandinnovation-grid-2-006.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee05ea1a02fe6cdda00da9_event-skillandinnovation-grid-2-003.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
				</div>
			</div>
		</div>
		<div class="common-wrapper"></div>
	</div>
</div> 

<?php include "../assets/include/footer.php" ?>