<?php
$title = "ATLAS SkillTech University";
$description = "Get in touch with Atlas Skilltech.";
$keywords = "atlas, contact";
$css = "atlass-fantastic-site-48323a.webflow.68ee34c185f7babff368afda-c1d564dad.css";
$js = "https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/js/webflow.b4252c84.760f8af03370493d.js";
$htmlDataId = "68ee34c185f7babff368afda";
$body = "body isdi-page";

include "../assets/include/header.php" ?> 

<div class="section nopad">
	<div class="swiper swiperprogress">
		<div class="swiper-wrapper">
			<div class="swiper-slide">
				<div class="inner-header-wrapper under-grad">
					<div class="inner-header-cover padd">
						<div class="hero-text">
							<div class="h1-tag">Industry &amp; Mentorship</div>
							<div class="course-desc-isme big-txt">Connects students with leading industry experts, fostering collaboration and creative problem-solving. Students gain real-world insights while exploring innovative idea</div>
						</div>
					</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ad2d63026f5da267fc6b_industry-and-mentorship-hero-section.png" loading="lazy" sizes="(max-width: 1366px) 100vw, 1366px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ad2d63026f5da267fc6b_industry-and-mentorship-hero-section-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ad2d63026f5da267fc6b_industry-and-mentorship-hero-section-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ad2d63026f5da267fc6b_industry-and-mentorship-hero-section-p-1080.png 1080w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ad2d63026f5da267fc6b_industry-and-mentorship-hero-section.png 1366w" alt="" class="header-image-inner" />
				</div>
			</div>
			<div class="swiper-slide">
				<div class="inner-header-wrapper under-grad">
					<div class="inner-header-cover padd">
						<div class="hero-text">
							<div class="h1-tag">Industry &amp; Mentorship</div>
							<div class="course-desc-isme big-txt">Connects students with leading industry experts, fostering collaboration and creative problem-solving. Students gain real-world insights while exploring innovative idea</div>
						</div>
					</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ad2dd861d629719d3c17_industry-and-mentorship-hero-image-1.png" loading="lazy" sizes="(max-width: 1366px) 100vw, 1366px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ad2dd861d629719d3c17_industry-and-mentorship-hero-image-1-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ad2dd861d629719d3c17_industry-and-mentorship-hero-image-1-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ad2dd861d629719d3c17_industry-and-mentorship-hero-image-1-p-1080.png 1080w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ad2dd861d629719d3c17_industry-and-mentorship-hero-image-1.png 1366w" alt="" class="header-image-inner" />
				</div>
			</div>
			<div class="swiper-slide">
				<div class="inner-header-wrapper under-grad">
					<div class="inner-header-cover padd">
						<div class="hero-text">
							<div class="h1-tag">Industry &amp; Mentorship</div>
							<div class="course-desc-isme big-txt">Connects students with leading industry experts, fostering collaboration and creative problem-solving. Students gain real-world insights while exploring innovative idea</div>
						</div>
					</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ad42a72fa345e3c3b39a_industry-and-mentorship-hero-section-4.png" loading="lazy" sizes="(max-width: 1366px) 100vw, 1366px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ad42a72fa345e3c3b39a_industry-and-mentorship-hero-section-4-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ad42a72fa345e3c3b39a_industry-and-mentorship-hero-section-4-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ad42a72fa345e3c3b39a_industry-and-mentorship-hero-section-4-p-1080.png 1080w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905ad42a72fa345e3c3b39a_industry-and-mentorship-hero-section-4.png 1366w" alt="" class="header-image-inner" />
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
<div class="sticky-menus"><a href="#Creative-catalyst" class="anchor-link isdi-anchor">Creative Catalyst</a><a href="#atlas-rtl" class="anchor-link isdi-anchor">ATLAS RTC</a><a href="#AIDC" class="anchor-link isdi-anchor">AIDC</a><a href="#Alumni-talks" class="anchor-link isdi-anchor">Alumni Talks</a><a href="#Guest-lectures" class="anchor-link isdi-anchor">Mentorship Sessions</a><a href="#Global-masterclasses" class="anchor-link isdi-anchor">Global Masterclasses</a><a href="#Elev8" class="anchor-link isdi-anchor">Co Elev8</a><a href="#Conserv" class="anchor-link isdi-anchor">ConSERV</a><a href="#snap-ar" class="anchor-link isdi-anchor">SNAP - AR</a><a href="#fof" class="anchor-link isdi-anchor">Friends of Figma</a><a href="#WDCD" class="anchor-link isdi-anchor">WDCD</a><a href="#parsons-week" class="anchor-link isdi-anchor">Parsons week</a></div>
<div class="white-wrapper">
	<div class="common-wrapper-lg">
		<div class="container">
			<h2 id="Creative-catalyst" class="h2-tag mrg16 isdi">Industry Engagement &amp; Leadership/ <br />Creative catalyst</h2>
			<div class="sub-heading">Students experience international design hubs, trends, and practices. Encourages cross-cultural understanding and global perspective in design.</div>
			<div class="instagram-wrapper mobile-vert-scroll mar-0">
				<div class="grid-gallery-flex mrgtp">
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee374f6d9b37aad1b762e7_industry-mentorship-grid-1-001.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee374ee9e6a4e9a260f634_industry-mentorship-grid-1-002.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee374fe9e6a4e9a260f665_industry-mentorship-grid-1-003.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee374d27ae21ea490fa6ed_industry-mentorship-grid-1-004.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee374e3a986a4456bf9f56_industry-mentorship-grid-1-005.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee374eee2e53b120b0a428_industry-mentorship-grid-1-006.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee374e20ea2095a72a575d_industry-mentorship-grid-1-007.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee374ffc24f88cacdbc842_industry-mentorship-grid-1-008.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee374d1a184574ec852fcf_industry-mentorship-grid-1-009.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee374fe433ce5fde7dc0e7_industry-mentorship-grid-1-010.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee374db1e53b385576e9e5_industry-mentorship-grid-1-011.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee374fbea177d8db30ab25_industry-mentorship-grid-1-012.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee374fdec0e360f54afb35_industry-mentorship-grid-1-013.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee374ec1203b5e759ced04_industry-mentorship-grid-1-014.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee374ff25ccf964aaa269c_industry-mentorship-grid-1-015.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee374ed2e47015424812eb_industry-mentorship-grid-1-016.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="atlas-rtl" class="common-wrapper-lg">
		<div class="container">
			<h2 class="h2-tag mrg16 isdi">ATLAS RTC (Industry Round Table Conference)</h2>
			<div class="sub-heading">A high-level forum where designers, educators, and industry leaders discuss emerging trends. Inspires dialogue and actionable strategies for the evolving design landscape.</div>
			<div class="instagram-wrapper mobile-vert-scroll mar-0">
				<div class="grid-gallery-flex mrgtp">
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee3b793b79c10eab176b68_industry-and-mentorship-grid-2-01.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee3b78432978e6bc21e801_industry-and-mentorship-grid-2-02.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee3b78432978e6bc21e82b_industry-and-mentorship-grid-2-03.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee3b79f5e0af4e8dc21243_industry-and-mentorship-grid-2-04.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee3b785494a10136a38dc7_industry-and-mentorship-grid-2-05.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee3b797d7aabe20e74ffc8_industry-and-mentorship-grid-2-06.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee3b7913087b9521129410_industry-and-mentorship-grid-2-07.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee3b799422ebb9444cc1d6_industry-and-mentorship-grid-2-08.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="AIDC" class="common-wrapper-lg">
		<div class="container">
			<h2 class="h2-tag mrg16 isdi">AIDC (ATLAS Industry Design Confluence)</h2>
			<div class="sub-heading mrgbtm">A convergence of ideas, projects, and creative minds from multiple disciplines. Participants explore collaborative opportunities and industry-driven solutions.</div>
		</div>
	</div>
	<div class="swiper marquee-swiper">
		<div class="swiper-wrapper">
			<div data-wf--card-type-d--variant="isdi" class="card-type-d swiper-slide"><a data-video="https://www.youtube.com/watch?v=nko8PuMgnT8" href="#" class="play-icon w-inline-block"></a>
				<div class="cd-tyd-txt-wrap">
					<div class="cd-tyd-detail">
						<div class="cd-tyd-text">Amitesh Rao</div>
						<div class="cd-tyd-tx">CEO</div>
						<div class="cd-tyd-posi"></div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68eca5abd03e55a3183b99cd_image-8.png" loading="lazy" alt="" class="cd-tyd-logo-img" />
					</div>
				</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4d479572ac7438a9691d_event-industry-and-mentorship-mentors-013.png" loading="lazy" alt="" class="cd-tyd-image" />
			</div>
			<div data-wf--card-type-d--variant="isdi" class="card-type-d swiper-slide"><a data-video="https://drive.google.com/file/d/1oWStAkZK2dvLL6nV0ecX8XypSAwekkXt/view?usp=drive_link" href="#" class="play-icon w-inline-block"></a>
				<div class="cd-tyd-txt-wrap">
					<div class="cd-tyd-detail">
						<div class="cd-tyd-text">Tanu Sinha</div>
						<div class="cd-tyd-tx">Head of Design</div>
						<div class="cd-tyd-posi"></div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68eca5abd7af48aaabc14a23_replace-logo.png" loading="lazy" alt="" class="cd-tyd-logo-img" />
					</div>
				</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4d4725cc036a037d5d93_event-industry-and-mentorship-mentors-014.png" loading="lazy" alt="" class="cd-tyd-image" />
			</div>
			<div data-wf--card-type-d--variant="isdi" class="card-type-d swiper-slide"><a data-video="" href="#" class="play-icon w-inline-block"></a>
				<div class="cd-tyd-txt-wrap">
					<div class="cd-tyd-detail">
						<div class="cd-tyd-text">Sonia Manchanda</div>
						<div class="cd-tyd-tx">Founding Partner</div>
						<div class="cd-tyd-posi"></div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68eca5ab29bc76be1fe1de96_image-6.png" loading="lazy" alt="" class="cd-tyd-logo-img" />
					</div>
				</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4d471848323a0b2c8557_event-industry-and-mentorship-mentors-009.png" loading="lazy" alt="" class="cd-tyd-image" />
			</div>
			<div data-wf--card-type-d--variant="isdi" class="card-type-d swiper-slide"><a data-video="" href="#" class="play-icon w-inline-block"></a>
				<div class="cd-tyd-txt-wrap">
					<div class="cd-tyd-detail">
						<div class="cd-tyd-text">Satyam Kantamneni</div>
						<div class="cd-tyd-tx">Managing Partner</div>
						<div class="cd-tyd-posi"></div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68eca5ab7d54025b3c85f40d_image-2.png" loading="lazy" alt="" class="cd-tyd-logo-img" />
					</div>
				</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4d472e6ba39744a0c05d_event-industry-and-mentorship-mentors-012.png" loading="lazy" alt="" class="cd-tyd-image" />
			</div>
			<div data-wf--card-type-d--variant="isdi" class="card-type-d swiper-slide"><a data-video="https://youtu.be/p2zCVkQdMtM" href="#" class="play-icon w-inline-block"></a>
				<div class="cd-tyd-txt-wrap">
					<div class="cd-tyd-detail">
						<div class="cd-tyd-text">Lulu Raghavan</div>
						<div class="cd-tyd-tx">President APAC</div>
						<div class="cd-tyd-posi"></div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68eca5ac093cdb57fc97a13c_replace-logo-2.png" loading="lazy" alt="" class="cd-tyd-logo-img" />
					</div>
				</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4d479c7b10140a7dfbfa_event-industry-and-mentorship-mentors-005.png" loading="lazy" alt="" class="cd-tyd-image" />
			</div>
			<div data-wf--card-type-d--variant="isdi" class="card-type-d swiper-slide"><a data-video="https://www.youtube.com/embed/DRCPfJBynd4" href="https://www.youtube.com/shorts/DRCPfJBynd4" class="play-icon w-inline-block"></a>
				<div class="cd-tyd-txt-wrap">
					<div class="cd-tyd-detail">
						<div class="cd-tyd-text">Ayan pal</div>
						<div class="cd-tyd-tx">Head of Experience &amp; Design</div>
						<div class="cd-tyd-posi"></div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68eca5ab1bd651bf880c272b_replace-logo-1.png" loading="lazy" alt="" class="cd-tyd-logo-img" />
					</div>
				</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4d47bbb787cca5ae3486_event-industry-and-mentorship-mentors-011.png" loading="lazy" alt="" class="cd-tyd-image" />
			</div>
			<div data-wf--card-type-d--variant="isdi" class="card-type-d swiper-slide"><a data-video="" href="#" class="play-icon w-inline-block"></a>
				<div class="cd-tyd-txt-wrap">
					<div class="cd-tyd-detail">
						<div class="cd-tyd-text">Alok (b.) Nandi</div>
						<div class="cd-tyd-tx">Founder &amp; Creative Director</div>
						<div class="cd-tyd-posi"></div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68eca5abb3ed14f47adc27c3_image-1.png" loading="lazy" alt="" class="cd-tyd-logo-img" />
					</div>
				</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4d475494a10136aa04dc_event-industry-and-mentorship-mentors-010.png" loading="lazy" alt="" class="cd-tyd-image" />
			</div>
			<div data-wf--card-type-d--variant="isdi" class="card-type-d swiper-slide"><a data-video="https://www.youtube.com/shorts/5fCWecfDYWM" href="#" class="play-icon w-inline-block"></a>
				<div class="cd-tyd-txt-wrap">
					<div class="cd-tyd-detail">
						<div class="cd-tyd-text">Avnish Sabharwal</div>
						<div class="cd-tyd-tx">Managing Director</div>
						<div class="cd-tyd-posi"></div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68eca5ab3196591e1e423ddc_image-7.png" loading="lazy" alt="" class="cd-tyd-logo-img" />
					</div>
				</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4d475ca0ae037285a322_event-industry-and-mentorship-mentors-001.png" loading="lazy" alt="" class="cd-tyd-image" />
			</div>
			<div data-wf--card-type-d--variant="isdi" class="card-type-d swiper-slide"><a data-video="" href="#" class="play-icon w-inline-block"></a>
				<div class="cd-tyd-txt-wrap">
					<div class="cd-tyd-detail">
						<div class="cd-tyd-text">NEETA LULLA</div>
						<div class="cd-tyd-tx">Couturier | Designer | Stylist</div>
						<div class="cd-tyd-posi"></div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68eca5ab6f9457d9c00ab4e5_image-5.png" loading="lazy" alt="" class="cd-tyd-logo-img" />
					</div>
				</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4d4774d0eff38a2ce8c2_event-industry-and-mentorship-mentors-006.png" loading="lazy" alt="" class="cd-tyd-image" />
			</div>
			<div data-wf--card-type-d--variant="isdi" class="card-type-d swiper-slide"><a data-video="" href="#" class="play-icon w-inline-block"></a>
				<div class="cd-tyd-txt-wrap">
					<div class="cd-tyd-detail">
						<div class="cd-tyd-text">Tanay Kumar</div>
						<div class="cd-tyd-tx">Founder &amp; CEO</div>
						<div class="cd-tyd-posi"></div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68eca5abb164de93cc04706f_image.png" loading="lazy" alt="" class="cd-tyd-logo-img" />
					</div>
				</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4d470a755218f0ee8357_event-industry-and-mentorship-mentors-002.png" loading="lazy" alt="" class="cd-tyd-image" />
			</div>
			<div data-wf--card-type-d--variant="isdi" class="card-type-d swiper-slide"><a data-video="" href="#" class="play-icon w-inline-block"></a>
				<div class="cd-tyd-txt-wrap">
					<div class="cd-tyd-detail">
						<div class="cd-tyd-text">Andrew Pendleton</div>
						<div class="cd-tyd-tx">Sr Director, Design Systems</div>
						<div class="cd-tyd-posi"></div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68eca5abf1cc00469eb36c23_image-3.png" loading="lazy" alt="" class="cd-tyd-logo-img" />
					</div>
				</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4d471caf816c44814d98_event-industry-and-mentorship-mentors-004.png" loading="lazy" alt="" class="cd-tyd-image" />
			</div>
			<div data-wf--card-type-d--variant="isdi" class="card-type-d swiper-slide"><a data-video="https://www.youtube.com/watch?v=nko8PuMgnT8" href="#" class="play-icon w-inline-block"></a>
				<div class="cd-tyd-txt-wrap">
					<div class="cd-tyd-detail">
						<div class="cd-tyd-text">Amitesh Rao</div>
						<div class="cd-tyd-tx">CEO</div>
						<div class="cd-tyd-posi"></div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68eca5abd03e55a3183b99cd_image-8.png" loading="lazy" alt="" class="cd-tyd-logo-img" />
					</div>
				</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4d472825b6d5b8bdfd80_event-industry-and-mentorship-mentors-003.png" loading="lazy" alt="" class="cd-tyd-image" />
			</div>
			<div data-wf--card-type-d--variant="isdi" class="card-type-d swiper-slide"><a data-video="https://youtu.be/p2zCVkQdMtM" href="#" class="play-icon w-inline-block"></a>
				<div class="cd-tyd-txt-wrap">
					<div class="cd-tyd-detail">
						<div class="cd-tyd-text">Lulu Raghavan</div>
						<div class="cd-tyd-tx">President APAC</div>
						<div class="cd-tyd-posi"></div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68eca5ac093cdb57fc97a13c_replace-logo-2.png" loading="lazy" alt="" class="cd-tyd-logo-img" />
					</div>
				</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4d47e34b5da5a7aeb486_event-industry-and-mentorship-mentors-008.png" loading="lazy" alt="" class="cd-tyd-image" />
			</div>
			<div data-wf--card-type-d--variant="isdi" class="card-type-d swiper-slide"><a data-video="https://www.youtube.com/embed/DRCPfJBynd4" href="https://www.youtube.com/shorts/DRCPfJBynd4" class="play-icon w-inline-block"></a>
				<div class="cd-tyd-txt-wrap">
					<div class="cd-tyd-detail">
						<div class="cd-tyd-text">Ayan pal</div>
						<div class="cd-tyd-tx">Head of Experience &amp; Design</div>
						<div class="cd-tyd-posi"></div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68eca5ab1bd651bf880c272b_replace-logo-1.png" loading="lazy" alt="" class="cd-tyd-logo-img" />
					</div>
				</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4d482bde57d6ded3e10c_event-industry-and-mentorship-mentors-015.png" loading="lazy" alt="" class="cd-tyd-image" />
			</div>
		</div>
	</div>
	<div id="Alumni-talks" class="common-wrapper-lg">
		<div class="container">
			<h2 class="h2-tag mrg16 isdi">Alumni Talks</h2>
			<div class="sub-heading">Alumni share their professional journeys, successes, and lessons learned. Students gain mentorship and practical insights to navigate their own career paths.</div>
			<div class="instagram-wrapper mobile-vert-scroll mar-0">
				<div class="grid-gallery-flex mrgtp">
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a084007dc624836ffb03_i%26m-grid-1.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a083e4d6ade851c282c1_i%26m-grid-2.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a08353ef7df9dcf24f15_i%26m-grid-3.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a0837ad76475c65a013d_i%26m-grid-4.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a08346c75e942b683988_i%26m-grid-5.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a084a63df448ee5464e5_i%26m-grid-6.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a0832883735291ef05ca_i%26m-grid-7.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a083c0fd6d0a2b3c9177_i%26m-grid-8.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="Guest-lectures" class="common-wrapper-lg">
		<div class="container">
			<h2 class="h2-tag mrg16 isdi">Guest Lectures &amp; Mentorship Sessions</h2>
			<div class="sub-heading">Industry experts and thought leaders engage with students through lectures and mentorship. Provides guidance, inspiration, and exposure to current practices.</div>
			<div class="swiper zoom-slider-lg mrgtp">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<div data-slider-card-a-bg="Paste image url" class="slider-card-b isdi"><img sizes="(max-width: 802px) 100vw, 802px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a1fb39155f196715d8b8_iand-m-image-1-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a1fb39155f196715d8b8_iand-m-image-1-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a1fb39155f196715d8b8_iand-m-image-1.png 802w" alt="" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a1fb39155f196715d8b8_iand-m-image-1.png" loading="lazy" class="slide-card-b-image" /></div>
					</div>
					<div class="swiper-slide">
						<div data-slider-card-a-bg="Paste image url" class="slider-card-b isdi"><img sizes="(max-width: 802px) 100vw, 802px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a1fb9a26fade32fe8155_iand-m-image-2-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a1fb9a26fade32fe8155_iand-m-image-2-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a1fb9a26fade32fe8155_iand-m-image-2.png 802w" alt="" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a1fb9a26fade32fe8155_iand-m-image-2.png" loading="lazy" class="slide-card-b-image" /></div>
					</div>
					<div class="swiper-slide">
						<div data-slider-card-a-bg="Paste image url" class="slider-card-b isdi"><img sizes="(max-width: 802px) 100vw, 802px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a1fb18b0d1834d0d4ca3_iand-m-image-3-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a1fb18b0d1834d0d4ca3_iand-m-image-3-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a1fb18b0d1834d0d4ca3_iand-m-image-3.png 802w" alt="" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a1fb18b0d1834d0d4ca3_iand-m-image-3.png" loading="lazy" class="slide-card-b-image" /></div>
					</div>
					<div class="swiper-slide">
						<div data-slider-card-a-bg="Paste image url" class="slider-card-b isdi"><img sizes="(max-width: 802px) 100vw, 802px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a1fb6d39ce1074173461_iand-m-image-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a1fb6d39ce1074173461_iand-m-image-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a1fb6d39ce1074173461_iand-m-image.png 802w" alt="" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a1fb6d39ce1074173461_iand-m-image.png" loading="lazy" class="slide-card-b-image" /></div>
					</div>
					<div class="swiper-slide">
						<div data-slider-card-a-bg="Paste image url" class="slider-card-b isdi"><img sizes="(max-width: 802px) 100vw, 802px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a1fb5ee4a59197042bb3_iand-m-image-4-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a1fb5ee4a59197042bb3_iand-m-image-4-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a1fb5ee4a59197042bb3_iand-m-image-4.png 802w" alt="" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a1fb5ee4a59197042bb3_iand-m-image-4.png" loading="lazy" class="slide-card-b-image" /></div>
					</div>
					<div class="swiper-slide">
						<div data-slider-card-a-bg="Paste image url" class="slider-card-b isdi"><img sizes="(max-width: 802px) 100vw, 802px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a1fb689e16482225d82e_iand-m-image-5-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a1fb689e16482225d82e_iand-m-image-5-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a1fb689e16482225d82e_iand-m-image-5.png 802w" alt="" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a1fb689e16482225d82e_iand-m-image-5.png" loading="lazy" class="slide-card-b-image" /></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="Masterclasses" class="common-wrapper-lg">
		<div class="container">
			<h2 class="h2-tag mrg16 isdi">Masterclasses &amp; Mentorship<br /></h2>
			<div class="sub-heading">Hands-on workshops led by top professionals allow students to develop advanced skills. Personalized mentorship supports growth in creative and technical areas.</div>
			<div class="instagram-wrapper mobile-vert-scroll mar-0">
				<div class="grid-gallery-flex mrgtp">
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a3ed6682326b4eea1e45_iandm-grid-2-1.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a3ec1d54f074c1b95375_iandm-grid-2-2.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a3ed009768d5a5a1ecd2_iandm-grid-2-3.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a3ed18b294ef0480b10e_iandm-grid-2-4.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a3eca72fa345e3c2d10a_iandm-grid-2-5.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a3ed2930276495575d40_iandm-grid-2-6.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a3edf95d930543fb61c0_iandm-grid-2-7.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905a3edb685cbc1d962323b_iandm-grid-2-8.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="Global-masterclasses" class="common-wrapper-lg">
		<div class="container">
			<h2 class="h2-tag mrg16 isdi">Global Masterclasses</h2>
			<div class="sub-heading">International experts bring global perspectives to local learning. Students experience cutting-edge practices and diverse approaches to design</div>
			<div class="instagram-wrapper mobile-vert-scroll mar-0">
				<div class="grid-gallery-flex mrgtp">
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee3f2a2e1ce91491cc5969_event-industry-and-mentorship-grid-5-006.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee3f2893bf414c65b2fa83_event-industry-and-mentorship-grid-5-003.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee3f28aedee4a7d5df0265_event-industry-and-mentorship-grid-5-001.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee3f2a0337dcb022646979_event-industry-and-mentorship-grid-5-008.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee3f282862480f0cef9d16_event-industry-and-mentorship-grid-5-004.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee3f2a6f7ab622913bdf2d_event-industry-and-mentorship-grid-5-007.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee3f2ab09951dd3140885e_event-industry-and-mentorship-grid-5-005.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee3f2924b64f113ef23249_event-industry-and-mentorship-grid-5-002.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="Elev8" class="common-wrapper-lg">
		<div class="container">
			<h2 class="h2-tag mrg16 isdi">Co Elev8: Parent Mentorship Program</h2>
			<div class="sub-heading">A support system connecting parents with mentors to guide students’ academic and professional growth. Encourages active engagement in the student’s journey.</div>
			<div class="swiper zoom-slider mrg56">
				<div class="swiper-wrapper">
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee400a1bfec523aa6e6922_event-industry-and-mentorship-swiper-2-001.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee400aa66d0fa8f6a5806e_event-industry-and-mentorship-swiper-2-002.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee400a46c06d3e0729dc90_event-industry-and-mentorship-swiper-2-003.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee400afe97e903721931b3_event-industry-and-mentorship-swiper-2-004.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee400bc5af47203fb9bcd0_event-industry-and-mentorship-swiper-2-005.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee400b48913abd5aedac6c_event-industry-and-mentorship-swiper-2-006.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ed03295ac3eee6fc039526_missed-grid-gi.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee400a1bfec523aa6e6922_event-industry-and-mentorship-swiper-2-001.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee400aa66d0fa8f6a5806e_event-industry-and-mentorship-swiper-2-002.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee400a46c06d3e0729dc90_event-industry-and-mentorship-swiper-2-003.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee400afe97e903721931b3_event-industry-and-mentorship-swiper-2-004.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee400bc5af47203fb9bcd0_event-industry-and-mentorship-swiper-2-005.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee400b48913abd5aedac6c_event-industry-and-mentorship-swiper-2-006.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ed03295ac3eee6fc039526_missed-grid-gi.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="Conserv" class="common-wrapper-lg">
		<div class="container">
			<h2 class="h2-tag mrg16 isdi">ConSERV – The Service Design Conference</h2>
			<div class="sub-heading">A specialized forum exploring the impact of service design on society and business. Students learn strategies to design meaningful experience</div>
			<div class="instagram-wrapper mobile-vert-scroll mar-0">
				<div class="grid-gallery-flex mrgtp">
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee416331d6af1f690f7aaa_event-industry-and-mentorship-grid-6-007.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee416129ef9cd689cddc5f_event-industry-and-mentorship-grid-6-004.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee41626fa457fc11e312d2_event-industry-and-mentorship-grid-6-002.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee416206db86eddba30157_event-industry-and-mentorship-grid-6-001.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee416129ef9cd689cddc5f_event-industry-and-mentorship-grid-6-004.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4163007c5bd5a3de4f98_event-industry-and-mentorship-grid-6-008.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee41635b386ba479a036b1_event-industry-and-mentorship-grid-6-006.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4162f067a4eb8a6ac7b3_event-industry-and-mentorship-grid-6-003.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="snap-ar" class="common-wrapper-lg">
		<div class="container">
			<h2 class="h2-tag mrg16 isdi">SNAP - AR</h2>
			<div class="sub-heading">A showcase of augmented reality projects pushing the boundaries of creativity. Students experiment with immersive experiences and interactive design</div>
			<div class="swiper zoom-slider-lg mrgtp">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<div data-slider-card-a-bg="Paste image url" class="slider-card-b isdi"><img sizes="(max-width: 802px) 100vw, 802px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee43037ac57097b26120ac_swiper-5-01-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee43037ac57097b26120ac_swiper-5-01-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee43037ac57097b26120ac_swiper-5-01.png 802w" alt="" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee43037ac57097b26120ac_swiper-5-01.png" loading="lazy" class="slide-card-b-image" /></div>
					</div>
					<div class="swiper-slide">
						<div data-slider-card-a-bg="Paste image url" class="slider-card-b isdi"><img sizes="(max-width: 802px) 100vw, 802px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4303bce90aad7c5c230d_swiper-5-02-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4303bce90aad7c5c230d_swiper-5-02-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4303bce90aad7c5c230d_swiper-5-02.png 802w" alt="" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4303bce90aad7c5c230d_swiper-5-02.png" loading="lazy" class="slide-card-b-image" /></div>
					</div>
					<div class="swiper-slide">
						<div data-slider-card-a-bg="Paste image url" class="slider-card-b isdi"><img sizes="(max-width: 802px) 100vw, 802px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee43036c73127b7f305646_swiper-5-03-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee43036c73127b7f305646_swiper-5-03-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee43036c73127b7f305646_swiper-5-03.png 802w" alt="" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee43036c73127b7f305646_swiper-5-03.png" loading="lazy" class="slide-card-b-image" /></div>
					</div>
					<div class="swiper-slide">
						<div data-slider-card-a-bg="Paste image url" class="slider-card-b isdi"><img sizes="(max-width: 802px) 100vw, 802px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4303f77a9dc07624f8a4_swiper-5-04-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4303f77a9dc07624f8a4_swiper-5-04-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4303f77a9dc07624f8a4_swiper-5-04.png 802w" alt="" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4303f77a9dc07624f8a4_swiper-5-04.png" loading="lazy" class="slide-card-b-image" /></div>
					</div>
					<div class="swiper-slide">
						<div data-slider-card-a-bg="Paste image url" class="slider-card-b isdi"><img sizes="(max-width: 802px) 100vw, 802px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee43025d6d7391b078a4e5_swiper-5-05-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee43025d6d7391b078a4e5_swiper-5-05-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee43025d6d7391b078a4e5_swiper-5-05.png 802w" alt="" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee43025d6d7391b078a4e5_swiper-5-05.png" loading="lazy" class="slide-card-b-image" /></div>
					</div>
					<div class="swiper-slide">
						<div data-slider-card-a-bg="Paste image url" class="slider-card-b isdi"><img sizes="(max-width: 802px) 100vw, 802px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee43036c73127b7f30564a_swiper-5-06-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee43036c73127b7f30564a_swiper-5-06-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee43036c73127b7f30564a_swiper-5-06.png 802w" alt="" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee43036c73127b7f30564a_swiper-5-06.png" loading="lazy" class="slide-card-b-image" /></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="fof" class="common-wrapper-lg">
		<div class="container">
			<h2 class="h2-tag mrg16 isdi">Friends of Figma</h2>
			<div class="sub-heading">A community-driven event for students to network and collaborate using Figma. Encourages hands-on learning and collaborative design projects</div>
			<div class="instagram-wrapper mobile-vert-scroll mar-0">
				<div class="grid-gallery-flex mrgtp">
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee473fe406830358c49ec1_event-industry-and-mentorship-grid-7-007.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ed06d14e872bb260dfc65f_immersions-and-experiences-swiper2%20(3).png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee473f00674d6e753ec673_event-industry-and-mentorship-grid-7-002.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee473fbcf37dabc1a54f6f_event-industry-and-mentorship-grid-7-001.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee473f9422ebb944513abb_event-industry-and-mentorship-grid-7-005.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee473f48913abd5af07d47_event-industry-and-mentorship-grid-7-008.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee473ff42ed840b96434bc_event-industry-and-mentorship-grid-7-006.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee473f267332a8b3f6e115_event-industry-and-mentorship-grid-7-003.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="WDCD" class="common-wrapper-lg">
		<div class="container">
			<h2 class="h2-tag mrg16 isdi">WDCD</h2>
			<div class="sub-heading">A platform for exploring innovative design solutions to real-world challenges. Students engage in discussions, workshops, and live projects with industry experts.</div>
			<div class="duplicate-grid-wrapper">
				<div class="grid-gallery-flex mrgtp">
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee49b1fa0b97bfe87972f0_industry-and-mentorship-grid-8-01.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee49b0393fe398b80cb8ca_industry-and-mentorship-grid-8-02.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee49b0b02ccc855db31c22_industry-and-mentorship-grid-8-03.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee49b11509a05d8701e852_industry-and-mentorship-grid-8-04.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee49b0c1203b5e75a39c30_industry-and-mentorship-grid-8-05.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee49b11caf816c447fef03_industry-and-mentorship-grid-8-06.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
					<div class="grid-column">
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee49b07450b16bbe2b0fb3_industry-and-mentorship-grid-8-07.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
						<div class="img-wrap"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee49b06d9b37aad1be3a39_industry-and-mentorship-grid-8-08.png" loading="lazy" alt="" class="insta-image-rect isdi" /></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="parsons-week" class="common-wrapper-lg">
		<div class="container">
			<h2 class="h2-tag mrg16 isdi">Parsons Week</h2>
			<div class="sub-heading">A week-long celebration of collaboration with Parsons, New York. Students explore international design trends, workshops, and cross-cultural learning opportunities.</div>
			<div class="swiper zoom-slider mrg56">
				<div class="swiper-wrapper">
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4b3b39897535392f9531_event-industry-and-mentorship-swiper-6-003.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4b3ca359e5605d1e9406_event-industry-and-mentorship-swiper-6-007.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4b3cf5e0af4e8dc7ca62_event-industry-and-mentorship-swiper-6-005.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4b3c54d64e9b4b22e769_event-industry-and-mentorship-swiper-6-004.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4b3cff5c773ab7d2a131_event-industry-and-mentorship-swiper-6-001.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4b3c3d514f93fa10ed4c_event-industry-and-mentorship-swiper-6-008.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4b3cbffe765a963de6f1_event-industry-and-mentorship-swiper-6-002.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4b3c6b5c3520995ed59e_event-industry-and-mentorship-swiper-6-006.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4b3b39897535392f9531_event-industry-and-mentorship-swiper-6-003.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4b3ca359e5605d1e9406_event-industry-and-mentorship-swiper-6-007.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4b3cf5e0af4e8dc7ca62_event-industry-and-mentorship-swiper-6-005.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4b3c54d64e9b4b22e769_event-industry-and-mentorship-swiper-6-004.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4b3cff5c773ab7d2a131_event-industry-and-mentorship-swiper-6-001.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4b3c3d514f93fa10ed4c_event-industry-and-mentorship-swiper-6-008.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4b3cbffe765a963de6f1_event-industry-and-mentorship-swiper-6-002.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
					<div data-wf--portrait-card-b--variant="isdi" class="motion-card swiper-slide width-motion"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68ee4b3c6b5c3520995ed59e_event-industry-and-mentorship-swiper-6-006.png" loading="lazy" alt="" class="card-image" />
						<div class="mc-text-wrap"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="common-wrapper"></div>
</div> 

<?php include "../assets/include/footer.php" ?>