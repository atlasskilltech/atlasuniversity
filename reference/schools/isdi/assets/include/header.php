<?php include 'dynamic.php' ?>

<!DOCTYPE html>
<html data-wf-domain="<?php echo $domain ?>" data-wf-page="<?php echo $htmlDataId?>" data-wf-site="6846c77f346415bfcbb813b6" lang="en">

<head>
	<meta charset="utf-8" />
	<title><?php echo $title ?></title>
	<meta content="<?php echo $title ?>" property="og:title" />
	<meta content="<?php echo $description ?>" property="twitter:title" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta content="Webflow" name="generator" />
	<meta
        name="description"
        content="<?php echo $description ?>">
	<meta property="og:site_name" content="ATLAS SKILLTECH UNIVERSITY"/>
    <meta property="og:title" content="<?php echo $title ?>"/>
    <meta property="og:url" content="https://atlasuniversity.edu.in/"/>
    <meta property="og:type" content="website"/>
    <meta property="og:description" content="<?php echo $description ?>"/>
    <meta property="og:image" content="https://atlasuniversity.edu.in/wp-content/uploads/2022/05/atlas-skillset-university.jpeg"/>
    <meta property="og:image:url" content="https://atlasuniversity.edu.in/wp-content/uploads/2022/05/atlas-skillset-university.jpeg"/>
    <meta property="og:image:secure_url" content="https://atlasuniversity.edu.in/wp-content/uploads/2022/05/atlas-skillset-university.jpeg"/>
    <!-- Google+ / Schema.org -->
    <!-- Twitter Cards -->
    <meta name="twitter:title" content="<?php echo $title ?>"/>
    <meta name="twitter:url" content="https://atlasuniversity.edu.in/"/>
    <meta name="twitter:description" content="<?php echo $description ?>"/>
    <meta name="twitter:image" content="https://atlasuniversity.edu.in/wp-content/uploads/2022/05/atlas-skillset-university.jpeg"/>
    <meta name="twitter:card" content="summary_large_image"/>
 <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
	<!-- main  -->
	<link rel="preload" 
	      href="<?php echo $domain ?>assets/css/main/atlass-fantastic-site-48323a.webflow.shared.e958bf6b1.css" 
	      as="style" 
	      onload="this.rel='stylesheet'">
    <noscript>
        <link rel="stylesheet" 
              href="<?php echo $domain ?>assets/css/main/atlass-fantastic-site-48323a.webflow.shared.e958bf6b1.css">
    </noscript>

	<!-- change-->
	<link rel="preload" 
	      href="<?php echo $domain ?>assets/css/<?php echo $css ?>" 
	      as="style" 
	      onload="this.rel='stylesheet'">
    <noscript>
        <link rel="stylesheet" 
              href="<?php echo $domain ?>assets/css/<?php echo $css ?>">
    </noscript>

<link rel="canonical" href="<?= 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] ?>" />
	<link href="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/css/atlass-fantastic-site-48323a.webflow.68e7910cfd354f81f55224f6-5020c8a92.css" rel="stylesheet" type="text/css" />
	<link href="https://fonts.googleapis.com" rel="preconnect" />
	<link href="https://fonts.gstatic.com" rel="preconnect" crossorigin="anonymous" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">
	
	
	<script type="text/javascript">
	! function(o, c) {
		var n = c.documentElement,
			t = " w-mod-";
		n.className += t + "js", ("ontouchstart" in o || o.DocumentTouch && c instanceof DocumentTouch) && (n.className += t + "touch")
	}(window, document);
	</script>
	<link href="<?php echo $domain ?>assets/images/icon/favicon-32x32.png" rel="shortcut icon" type="image/x-icon" />
	<link href="<?php echo $domain ?>assets/images/icon/atlas-256.png" rel="apple-touch-icon" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" media="print" onload="this.media='all'" />
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
	
		.tertiary-btn{
    background-color: #352e7e;
    color: #fff;
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
			background: url("<?php echo $domain ?>assets/images/icon/arrow-top-rt-blk.svg") center center no-repeat #07F6a0;
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
		
		
		.youtubeicon{
        background-color: #0000;
    padding: 0;
    position: absolute;
    top: 1em;
    right: 1em;
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

<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WZ2XXQCJ"

height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

<!-- End Google Tag Manager (noscript) -->
<!-- Event snippet for Submit lead form conversion page -->
<script>
  gtag('event', 'conversion', {
      'send_to': 'AW-17897989356/Rwy0CPm3x-sbEOzJttZC',
      'value': 1.0,
      'currency': 'INR'
  });
</script>

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



<body class="body isdi-page">
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
	<div class="main-wrapper">
		<div data-wf--header-isdi--variant="default" class="header">
			<div id="topbar" class="topnavbar">
				<div class="top-menu-bar isdi-bg">
				    <a href="<?php echo $domain ?>parents-corner" class="tp-links w-inline-block">
						<div class="tp-text">Parents Corner</div>
						<img 
						  class="icon-link-mob"
						  src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg"
						  width="24"
						  height="24"
						  alt=""
						  loading="lazy">
					</a>
					<a href="<?php echo $domain ?>isdi-for-outstation" class="tp-links w-inline-block">
						<div class="tp-text">ISDI For Outstation</div>
						<img 
						  class="icon-link-mob"
						  src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg"
						  width="24"
						  height="24"
						  alt=""
						  loading="lazy">
					</a>
					<a href="<?php echo $ogdomain ?>atlas-hei-relationship" class="tp-links w-inline-block">
						<div class="tp-text">HEI Relations</div>
						<img 
						  class="icon-link-mob"
						  src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg"
						  width="24"
						  height="24"
						  alt=""
						  loading="lazy">
					</a>
					<a href="<?php echo $ogdomain ?>atlas-industry-partnership" class="tp-links w-inline-block">
						<div class="tp-text">Industry Relations</div>
						<img 
						  class="icon-link-mob"
						  src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg"
						  width="24"
						  height="24"
						  alt=""
						  loading="lazy">
					</a>
					<a href="<?php echo $ogdomain ?>job-openings" class="tp-links w-inline-block">
						<div class="tp-text">Job Openings</div>
						<img 
						  class="icon-link-mob"
						  src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg"
						  width="24"
						  height="24"
						  alt=""
						  loading="lazy">
					</a>
					<a href="<?php echo $ogdomain ?>" class="logo-text w-inline-block">
						<div class="tp-text">ATLAS SkillTech University</div>
						<img 
						  class="icon-link-mob"
						  src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg"
						  width="24"
						  height="24"
						  alt=""
						  loading="lazy">
					</a>
				</div>
			</div>
			<div id="mainbar" class="second-header-wrapper">
				<div class="logo-container"><img src="<?php echo $domain ?>assets/images/icon/hambuger.svg" loading="lazy" alt="" class="hamburger-menu" /><img src="<?php echo $domain ?>assets/images/icon/cross-icon.svg" loading="lazy" alt="" class="hamb-close-icon" />
					<div class="logo">
					    <a  
					        href="<?php echo $domain ?>" 
					        class="m-link w-inline-block"
					        aria-label="ISDI Home" >
					        
					        <img 
					            src="<?php echo $domain ?>assets/images/logo/isdi-logo.svg" 
					            loading="lazy" 
					            alt="Isdi Design School Logo" 
					            class="logo-main-isme" />
					    </a>
					</div>
					<form action="<?php echo $ogdomain ?>search" class="search-br w-form">
					    <!--<input class="search-input w-input" maxlength="256" name="query" placeholder="Ask me anything... Courses, People, or Campus secrets - Your AI guide awaits" type="search" id="search" required="" />-->
					    <!--<input type="submit" class="search-icon-pink w-button" value="" />-->
					 </form>
					<div class="logo-btn-wrap">
					    <a Data-id="apply-now" data-wf--button-secondary--variant="pink" href="<?php echo $ogdomain ?>applicationform" 
					    class="secondary-btn">
					        Apply Now
					        </a>
					        	</div>
					        	
					        	
					        	
					        	
					        		<div class="logo-btn-wrap hide-btn">
					    <a Data-id="apply-now" data-wf--button-secondary--variant="pink" href="https://atlasuniversity.edu.in/admissions" 
					    class="secondary-btn">
					        Continue Application
					        </a>
					        	</div>
					        	
					        	
					 				     	
					        	
					        	
					        	
					        	
					        	
					        	
					        	
					   	<div class="logo-btn-wrap hide-btn">     
					        
					    <a data-wf--button-secondary--variant="transparent-bg" href="<?php echo $ogdomain ?>campusvisit" class="secondary-btn w-variant-71409380-1b8e-2875-4bbc-343ba8ff87a7">Schedule a visit</a></div>
				</div>
				<div id="main-menu-container" class="main-menu-container">
					<div class="mega-menus isdi-menu">
						<div class="nav-link">
							<div class="text-link">
								<div class="nav-name">Programs</div><img src="<?php echo $domain ?>assets/images/icon/dw-arrow.svg" loading="lazy" alt="" class="nav-arrow" />
							</div>
							<div class="sub-nav">
								<ul role="list" class="level-1 w-list-unstyled">
									<li class="level-1-item">
										<div class="level-1-link">
											<div class="text-lnk">Undergraduate Degree</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
											<ul id="undergraduate" role="list" class="level-2 w-list-unstyled">
												<li class="level-2-item"><a href="<?php echo $domain ?>programs/undergraduate/" class="level-2-link w-inline-block">
														<div class="text-lnk">Overview</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item">
													<div class="level-2-link">
														<div class="text-lnk">B.Des</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													
														
														<ul id="bba" role="list" class="level-3 w-list-unstyled">
														    	<li class="level-3-item"><a href="<?php echo $domain ?>programs/undergraduate/b-des/accessory-design-&-craft" class="level-3-link w-inline-block">
																	<div class="text-lnk">B.Des in Accessory Design & Craft</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
																</a></li>
																	<li class="level-3-item"><a href="<?php echo $domain ?>programs/undergraduate/b-des/b-des-in-animation-&-vfx-&-gaming" class="level-3-link w-inline-block">
																	<div class="text-lnk">B.Des in Animation, VFX & Gaming</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
																</a></li>
															<li class="level-3-item"><a href="<?php echo $domain ?>programs/undergraduate/b-des/b-des-in-communication-design-&-new-media" class="level-3-link w-inline-block">
																	<div class="text-lnk">B.Des in Communication Design & New Media</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
																</a></li>
																
															<li class="level-3-item"><a href="<?php echo $domain ?>programs/undergraduate/b-des/fashion-brand-management" class="level-3-link w-inline-block">
																	<div class="text-lnk">B.Des in Fashion Brand Management</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
																</a></li>
														
															<li class="level-3-item"><a href="<?php echo $domain ?>programs/undergraduate/b-des/b-des-in-fashion-communication-&-styling" class="level-3-link w-inline-block">
																	<div class="text-lnk">B.Des in Fashion Communication & Styling</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
																</a></li>
															<li class="level-3-item"><a href="<?php echo $domain ?>programs/undergraduate/b-des/b-des-in-fashion-design-&-technology" class="level-3-link w-inline-block">
																	<div class="text-lnk">B.Des in Fashion Design & Technology</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
																</a></li>
																<li class="level-3-item"><a href="<?php echo $domain ?>programs/undergraduate/b-des/health-care-design" class="level-3-link w-inline-block">
																	<div class="text-lnk">B.Des in Health & Care Design</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
																</a></li>
															<li class="level-3-item"><a href="<?php echo $domain ?>programs/undergraduate/b-des/b-des-in-interior-design-&-built-environment" class="level-3-link w-inline-block">
																	<div class="text-lnk">B.Des in Interior Design & Built Environment</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
																</a></li>
																<li class="level-3-item"><a href="<?php echo $domain ?>programs/undergraduate/b-des/luxury-brand-strategy-&-experience-design" class="level-3-link w-inline-block">
																	<div class="text-lnk">B.Des in Luxury Brand Strategy</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
																</a></li>
														
																<li class="level-3-item"><a href="<?php echo $domain ?>programs/undergraduate/b-des/b-des-in-product-design" class="level-3-link w-inline-block">
																	<div class="text-lnk">B.Des in Product Design</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
																</a></li>
																
																	<li class="level-3-item"><a href="<?php echo $domain ?>programs/undergraduate/b-des/service-&-experience-design" class="level-3-link w-inline-block">
																	<div class="text-lnk">B.Des in Service & Experience Design</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
																</a></li>
															<li class="level-3-item"><a href="<?php echo $domain ?>programs/undergraduate/b-des/b-des-in-strategic-design-&-innovation-management" class="level-3-link w-inline-block">
																	<div class="text-lnk">B.Des in Strategic Design & Innovation Management</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
																</a></li>
															
																
															
																
																
														
																
														
																
														
														
														</ul>
													</div>
												</li>
													<li class="level-2-item">
													<div class="level-2-link">
														<div class="text-lnk">B.Tech</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
														<ul id="bba" role="list" class="level-3 w-list-unstyled">
															<li class="level-3-item"><a href="<?php echo $domain ?>programs/undergraduate/btech/btech-design-engineering" class="level-3-link w-inline-block">
																	<div class="text-lnk">B.Tech in Design Engineering </div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
																</a></li>
															<li class="level-3-item"><a href="<?php echo $domain ?>programs/undergraduate/btech/btech-ai-integrated-design" class="level-3-link w-inline-block">
																	<div class="text-lnk">B.Tech in AI Integrated Design</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
																</a></li>
														
														</ul>
													</div>
												</li>
											</ul>
										</div>
									</li>
										<li class="level-1-item">
										<div class="level-1-link">
											<div class="text-lnk">Postgraduate Degree</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
											<ul id="undergraduate" role="list" class="level-2 w-list-unstyled">
												<li class="level-2-item"><a href="<?php echo $domain ?>programs/postgraduate" class="level-2-link w-inline-block">
														<div class="text-lnk">Overview</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item">
													<div class="level-2-link">
														<div class="text-lnk">M.Des</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													
														
														<ul id="bba" role="list" class="level-3 w-list-unstyled">
														    	<li class="level-3-item">
														    	    <a href="<?php echo $domain ?>programs/postgraduate/mdes/design-futures-2-years" class="level-3-link w-inline-block">
																	<div class="text-lnk">Design Futures (2 Years)</div>
																	<img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
																</a>
															    </li>
														</ul>
													</div>
												</li>
													<li class="level-2-item">
													<div class="level-2-link">
														<div class="text-lnk">MBA</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
														<ul id="bba" role="list" class="level-3 w-list-unstyled">
														
															
															<li class="level-3-item"><a href="<?php echo $domain ?>programs/postgraduate/mba/mba-design-led-strategy-&-transformation" class="level-3-link w-inline-block">
																	<div class="text-lnk">Design Management and Strategy (2 Years) </div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
																</a>
															</li>
															
																<li class="level-3-item"><a href="<?php echo $domain ?>programs/postgraduate/mba/mba-in-event-&-experience-design" class="level-3-link w-inline-block">
																	<div class="text-lnk">Event & Experience Design (2 Years)</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
																</a>
															</li>
															
														
														</ul>
													</div>
												</li>
											</ul>
										</div>
									</li>
									
									<!--<li class="level-1-item">-->
									<!--	<div data-menu-level-two="postgraduate" class="level-1-link">-->
									<!--		<div class="text-lnk">Postgraduate Degree</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />-->
									<!--		<ul id="undergraduate" role="list" class="level-2 w-list-unstyled">-->
									<!--			<li class="level-2-item"><a href="<?php echo $domain ?>programs/postgraduate" class="level-2-link w-inline-block">-->
									<!--					<div class="text-lnk">Overview</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />-->
									<!--				</a></li>-->
									<!--			<li class="level-2-item"><a href="<?php echo $domain ?>programs/postgraduate/m-des-in-design-futures" class="level-2-link w-inline-block">-->
									<!--					<div class="text-lnk">M.Des</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />-->
									<!--				</a></li>-->
									<!--			<li class="level-2-item"><a data-menu-level-three="bsc" href="<?php echo $domain ?>programs/postgraduate/mba-in-design-management-strategic-thinking" class="level-2-link w-inline-block">-->
									<!--					<div class="text-lnk">MBA</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />-->
									<!--				</a></li>-->
													
									<!--		</ul>-->
									<!--	</div>-->
									<!--</li>-->
									<li class="level-1-item">
										<div data-menu-level-two="postgraduate" class="level-1-link">
											<div class="text-lnk">Postgraduate Diploma</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
											<ul id="undergraduate" role="list" class="level-2 w-list-unstyled">
												<li class="level-2-item"><a href="<?php echo $domain ?>programs/postgraduate" class="level-2-link w-inline-block">
														<div class="text-lnk">Overview</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<!--<li class="level-2-item"><a href="<?php echo $domain ?>programs/postgraduate/m-des-in-design-futures" class="level-2-link w-inline-block">-->
												<!--		<div class="text-lnk">M.Des in Design Futures</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />-->
												<!--	</a></li>-->
												<!--<li class="level-2-item"><a data-menu-level-three="bsc" href="<?php echo $domain ?>programs/postgraduate/mba-in-design-management-strategic-thinking" class="level-2-link w-inline-block">-->
												<!--		<div class="text-lnk">MBA DMST</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />-->
												<!--	</a></li>-->
												
													<li class="level-3-item"><a href="<?php echo $domain ?>programs/postgraduate-diploma/mba-creative-entrepreneurship" class="level-3-link w-inline-block">
																	<div class="text-lnk">Creative Entrepreneurship (1 Year) </div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
																</a>
															</li>
													<li class="level-2-item"><a data-menu-level-three="bsc" href="<?php echo $domain ?>programs/postgraduate-diploma/pg-interior-styling-&-space-curation" class="level-2-link w-inline-block">
														<div class="text-lnk">Interior Styling & <br>Spatial Curation (1 Year)</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
													
											</ul>
										</div>
									</li>
									<li class="level-1-item"><a href="<?php echo $domain ?>programs/pre-university-summer-school" class="level-1-link w-inline-block">
											<div class="text-lnk">Pre-University Summer School</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a>
									</li>
								</ul>
								<!--<div class="nav-image-container"><img src="<?php echo $domain ?>assets/images/nav-bar/programs/1023.png" -->
								<!--loading="lazy" sizes="100vw" -->
								<!--srcset="-->
								<!--<?php echo $domain ?>assets/images/nav-bar/programs/500.png 500w, -->
								<!--<?php echo $domain ?>assets/images/nav-bar/programs/800.png 800w, -->
								<!--<?php echo $domain ?>assets/images/nav-bar/programs/1023.png 1023w" -->
								<!--alt="ISDI design school students working on VR, fashion draping and architectural models in studio" class="nav-image" /></div>-->
							</div>
						</div>
						<div class="nav-link">
							<div class="text-link">
								<div class="nav-name">Admissions</div><img src="<?php echo $domain ?>assets/images/icon/dw-arrow.svg" loading="lazy" alt="" class="nav-arrow" />
							</div>
							<div class="sub-nav">
								<ul role="list" class="level-1 w-list-unstyled">
									<li class="level-1-item">
										<div class="level-1-link">
											<div class="text-lnk">Undergraduate Degree</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
											<ul id="undergraduate" role="list" class="level-2 w-list-unstyled">
												<li class="level-2-item"><a href="<?php echo $domain ?>admissions/undergraduate/b-des" class="level-2-link w-inline-block">
														<div class="text-lnk">B.Des</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
														<li class="level-2-item"><a href="<?php echo $domain ?>admissions/undergraduate/b-tech" class="level-2-link w-inline-block">
														<div class="text-lnk">B.Tech</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
											</ul>
										</div>
									</li>
									<li class="level-1-item">
										<div data-menu-level-two="postgraduate" class="level-1-link">
											<div class="text-lnk">Postgraduate Degree / Diploma</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
											<ul id="undergraduate" role="list" class="level-2 w-list-unstyled">
												<li class="level-2-item"><a href="<?php echo $domain ?>admissions/postgraduate/m-des" class="level-2-link w-inline-block">
														<div class="text-lnk">M.Des</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item"><a href="<?php echo $domain ?>admissions/postgraduate/mba" class="level-2-link w-inline-block">
														<div class="text-lnk">MBA</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
													
													<li class="level-2-item"><a href="#" class="level-2-link w-inline-block">
														<div class="text-lnk">Interior Styling &<br> Spatial Curation (1 Year)</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
											</ul>
										</div>
									</li>
									
									
									<li class="level-1-item"><a href="<?php echo $domain ?>admissions/pre-university-summer-school" class="level-1-link w-inline-block">
											<div class="text-lnk">Pre-University Summer School</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a>
									</li>
								</ul>
								<div class="nav-image-container"><img src="<?php echo $domain ?>assets/images/nav-bar/admissions/1023.png" 
								loading="lazy" sizes="100vw" 
								srcset="<?php echo $domain ?>assets/images/nav-bar/admissions/500.png 500w, 
								<?php echo $domain ?>assets/images/nav-bar/admissions/800.png 800w, 
								<?php echo $domain ?>assets/images/nav-bar/admissions/1023.png 1023w" 
								alt="ISDI design school students and faculty posing across different studio spaces on campus" class="nav-image" /></div>
							</div>
						</div>
						<div class="nav-link">
							<div class="text-link">
								<div class="nav-name">ATLAS ISDI Advantage</div><img src="<?php echo $domain ?>assets/images/icon/dw-arrow.svg" loading="lazy" alt="" class="nav-arrow" />
							</div>
							<div class="sub-nav">
								<ul role="list" class="level-1  w-list-unstyled">  
								<!--ht-1-->
									<li class="level-1-item">
										<div class="level-1-link">
											<div class="text-lnk">The ISDI Advantage</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
											<ul id="undergraduate" role="list" class="level-2 w-list-unstyled">
												<li class="level-2-item"><a href="<?php echo $domain ?>atlas-isdi-advantage/the-isdi-advantage" class="level-2-link w-inline-block">
														<div class="text-lnk">Overview</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item"><a href="<?php echo $domain ?>atlas-isdi-advantage/the-isdi-advantage#location" class="level-2-link w-inline-block">
														<div class="text-lnk">Location</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item"><a href="<?php echo $domain ?>atlas-isdi-advantage/the-isdi-advantage#industry-connect-isdi" class="level-2-link w-inline-block">
														<div class="text-lnk">Industry Connect</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item"><a href="<?php echo $domain ?>atlas-isdi-advantage/the-isdi-advantage" class="level-2-link w-inline-block">
														<div class="text-lnk">Entrepreneurship</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item"><a href="<?php echo $domain ?>atlas-isdi-advantage/the-isdi-advantage#global-exposure-isdi" class="level-2-link w-inline-block">
														<div class="text-lnk">Global Exposure</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item"><a href="<?php echo $domain ?>atlas-isdi-advantage/the-isdi-advantage#infra-isdi" class="level-2-link w-inline-block">
														<div class="text-lnk">Infrastructure</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item"><a href="<?php echo $domain ?>atlas-isdi-advantage/the-isdi-advantage#student-welfare" class="level-2-link w-inline-block">
														<div class="text-lnk">Student Welfare</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item"><a href="<?php echo $domain ?>atlas-isdi-advantage/the-isdi-advantage/" class="level-2-link w-inline-block">
														<div class="text-lnk">Graduate Attributes</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item"><a href="<?php echo $domain ?>atlas-isdi-advantage/the-isdi-advantage#tailored-pathway" class="level-2-link w-inline-block">
														<div class="text-lnk">Tailored Pathways</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item"><a href="<?php echo $domain ?>atlas-isdi-advantage/the-isdi-advantage#research-driven-isdi" class="level-2-link w-inline-block">
														<div class="text-lnk">Research Driven</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
											</ul>
										</div>
									</li>
									<li class="level-1-item">
										<div class="level-1-link">
											<div class="text-lnk">Internationalisation</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
											<ul id="undergraduate" role="list" class="level-2 w-list-unstyled">
												<li class="level-2-item"><a href="<?php echo $domain ?>atlas-isdi-advantage/internationalisation#overview" class="level-2-link w-inline-block">
														<div class="text-lnk">Overview</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item"><a href="<?php echo $domain ?>atlas-isdi-advantage/internationalisation#global-uni-partnership" class="level-2-link w-inline-block">
														<div class="text-lnk">Global University Partnerships</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item"><a href="<?php echo $domain ?>atlas-isdi-advantage/internationalisation#international-events" class="level-2-link w-inline-block">
														<div class="text-lnk">International Events</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item"><a href="<?php echo $domain ?>atlas-isdi-advantage/internationalisation#summer-school" class="level-2-link w-inline-block">
														<div class="text-lnk">Summer School</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item"><a href="<?php echo $domain ?>atlas-isdi-advantage/internationalisation#global-immersion" class="level-2-link w-inline-block">
														<div class="text-lnk">Global Immersions</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item"><a data-menu-level-three="bsc" href="<?php echo $domain ?>atlas-isdi-advantage/internationalisation#isdi-master-prog" class="level-2-link w-inline-block">
														<div class="text-lnk">Masters Progressions</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item"><a data-menu-level-three="bsc" href="<?php echo $domain ?>atlas-isdi-advantage/internationalisation#ged-isdi" class="level-2-link w-inline-block">
														<div class="text-lnk">Global Education Fair</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
											</ul>
										</div>
									</li>
									<li class="level-1-item"><a href="<?php echo $domain ?>atlas-isdi-advantage/industry-centric-approach" class="level-1-link w-inline-block">
											<div class="text-lnk">Industry Centric Approach</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
								</ul>
								<div class="nav-image-container"><img src="<?php echo $domain ?>assets/images/nav-bar/isdi-advantage/1023.png" 
								loading="lazy" sizes="100vw" 
								srcset="<?php echo $domain ?>assets/images/nav-bar/isdi-advantage/500.png 500w, 
								<?php echo $domain ?>assets/images/nav-bar/isdi-advantage/800.png 800w, 
								<?php echo $domain ?>assets/images/nav-bar/isdi-advantage/1023.png 1023w" 
								alt="Students and faculty giving thumbs up together at a campus event" class="nav-image" /></div>
							</div>
						</div>
						<div class="nav-link">
							<div class="text-link">
								<div class="nav-name">Success Stories</div><img src="<?php echo $domain ?>assets/images/icon/dw-arrow.svg" loading="lazy" alt="" class="nav-arrow" />
							</div>
							<div class="sub-nav">
								<ul role="list" class="level-1 ht-2 w-list-unstyled">
									<li class="level-1-item">
										<div class="level-1-link">
											<div class="text-lnk">Success Snapshot</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
											<ul id="undergraduate" role="list" class="level-2 w-list-unstyled">
												<li class="level-2-item"><a href="<?php echo $domain ?>success-stories/success-snapshot" class="level-2-link w-inline-block">
														<div class="text-lnk">Overview</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item"><a href="<?php echo $domain ?>success-stories/success-snapshot#our-beliefs" class="level-2-link w-inline-block">
														<div class="text-lnk">Our beliefs</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item"><a href="<?php echo $domain ?>success-stories/success-snapshot#start-up-section" class="level-2-link w-inline-block">
														<div class="text-lnk">Startups</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item"><a href="<?php echo $domain ?>success-stories/success-snapshot#placement" class="level-2-link w-inline-block">
														<div class="text-lnk">Placements &amp; Internship</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item"><a href="<?php echo $domain ?>success-stories/success-snapshot#master-progressions" class="level-2-link w-inline-block">
														<div class="text-lnk">Masters Progression</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item"><a href="<?php echo $domain ?>success-stories/success-snapshot#research-driven" class="level-2-link w-inline-block">
														<div class="text-lnk">Patents &amp; Publications</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item"><a href="<?php echo $domain ?>success-stories/success-snapshot#awards" class="level-2-link w-inline-block">
														<div class="text-lnk">Awards &amp; Recognition</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
												<li class="level-2-item"><a href="<?php echo $domain ?>success-stories/success-snapshot" class="level-2-link w-inline-block">
														<div class="text-lnk">Student Spotlight</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
													</a></li>
											</ul>
										</div>
									</li>
									<li class="level-1-item"><a data-menu-level-two="postgraduate" href="<?php echo $domain ?>success-stories/placements" class="level-1-link w-inline-block">
											<div class="text-lnk">Placements</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									<li class="level-1-item"><a data-menu-level-two="postgraduate" href="<?php echo $domain ?>success-stories/startups" class="level-1-link w-inline-block">
											<div class="text-lnk">Startups</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									<li class="level-1-item"><a data-menu-level-two="postgraduate" href="<?php echo $domain ?>success-stories/masters-progression" aria-current="page" class="level-1-link w-inline-block w--current">
											<div class="text-lnk">Masters Progression</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
								</ul>
								<div class="nav-image-container"><img src="<?php echo $domain ?>assets/images/nav-bar/success-stories/success-story-menu-img.webp" loading="lazy" sizes="100vw" srcset="<?php echo $domain ?>assets/images/nav-bar/success-stories/success-story-menu-img-p-500.webp 500w, <?php echo $domain ?>assets/images/nav-bar/success-stories/success-story-menu-img-p-800.webp 800w, <?php echo $domain ?>assets/images/nav-bar/success-stories/success-story-menu-img.webp 1023w" alt="Graduates tossing thier caps in the air and enjoying thier convocation ceremony" class="nav-image" /></div>
							</div>
						</div>
						<div class="nav-link">
							<div class="text-link">
								<div class="nav-name">Life@ATLAS ISDI</div><img src="<?php echo $domain ?>assets/images/icon/dw-arrow.svg" loading="lazy" alt="" class="nav-arrow" />
							</div>
							<div class="sub-nav">
								<ul role="list" class="level-1 w-list-unstyled">
									<li class="level-1-item"><a data-menu-level-two="postgraduate" href="<?php echo $domain ?>life@atlas-isdi#life-at-isme" class="level-1-link w-inline-block">
											<div class="text-lnk">The ATLAS ISDI Experience</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									<li class="level-1-item"><a data-menu-level-two="postgraduate" href="<?php echo $domain ?>life@atlas-isdi#student-clubs" class="level-1-link w-inline-block">
											<div class="text-lnk">Student Clubs</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									<li class="level-1-item"><a data-menu-level-two="postgraduate" href="<?php echo $domain ?>life@atlas-isdi#fest-culture" class="level-1-link w-inline-block">
											<div class="text-lnk">Fests &amp; Cultural Events</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									<li class="level-1-item"><a data-menu-level-two="postgraduate" href="<?php echo $domain ?>life@atlas-isdi#intercollegiate-events" class="level-1-link w-inline-block">
											<div class="text-lnk">Intercollegiate Events</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									<li class="level-1-item"><a data-menu-level-two="postgraduate" href="<?php echo $domain ?>life@atlas-isdi#sports" class="level-1-link w-inline-block">
											<div class="text-lnk">Sports</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									<li class="level-1-item"><a data-menu-level-two="postgraduate" href="<?php echo $domain ?>life@atlas-isdi#student-council" class="level-1-link w-inline-block">
											<div class="text-lnk">Student Council</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									<li class="level-1-item"><a data-menu-level-two="postgraduate" href="<?php echo $domain ?>life@atlas-isdi#student-welfare" class="level-1-link w-inline-block">
											<div class="text-lnk">Student Welfare</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									<li class="level-1-item"><a data-menu-level-two="postgraduate" href="<?php echo $domain ?>life@atlas-isdi" class="level-1-link w-inline-block">
											<div class="text-lnk">ATLAS Student Housing</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									<li class="level-1-item"><a data-menu-level-two="postgraduate" href="<?php echo $domain ?>life@atlas-isdi" class="level-1-link w-inline-block">
											<div class="text-lnk">Life in Mumbai</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
								</ul>
								<div class="nav-image-container"><img src="<?php echo $domain ?>assets/images/nav-bar/life-isdi/1023.png" 
								loading="lazy" sizes="100vw" srcset="<?php echo $domain ?>assets/images/nav-bar/life-isdi/500.png 500w, 
								<?php echo $domain ?>assets/images/nav-bar/life-isdi/life-menu-img-p-800.webp 800w, 
								<?php echo $domain ?>assets/images/nav-bar/life-isdi/1023.png 1023w" 
								alt="Isdi design school students enjoying college time doing various activities" class="nav-image" /></div>
							</div>
						</div>
						<div class="nav-link">
							<div class="text-link">
								<div class="nav-name">Events</div><img src="<?php echo $domain ?>assets/images/icon/dw-arrow.svg" loading="lazy" alt="" class="nav-arrow" />
							</div>
							<div class="sub-nav">
								<ul role="list" class="level-1 ht-2 w-list-unstyled">
									<li class="level-1-item"><a data-menu-level-two="postgraduate" href="<?php echo $domain ?>events/immersions-&-experiences" class="level-1-link w-inline-block">
											<div class="text-lnk">Immersions &amp; Experiences</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									<li class="level-1-item"><a data-menu-level-two="postgraduate" href="<?php echo $domain ?>events/skill-&-tech-innovations" class="level-1-link w-inline-block">
											<div class="text-lnk">Skill &amp; Tech Innovations</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									<li class="level-1-item"><a data-menu-level-two="postgraduate" href="<?php echo $domain ?>events/creative-showcases" class="level-1-link w-inline-block">
											<div class="text-lnk">Creative Showcases</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									<li class="level-1-item"><a data-menu-level-two="postgraduate" href="<?php echo $domain ?>events/industry-and-mentorship" class="level-1-link w-inline-block">
											<div class="text-lnk">Industry and Mentorship</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									<li class="level-1-item"><a data-menu-level-two="postgraduate" href="<?php echo $domain ?>events/community-and-culture" class="level-1-link w-inline-block">
											<div class="text-lnk">Community and Culture</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									<li class="level-1-item"><a data-menu-level-two="postgraduate" href="<?php echo $domain ?>events/the-edit" class="level-1-link w-inline-block">
											<div class="text-lnk">The Edit !</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
								</ul>
								<div class="nav-image-container"><img src="<?php echo $domain ?>assets/images/nav-bar/events/1023.png" 
								loading="lazy" sizes="100vw" srcset="<?php echo $domain ?>assets/images/nav-bar/events/500.png 500w, 
								<?php echo $domain ?>assets/images/nav-bar/events/800.png 800w, 
								<?php echo $domain ?>assets/images/nav-bar/events/1023.png 1023w" alt="Hands of Heritage event featuring Parsons collaboration, panel discussion and fashion showcase" class="nav-image" /></div>
							</div>
						</div>
						<div class="nav-link">
							<div class="text-link">
								<div class="nav-name">Campus</div><img src="<?php echo $domain ?>assets/images/icon/dw-arrow.svg" loading="lazy" alt="" class="nav-arrow" />
							</div>
							<div class="sub-nav">
								<ul role="list" class="level-1 ht-2 w-list-unstyled">
									<li class="level-1-item"><a data-menu-level-two="postgraduate" href="<?php echo $domain ?>campus#campus-learn" class="level-1-link w-inline-block">
											<div class="text-lnk">Overview</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									<li class="level-1-item"><a data-menu-level-two="postgraduate" href="<?php echo $domain ?>campus#campus-location" class="level-1-link w-inline-block">
											<div class="text-lnk">Location</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									<li class="level-1-item"><a data-menu-level-two="postgraduate" href="<?php echo $domain ?>campus#campus-spaces" class="level-1-link w-inline-block">
											<div class="text-lnk">Spaces</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									<li class="level-1-item"><a data-menu-level-two="postgraduate" href="<?php echo $domain ?>campus#campus-housing" class="level-1-link w-inline-block">
											<div class="text-lnk">Student Housing</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									<li class="level-1-item"><a data-menu-level-two="postgraduate" href="<?php echo $domain ?>campus#campus-green" class="level-1-link w-inline-block">
											<div class="text-lnk">Green Campus</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
								</ul>
								<div class="nav-image-container"><img src="<?php echo $domain ?>assets/images/nav-bar/campus/1023.png" 
								loading="lazy" sizes="100vw" srcset="<?php echo $domain ?>assets/images/nav-bar/campus/500.png 500w, 
								<?php echo $domain ?>assets/images/nav-bar/campus/800.png 800w, 
								<?php echo $domain ?>assets/images/nav-bar/campus/1023.png 1023w" alt="Vibrant ATLAS SkillTech University campus common area" class="nav-image" /></div>
							</div>
						</div>
						<div class="nav-link">
							<div class="text-link">
								<div class="nav-name">About Us</div><img src="<?php echo $domain ?>assets/images/icon/dw-arrow.svg" loading="lazy" alt="" class="nav-arrow" />
							</div>
							<div class="sub-nav">
								<ul role="list" class="level-1 w-list-unstyled">
									<li class="level-1-item"><a href="<?php echo $domain ?>about-us" class="level-1-link w-inline-block">
											<div class="text-lnk">Overview</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									<li class="level-1-item"><a href="<?php echo $domain ?>about-us#our-story" class="level-1-link w-inline-block">
											<div class="text-lnk">Our Story</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									<li class="level-1-item"><a href="<?php echo $domain ?>about-us#our-leadership" class="level-1-link w-inline-block">
											<div class="text-lnk">Leadership Team</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									
									<li class="level-1-item"><a href="<?php echo $domain ?>about-us#our-location" class="level-1-link w-inline-block">
											<div class="text-lnk">Location</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									<li class="level-1-item"><a href="<?php echo $domain ?>thought-leaderships" class="level-1-link w-inline-block">
											<div class="text-lnk">Thought Leadership</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									<li class="level-1-item"><a href="<?php echo $domain ?>about-us#atlas-times" class="level-1-link w-inline-block">
											<div class="text-lnk">ATLAS Times</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
									<li class="level-1-item"><a href="<?php echo $domain ?>about-us#press-coverage" class="level-1-link w-inline-block">
											<div class="text-lnk">Press Coverage</div><img src="<?php echo $domain ?>assets/images/icon/arrow-downward.svg" loading="lazy" alt="" class="link-arrow" />
										</a></li>
								</ul>
								<div class="nav-image-container"><img src="<?php echo $domain ?>assets/images/nav-bar/about-us/about-menu-img.webp" loading="lazy" sizes="100vw" srcset="<?php echo $domain ?>assets/images/nav-bar/about-us/about-menu-img-p-500.webp 500w, <?php echo $domain ?>assets/images/nav-bar/about-us/about-menu-img-p-800.webp 800w, <?php echo $domain ?>assets/images/nav-bar/about-us/about-menu-img.webp 1023w" alt="Woman smiling and speaking into a microphone at a campus event" class="nav-image" /></div>
							</div>
						</div>
						<div class="nav-link"><a href="<?php echo $ogdomain ?>contact-us" class="text-link w-inline-block">
								<div class="nav-name">Contact Us</div><img src="<?php echo $domain ?>assets/images/icon/arrow-top-rt-blk.svg" loading="lazy" alt="" class="icon-link-mob" />
							</a></div>
						<div class="w-embed">
							<style>
							
							.level-1{
							    min-height: 600px !important;
							}
							.level-3{
							    width: 650px;
							}
							@media only screen and (min-width: 567px) {

								/* Base styles for ISDI sub-navigation with transitions */
								.mega-menus.isdi-menu .sub-nav {
									transition: opacity 0.3s ease, visibility 0.3s ease;
									opacity: 0;
									visibility: hidden;
									display: none;
								}

								.mega-menus.isdi-menu .sub-nav .level-2,
								.mega-menus.isdi-menu .sub-nav .level-3 {
									transition: opacity 0.2s ease, visibility 0.2s ease;
									opacity: 0;
									visibility: hidden;
									display: none;
								}

								/* Show sub-nav when active (clicked or triggered) */
								.mega-menus.isdi-menu .nav-link.active .sub-nav,
								.mega-menus.isdi-menu .sub-nav.active {
									display: flex;
									opacity: 1;
									visibility: visible;
								}

								/* Show level-2 when active */
								.mega-menus.isdi-menu .sub-nav .level-2.active {
									display: block;
									opacity: 1;
									visibility: visible;
								}

								/* Show level-3 when active */
								.mega-menus.isdi-menu .sub-nav .level-3.active {
									display: block;
									opacity: 1;
									visibility: visible;
								}

								/* Underline effect for nav links */
								.mega-menus.isdi-menu .nav-link:hover .text-link:after,
								.mega-menus.isdi-menu .text-link.w--current:after {
									content: "";
									display: block;
									width: 100%;
									position: absolute;
									left: 0px;
									bottom: -4px;
									height: 8px;
									background: #ec1376;
									z-index: 1;
								}

								/* Hover styles for all levels */
								.mega-menus.isdi-menu .sub-nav .level-1-item div.level-1-link,
								.mega-menus.isdi-menu .sub-nav .level-1-item a.level-1-link,
								.mega-menus.isdi-menu .sub-nav .level-2-item div.level-2-link,
								.mega-menus.isdi-menu .sub-nav .level-2-item a.level-2-link,
								.mega-menus.isdi-menu .sub-nav .level-3-item div.level-3-link,
								.mega-menus.isdi-menu .sub-nav .level-3-item a.level-3-link {
									transition: all 0.2s ease;
								}

								.mega-menus.isdi-menu .sub-nav .level-1-item:hover div.level-1-link,
								.mega-menus.isdi-menu .sub-nav .level-1-item:hover a.level-1-link,
								.mega-menus.isdi-menu .sub-nav .level-2-item:hover div.level-2-link,
								.mega-menus.isdi-menu .sub-nav .level-2-item:hover a.level-2-link,
								.mega-menus.isdi-menu .sub-nav .level-3-item:hover div.level-3-link,
								.mega-menus.isdi-menu .sub-nav .level-3-item:hover a.level-3-link {
									padding: 5px 10px;
									background: #ec1376;
									color: #fff;
									font-weight: 500;
								}

								/* Arrow rotation with smooth transition */
								.mega-menus.isdi-menu .nav-arrow {
									transition: transform 0.3s ease;
								}

								.mega-menus.isdi-menu .nav-link.active .nav-arrow {
									transform: rotate(-180deg);
								}

								/* Image filter effects with smooth transitions */
								.mega-menus.isdi-menu .sub-nav img {
									transition: filter 0.2s ease, opacity 0.2s ease;
								}

								.mega-menus.isdi-menu .sub-nav .level-1-item:hover div.level-1-link>img,
								.mega-menus.isdi-menu .sub-nav .level-1-item:hover a.level-1-link>img,
								.mega-menus.isdi-menu .sub-nav .level-2-item:hover div.level-2-link>img,
								.mega-menus.isdi-menu .sub-nav .level-2-item:hover a.level-2-link>img,
								.mega-menus.isdi-menu .sub-nav .level-3-item:hover a.level-3-link>img {
									filter: brightness(0) invert(1);
									opacity: 1;
								}

								/* Cursor pointer for all clickable elements */
								.mega-menus.isdi-menu .nav-link,
								.mega-menus.isdi-menu .sub-nav .level-1-link,
								.mega-menus.isdi-menu .sub-nav .level-2-link,
								.mega-menus.isdi-menu .sub-nav .level-3-link {
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
			    <a href="<?php echo $ogdomain?>applicationform" class="btm-links bg-1">Apply Now</a><a href="<?php echo $ogdomain ?>campusvisit" class="btm-links bg-2">Schedule a visit</a></div>
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
					height: 80%;
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

				.npf_wgts {
					height: 700px;
				}
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
					if (closeBtn) {
                      closeBtn.addEventListener("click", () => {
                        overlay.style.display = "none";
                      });
                    }
					if (overlay) {
                          overlay.addEventListener("click", (e) => {
                            if (e.target === overlay) {
                              overlay.style.display = "none";
                            }
                          });
                        }
				});
				</script>
			</div>
		</div>