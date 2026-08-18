<?php include 'dynamic.php' ?>

<!DOCTYPE html>
<html data-wf-domain="<?php echo $domain?>" data-wf-page="<?php echo $htmlDataId?>" data-wf-site="6846c77f346415bfcbb813b6" lang="en">

<head>
	<meta charset="utf-8" />
	<title> <?php echo $title ?></title>
	<meta content="width=device-width, initial-scale=1" name="viewport" />
	<meta name="description" content="<?php echo $description ?>">
	<meta content="Webflow" name="generator" />
	<meta property="og:locale" content="en_US"/>
	
	
<meta property="og:site_name" content="ATLAS SKILLTECH UNIVERSITY"/>
<meta property="og:title" content="ATLAS SkillTech University: India&#039;s 1st Urban Multidisciplinary University"/>
<meta property="og:url" content="https://atlasuniversity.edu.in/"/>
<meta property="og:type" content="website"/>
<meta property="og:description" content="Degree Courses: Improve your knowledge &amp; multidisciplinary skills with #1 university ATLAS SkillTech University in India. Check out our various specialisation courses. Enroll Now!"/>
<meta property="og:image" content="https://atlasuniversity.edu.in/wp-content/uploads/2022/05/atlas-skillset-university.jpeg"/>
<meta property="og:image:url" content="https://atlasuniversity.edu.in/wp-content/uploads/2022/05/atlas-skillset-university.jpeg"/>
<meta property="og:image:secure_url" content="https://atlasuniversity.edu.in/wp-content/uploads/2022/05/atlas-skillset-university.jpeg"/>
<!-- Google+ / Schema.org -->
<!-- Twitter Cards -->
<meta name="twitter:title" content="ATLAS SkillTech University: India&#039;s 1st Urban Multidisciplinary University"/>
<meta name="twitter:url" content="https://atlasuniversity.edu.in/"/>
<meta name="twitter:description" content="Degree Courses: Improve your knowledge &amp; multidisciplinary skills with #1 university ATLAS SkillTech University in India. Check out our various specialisation courses. Enroll Now!"/>
<meta name="twitter:image" content="https://atlasuniversity.edu.in/wp-content/uploads/2022/05/atlas-skillset-university.jpeg"/>
<meta name="twitter:card" content="summary_large_image"/>

<link href="https://fonts.googleapis.com" rel="preconnect" />
	<link href="https://fonts.gstatic.com" rel="preconnect" crossorigin="anonymous" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <!--boostrap css-->
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">

	<!-- main wali -->
<!--	<link  rel="preload" href="<?php echo $domain ?>assets/css/main/atlass-fantastic-site-48323a.webflow.shared.e958bf6b1.css" as="style" onload="this.rel='stylesheet'"/>-->
<!--	<noscript>-->
<!--<link rel="stylesheet" href="<?php echo $domain ?>assets/css/main/atlass-fantastic-site-48323a.webflow.shared.e958bf6b1.css">-->
<!--</noscript>-->
<!-- change wali -->
<!--<link rel="preload" href="<?php echo $domain ?>assets/css/<?php echo $css ?>" as="style" onload="this.rel='stylesheet'">-->
<!--<noscript>-->
<!--<link rel="stylesheet" href="<?php echo $domain ?>assets/css/<?php echo $css ?>">-->
<!--</noscript>-->

<link rel="stylesheet" href="<?php echo $domain ?>assets/css/main/atlass-fantastic-site-48323a.webflow.shared.e958bf6b1.css" >

<!--<link rel="stylesheet" href="<?php echo $domain ?>assets/css/<?php echo $css ?>">-->


<link rel="preload"
      href="<?php echo $domain ?>assets/css/<?php echo $css ?>"
      as="style"
      onload="this.onload=null;this.rel='stylesheet'">

<noscript>
    <link rel="stylesheet"
          href="<?php echo $domain ?>assets/css/<?php echo $css ?>">
</noscript>
	
<!--<link rel="stylesheet"-->
<!--href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Poppins:wght@300;500;700;900&family=Manrope:wght@300;500;700&display=swap">-->



<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<link rel="preload"
      as="style"
      href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Poppins:wght@300;500;700;900&family=Manrope:wght@300;500;700&display=swap">

<link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Poppins:wght@300;500;700;900&family=Manrope:wght@300;500;700&display=swap">

	
	
	
	
	
	<link href="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68b556bb83bf543191762dcd_favicon-32x32.png" rel="shortcut icon" type="image/x-icon" />
	<link href="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68b557b185c9b2f4b96fcb36_atlas-256.png" rel="apple-touch-icon" />
   <link rel="preload" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" as="style" onload="this.rel='stylesheet'">
	<style>
	body.ov-hidden {
		overflow: hidden;
	}

	body.modal-open {
		overflow: hidden;
	}

	/* Modal background overlay */
	.video-modal {
		display: none;
		position: fixed;
		z-index: 5000;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.85);
		justify-content: center;
		align-items: center;
	}

	/* Modal content container */
	.video-modal-content {
		position: relative;
		width: 90%;
		max-width: 900px;
		background: #000;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
	}
.video-modal iframe,
.video-modal-content {
    overflow: clip !important;
}
	/* Responsive iframe wrapper (keeps 16:9 ratio) */
	.video-modal-content::before {
		content: "";
		display: block;
		padding-top: 56.25%;
	}

	.video-modal .w-embed.w-iframe {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.video-modal iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: none;
	}

	/* Close button */
	.video-modal-close {
		position: absolute;
		top: -25px;
		right: 25%;
		font-size: 32px;
		font-weight: bold;
		color: #fff;
		cursor: pointer;
		z-index: 10;
		/* always above iframe */
		transition: color 0.2s ease;
	}

	.video-modal-close:hover {
		color: #f00;
	}

	.swiper-slide {
		width: auto;
	}

	.common-swiper .swiper-pagination,
	.common-swiper .swiper-pagination-bullets,
	.zoom-slider-lg .swiper-pagination-bullets,
	.common-swiper-full .swiper-pagination {
		display: none;
	}

	.common-swiper-full {
		overflow: visible;
	}

	.swiper.zoom-slider {
		overflow: visible;
	}

	@media (max-width: 568px) {

		/*.swiper-slide{
      width: 100%;
    }*/
		.sticky-menus {
			position: sticky;
			top: 80px;
			z-index: 9;
		}

		.common-swiper-full .swiper-slide,
		.zoom-slider-lg .swiper-slide {
			width: 100%;
		}

		.mobile-swiper-cm .swiper-slide {
			width: 100%;
		}

		.common-swiper .swiper-pagination,
		.common-swiper-full .swiper-pagination {
			display: block;
			bottom: -30px !important;
		}

		.common-swiper .swiper-pagination-bullets,
		.zoom-slider-lg .swiper-pagination-bullets {
			display: block;
			text-align: center;
			margin-top: 20px;
		}

		.blue-wrapper .swiper-pagination-bullet {
			background: #fff;
			opacity: 0.4;
		}

		.blue-wrapper .swiper-pagination-bullet-active {
			opacity: 1;
		}
	}

	.swiper-pagination-white .swiper-pagination-bullet {
		background: #EEEEEE;
		opacity: 0.6;
	}

	.swiper-pagination-white .swiper-pagination-bullet-active {
		height: 10px;
		width: 10px;
		background: #fff;
		opacity: 1;
	}

	/* Zoom Slider Small:starts */
	@media screen and (min-width: 568px) {
		.zoom-slider .swiper-slide {
			transition: ease all 0.5s;
			transform: scale(0.8);
		}

		.zoom-slider .swiper-slide-prev,
		.zoom-slider .swiper-slide-next {
			transform: scale(0.88);
		}

		.zoom-slider .swiper-slide-prev {
			margin-right: 20px;
		}

		.zoom-slider .swiper-slide-next {
			margin-left: 20px;
		}

		.zoom-slider .swiper-slide-active {
			transform: scale(1);
		}
	}

	/* Zoom Slider Small:ends */
	/* Swiper Zoom Slider Large:starts */
	@media screen and (min-width: 767px) {
		.zoom-slider-lg .swiper-slide {
			transition: ease all 0.5s;
			transform: scale(0.6);
		}

		.zoom-slider-lg .swiper-slide-prev,
		.zoom-slider-lg .swiper-slide-next {
			transform: scale(0.65);
		}

		.zoom-slider-lg .swiper-slide-prev {
			margin-right: -100px;
		}

		.zoom-slider-lg .swiper-slide-next {
			margin-left: -100px;
		}

		.zoom-slider-lg .swiper-slide-active {
			transform: scale(1);
		}
	}

	/* Swiper Zoom Slider Large:ends */
	/* Swiper Zoom Slider Large New:starts */
	.zoom-slider-large {
		width: 100%;
		max-width: 1200px;
		overflow: visible;
	}

	.zoom-slider-large .swiper-wrapper {
		height: auto;
	}

	.zoom-slider-large .swiper-slide .slider-card-wrapper {
		width: 324px;
		height: 400px;
		transition: all 0.5s ease;
		cursor: pointer;
		flex-shrink: 0;
		overflow: hidden;
	}

	.zoom-slider-large .swiper-slide-active .slider-card-wrapper {
		width: 801px;
		height: 478px;
	}

	.zoom-slider-large .swiper-slide.swiper-slide-active .slide-content-a {
		padding: 0px 0px 50px 50px;
	}

	.zoom-slider-large .swiper-slide .slide-title-a {
		font-size: 24px;
	}

	.zoom-slider-large .swiper-slide.swiper-slide-active .slide-title-a {
		font-size: 32px;
	}

	.zoom-slider-large .swiper-slide-active .slide-description-a {
		animation: fadeInSwiper 0.5s ease forwards;
		animation-delay: 0.5s;
		visibility: visible;
		display: block;
	}

	.zoom-slider-large .slide-description-a {
		visibility: hidden;
		opacity: 0;
		transition: none;
		display: none;
	}

	@keyframes fadeInSwiper {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	/* Swiper Zoom Slider Large New:ends */
	/* Header css on scroll :starts */
	@media (min-width: 992px) {
		.topnavbar {
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1100;
			transition: ease all 0.5s;
		}

		.second-header-wrapper {
			height: 156px;
			width: 100%;
			position: fixed;
			top: 48px;
			left: 0;
			z-index: 1090;
			transition: ease all 0.5s;
		}

		.topnavbar.hide {
			transform: translateY(-100%);
			pointer-events: none;
		}

		.second-header-wrapper.hide {
			transform: translateY(-105%);
			pointer-events: none;
		}

		.sticky-menus {
			position: sticky;
			top: 156px;
			width: 100%;
			transition: top 0.3s ease;
			z-index: 900;
		}

		.hide-header .sticky-menus {
			top: 0;
		}
	}

	/* Header css on scroll :ends */
	/* Common style for on scroll header and other css */
	/* 
  .scrolled-head .logo-container,
  .header[data-wf--header-isme--variant="white"] .logo-container{
  	background: #0000004d;
  }
  .scrolled-head .search-input,
  .header[data-wf--header-isme--variant="white"] .search-input{
  	color: #000;
    background: rgba(0, 0, 0, 0.05);
  }
  .scrolled-head .search-input,
  .header[data-wf--header-isme--variant="white"] .logo-container .search-input{
	background: rgba(0, 0, 0, 0.05);
  }
  .scrolled-head .l-links-top,
  .scrolled-head .mn-links,
  .scrolled-head .text-link,
  .header[data-wf--header-isme--variant="white"] .l-links,
  .header[data-wf--header-isme--variant="white"] .mn-links{
  	color: #000;
  }
  .scrolled-head .text-link .nav-arrow{
  	filter: invert(100%);
  }
  .scrolled-head .mn-links:hover,
  .header[data-wf--header-isme--variant="white"] .text-link,
  .header[data-wf--header-isme--variant="white"] .text-link:hover,
  .header[data-wf--header-isme--variant="white"] .mn-links.w--current{
  	color: #000;
  }
  .main-menu.scrolled,
  .scrolled-head .mega-menus,
  .header[data-wf--header-isme--variant="white"] .mega-menus{
  	background: #fff;
    box-shadow: 0px 15px 28px 12px #0000000F;
    border-top: 1px solid rgba(184, 184, 184, 0.1);
  }
  .scrolled-head .text-link img,
  .header[data-wf--header-isme--variant="white"] .text-link img{
	filter: invert(100%);
  }
  
  .header[data-wf--header-isme--variant="white"] .search-icon{
  	background-image: url(https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6851120db41bc96d2d497d76_search-red.svg);
  }
  */
	.search-bar-btm::placeholder,
	.search-input::placeholder {
		color: #fff;
		opacity: 0.5;
	}

	.scrolled-head .search-input::placeholder {
		color: #fff;
		opacity: 0.9;
	}

	.anchor-link.w--current,
	.anchor-link:hover {
		background-color: #07f6a0;
	}

	.sticky-menus,
	.tabs-button-wrapper,
	.collection-list,
	.tabs-menu-mint,
	.tertiary-tabs-menu {
		scrollbar-width: none;
	}

	.sticky-menus::-webkit-scrollbar,
	.tabs-button-wrapper::-webkit-scrollbar,
	.collection-list::-webkit-scrollbar,
	.tabs-menu-mint::-webkit-scrollbar,
	.tertiary-tabs-menu::-webkit-scrollbar {
		display: none;
	}

	@media (max-width: 540px) {
		.video-modal-close {
			top: -50px;
			right: 5%;
		}

		.mobile-ico-button .button-regular {
			width: 38px;
			height: 38px;
			padding: 0px;
			border-radius: 50%;
			background: url("https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/688721aee135439678006180_arrow-top-rt-blk.svg") center center no-repeat #07F6a0;
		}

		.mobile-ico-button .button-text {
			display: none;
		}

		.grid-gallery {
			display: flex;
			overflow: auto;
		}

		.grid-gallery .grid-card {
			flex-shrink: 0;
			width: 250px;
			height: 350px;
		}

		.grid-gallery .grid-card .grid-image-card {
			width: 100%;
			object-position: top;
		}

		.mobile-vert-scroll .grid-gallery-flex {
			flex-flow: nowrap;
			grid-column-gap: 24px;
			align-items: stretch;
		}

		.mobile-vert-scroll .grid-column {
			flex-flow: initial;
			width: auto;
		}

		.mobile-vert-scroll .grid-column .small-card-a,
		.mobile-vert-scroll .grid-column .small-card-a-big {
			height: 300px;
			min-width: 280px;
		}

		.mobile-vert-scroll .grid-column .img-wrap {
			height: 400px;
			min-width: 320px;
		}

		a[data-wf--button-regular--variant="atlas"],
		que a[data-wf--button-primary--variant="atlas"] {
			margin: 18px 0px;
		}
	}

	/* Media 540 Ends */
	.marquee-swiper .swiper-wrapper {
		transition-timing-function: linear !important;
	}

	.marquee-swiper:hover .swiper-wrapper {
		animation-play-state: paused !important;
	}

	.scroll-insta,
	.common-custom-swiper-wrapper,
	.curr-highlight-wrap,
	.learn-out-wrapper,
	.instagram-wrapper,
	.custom-tab-wrap,
	.secondary-tabs-menu {
		overflow-y: scroll;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.scroll-insta::-webkit-scrollbar,
	.common-custom-swiper-wrapper::-webkit-scrollbar,
	.curr-highlight-wrap::-webkit-scrollbar,
	.learn-out-wrapper::-webkit-scrollbar,
	.instagram-wrapper::-webkit-scrollbar,
	.learn-out-wrapper::-webkit-scrollbar,
	.custom-tab-wrap::-webkit-scrollbar,
	.secondary-tabs-menu::-webkit-scrollbar {
		display: none;
	}

	.tr-tab-text {
		color: inherit !important;
	}

	.h2-tag {
		position: relative;
	}

	.left-bar-element {
		position: absolute;
		left: 0px;
		width: 94px;
		height: 50px;
		background-color: #009FE0;
		pointer-events: none;
		z-index: 1;
	}

	.icon-image {
		position: relative;
	}

	.icon-image::after {
		content: '';
		position: absolute;
		right: 0;
		top: 0;
		width: 12px;
		height: 100%;
		background-color: #009FE0;
	}

	.isdi-page .anchor-link:hover {
		background-color: #EC1376;
		color: #fff;
	}

	.isdi-page .anchor-link.w--current {
		background-color: #EC1376;
		color: #fff;
	}

	.isdi-page .icon-image::after {
		display: none;
	}

	.isdi-page .section {
		padding: 50px 0px
	}

	.isdi-page .common-wrapper-lg {
		padding-top: 100px;
	}

	.isdi-page .common-wrapper {
		padding-top: 50px;
	}

	.isdi-page .section.nopad {
		padding-top: 0;
		padding-bottom: 0;
	}

	.accordion-title {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.accordion-title.unclamp {
		display: block;
		-webkit-line-clamp: unset;
		-webkit-box-orient: unset;
		overflow: visible;
	}
	</style>
	<style>
	#blue-cards-boxs .w-layout-cell .card-desc {
		max-height: 0;
		opacity: 0;
		overflow: hidden;
		transition: all 0.4s ease;
	}

	.es-widget-container.es-widget-container-desktop {
		padding: 0px;
	}

	</style>
	<!-- Google Tag Manager -->

<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':

new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],

j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=

'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);

})(window,document,'script','dataLayer','GTM-WZ2XXQCJ');</script>

<!-- End Google Tag Manager -->



<!-- Google Tag Manager (noscript) -->

<noscript>
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WZ2XXQCJ"

height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>

<!-- End Google Tag Manager (noscript) -->


<!-- Event snippet for Submit lead form conversion page -->
<script>
  gtag('event', 'conversion', {
      'send_to': 'AW-17897989356/Rwy0CPm3x-sbEOzJttZC',
      'value': 1.0,
      'currency': 'INR'
  });
</script>



<link rel="preload" as="image" href="https://atlasskilltech.app/chat-bot/aliaa.png">
<link rel="preload" as="image" href="https://atlasskilltech.app/chat-bot/b-des.jpg">
<link rel="preload" as="image" href="https://atlasskilltech.app/chat-bot/b-tech.jpg">
<link rel="preload" as="image" href="https://atlasskilltech.app/chat-bot/mba.jpg">
<link rel="preload" as="image" href="https://atlasskilltech.app/chat-bot/ATLAS-Intro.jpg">

<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '913563154466676');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=913563154466676&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->





<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '445297888537892');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=445297888537892&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->


</head>

<body class="<?php echo $body ?>">
     <script type="text/javascript">
                    var npf_d='https://admissions.atlasuniversity.edu.in';
                    var npf_c='5473';
                    var npf_m='1';
                    var s=document.createElement("script");
                    s.type="text/javascript";
                    s.async=true;
                    s.src="https://track.nopaperforms.com/js/track.js";
                    document.body.appendChild(s);
                </script>
	<div data-wf--header-atlas--variant="default" class="header">
		<div id="topbar" class="topnavbar">
			<div class="top-menu-bar atlas-bg">
			     <a href="https://www.atlasuniversity.edu.in/deb-application.pdf" class="tp-links w-inline-block">
					<div class="tp-text">DEB Application Form</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="icon-link-mob" />
				</a>
			     <a href="https://atlasuniversity.edu.in/news/" class="tp-links w-inline-block">
					<div class="tp-text">ATLAS News</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="icon-link-mob" />
				</a>
			 <!--   <a href="https://atlasuniversity.edu.in/errorpages" class="tp-links w-inline-block">-->
				<!--	<div class="tp-text">NAAC</div>-->
				<!--	<img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="icon-link-mob" />-->
				<!--</a>-->
			    <a href="https://atlasuniversity.edu.in/advantages/atlas-internationalisation" class="tp-links w-inline-block">
					<div class="tp-text">Internationalisation</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="icon-link-mob" />
				</a>
				
				<a href="https://atlasuniversity.edu.in/centre_for_research/" class="tp-links w-inline-block">
					<div class="tp-text">Center for Research</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="icon-link-mob" />
				</a>
				<!--<a href="<?php echo $domain ?>iqac" class="tp-links w-inline-block">-->
				<!--	<div class="tp-text">IQAC </div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="icon-link-mob" />-->
				<!--</a>-->
				<!--<a href="<?php echo $domain ?>iqac" class="tp-links w-inline-block">-->
				<!--	<div class="tp-text">Centre for Research</div>-->
				<!--	<img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="icon-link-mob" />-->
				<!--</a>-->
				<a href="<?php echo $domain ?>library" class="tp-links w-inline-block">
					<div class="tp-text">Library</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="icon-link-mob" />
				</a>
				<!--<a href="#" class="tp-links w-inline-block">-->
				<!--	<div class="tp-text">ATLAS Aspire Centre</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="icon-link-mob" />-->
				<!--</a>-->
				
				<a href="<?php echo $domain ?>examination" class="tp-links w-inline-block">
					<div class="tp-text">Examination</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="icon-link-mob" />
				</a><a href="<?php echo $domain ?>atlas-alumni-corner" class="tp-links w-inline-block">
					<div class="tp-text">Alumni</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="icon-link-mob" />
				</a><a href="<?php echo $domain ?>atlas-industry-partnership" class="tp-links w-inline-block">
					<div class="tp-text">Industry Relations</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="icon-link-mob" />
				</a><a href="<?php echo $domain ?>atlas-hei-relationship" class="tp-links w-inline-block">
					<div class="tp-text">HEI Relations</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="icon-link-mob" />
				</a><a href="<?php echo $domain ?>job-openings" class="tp-links w-inline-block">
					<div class="tp-text">Job Openings</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="icon-link-mob" />
				</a><a href="https://www.upgradliving.com/" class="tp-links w-inline-block">
					<div class="tp-text">Student Housing</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="icon-link-mob" />
				</a><a href="<?php echo $domain ?>contact-us" class="tp-links w-inline-block">
					<div class="tp-text">Contact Us</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="icon-link-mob" />
				</a></div>
		</div>
		<div id="mainbar" class="second-header-wrapper">
			<div class="logo-container"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6891ba45f0b791ba8991785e_hambuger.svg" loading="lazy" alt="" class="hamburger-menu" /><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68a6b1a9096b969e72bc49dc_cross-icon.svg" loading="lazy" alt="" class="hamb-close-icon" />
				<div class="logo">
				    
				    
				    
				    <!--<a href="https://atlasuniversity.edu.in/" aria-current="page" class="m-link w-inline-block w--current">-->
				    <!--<img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6908c8ec043d7bb791bfd372_atlas-logo-new.png"  -->
				    <!--loading="eager" alt="Atlas Logo" -->
				    <!--class="logo-main-atlas" />-->
			     <!--	</a>-->
<a href="https://atlasuniversity.edu.in/" aria-current="page" class="m-link w-inline-block w--current">
  <img 
    src="https://atlasuniversity.edu.in/assets/images/logo/atlaslogo102x45.svg"
    srcset="
      https://atlasuniversity.edu.in/assets/images/logo/atlaslogo102x45.svg 1x,
      https://atlasuniversity.edu.in/assets/images/logo/atlas204x91.svg 2x
    "
    loading="eager"
    alt="ATLAS University Logo"
    class="logo-main-atlas"
  />
</a>

				</div>
				<form action="<?php echo $domain ?>search" class="search-br w-form">
				    <!--<input class="search-input w-input" maxlength="256" name="query" placeholder="Ask me anything... Courses, People, or Campus secrets - Your AI guide awaits" type="search" id="search" required="" />-->
				    <!--<input type="submit" class="search-icon-atlas w-button" value="" />-->
				    </form> 
				<div class="logo-btn-wrap">
				<!--    <a Data-id="apply-now" data-wf--button-secondary--variant="atlas" href="<?php echo $edudomain ?>applicationform" class="secondary-btn w-variant-25d04a90-3822-0d33-318d-11d2b1182066">-->
				<!--        Apply Now-->
				<!--</a>-->
				
				
				<?php
$path = $_SERVER['REQUEST_URI'];  

if (strpos($path, 'schools/ugdx/summerschool') !== false) {
    $finalLink2 = $edudomain . "summertech";
} else {
    $finalLink2 = $edudomain . "applicationform";
}
?>

<a data-id="apply-now"
   data-wf--button-secondary--variant="atlas"
   href="<?php echo $finalLink2; ?>"
   class="secondary-btn w-variant-25d04a90-3822-0d33-318d-11d2b1182066">
   Apply Now
</a>
				 </div>
				 
				 	<div class="logo-btn-wrap hide-btn">
			

<a data-id="apply-now"
   data-wf--button-secondary--variant="atlas"
   href="https://atlasuniversity.edu.in/admissions"
   class="secondary-btn w-variant-25d04a90-3822-0d33-318d-11d2b1182066 ">
   Continue Application
</a>
				 </div>
				 
				 
				<div class="logo-btn-wrap hide-btn">
				
				<a  data-wf--button-secondary--variant="transparent-bg" href="<?php echo $domain ?>campusvisit" class="secondary-btn w-variant-71409380-1b8e-2875-4bbc-343ba8ff87a7 ">
				    Schedule a visit</a>
		    </div>
			
			
			
			</div>
			<div id="main-menu-container" class="main-menu-container">
				<div class="mega-menus atlas-menu">
					<div class="nav-link">
						<div class="text-link">
							<div class="nav-name">Schools</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/684c11165560d41e0d3c293c_dw-arrow.svg" loading="lazy" alt="" class="nav-arrow" />
						</div>
						<div class="sub-nav">
							<ul role="list" class="level-1 w-list-unstyled">
							    <li class="level-1-item">
								</li>
								<li class="level-1-item">
								    <a href="<?php echo $domain ?>schools/isdi" class="level-1-link w-inline-block">
										<div class="text-lnk">ISDI - School of <br />Design &amp; Innovation</div>
										<img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
									</a>
								</li>
								<li class="level-1-item"><a href="<?php echo $domain ?>schools/isme" class="level-1-link w-inline-block">
								<div class="text-lnk">ISME - School of<br />Management &amp; Entrepreneurship</div>
								<img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
								</a>
								</li>
								<li class="level-1-item">
								    <a href="<?php echo $domain ?>schools/ugdx" class="level-1-link w-inline-block">
									<div class="text-lnk">uGDX - School of <br />Technology</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
									</a>
									</li>
								<li class="level-1-item"><a href="<?php echo $domain ?>schools/law" class="level-1-link w-inline-block">
										<div class="text-lnk">School of Law</div>
										<img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
									</a>
								</li>
									<li class="level-1-item"><a href="https://atlasonline.edu.in/" class="level-1-link w-inline-block">
										<div class="text-lnk">ATLAS CDOE</div>
										<img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
									</a>
								</li>
								<li class="level-1-item"><a href="<?php echo $domain ?>schools/ce" class="level-1-link w-inline-block">
										<div class="text-lnk">ATLAS EDGE - Centre for Lifelong &<br /> Professional Learning</div>
										<img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
									</a>
								</li>
							</ul>
							<div class="nav-image-container"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/689b2f3e16524066a9b9565e_program-menu-img.webp" loading="lazy" sizes="100vw" 
							srcset="
							https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/689b2f3e16524066a9b9565e_program-menu-img-p-500.webp 500w,
							https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/689b2f3e16524066a9b9565e_program-menu-img-p-800.webp 800w,
							https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/689b2f3e16524066a9b9565e_program-menu-img.webp 1023w"
							alt="A faculty member speaking to students in a classroom at ATLAS University" class="nav-image" /></div>
						</div>
					</div>
					<div class="nav-link">
						<div class="text-link">
							<div class="nav-name">Programs</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/684c11165560d41e0d3c293c_dw-arrow.svg" loading="lazy" alt="" class="nav-arrow" />
						</div>
						<div class="sub-nav">
							<ul role="list" class="level-1 w-list-unstyled">
								<li class="level-1-item"><a href="<?php echo $domain ?>programs/ug-programs-atlas" class="level-1-link w-inline-block">
										<div class="text-lnk">Undergraduate Programs</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
									</a></li>
								<li class="level-1-item"><a href="<?php echo $domain ?>programs/pg-programs-atlas" class="level-1-link w-inline-block">
										<div class="text-lnk">Postgraduate Programs</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
									</a></li>
								<li class="level-1-item"><a href="<?php echo $domain ?>programs/programs-list-integrated" class="level-1-link w-inline-block">
										<div class="text-lnk">Integrated Programs</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
									</a></li>
									
									<li class="level-1-item"><a href="https://atlasonline.edu.in/" class="level-1-link w-inline-block">
										<div class="text-lnk">Online Degree Programs</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
									</a></li>
							<style>
							    .level-2 {
    z-index: 1;
    background-color: #f5f5f5;
    flex: none;
    width: 330px;
    height: 100%;
    margin-bottom: 0;
    padding: 32px 0 32px 32px;
    list-style-type: none;
    display: none;
    position: absolute;
    inset: 0% auto auto 100%;
}
.level-2-item {
    margin-bottom: 8px;
    font-weight: 400;
    display: flex;
}
	
	.level-2-link {
    grid-column-gap: 5px;
    grid-row-gap: 5px;
    color: #2b2b2b;
    background-color: #0000;
    flex-flow: row;
    grid-template-rows: auto auto;
    grid-template-columns: 1fr 1fr;
    grid-auto-columns: 1fr;
    align-items: center;
    margin-bottom: 0;
    padding-top: 5px;
    padding-bottom: 5px;
    text-decoration: none;
    display: flex;
}
.text-lnk {
    flex: none;
    font-weight: 400;
    text-decoration: none;
}
.link-arrow {
    width: 22px;
}
							    
							    @media only screen and (min-width: 567px) {
    .mega-menus.isdi-menu .sub-nav .level-2.active {
        display: block;
        opacity: 1;
        visibility: visible;
    }
    .mega-menus.isdi-menu .sub-nav .level-2, .mega-menus.isdi-menu .sub-nav .level-3 {
        transition: opacity 0.2s ease, visibility 0.2s ease;
        opacity: 0;
        visibility: hidden;
        display: none;
    }
        .mega-menus.isdi-menu .sub-nav .level-1-item div.level-1-link, .mega-menus.isdi-menu .sub-nav .level-1-item a.level-1-link, .mega-menus.isdi-menu .sub-nav .level-2-item div.level-2-link, .mega-menus.isdi-menu .sub-nav .level-2-item a.level-2-link, .mega-menus.isdi-menu .sub-nav .level-3-item div.level-3-link, .mega-menus.isdi-menu .sub-nav .level-3-item a.level-3-link {
        transition: all 0.2s ease;
    }
        .mega-menus.isdi-menu .nav-link, .mega-menus.isdi-menu .sub-nav .level-1-link, .mega-menus.isdi-menu .sub-nav .level-2-link, .mega-menus.isdi-menu .sub-nav .level-3-link {
        cursor: pointer;
    }
    .mega-menus.isdi-menu .sub-nav img {
        transition: filter 0.2s ease, opacity 0.2s ease;
    }
}

							</style>
								<li class="level-1-item">
										<div class="level-1-link">
											<div class="text-lnk">Summer Schools</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
											<ul id="undergraduate" role="list" class="level-2 w-list-unstyled">
												<li class="level-2-item"><a href="<?php echo $domain ?>schools/isdi/programs/pre-university-summer-school" class="level-2-link w-inline-block">
														<div class="text-lnk">ISDI Summer School (Design)</div>
														<img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a>
												</li>
												<li class="level-2-item"><a href="<?php echo $domain ?>schools/isme/programs/summer-school-management" class="level-2-link w-inline-block">
														<div class="text-lnk">ISME Summer School (Business)</div>
														<img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a>
												</li>
												<li class="level-2-item"><a href="<?php echo $domain ?>schools/ugdx/summerschool" class="level-2-link w-inline-block">
														<div class="text-lnk">uGDX Summer School (Technology)</div>
														<img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a>
												</li>
												
											</ul>
										</div>
									</li>	
									
									<li class="level-1-item"><a href="<?php echo $domain ?>advantages/partnership/global-pathways" target="_blank" class="level-1-link w-inline-block">
										<div class="text-lnk">Global Pathways</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
									    </a>
									</li>
							</ul>
							<div class="nav-image-container"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/689b2f3e16524066a9b9565e_program-menu-img.webp" loading="lazy" sizes="100vw" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/689b2f3e16524066a9b9565e_program-menu-img-p-500.webp 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/689b2f3e16524066a9b9565e_program-menu-img-p-800.webp 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/689b2f3e16524066a9b9565e_program-menu-img.webp 1023w" alt="A faculty member speaking to students in a classroom at ATLAS University" class="nav-image" /></div>
						</div>
					</div>
					<div class="nav-link">
						<div class="text-link">
							<div class="nav-name">Admissions</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/684c11165560d41e0d3c293c_dw-arrow.svg" loading="lazy" alt="" class="nav-arrow" />
						</div>
						<div class="sub-nav">
							<ul role="list" class="level-1 w-list-unstyled">
								<li class="level-1-item"><a href="<?php echo $domain ?>admissions/ug-admissions" class="level-1-link w-inline-block">
										<div class="text-lnk">Undergraduate Programs</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
									</a></li>
								<li class="level-1-item"><a href="<?php echo $domain ?>admissions/pg-admissions" class="level-1-link w-inline-block">
										<div class="text-lnk">Postgraduate Programs</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
									</a></li>
								<li class="level-1-item"><a href="<?php echo $domain ?>admissions/integrated-admissions" class="level-1-link w-inline-block">
										<div class="text-lnk">Integrated Programs</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
									</a></li>
										<li class="level-1-item"><a href="https://atlasonline.edu.in/" class="level-1-link w-inline-block">
										<div class="text-lnk">Online Degree Programs</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
									</a></li>
							</ul>
							<div class="nav-image-container"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/689b2f9fb93855ededfbdcad_admission-menu-img.webp" 
							loading="lazy" 
							sizes="100vw" 
							srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/689b2f9fb93855ededfbdcad_admission-menu-img-p-500.webp 500w,
							        https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/689b2f9fb93855ededfbdcad_admission-menu-img-p-800.webp 800w,
							        https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/689b2f9fb93855ededfbdcad_admission-menu-img.webp 1023w"
							        alt="Students discussing and interacting in a classroom at ATLAS University" class="nav-image" /></div>
						</div>
					</div>
					<div class="nav-link">
						<div class="text-link">
							<div class="nav-name">Advantages</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/684c11165560d41e0d3c293c_dw-arrow.svg" loading="lazy" alt="" class="nav-arrow" />
						</div>
						<div class="sub-nav">
							<ul role="list" class="level-1 w-list-unstyled">
								<li class="level-1-item"><a href="<?php echo $domain ?>advantages/atlas-advantages" class="level-1-link w-inline-block">
										<div class="text-lnk">Core advantages</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
									</a></li>
								<li class="level-1-item"><a href="<?php echo $domain ?>advantages/atlas-multidisciplinary" class="level-1-link w-inline-block">
										<div class="text-lnk">Multidisciplinary Learning</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
									</a></li>
								<li class="level-1-item"><a href="<?php echo $domain ?>advantages/atlas-internationalisation" class="level-1-link w-inline-block">
										<div class="text-lnk">Internationalisation</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
									</a></li>
								<li class="level-1-item"><a href="<?php echo $domain ?>advantages/atlas-industry-centric-approach" class="level-1-link w-inline-block">
										<div class="text-lnk">Industry</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
									</a></li>
								<li class="level-1-item"><a href="<?php echo $domain ?>advantages/atlas-enterprenurship" class="level-1-link w-inline-block">
										<div class="text-lnk">Entrepreneurship</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
									</a></li>
								<li class="level-1-item"><a href="<?php echo $domain ?>advantages/atlas-career-services" class="level-1-link w-inline-block">
										<div class="text-lnk">Career services</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
									</a></li>
							</ul>
							<div class="nav-image-container"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/689b2f9fb93855ededfbdcad_admission-menu-img.webp" 
							loading="lazy" sizes="100vw" 
							srcset="
							https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/689b2f9fb93855ededfbdcad_admission-menu-img-p-500.webp 500w, 
							https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/689b2f9fb93855ededfbdcad_admission-menu-img-p-800.webp 800w, 
							https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/689b2f9fb93855ededfbdcad_admission-menu-img.webp 1023w" alt="Students discussing and interacting in a classroom at ATLAS University" 
							class="nav-image" /></div>
						</div>
					</div>
					<div class="nav-link"><a href="<?php echo $domain ?>success-stories-atlas" class="text-link w-inline-block">
							<div class="nav-name">Success Stories</div>
						</a></div>
					<div class="nav-link"><a href="<?php echo $domain ?>life-at-atlas" class="text-link w-inline-block">
							<div class="nav-name">Life@ATLAS </div>
						</a></div>
					<div class="nav-link"><a href="<?php echo $domain ?>campus-atlas" class="text-link w-inline-block">
							<div class="nav-name">Campus</div>
						</a></div>
					<div class="nav-link"><a href="<?php echo $domain ?>about-us" class="text-link w-inline-block">
							<div class="nav-name">About Us</div>
						</a></div>
					<div class="w-embed">
						<style>
						@media only screen and (min-width: 567px) {

							/* Base styles for ISDI sub-navigation with transitions */
							.mega-menus.atlas-menu .sub-nav {
								transition: opacity 0.3s ease, visibility 0.3s ease;
								opacity: 0;
								visibility: hidden;
								display: none;
							}

							.mega-menus.atlas-menu .sub-nav .level-2,
							.mega-menus.atlas-menu .sub-nav .level-3 {
								transition: opacity 0.2s ease, visibility 0.2s ease;
								opacity: 0;
								visibility: hidden;
								display: none;
							}

							/* Show sub-nav when active (clicked or triggered) */
							.mega-menus.atlas-menu .nav-link.active .sub-nav,
							.mega-menus.atlas-menu .sub-nav.active {
								display: flex;
								opacity: 1;
								visibility: visible;
							}

							/* Show level-2 when active */
							.mega-menus.atlas-menu .sub-nav .level-2.active {
								display: block;
								opacity: 1;
								visibility: visible;
							}

							/* Show level-3 when active */
							.mega-menus.atlas-menu .sub-nav .level-3.active {
								display: block;
								opacity: 1;
								visibility: visible;
							}

							/* Underline effect for nav links */
							.mega-menus.atlas-menu .nav-link:hover .text-link:after,
							.mega-menus.atlas-menu .text-link.w--current:after {
								content: "";
								display: block;
								width: 100%;
								position: absolute;
								left: 0px;
								bottom: -4px;
								height: 8px;
								background: #02B3C3;
								z-index: 1;
							}

							/* Hover styles for all levels */
							.mega-menus.atlas-menu .sub-nav .level-1-item div.level-1-link,
							.mega-menus.atlas-menu .sub-nav .level-1-item a.level-1-link,
							.mega-menus.atlas-menu .sub-nav .level-2-item div.level-2-link,
							.mega-menus.atlas-menu .sub-nav .level-2-item a.level-2-link,
							.mega-menus.atlas-menu .sub-nav .level-3-item div.level-3-link,
							.mega-menus.atlas-menu .sub-nav .level-3-item a.level-3-link {
								transition: all 0.2s ease;
							}

							.mega-menus.atlas-menu .sub-nav .level-1-item:hover div.level-1-link,
							.mega-menus.atlas-menu .sub-nav .level-1-item:hover a.level-1-link,
							.mega-menus.atlas-menu .sub-nav .level-2-item:hover div.level-2-link,
							.mega-menus.atlas-menu .sub-nav .level-2-item:hover a.level-2-link,
							.mega-menus.atlas-menu .sub-nav .level-3-item:hover div.level-3-link,
							.mega-menus.atlas-menu .sub-nav .level-3-item:hover a.level-3-link {
								padding: 5px 10px;
								background: #02B3C3;
								color: #fff;
								font-weight: 500;
							}

							/* Arrow rotation with smooth transition */
							.mega-menus.atlas-menu .nav-arrow {
								transition: transform 0.3s ease;
							}

							.mega-menus.atlas-menu .nav-link.active .nav-arrow {
								transform: rotate(-180deg);
							}

							/* Image filter effects with smooth transitions */
							.mega-menus.atlas-menu .sub-nav img {
								transition: filter 0.2s ease, opacity 0.2s ease;
							}

							.mega-menus.atlas-menu .sub-nav .level-1-item:hover div.level-1-link>img,
							.mega-menus.atlas-menu .sub-nav .level-1-item:hover a.level-1-link>img,
							.mega-menus.atlas-menu .sub-nav .level-2-item:hover div.level-2-link>img,
							.mega-menus.atlas-menu .sub-nav .level-2-item:hover a.level-2-link>img,
							.mega-menus.atlas-menu .sub-nav .level-3-item:hover a.level-3-link>img {
								filter: brightness(0) invert(1);
								opacity: 1;
							}

							/* Cursor pointer for all clickable elements */
							.mega-menus.atlas-menu .nav-link,
							.mega-menus.atlas-menu .sub-nav .level-1-link,
							.mega-menus.atlas-menu .sub-nav .level-2-link,
							.mega-menus.atlas-menu .sub-nav .level-3-link {
								cursor: pointer;
							}
						}
						</style>
					</div>
					<div class="code-embed-3 w-embed w-script">
						<script>
						// Click-based Mega Menu Script
						document.addEventListener('DOMContentLoaded', function() {
							// Close all menus function
							function closeAllMenus() {
								document.querySelectorAll('.mega-menus .sub-nav').forEach(menu => {
									menu.classList.remove('active');
								});
								document.querySelectorAll('.mega-menus .level-2').forEach(menu => {
									menu.classList.remove('active');
								});
								document.querySelectorAll('.mega-menus .level-3').forEach(menu => {
									menu.classList.remove('active');
								});
								document.querySelectorAll('.mega-menus .nav-link').forEach(link => {
									link.classList.remove('active');
								});
							}
							// Handle main nav-link clicks
							document.querySelectorAll('.mega-menus .nav-link').forEach(navLink => {
								navLink.addEventListener('click', function(e) {
									const subNav = this.querySelector('.sub-nav');
									// Only prevent default if there's a submenu
									if(subNav) {
										//e.preventDefault();
										e.stopPropagation();
										const isActive = this.classList.contains('active');
										// Close all menus first
										closeAllMenus();
										// Toggle current menu
										if(!isActive) {
											this.classList.add('active');
											subNav.classList.add('active');
										}
									}
									// If no submenu, let the link navigate normally
								});
							});
							// Handle level-1 items (with level-2 submenus)
							document.querySelectorAll('.mega-menus .sub-nav .level-1-item').forEach(item => {
								const linkDiv = item.querySelector('div.level-1-link');
								const linkA = item.querySelector('a.level-1-link');
								const level2 = item.querySelector('.level-2');
								// Handle div links (non-clickable headers with submenus)
								if(linkDiv && level2) {
									linkDiv.addEventListener('click', function(e) {
										//e.preventDefault();
										e.stopPropagation();
										const isActive = level2.classList.contains('active');
										// Close all level-2 and level-3 menus
										document.querySelectorAll('.mega-menus .level-2').forEach(menu => {
											menu.classList.remove('active');
										});
										document.querySelectorAll('.mega-menus .level-3').forEach(menu => {
											menu.classList.remove('active');
										});
										// Toggle current level-2 menu
										if(!isActive) {
											level2.classList.add('active');
										}
									});
								}
								// Handle anchor links with submenus
								if(linkA && level2) {
									linkA.addEventListener('click', function(e) {
										// e.preventDefault();
										e.stopPropagation();
										const isActive = level2.classList.contains('active');
										// Close all level-2 and level-3 menus
										document.querySelectorAll('.mega-menus .level-2').forEach(menu => {
											menu.classList.remove('active');
										});
										document.querySelectorAll('.mega-menus .level-3').forEach(menu => {
											menu.classList.remove('active');
										});
										// Toggle current level-2 menu
										if(!isActive) {
											level2.classList.add('active');
										}
									});
								}
								// If it's an anchor link WITHOUT submenu, let it navigate normally
							});
							// Handle level-2 items (with level-3 submenus)
							document.querySelectorAll('.mega-menus .sub-nav .level-2-item').forEach(item => {
								const linkDiv = item.querySelector('div.level-2-link');
								const linkA = item.querySelector('a.level-2-link');
								const level3 = item.querySelector('.level-3');
								// Handle div links
								if(linkDiv && level3) {
									linkDiv.addEventListener('click', function(e) {
										// e.preventDefault();
										e.stopPropagation();
										const isActive = level3.classList.contains('active');
										// Close all level-3 menus
										document.querySelectorAll('.mega-menus .level-3').forEach(menu => {
											menu.classList.remove('active');
										});
										// Toggle current level-3 menu
										if(!isActive) {
											level3.classList.add('active');
										}
									});
								}
								// Handle anchor links with submenus
								if(linkA && level3) {
									linkA.addEventListener('click', function(e) {
										// e.preventDefault();
										e.stopPropagation();
										const isActive = level3.classList.contains('active');
										// Close all level-3 menus
										document.querySelectorAll('.mega-menus .level-3').forEach(menu => {
											menu.classList.remove('active');
										});
										// Toggle current level-3 menu
										if(!isActive) {
											level3.classList.add('active');
										}
									});
								}
								// If it's an anchor link WITHOUT submenu, let it navigate normally
							});
							// Close menus when clicking outside
							document.addEventListener('click', function(e) {
								if(!e.target.closest('.mega-menus')) {
									closeAllMenus();
								}
							});
							// Prevent menu closure when clicking inside sub-nav (but allow link navigation)
							document.querySelectorAll('.mega-menus .sub-nav').forEach(subNav => {
								subNav.addEventListener('click', function(e) {
									// Only stop propagation if not clicking a direct link
									if(!e.target.closest('a.level-3-link') && !e.target.closest('a.level-2-link:not(:has(.level-3))') && !e.target.closest('a.level-1-link:not(:has(.level-2))')) {
										e.stopPropagation();
									}
								});
							});
						});
						</script>
					</div>
				</div>
			</div>
		</div>
		<div class="mobile-bottom-buttons">
		    <a href="<?php echo $domain ?>applicationform" class="btm-links bg-1">Apply Now</a>
		    
		    <a href="<?php echo $domain ?>campusvisit" class="btm-links bg-2">Schedule a visit</a>
		    
		    </div>
		<div class="drawer-menu-code-isdi w-embed">
			<style>
			@media only screen and (max-width: 768px) {
				#main-menu-container {
					position: fixed;
					top: 0;
					left: -100%;
					width: 100%;
					height: 100vh;
					z-index: -1;
					background: #fff;
					padding-top: 80px;
					overflow: auto;
					transition: ease-in all 0.2s;
					opacity: 0;
					padding-bottom: 72px
				}

				.mega-menus,
				.topnavbar,
				.mobile-bottom-buttons {
					opacity: 0;
				}

				#main-menu-container.open {
					left: 0%;
					z-index: 10;
					opacity: 1;
				}

				#main-menu-container.open .mega-menus,
				#main-menu-container.open .topnavbar,
				#main-menu-container.open .mobile-bottom-buttons {
					opacity: 1;
				}

				#main-menu-container.open .mobile-bottom-buttons {
					position: fixed;
					bottom: 0px;
					z-index: 10;
					width: 100%;
				}

				/* FULL-SCREEN DRAWERS */
				.sub-nav,
				.level-2,
				.level-3 {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100vh;
					background: #fff;
					border-right: 1px solid #ccc;
					transform: translateX(-101%);
					/* made changes here */
					transition: transform 0.4s ease, opacity 0.4s ease;
					opacity: 0;
					pointer-events: none;
					z-index: 10;
					overflow-y: auto;
				}

				/* Active Drawer */
				.sub-nav.active,
				.level-2.active,
				.level-3.active {
					transform: translateX(0%);
					opacity: 1;
					pointer-events: auto;
					z-index: 100;
					display: block;
				}

				/*
.sub-nav{
	top: 80px;
}*/
				/* DRAWER HEADER */
				.drawer-header {
					background: #e0e0e0;
					padding: 15px 16px;
					font-weight: bold;
					font-size: 14px;
					color: #000;
					display: flex;
					align-items: center;
					border-bottom: 1px solid #ccc;
					font-size: 16px;
					position: sticky;
					top: 0;
					z-index: 2;
				}

				.back-btn {
					margin-right: 10px;
					cursor: pointer;
					font-weight: bold;
					color: #333;
				}

				/* LINKS */
				.sub-nav ul,
				.level-2 ul,
				.level-3 ul {
					list-style: none;
					padding: 0;
					margin: 0;
				}

				.level-1-link,
				.level-2-link,
				.level-3-link {
					display: flex;
					padding: 14px 16px;
					background: #fff;
					border-bottom: 1px solid #ddd;
					cursor: pointer;
					width: 100%;
					font-size: 14px;
				}

				.text-lnk {
					pointer-events: none;
				}
			}
			</style>
		</div>
		<div class="code-embed-6 w-embed w-script">
			<style>
			#npf-popup-overlay-campus {
				display: none;
				position: fixed;
				z-index: 9999;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, 0.7);
				justify-content: center;
				align-items: center;
			}

			#npf-popup-campus {
				background: #fff;
				width: 90%;
				max-width: 800px;
				/*height: 80%;*/
				position: relative;
				border-radius: 8px;
				overflow-y: auto;
				padding: 20px;
			}

			#npf-close-campus {
				position: absolute;
				top: 10px;
				right: 15px;
				background: #000;
				color: #fff;
				border: none;
				font-size: 18px;
				padding: 5px 10px;
				border-radius: 4px;
				cursor: pointer;
			}

			#npf-popup-campus iframe {
				height: 100%;
			}

			/*.npf_wgts {*/
			/*	height: 700px;*/
			/*}*/
			</style>

			<script>
			document.addEventListener("DOMContentLoaded", function() {
				const triggers = document.querySelectorAll('[data-id="campus-visit"]');
				const overlay = document.getElementById("npf-popup-overlay-campus");
				const closeBtn = document.getElementById("npf-close-campus");
				triggers.forEach(trigger => {
					trigger.addEventListener("click", function(e) {
						e.preventDefault();
						overlay.style.display = "flex";
						if(!window.npfLoadedCampus) {
							const s = document.createElement("script");
							s.type = "text/javascript";
							s.async = true;
							s.src = "https://widgets.in5.nopaperforms.com/emwgts.js";
							document.body.appendChild(s);
							window.npfLoadedCampus = true;
						}
					});
				});
				closeBtn.addEventListener("click", () => overlay.style.display = "none");
				overlay.addEventListener("click", e => {
					if(e.target === overlay) overlay.style.display = "none";
				});
			});
			</script>
		</div>
	</div>