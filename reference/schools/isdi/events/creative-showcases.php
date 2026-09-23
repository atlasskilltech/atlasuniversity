<?php
$title = "ATLAS SkillTech University";
$description = "Get in touch with Atlas Skilltech.";
$keywords = "atlas, contact";
$css = "atlass-fantastic-site-48323a.webflow.68ee2166dcb0ec405538bf17-0ac23f5ef.css";
$js = "https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/js/webflow.b4252c84.760f8af03370493d.js";
$htmlDataId = "68ee2166dcb0ec405538bf17";
$body = "body isdi-page";

include "../assets/include/header.php" ?> 


<div class="section nopad">
	<div class="swiper swiperprogress">
		<div class="swiper-wrapper">
			<div class="swiper-slide">
				<div class="inner-header-wrapper under-grad">
					<div class="inner-header-cover padd">
						<div class="hero-text">
							<div class="h1-tag">Creative Showcases</div>
							<div class="course-desc-isme big-txt">Annual showcases, studio days, and exhibitions that celebrate student creativity and design excellence. A platform where ideas <br />are presented, critiqued, and applauded by peers, faculty, and <br />industry experts.</div>
						</div>
					</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905abaea33dde5f09f3f291_creative-showcase-hero-section-2.png" loading="lazy" sizes="(max-width: 1439px) 100vw, 1365.9765625px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905abaea33dde5f09f3f291_creative-showcase-hero-section-2-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905abaea33dde5f09f3f291_creative-showcase-hero-section-2-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905abaea33dde5f09f3f291_creative-showcase-hero-section-2-p-1080.png 1080w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905abaea33dde5f09f3f291_creative-showcase-hero-section-2.png 1366w" alt="" class="header-image-inner" />
				</div>
			</div>
			<div class="swiper-slide">
				<div class="inner-header-wrapper under-grad">
					<div class="inner-header-cover padd">
						<div class="hero-text">
							<div class="h1-tag">Creative Showcases</div>
							<div class="course-desc-isme big-txt">Annual showcases, studio days, and exhibitions that celebrate student creativity and design excellence. A platform where ideas <br />are presented, critiqued, and applauded by peers, faculty, and <br />industry experts.</div>
						</div>
					</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905abaf2125dde9511f67e8_creative-showcase-hero-section.png" loading="lazy" sizes="(max-width: 1439px) 100vw, 1365.9765625px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905abaf2125dde9511f67e8_creative-showcase-hero-section-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905abaf2125dde9511f67e8_creative-showcase-hero-section-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905abaf2125dde9511f67e8_creative-showcase-hero-section-p-1080.png 1080w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905abaf2125dde9511f67e8_creative-showcase-hero-section.png 1366w" alt="" class="header-image-inner" />
				</div>
			</div>
			<div class="swiper-slide">
				<div class="inner-header-wrapper under-grad">
					<div class="inner-header-cover padd">
						<div class="hero-text">
							<div class="h1-tag">Creative Showcases</div>
							<div class="course-desc-isme big-txt">Annual showcases, studio days, and exhibitions that celebrate student creativity and design excellence. A platform where ideas <br />are presented, critiqued, and applauded by peers, faculty, and <br />industry experts.</div>
						</div>
					</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6904c9436658f077838473d7_hero-image.png" loading="lazy" sizes="(max-width: 1439px) 100vw, 1365.9765625px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6904c9436658f077838473d7_hero-image-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6904c9436658f077838473d7_hero-image-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6904c9436658f077838473d7_hero-image-p-1080.png 1080w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6904c9436658f077838473d7_hero-image.png 1366w" alt="" class="header-image-inner" />
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
				bottom: 5%;
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
<div class="sticky-menus center"><a href="#studio-day" class="anchor-link isdi-anchor">Studio Day</a><a href="#sensorium" class="anchor-link isdi-anchor">Sensorium - Fashion Show</a><a href="#graduate-showcase" class="anchor-link isdi-anchor">Graduate Showcase - Design Odyssey</a></div>
<div class="white-wrapper">
	<div class="container">
		<div id="studio-day" class="common-wrapper-lg">
			<h2 class="h2-tag mrg16 isdi">Studio Day</h2>
			<div class="sub-heading">A celebration where students showcase their projects to industry experts, peers, and partners. Encourages recognition, networking, and meaningful feedback.</div>
			<div class="duplicate-grid-wrapper">
				<div class="grid-gallery-flex mrgtp">
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/69037405b5ebe420b3aada78_creativeshowcase-grid-1-1.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6903740323d405aff0a93f5d_creativeshowcase-grid-1-2.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/69037403826a8593f6930ce5_creativeshowcase-grid-1-3.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690374033fb1b091b972e221_creativeshowcase-grid-1-4.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/69037403a58b22a635f45152_creativeshowcase-grid-1-5.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690374058262db40264a53fd_creativeshowcase-grid-1-6.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690374045e2ef14f288f1619_creativeshowcase-grid-1-7.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6903740336478f1ac2f0bea7_creativeshowcase-grid-1-8.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
				</div>
			</div>
		</div>
		<div id="sensorium" class="common-wrapper-lg">
			<h2 class="h2-tag mrg16 isdi">Sensorium - Fashion Show</h2>
			<div class="sub-heading">Annual fashion showcase highlighting creativity, craftsmanship, and storytelling. Students present their designs on stage, blending aesthetics with concept.</div>
			<div class="swiper zoom-slider mrg56">
				<div class="swiper-wrapper">
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee3144da88c5ebb0d46890_event-creative-showcases-swiper-1-003.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee314462d9c1fccfdd430a_event-creative-showcases-swiper-1-004.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee314429ef9cd689c80f81_event-creative-showcases-swiper-1-011.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee31433e95893f72f3978d_event-creative-showcases-swiper-1-001.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee314425cc036a03730c6c_event-creative-showcases-swiper-1-009.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee3144c9daa8157f8919c6_event-creative-showcases-swiper-1-002.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee3144bea177d8db2e7f76_event-creative-showcases-swiper-1-010.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee31440ad73f70abf74781_event-creative-showcases-swiper-1-008.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee3144a073418df4082017_event-creative-showcases-swiper-1-005.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee3144e0d4958507e513af_event-creative-showcases-swiper-1-006.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee3145b09951dd313b57a3_event-creative-showcases-swiper-1-007.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
				</div>
			</div>
		</div>
		<div id="graduate-showcase" class="common-wrapper-lg">
			<h2 class="h2-tag mrg16 isdi">Graduate Showcase - Design Odyssey</h2>
			<div class="sub-heading">The culminating showcase of graduating students’ work across disciplines. Highlights innovation, technical skill, and conceptual depth for industry and public audiences.</div>
			<div class="duplicate-grid-wrapper">
				<div class="grid-gallery-flex mrgtp">
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ed06d1675f41f17afc0dc9_immersions-and-experiences-swiper2%20(6).png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ed06d14e872bb260dfc65f_immersions-and-experiences-swiper2%20(3).png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ed06d13e804fc388471e60_immersions-and-experiences-swiper2%20(1).png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ed06d100af8fc526536804_immersions-and-experiences-swiper2.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ed06d13e804fc388471e48_immersions-and-experiences-swiper2%20(4).png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ed06d121338d6eb2d5d838_immersions-and-experiences-swiper2%20(7).png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ed06d1431234be645a509d_immersions-and-experiences-swiper2%20(5).png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ed06d140703e7fde7c6c3d_immersions-and-experiences-swiper2%20(2).png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div> 

<?php include "../assets/include/footer.php" ?>