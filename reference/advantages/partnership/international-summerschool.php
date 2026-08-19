<?php
$title = "Student Life & Campus Experience  – ATLAS SkillTech University";
$description = "Explore student clubs, events, campus culture, support services and lifestyle experiences that make campus life engaging, collaborative and growth-oriented.";
$keywords = "atlas, contact";
$css = "atlass-fantastic-site-48323a.webflow.690b5e72fe2165e6fc022c61-78245c0e5.css";
$js = "https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/js/webflow.1ba7f46b.af01a5ad99350cf0.js";
$htmlDataId = "690b5e72fe2165e6fc022c61";
$body = "body-isme";


include "../../assets/include/header.php"

?>
<style>
.images-carousel-wrapper{
	display: flex;
  gap: 24px;
  overflow: hidden;
}

.images-carousel-wrapper .swiper {
width: 100%;
height: 100%;
}

.images-carousel-wrapper .swiper-slide {
line-height: 0px;
width: 100%;
}

.inner-header-cover.g1{
    background-image: none;
}

.images-carousel-wrapper .swiper-slide img {
display: block;
width: 100%;
height: 100%;
object-fit: cover;
object-position: left top;
}

.images-carousel-wrapper .vertical-swiper .swiper-wrapper,
.images-carousel-wrapper .vertical-swiper1 .swiper-wrapper {
transition-timing-function: linear !important;
}

.images-carousel-wrapper .vertical-swiper,
.images-carousel-wrapper .vertical-swiper1 {
height: 100vh; /* your viewport */
overflow: hidden;
width: 100%;
}

.images-carousel-wrapper .vertical-swiper .swiper-slide{
height: 300px;
}

.images-carousel-wrapper .vertical-swiper1 .swiper-slide{
height: 350px;
}

.images-carousel-wrapper .vertical-swiper .swiper-slide.ht-auto,
.images-carousel-wrapper .vertical-swiper1 .swiper-slide.ht-auto{
    height: auto;
}

.top-cards-wrapper {
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 60px;
    display: flex;
}


.top-cards-wrapper.padbtm0 {
    padding-bottom: 0;
}

.head-top-card {
    color: #fff;
    background-image: url(https://cdn.prod.website-files.com/6846c77…/685d04f…_eligible-bg-2.png);
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto;
    flex-flow: column;
    flex: 1 1 0;
    justify-content: center;
    align-items: center;
    height: 208px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
}

.head-top-card.atlas-bg-1 {
    background-color: #3a3c84;
    background-image: url(https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444b86334beefaebfdf6_vector-atlas-1.png);
}

.head-top-card.atlas-bg-2 {
    background-color: #2e3074;
    background-image: url(https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png);
}

.head-top-card.atlas-bg-3 {
    background-color: #3a3c84;
    background-image: url(https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444b9f664dafc5102fdd_vector-atlas-3.png);
    background-position: 100% 0;
}

.sm-text-isme {
    color: var(--primary-color-isme);
    padding-bottom: 16px;
    font-size: 36px;
    line-height: 1.2;
}


.sm-text-isme.atlas-blue {
    color: #5cbdca;
}

.large-text {
    font-size: 20px;
    font-weight: 500;
    line-height: 1.2;
}

/*side tab css*/

.custom-sidetab-con{
    /*display: flex;*/
    /*gap:40px;*/
}


.tab-content-mint.atlas {
    padding-top: 0px;
}   

    
/*grid images css*/
    .common-wrapper {
    -webkit-text-fill-color: inherit;
    background-clip: border-box;
    padding-top: 56px;
    overflow: visible;
}

.instagram-wrapper.mobile-vert-scroll.mar-0 {
    margin-top: 0;
}

.grid-gallery-flex {
    grid-column-gap: 24px;
    grid-row-gap: 24px;
    direction: ltr;
    letter-spacing: 0;
    text-indent: 0;
    column-count: auto;
    column-rule-style: none;
    white-space: normal;
    word-break: normal;
    overflow-wrap: normal;
    background-color: #0000;
    grid-template-rows: auto auto auto auto;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-columns: 1fr;
    grid-auto-flow: row;
    place-items: flex-start start;
    height: auto;
    margin-top: 0;
    margin-bottom: 0;
    display: flex;
}

.grid-column {
    grid-column-gap: 24px;
    grid-row-gap: 24px;
    flex-flow: column;
    justify-content: space-between;
    align-items: flex-start;
    display: flex;
}

.grid-column.sm {
    grid-column-gap: 2px;
    grid-row-gap: 2px;
    grid-column-gap: 2px;
    grid-row-gap: 2px;
}

.grid-card-atlas {
    border-top-left-radius: 32px;
    border-bottom-right-radius: 32px;
    height: auto;
    max-height: none;
    margin-bottom: 24px;
    position: relative;
    overflow: hidden;
}

.insta-image-rect {
    object-fit: cover;
    border-radius: 0;
    margin-bottom: 0;
    overflow: hidden;
}

.grid-logo {
            position: absolute;
            bottom: 16px;
            left: 16px;
            background: #FFFFFF;
            backdrop-filter: blur(6px);
            padding: 8px 14px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            /*max-width: 120px;*/
        }

        .grid-logo img {
            height: 29px;
            width: auto;
            /*object-fit: contain;*/
        }


 /*Reel video css (kept mostly as you provided) */
         .carousel-wrapper {
            position: relative;
            margin: auto;
            overflow: hidden;
            padding: 20px 40px;
        }

        .carousel {
            display: flex;
            gap: 30px;
            transition: transform .6s ease;
            will-change: transform;
            align-items: center;
        }

        .card {
            width: 260px;
            height: 420px;
            border-radius: 24px;
            overflow: hidden;
            position: relative;
            transition: all .45s ease;
            cursor: pointer;
            flex-shrink: 0;
        }

        .card video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .card .poster {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 3;
            transition: opacity .25s ease;
            pointer-events: none;
            opacity: 1;
            background: #000;
        }

        .card::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 45%;
            background: linear-gradient(transparent, #41418E);
            z-index: 2;
        }

        .card-content {
            position: absolute;
            bottom: 20px;
            left: 20px;
            color: white;
            z-index: 4;
        }

        .title {
            color: #00C1D6;
            font-weight: 700;
            font-size: 18px;
        }

        .subtitle {
            font-size: 13px;
        }

       .play-btn {
            position: absolute;
            bottom: 16px;
            right: 16px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #41418E;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 18px;
            z-index: 4;
            transition: opacity .3s ease;
            cursor: pointer;
        }

   /* play button stays clickable; hide it while THIS card's video plays, show on hover */
    .card.playing .play-btn {
        opacity: 0;
        pointer-events: auto;
    }
    .card.playing:hover .play-btn {
        opacity: 1;
    }
    .play-btn { cursor: pointer; }

      





        .card.active {
            z-index: 5;
            height: auto !important;
        }

        .card.near {
            transform: scale(.95);
            opacity: .95;
        }

        /* Lift near cards upward */
            .card.near:hover {
                transform: translateY(-15px) scale(0.95);
            }

        .card.far {
            transform: scale(.85);
            opacity: .6;
        }

        .arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: #41418E;
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            z-index: 10;
        }

        .arrow.left {
            left: 8px;
        }

        .arrow.right {
            right: 8px;
        }
        
/*testimonial css*/
.testimonial-card {
    flex: none;
    width: 620px;
    height: 500px;
    display: flex;
}

.testimonial-card.bgc1 {
    cursor: pointer;
    background-color: #193e90;
}

.testimonial-card.bgc1.atlas {
    background-color: #41418e;
    border-top-left-radius: 32px;
    border-bottom-right-radius: 32px;
    overflow: hidden;
}

.testimonial-custom-card{
    flex: none;
    width: 320px;
    height: 500px;
    display: flex;
}

.testimonial-custom-card.bgc1{
     cursor: pointer;
    /*background-color: #193e90;*/
}

.testimonial-custom-card.bgc1.atlas{
    background-color: #41418e;
    border-top-left-radius: 32px;
    border-bottom-right-radius: 32px;
    overflow: hidden;
}

 .testimonial-video-wrapper-unique{
      position: relative;
      /*width: 100%;*/
    }

    .testimonial-video-wrapper-unique video{
        object-fit: cover;
        flex: none;
        align-self: auto;
        width: 325px;
        max-width: 100%;
        height: 500px;
        min-height: auto;
        position: relative;
        overflow: clip;
        background-position: 50%;
    }

    .video-toggle-btn-unique{
      position:absolute;
      bottom:20px;
      right:20px;
      width:55px;
      height:55px;
      border:none;
      border-radius:50%;
      background:rgba(0,0,0,0.7);
      color:#fff;
      font-size:22px;
      cursor:pointer;
      display:flex;
      align-items:center;
      justify-content:center;
    } 
    
    .video-toggle-btn-unique:hover,
    .video-toggle-btn-unique:focus,
    .video-toggle-btn-unique:active{
      background:rgba(0,0,0,0.7) !important;
      border:none !important;
      outline:none !important;
      box-shadow:none !important;
      color:#fff !important;
    }

.student-image {
    object-fit: cover;
    object-position: 50% 50%;
    flex: 0 auto;
    width: 50%;
}

.student-text {
    color: #fff;
    flex-flow: column;
    flex: 1;
    justify-content: center;
    align-items: flex-start;
    max-height: 100%;
    padding: 15px 12px;
    display: block;
    position: relative;
}

.st-quote {
    z-index: 1;
    padding: 24px;
    position: relative;
}

.st-text {
    font-size: 16px;
}

.quote {
    position: absolute;
    inset: 5px auto auto 5px;
}

.st-details {
    z-index: 1;
    padding-left: 24px;
    position: relative;
}

.stname {
    color: var(--primary-color-isme);
    padding-bottom: 5px;
    font-size: 14px;
    font-weight: 600;
}

.stname.isdi {
    color: #fff;
    border-radius: 0;
}

.st-course.atlas {
    color: #5cbdca;
    font-size: 20px;
    font-weight: 700;
}

.st-at-pos {
    color: #5cbdca;
    font-size: 14px;
}

.bg-image {
    z-index: 0;
    box-sizing: content-box;
    opacity: 1;
    object-fit: cover;
    width: 100%;
    height: 100%;
    max-height: 100%;
    position: absolute;
    inset: 0% auto auto 0%;
}

.about-story-wrapper-ugdx {
    grid-column-gap: 32px;
    grid-row-gap: 32px;
    justify-content: space-between;
    /*align-items: center;*/
    display: flex;
    overflow: visible;
}

.abt-cont-ugdx-1 {
    flex: none;
    width: 50%;
    font-size: 18px;
}

.common-wrapper {
    -webkit-text-fill-color: inherit;
    background-clip: border-box;
    padding-top: 56px;
    overflow: visible;
}

/* Position dots inside */
.customPagination_X91 {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
}

    /* Arrows */
    .customNextBtn_X91,
    .customPrevBtn_X91 {
      color: #332D7E;
    }
    
    .customPagination_X91 {
        display: none;
      }
      
      
      .testimonial-video-element-multi {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
      
      
     /*white section css */
     .summer-intro-section {
	width: 100%;
	background: #ffffff;
	padding: 40px 20px;
	box-sizing: border-box;
}
.summer-intro-wrap {
	max-width: 1000px;
	margin: 0 auto;
	text-align: center;
}
.summer-intro-title {
	font-size: 42px;
	font-weight: 700;
	color: #1a1a4b;
	margin: 0 0 16px 0;
	line-height: 1.2;
}
.summer-intro-subtitle {
	font-size: 22px;
	font-weight: 400;
	color: #444;
	margin: 0;
	line-height: 1.4;
}

@media (max-width: 767px) {
    
   .summer-intro-section {
		padding: 36px 16px;
	}
	.summer-intro-title {
		font-size: 28px;
	}
	.summer-intro-subtitle {
		font-size: 17px;
	}
     .customPagination_X91 {
        display: block;
      }
      
       .customNextBtn_X91,
      .customPrevBtn_X91 {
        display: none;
      }
      
        /* Pagination styling */
    .customPagination_X91 {
      margin-top: 15px;
      text-align: center;
    }
    
      .card {
                width: 200px;
                height: 340px;
            }

    .images-carousel-wrapper{
      gap: 16px; 
    }
    
    .hide-mo-swiper{
        display : none ; 
    }
    
       .top-cards-wrapper {
        flex-flow: column;
        align-items: stretch;
    }

    .head-top-card {
        flex: none;
        height: auto;
        padding: 24px 24px 24px 22px;
    }

    .sm-text-isme {
        font-size: 18px;
    }

    .large-text {
        font-size: 22px;
    }
    
    .custom-sidetab-con{
            display: block;
            gap:40px;
        }
        
        .tab-content-mint.atlas {
            padding-top: 20px;
        }
        
        .tab-content-mint{
            flex:1;
            padding-left: 0rem;
        }
        
      
        .tabs-menu-mint.less-space{
            margin-left: 0px;
            margin-right: 0px;
            padding-left: 0px;
            padding-right: 0px;
        }
        
        /*grid image css*/
        .common-wrapper {
        padding-top: 0px;
    }

    .grid-gallery-flex {
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        flex-flow: wrap;
        justify-content: space-between;
        display: flex;
    }

    .grid-column.sm {
        grid-column-gap: 16px;
        grid-row-gap: 16px;
        grid-column-gap: 16px;
        grid-row-gap: 16px;
        flex-flow: row;
        justify-content: space-between;
        align-items: stretch;
        width: 100%;
        height: auto;
    }

   .grid-card-atlas {
        flex-shrink: 0;
        width: 80vw;            /* nearly full screen width */
        max-width: 340px;
        height: auto;
        margin-bottom: 16px;
        border-radius: 16px;
        overflow: hidden;
    }

    .insta-image-rect {
        object-fit: cover;
        object-position: center center;  /* centre the crop, no more cut edges */
        width: 100%;
        height: 230px;          /* consistent neat card height */
        display: block;
    }
        .grid-column {
        grid-column-gap: 0px;
        justify-content: space-between;
        width: 48%;
    }
    
       .card {
                width: 200px;
                height: 340px;
            }

            .carousel-wrapper {
                padding: 12px;
            }

            .arrow {
                width: 42px;
                height: 42px;
            }
    
    /*testimonial css*/
    
    .testimonial-card {
        width: 100%;
        height: auto;
    }
    .testimonial-custom-card{
        width: 100%;
    }
    
    .testimonial-card.bgc1 {
        flex-flow: column;
    }
    
    .testimonial-custom-card .bgc1{
        flex-flow: column;
    }

    .student-image {
        width: 100%;
        max-width: none;
        height: 550px;
        display: block;
    }

    .student-text {
        width: auto;
        min-width: auto;
        max-width: none;
        height: 350px;
        padding: 10px 10px;
        display: block;
    }

    .st-quote {
        width: 100%;
    }

    .st-text {
        white-space: break-spaces;
        overflow-wrap: normal;
        font-size: 12px;
    }

    .st-details {
        width: 100%;
    }
    .bg-image {
        height: 100%;
        display: block;
        overflow: clip;
    }
    
    .testimonial-video-wrapper-unique {
    width: 100%;
}
.testimonial-video-wrapper-unique video,
.testimonial-video-element-multi {
    width: 100%;
    /*height: 70vh;*/
    max-height: 580px;
    object-fit: cover;
    object-position: center;
    background: #000;
    display: block;
}
    
      .about-story-wrapper-ugdx {
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        flex-flow: wrap;
        font-size: 18px;
    }

    .abt-cont-ugdx-1 {
        width: 100%;
        font-size: 16px;
    }

    .common-wrapper {
        padding-top: 0px;
    }
    
    .images-carousel-wrapper .vertical-swiper .swiper-slide,
    .images-carousel-wrapper .vertical-swiper1 .swiper-slide {
        height: auto;          /* let height follow the image */
    }
    .images-carousel-wrapper .swiper-slide img {
        height: auto;          /* show full image, no crop */
        object-fit: contain;
    }
    .images-carousel-wrapper .vertical-swiper,
    .images-carousel-wrapper .vertical-swiper1 {
        height: auto;          /* don't force 100vh on mobile */
    }
}


@media (max-width: 540px) {
    .mobile-vert-scroll .grid-gallery-flex {
        flex-flow: nowrap;
        grid-column-gap: 24px;
        align-items: stretch;
    }

    .mobile-vert-scroll .grid-column {
        flex-flow: initial;
        width: auto;
    }
    
        .grid-column {
        margin-top: 24px;
    }
    
     .student-text {
        flex: none;
    }
}


</style>
<div class="main-wrapper">
	<div id="life-at-isme" class="inner-header-wrapper full-ht">
		<div class="inner-header-cover g1">
			<div class="center-hd-text">
				<!--<div class="h1-tag sm">Summer Schools </div>-->
				<!--<h1 class="hd-title-txt">Elevate your Global Learning Journey</h1>-->
			</div>
		</div>
		<div class="images-carousel-wrapper isme">
			<div class="swiper vertical-swiper">
				<div class="swiper-wrapper">
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/1.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/2.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/3.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/4.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/5.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/6.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/7.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/8.png" loading="lazy" alt="" /></div>
				</div>
			</div>
			<div class="swiper vertical-swiper1 hide-mo-swiper">
				<div class="swiper-wrapper">
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/9.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide ht-auto"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/10.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/11.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/12.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/13.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide ht-auto"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/14.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/15.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/16.png" loading="lazy" alt="" /></div>
				</div>
			</div>
			<div class="swiper vertical-swiper hide-mo-swiper">
				<div class="swiper-wrapper">
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/17.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/18.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide ht-auto"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/19.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/20.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/21.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/22.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide ht-auto"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/23.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/24.png" loading="lazy" alt="" /></div>
				</div>
			</div>
			<div class="swiper vertical-swiper1">
				<div class="swiper-wrapper">
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/25.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/26.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/27.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/28.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/29.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/30.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/31.png" loading="lazy" alt="" /></div>
					<div class="swiper-slide"><img src="https://atlasuniversity.edu.in/assets/images/advantages/master-progression/hero-banner/32.png" loading="lazy" alt="" /></div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="summer-intro-section">
	<div class="summer-intro-wrap">
		<h2 class="summer-intro-title">International Summer Schools</h2>
		<p class="summer-intro-subtitle">Elevate your Global Learning Journey</p>
	</div>
</div>

<div class="top-cards-wrapper padbtm0">
	<div class="head-top-card atlas-bg-1">
		<div class="sm-text-isme atlas-blue">120+  </div>
		<div class="large-text text-center">Summer School Experiences </div>
	</div>
	<div class="head-top-card atlas-bg-2">
		<div class="sm-text-isme atlas-blue">20+  </div>
		<div class="large-text text-center">Global Cities Visited  </div>
	</div>
	<div class="head-top-card atlas-bg-3">
		<div class="sm-text-isme atlas-blue">35+</div>
		<div class="large-text text-center">Global Universities </div>
	</div>
		<div class="head-top-card atlas-bg-2">
		<div class="sm-text-isme atlas-blue">45+ </div>
		<div class="large-text text-center">Multidisciplinary Subject Areas  </div>
	</div>
	<div class="head-top-card atlas-bg-1">
		<div class="sm-text-isme atlas-blue">87%</div>
		<div class="large-text text-center">Students Receive Scholarships</div>
	</div>
</div>

    <section class="section">
        <div class="container">
    
           
            <div class="about-story-wrapper-ugdx">
                <div class="abt-cont-ugdx-1">
                    <h2 class="h2-tag mrg42">About Summer Schools</h2>
                    <div class="abt-text">
                       ATLAS proudly facilitates enriching Summer School experiences for its students at prestigious International Universities. A Summer School serves as a dynamic short-term mobility opportunity, allowing students to delve into academic pursuits while immersing themselves in diverse cultural landscapes.<br /><br /> Beyond classroom engagement, students partake in enriching cultural and business visits, fostering meaningful social interactions with peers from across the globe. Furthermore, these summer school experiences often serve as a gateway for students to explore extended study opportunities, broaden	ing their academic horizons and nurturing a global perspective.
                    </div>
                    
                </div>
                <div><img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/section-img/1.png" loading="lazy" sizes="(max-width: 688px) 100vw, 688px" srcset="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/section-img/1.png 500w, https://atlasuniversity.edu.in/assets/images/advantages/summer-school/section-img/1.png 688w" alt="" class="about-image-atlas"></div>
            </div>
        </div>
    </section>
	
	 <section class="section" style="padding-top:0px">
        <div class="container">
          <h2 class="h2-tag mrg42">Global Summer Student Experiences</h2>
           
            <div data-current="Tab 1" data-easing="ease" data-duration-in="300" data-duration-out="100"
                class="rounded-tabs-mint w-tabs custom-sidetab-con">
        
        
                <div class="tabs-menu-mint less-space w-tab-menu">
                    <a data-w-tab="Tab 1" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link w--current">
                        <div>UK</div>
                    </a>
                    <a data-w-tab="Tab 2" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link">
                        <div>Europe</div>
                    </a>
                    <a data-w-tab="Tab 3" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link">
                        <div>US</div>
                    </a>
                    <a data-w-tab="Tab 4" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link">
                        <div>Asia</div>
                    </a>
                </div>
        
        
        
                <div class="tab-content-mint atlas w-tab-content">
                    <div data-w-tab="Tab 1" class="tab-pane-tab-1 w-tab-pane w--tab-active">
                        <div class="common-wrapper">
                            <div class="instagram-wrapper mobile-vert-scroll mar-0">
                                <div class="grid-gallery-flex">
                                    <div class="grid-column sm">
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/uk/1.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/internationalisation-logo/london-school-economics.png"
                                                    loading="lazy" alt="" style="height:50px;">
                                            </div>
                                        </div>
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/uk/2.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/internationalisation-logo/brimingham.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                    </div>
        
                                    <div class="grid-column sm">
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/uk/3.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/nottingham-university.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/uk/4.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/ual-fashion.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                    </div>
        
                                    <div class="grid-column sm">
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/uk/5.png"
                                                loading="lazy" alt="" class="insta-image-rect isdi">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/ucl.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/uk/6.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/ual-sm.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                    </div>
        
                                    <div class="grid-column sm">
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/uk/7.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/ual-lcc.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/uk/8.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/kings-london.png"
                                                    loading="lazy" alt="" style="height:50px;">
                                            </div>
                                        </div>
        
                                    </div>
        
                                </div>
                            </div>
                        </div>
                    </div>
        
                    <div data-w-tab="Tab 2" class="tab-pane-tab-2 w-tab-pane">
                        <div class="common-wrapper">
                            <div class="instagram-wrapper mobile-vert-scroll mar-0">
                                <div class="grid-gallery-flex">
        
                                    <div class="grid-column sm">
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/europe/1.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/naba.png"
                                                    loading="lazy" alt="" style="height:35px;">
                                            </div>
                                        </div>
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/europe/2.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/rwth.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                    </div>
        
        
                                    <div class="grid-column sm">
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/europe/3.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/ied.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/europe/4.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/instituto.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                    </div>
        
        
                                    <div class="grid-column sm">
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/europe/5.png"
                                                loading="lazy" alt="" class="insta-image-rect isdi">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/alto.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/europe/6.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/ied.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                    </div>
        
        
                                    <div class="grid-column sm">
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/europe/7.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/ium.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/europe/8.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/rwth.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                    </div>
        
                                </div>
                            </div>
                        </div>
                    </div>
        
                    <div data-w-tab="Tab 3" class="w-tab-pane">
                        <div class="common-wrapper">
                            <div class="instagram-wrapper mobile-vert-scroll mar-0">
                                <div class="grid-gallery-flex">
        
                                    <div class="grid-column sm">
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/us/1.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/nyu.png"
                                                    loading="lazy" alt="" style="height:40px;">
                                            </div>
                                        </div>
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/us/2.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/nyfa.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                    </div>
        
        
                                    <div class="grid-column sm">
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/us/3.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/harvard-university.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/us/4.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/berkeley.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                    </div>
        
        
                                    <div class="grid-column sm">
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/us/5.png"
                                                loading="lazy" alt="" class="insta-image-rect isdi">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/parsons-school.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/us/6.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/nyu-sps.jpg"
                                                    loading="lazy" alt="" style="height: 55px;">
                                            </div>
                                        </div>
        
                                    </div>
        
        
                                    <div class="grid-column sm">
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/us/7.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/harvard-school.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/us/8.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/babson.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                    </div>
        
                                </div>
                            </div>
                        </div>
                    </div>
                    <div data-w-tab="Tab 4" class="w-tab-pane">
                        <div class="common-wrapper">
                            <div class="instagram-wrapper mobile-vert-scroll mar-0">
                                <div class="grid-gallery-flex">
        
                                    <div class="grid-column sm">
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/asia/1.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/yonsei.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/asia/2.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/nus.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                    </div>
        
        
                                    <div class="grid-column sm">
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/asia/3.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/yonsei.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/asia/4.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/smu.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                    </div>
        
        
                                    <div class="grid-column sm">
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/asia/5.png"
                                                loading="lazy" alt="" class="insta-image-rect isdi">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/shangai.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/asia/6.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/nanyang.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                    </div>
        
        
                                    <div class="grid-column sm">
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/asia/7.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/yonsei.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                        <div class="grid-card-atlas">
                                            <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/toggle-tab/asia/8.png"
                                                loading="lazy" alt="" class="insta-image-rect">
        
                                            <div class="grid-logo">
                                                <img src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/logo/seoul.png"
                                                    loading="lazy" alt="">
                                            </div>
                                        </div>
        
                                    </div>
        
                                </div>
                            </div>
                        </div>
                    </div>
        
        
                </div>
            </div>
        </div>
    </section>
    
    <section class="section">
        <div class="container">
            <div class="head-wrap top">
                <h2 class="h2-tag mrg16">Summer School Diaries</h2>
            </div>
            <div class="carousel-wrapper">
        <button class="arrow left">‹</button>
        <div class="carousel" id="carousel">
            <!-- EXACTLY 12 CARDS BELOW (replace poster/video src as needed) -->
            <!-- I've used repeated mp4 as placeholders; replace with your 12 reel URLs -->
            <div class="card">
                <div class="play-btn">▶</div>
                <img class="poster"
                    src="https://atlasuniversity.edu.in//assets/images/advantages/summer-school/reel/poster-img/1.png"
                    alt=""><video muted loop playsinline
                    src="https://atlasuniversity.edu.in//assets/images/advantages/summer-school/reel/video/1.mp4"
                    preload="metadata"></video>
                <!--<div class="card-content">-->
                <!--    <div class="title">1</div>-->
                <!--    <div class="subtitle">The New age fashion experience</div>-->
                <!--</div>-->
            </div>
            
            <div class="card">
                <div class="play-btn">▶</div>
                <img class="poster"
                    src="https://atlasuniversity.edu.in//assets/images/advantages/summer-school/reel/poster-img/2.png"
                    alt=""><video muted loop playsinline
                    src="https://atlasuniversity.edu.in//assets/images/advantages/summer-school/reel/video/2.mp4"
                    preload="metadata"></video>
            </div>
            <div class="card">
                <div class="play-btn">▶</div>
                <img class="poster"
                    src="https://atlasuniversity.edu.in//assets/images/advantages/summer-school/reel/poster-img/3.png"
                    alt=""><video muted loop playsinline
                    src="https://atlasuniversity.edu.in//assets/images/advantages/summer-school/reel/video/3.mp4"
                    preload="metadata"></video>
            </div>
            <div class="card">
                <div class="play-btn">▶</div>
                <img class="poster"
                    src="https://atlasuniversity.edu.in//assets/images/advantages/summer-school/reel/poster-img/4.png"
                    alt=""><video muted loop playsinline
                    src="https://atlasuniversity.edu.in//assets/images/advantages/summer-school/reel/video/4.mp4"
                    preload="metadata"></video>
            </div>
            <div class="card">
                <div class="play-btn">▶</div>
                <img class="poster"
                    src="https://atlasuniversity.edu.in//assets/images/advantages/summer-school/reel/poster-img/5.png"
                    alt=""><video muted loop playsinline
                    src="https://atlasuniversity.edu.in//assets/images/advantages/summer-school/reel/video/5.mp4"
                    preload="metadata"></video>
            </div>
            <div class="card">
                <div class="play-btn">▶</div>
                <img class="poster"
                    src="https://atlasuniversity.edu.in//assets/images/advantages/summer-school/reel/poster-img/6.png"
                    alt=""><video muted loop playsinline
                    src="https://atlasuniversity.edu.in//assets/images/advantages/summer-school/reel/video/6.mp4"
                    preload="metadata"></video>
            </div>
            <div class="card">
                <div class="play-btn">▶</div>
                <img class="poster"
                    src="https://atlasuniversity.edu.in//assets/images/advantages/summer-school/reel/poster-img/7.png"
                    alt=""><video muted loop playsinline
                    src="https://atlasuniversity.edu.in//assets/images/advantages/summer-school/reel/video/7.mp4"
                    preload="metadata"></video>
            </div>
        </div>

        <button class="arrow right">›</button>
    </div>
        </div>
    </section>
    
      <section class="section">
        <div class="container">
            <div class="head-wrap top">
                <h2 class="h2-tag mrg16">International Summer Learning</h2>
            </div>
            <div class="sub-heading mrgbtm">Students at ATLAS participate in summer programs hosted by top universities across multiple countries, gaining first-hand exposure to global academic and cultural environments. These experiences foster cross-cultural understanding and broaden academic perspectives. They play a meaningful role in shaping students’ future academic and professional journeys.</div>
            <div class="center-image-full-wrap-atlas">
                <div style="padding-top:56.17021276595745%" class="w-embed-youtubevideo">
                    <iframe src="https://www.youtube.com/embed/q07GExAhHEw?si=AML3KSE57Bu20App?rel=0&amp;controls=1&amp;autoplay=1&amp;mute=1&amp;start=0" frameBorder="0" style="position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:auto" allow="autoplay; encrypted-media" allowfullscreen="" title="MVP Showcase 2024"></iframe></div>
            </div>
        </div>
    </section>
    
    

 <section class="section">
		<div class="container">
			<div class="head-wrap top">
                <h2 class="h2-tag mrg16">Experiences Beyond Borders</h2>
            </div>
			<div class="sub-heading mrgbtm">Real stories of ATLAS students exploring, learning, and growing across the world.</div>
			<div class="swiper customSliderContainer_X91">
				<div class="swiper-wrapper">
					
					<div class="swiper-slide customSlideItem_X91">
						<div class="testimonial-custom-card bgc1 atlas">
						    <div data-poster-url="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/1.png"
                                data-video-urls="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/1.mp4, https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/1.webm"
                                data-loop="true"
                                data-wf-ignore="true"
                                class="testimonial-video-wrapper-unique">
                                
                                <video class="testimonial-video-element-multi"
                                  loop
                                  playsinline
                                  poster="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/1.png">
                               
                                
                                <source src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/1.mp4">
                                <source src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/1.webm">
                               
                                
                                </video>
                                
                                <button type="button" class="video-toggle-btn-unique">
                                    ▶
                                </button>
                                
                            </div>
							
						</div>
					</div>
					
					<div class="swiper-slide customSlideItem_X91">
						<div class="testimonial-custom-card bgc1 atlas">
						    <div data-poster-url="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/2.png"
                                data-video-urls="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/2.mp4, https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/2.webm"
                                data-loop="true"
                                data-wf-ignore="true"
                                class="testimonial-video-wrapper-unique">
                                
                                <video class="testimonial-video-element-multi"
                                  loop
                                  playsinline
                                  poster="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/2.png">
                                
                                <source src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/2.mp4">
                                <source src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/2.webm">
                               
                                
                                </video>
                                
                                <button type="button" class="video-toggle-btn-unique">
                                    ▶
                                </button>
                                
                            </div>
						</div>
					</div>
					
					<div class="swiper-slide customSlideItem_X91">
						<div class="testimonial-custom-card bgc1 atlas">
						    <div data-poster-url="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/3.png"
                                data-video-urls="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/3.mp4, https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/3.webm"
                                data-loop="true"
                                data-wf-ignore="true"
                                class="testimonial-video-wrapper-unique">
                                
                               <video class="testimonial-video-element-multi"
                                  loop
                                  playsinline
                                  poster="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/3.png">
                                
                                <source src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/3.mp4">
                                <source src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/3.webm">
                               
                                
                                </video>
                                
                                <button type="button" class="video-toggle-btn-unique">
                                    ▶
                                </button>
                                
                            </div>
						</div>
					</div>
					
					<div class="swiper-slide customSlideItem_X91">
						<div class="testimonial-custom-card bgc1 atlas">
						    <div data-poster-url="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/4.png"
                                data-video-urls="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/4.mp4, https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/4.webm"
                                data-loop="true"
                                data-wf-ignore="true"
                                class="testimonial-video-wrapper-unique">
                                
                               <video class="testimonial-video-element-multi"
                                  loop
                                  playsinline
                                  poster="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/4.png">
                                
                                <source src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/4.mp4">
                                <source src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/4.webm">
                               
                                
                                </video>
                                
                                <button type="button" class="video-toggle-btn-unique">
                                    ▶
                                </button>
                                
                            </div>
						</div>
					</div>
					
					<div class="swiper-slide customSlideItem_X91">
						<div class="testimonial-custom-card bgc1 atlas">
						    <div data-poster-url="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/5.png"
                                data-video-urls="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/5.mp4, https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/5.webm"
                                data-loop="true"
                                data-wf-ignore="true"
                                class="testimonial-video-wrapper-unique">
                                
                                <video class="testimonial-video-element-multi"
                                  loop
                                  playsinline
                                  poster="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/5.png">
                                
                                <source src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/5.mp4">
                                <source src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/5.webm">
                               
                                
                                </video>
                                
                                <button type="button" class="video-toggle-btn-unique">
                                    ▶
                                </button>
                                
                            </div>
						</div>
					</div>
					
					<div class="swiper-slide customSlideItem_X91">
						<div class="testimonial-custom-card bgc1 atlas">
						    <div data-poster-url="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/6.png"
                                data-video-urls="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/6.mp4, https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/6.webm"
                                data-loop="true"
                                data-wf-ignore="true"
                                class="testimonial-video-wrapper-unique">
                                
                                <video class="testimonial-video-element-multi"
                                  loop
                                  playsinline
                                  poster="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/6.png">
                                
                                <source src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/6.mp4">
                                <source src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/6.webm">
                               
                                
                                </video>
                                
                                <button type="button" class="video-toggle-btn-unique">
                                    ▶
                                </button>
                                
                            </div>
						</div>
					</div>
					
					<div class="swiper-slide customSlideItem_X91">
						<div class="testimonial-custom-card bgc1 atlas">
						    <div data-poster-url="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/7.png"
                                data-video-urls="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/7.mp4, https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/7.webm"
                                data-loop="true"
                                data-wf-ignore="true"
                                class="testimonial-video-wrapper-unique">
                                
                               <video class="testimonial-video-element-multi"
                                  loop
                                  playsinline
                                  poster="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/7.png">
                                
                                <source src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/7.mp4">
                                <source src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/7.webm">
                               
                                
                                </video>
                                
                                <button type="button" class="video-toggle-btn-unique">
                                    ▶
                                </button>
                                
                            </div>
						</div>
					</div>
					
					<div class="swiper-slide customSlideItem_X91">
						<div class="testimonial-custom-card bgc1 atlas">
						    <div data-poster-url="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/8.png"
                                data-video-urls="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/8.mp4, https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/8.webm"
                                data-loop="true"
                                data-wf-ignore="true"
                                class="testimonial-video-wrapper-unique">
                                
                               <video class="testimonial-video-element-multi"
                                  loop
                                  playsinline
                                  poster="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/8.png">
                                
                                <source src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/8.mp4">
                                <source src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/8.webm">
                               
                                
                                </video>
                                
                                <button type="button" class="video-toggle-btn-unique">
                                    ▶
                                </button>
                                
                            </div>
						</div>
					</div>
					
					<div class="swiper-slide customSlideItem_X91">
						<div class="testimonial-custom-card bgc1 atlas">
						    <div data-poster-url="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/9.png"
                                data-video-urls="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/9.mp4, https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/9.webm"
                                data-loop="true"
                                data-wf-ignore="true"
                                class="testimonial-video-wrapper-unique">
                                
                               <video class="testimonial-video-element-multi"
                                  loop
                                  playsinline
                                  poster="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/9.png">
                                
                                <source src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/9.mp4">
                                <source src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/9.webm">
                               
                                
                                </video>
                                
                                <button type="button" class="video-toggle-btn-unique">
                                    ▶
                                </button>
                                
                            </div>
						</div>
					</div>
					
					<div class="swiper-slide customSlideItem_X91">
						<div class="testimonial-custom-card bgc1 atlas">
						    <div data-poster-url="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/10.png"
                                data-video-urls="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/10.mp4, https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/10.webm"
                                data-loop="true"
                                data-wf-ignore="true"
                                class="testimonial-video-wrapper-unique">
                                
                               <video class="testimonial-video-element-multi"
                                  loop
                                  playsinline
                                  poster="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/10.png">
                                
                                <source src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/10.mp4">
                                <source src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/10.webm">
                               
                                
                                </video>
                                
                                <button type="button" class="video-toggle-btn-unique">
                                    ▶
                                </button>
                                
                            </div>
						</div>
					</div>
					
					<div class="swiper-slide customSlideItem_X91">
						<div class="testimonial-custom-card bgc1 atlas">
						    <div data-poster-url="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/11.png"
                                data-video-urls="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/11.mp4, https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/11.webm"
                                data-loop="true"
                                data-wf-ignore="true"
                                class="testimonial-video-wrapper-unique">
                                
                              <video class="testimonial-video-element-multi"
                                  loop
                                  playsinline
                                  poster="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/11.png">
                                
                                <source src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/11.mp4">
                                <source src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/11.webm">
                               
                                
                                </video>
                                
                                <button type="button" class="video-toggle-btn-unique">
                                    ▶
                                </button>
                                
                            </div>
						</div>
					</div>
					
					<div class="swiper-slide customSlideItem_X91">
						<div class="testimonial-custom-card bgc1 atlas">
						    <div data-poster-url="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/12.png"
                                data-video-urls="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/12.mp4, https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/12.webm"
                                data-loop="true"
                                data-wf-ignore="true"
                                class="testimonial-video-wrapper-unique">
                                
                                <video class="testimonial-video-element-multi"
                                  loop
                                  playsinline
                                  poster="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/12.png">
                                
                                <source src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/12.mp4">
                                <source src="https://atlasuniversity.edu.in/assets/images/advantages/summer-school/testimonial/12.webm">
                               
                                
                                </video>
                                
                                <button type="button" class="video-toggle-btn-unique">
                                    ▶
                                </button>
                                
                            </div>
						</div>
					</div>
					
					
				</div>
				
				 <!-- Arrows -->
                    <div class="swiper-button-next customNextBtn_X91"></div>
                    <div class="swiper-button-prev customPrevBtn_X91"></div>
                
                    <!-- Pagination -->
                    <div class="swiper-pagination customPagination_X91"></div>
			</div>
		</div>
	</section>


  <section class="section">
		<div class="container">
			<h2 class="h2-tag mrgbtm0">Global Voices, Student Stories
</h2>
			<h2 class="sub-heading"></h2>
			<div class="swiper common-swiper-full mrgtp0">
				<div class="swiper-wrapper">
					
					<div class="swiper-slide">
						<div class="testimonial-card bgc1 atlas"><img src="https://atlasuniversity.edu.in/atlas-global/wp-content/themes/astra/assets/images/summer-schools/summer/Kanak_Suri.jpg" loading="lazy" alt="" class="student-image" />
							<div class="student-text">
								<div class="st-quote">
									<div class="st-text">The LSE Summer School was an amazing experience. The faculty that taught us were experts in their fields and taught each course with enthusiasm and contemporary relevance.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c9968e368468bbc8fe8ff_quote-atlas.png" alt="" class="quote" />
								</div>
								<div class="st-details">
									<div class="stname isdi"></div>
									<div class="st-course st-name atlas mb-3"><strong>Kanak Suri</strong></div>
									<!--<div class="st-at-pos">London School of Economics and Political Science</div>-->
									<img src="https://atlasuniversity.edu.in/assets/images/internationalisation-logo/london-school-economics.png" style="background: #fff; height: 70px; padding: 5px;">
								</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
							</div>
						</div>
					</div>
					<div class="swiper-slide">
						<div class="testimonial-card bgc1 atlas"><img src="https://atlasuniversity.edu.in/atlas-global/wp-content/themes/astra/assets/images/summer-schools/summer/Nainika_Patwari.jpg" loading="lazy" alt="" class="student-image" />
							<div class="student-text">
								<div class="st-quote">
									<div class="st-text">My experience at the New York University Summer School was unparalleled. The academic rigour and the delivery of session was practical and helped me understand my career interests and prospects.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c9968e368468bbc8fe8ff_quote-atlas.png" alt="" class="quote" />
								</div>
								<div class="st-details">
									<div class="stname isdi"></div>
									<div class="st-course st-name atlas mb-3"><strong>Nainika Patwari</strong></div>
									<!--<div class="st-at-pos">New York University</div>-->
									<img src="https://atlasuniversity.edu.in/assets/images/internationalisation-logo/nyu.png" style="background: #fff; height: 70px; padding: 5px;">
								</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
							</div>
						</div>
					</div>
					<div class="swiper-slide">
						<div class="testimonial-card bgc1 atlas"><img src="https://atlasuniversity.edu.in/atlas-global/wp-content/themes/astra/assets/images/summer-schools/summer/Brooklyn_Robinson.jpg" loading="lazy" alt="" class="student-image" style="object-position: 50% 0%;"/>
							<div class="student-text">
								<div class="st-quote">
									<div class="st-text">Attending the Youth Ecosperity Dialogue at Singapore Management University was an extraordinary journey that profoundly impacted my commitment to sustainability. Leaving an indelible mark on my academic and personal growth.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c9968e368468bbc8fe8ff_quote-atlas.png" alt="" class="quote" />
								</div>
								<div class="st-details">
									<div class="stname isdi"></div>
									<div class="st-course st-name atlas mb-3">Brooklyn Robinson</div>
									<!--<div class="st-at-pos">Singapore Management University</div>-->
									<img src="https://atlasuniversity.edu.in/assets/images/internationalisation-logo/smu.png" style="background: #fff; height: 70px; padding: 5px;">
								</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
							</div>
						</div>
					</div>
					<div class="swiper-slide">
						<div class="testimonial-card bgc1 atlas"><img src="https://atlasuniversity.edu.in/atlas-global/wp-content/themes/astra/assets/images/summer-schools/summer/Yash_Dandavate.jpg" loading="lazy" alt="" class="student-image" />
							<div class="student-text">
								<div class="st-quote">
									<div class="st-text">The HEC Paris Summer School enhanced my interpersonal skills and strengthened my management and entrepreneurship expertise. The experience was academically rewarding and personally transformative.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c9968e368468bbc8fe8ff_quote-atlas.png" alt="" class="quote" />
								</div>
								<div class="st-details">
									<div class="stname isdi"></div>
									<div class="st-course st-name atlas mb-3"><strong>Yash Dandavate</strong></div>
									<!--<div class="st-at-pos">HEC Paris Business School</div>-->
									<img src="https://atlasuniversity.edu.in/assets/images/internationalisation-logo/hec_paris.png" style="background: #fff; height: 70px; padding: 5px;">
								</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
							</div>
						</div>
					</div>
					<div class="swiper-slide">
						<div class="testimonial-card bgc1 atlas"><img src="https://atlasuniversity.edu.in/atlas-global/wp-content/themes/astra/assets/images/summer-schools/summer/Aaliya_Khandwani.jpg" loading="lazy" alt="" class="student-image" />
							<div class="student-text">
								<div class="st-quote">
									<div class="st-text">The Babson Build experience was an excellent entrepreneurship program blending academic and experiential learning. I had the opportunity to learn from peers worldwide and build my entrepreneurial ambitions.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c9968e368468bbc8fe8ff_quote-atlas.png" alt="" class="quote" />
								</div>
								<div class="st-details">
									<div class="stname isdi"></div>
									<div class="st-course st-name atlas mb-3">Aaliya Khandwani</div>
									<!--<div class="st-at-pos">Babson College, USA</div>-->
									<img src="https://atlasuniversity.edu.in/assets/images/internationalisation-logo/babson.png" style="background: #fff; height: 70px; padding: 5px;">
								</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
<?php include "../../assets/include/footer.php" ?>


<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

 <script>
  const customSwiper_X91 = new Swiper(".customSliderContainer_X91", {
  slidesPerView: 4,
  spaceBetween: 10,

  loop: false,
  autoplay: false,

  allowTouchMove: true,
  grabCursor: true,

  freeMode: false,
  slidesPerGroup: 1,

  navigation: {
    nextEl: ".customNextBtn_X91",
    prevEl: ".customPrevBtn_X91",
  },

  pagination: {
    el: ".customPagination_X91",
    clickable: true,
  },

  breakpoints: {
    0: { slidesPerView: 1 },
    600: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});


// 🎬 Video Play/Pause Logic
document.querySelectorAll('.video-toggle-btn-unique').forEach(btn => {
  btn.addEventListener('click', () => {

    const wrapper = btn.closest('.testimonial-video-wrapper-unique');
    const video = wrapper.querySelector('video');

    const isMobile = window.innerWidth <= 767;

    if (video.paused) {

      document.querySelectorAll('.testimonial-video-element-multi').forEach(v => {
        v.pause();
        v.currentTime = 0;
        v.load();
      });

      document.querySelectorAll('.video-toggle-btn-unique').forEach(b => {
        b.innerHTML = "▶";
      });

      video.play();
      btn.innerHTML = "❚❚";

      // only lock swipe on desktop; keep mobile free to scroll
      if (!isMobile) customSwiper_X91.allowTouchMove = false;

    } else {
      video.pause();
      video.currentTime = 0;
      video.load();
      btn.innerHTML = "▶";

      customSwiper_X91.allowTouchMove = true;
    }
  });
});

customSwiper_X91.on('slideChange', () => {
  document.querySelectorAll('.testimonial-video-element-multi').forEach(v => {
    v.pause();
    v.currentTime = 0;
    v.load();
  });

  document.querySelectorAll('.video-toggle-btn-unique').forEach(b => {
    b.innerHTML = "▶";
  });

  customSwiper_X91.allowTouchMove = true;
});
  </script>


<script>
(function () {

    const wrapper = document.querySelector('.carousel-wrapper');
    const carousel = document.getElementById('carousel');
    const nextBtn = document.querySelector('.arrow.right');
    const prevBtn = document.querySelector('.arrow.left');

    let cards = [...carousel.children];
    const total = cards.length;
    const centerSlot = Math.floor(total / 2);
    const gap = parseFloat(getComputedStyle(carousel).gap) || 30;

    let cardFull = null;
    let currentTranslate = 0;
    let autoSlideTimer = null;
    let isAnimating = false;
    let isHoveringCarousel = false;
    let isVideoPlaying = false;          // blocks auto-slide while a video plays

    function recalcSizes() {
        cards = [...carousel.children];
        const cw = cards[0].offsetWidth;
        cardFull = cw + gap;
        const base = (wrapper.clientWidth / 2) - (cardFull * centerSlot + cardFull / 2);
        currentTranslate = base;
        carousel.style.transition = 'none';
        carousel.style.transform = `translateX(${currentTranslate}px)`;
        requestAnimationFrame(() => { carousel.style.transition = 'transform .6s ease'; });
        updateClasses();
    }

    function updateClasses() {
        cards = [...carousel.children];
        cards.forEach((c, i) => {
            c.classList.remove('active', 'near', 'far');
            if (i === centerSlot) c.classList.add('active');
            else if (i === centerSlot - 1 || i === centerSlot + 1) c.classList.add('near');
            else c.classList.add('far');
        });
        wireButtons();
    }

    // stop + reset every video, bring posters back, reset icons
    function stopAllVideos() {
        carousel.querySelectorAll('.card').forEach(c => {
            const v = c.querySelector('video');
            const p = c.querySelector('.poster');
            const b = c.querySelector('.play-btn');
            if (v) { v.pause(); v.currentTime = 0; }
            if (p) p.style.opacity = 1;
            if (b) b.innerHTML = '▶';
            c.classList.remove('playing');
        });
        isVideoPlaying = false;
    }

    function nextSlide() {
        if (isAnimating) return;
        isAnimating = true;
        currentTranslate -= cardFull;
        carousel.style.transition = 'transform .6s ease';
        carousel.style.transform = `translateX(${currentTranslate}px)`;
        const onEnd = () => {
            carousel.removeEventListener('transitionend', onEnd);
            carousel.appendChild(carousel.firstElementChild);
            currentTranslate += cardFull;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(${currentTranslate}px)`;
            requestAnimationFrame(() => { requestAnimationFrame(() => {
                carousel.style.transition = 'transform .6s ease';
                isAnimating = false;
                updateClasses();
            }); });
        };
        carousel.addEventListener('transitionend', onEnd);
    }

    function prevSlide() {
        if (isAnimating) return;
        isAnimating = true;
        carousel.insertBefore(carousel.lastElementChild, carousel.firstElementChild);
        currentTranslate -= cardFull;
        carousel.style.transition = 'none';
        carousel.style.transform = `translateX(${currentTranslate}px)`;
        requestAnimationFrame(() => {
            currentTranslate += cardFull;
            carousel.style.transition = 'transform .6s ease';
            carousel.style.transform = `translateX(${currentTranslate}px)`;
            const onEnd = () => {
                carousel.removeEventListener('transitionend', onEnd);
                carousel.style.transition = 'none';
                carousel.style.transform = `translateX(${currentTranslate}px)`;
                requestAnimationFrame(() => { requestAnimationFrame(() => {
                    carousel.style.transition = 'transform .6s ease';
                    isAnimating = false;
                    updateClasses();
                }); });
            };
            carousel.addEventListener('transitionend', onEnd);
        });
    }

    function centerCardInstant(clickedIndex) {
        if (isAnimating) return;
        const moves = clickedIndex - centerSlot;
        if (moves === 0) return;
        if (moves > 0) {
            for (let i = 0; i < moves; i++) carousel.appendChild(carousel.firstElementChild);
        } else {
            for (let i = 0; i < Math.abs(moves); i++) carousel.insertBefore(carousel.lastElementChild, carousel.firstElementChild);
        }
        carousel.style.transition = 'none';
        carousel.style.transform = `translateX(${currentTranslate}px)`;
        requestAnimationFrame(() => { requestAnimationFrame(() => {
            carousel.style.transition = 'transform .6s ease';
            updateClasses();
        }); });
    }

    // ▶ / ❚❚ click toggle + click-to-center
    function wireButtons() {
        [...carousel.children].forEach(card => {
            let video = card.querySelector('video');
            let poster = card.querySelector('.poster');
            let playBtn = card.querySelector('.play-btn');

            if (poster && !card.classList.contains('playing')) poster.style.opacity = 1;

            // 🔥 remove ALL old listeners by cloning the button
            const freshBtn = playBtn.cloneNode(true);
            playBtn.parentNode.replaceChild(freshBtn, playBtn);
            playBtn = freshBtn;

            // PLAY / PAUSE
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                video = card.querySelector('video');   // re-grab in case DOM moved
                poster = card.querySelector('.poster');

                if (video.paused) {
                    stopAllVideos();
                    if (poster) poster.style.opacity = 0;
                    video.muted = false;
                    const p = video.play();
                    if (p && p.catch) p.catch(() => {});
                    card.classList.add('playing');
                    playBtn.innerHTML = '❚❚';
                    isVideoPlaying = true;
                    stopAuto();
                } else {
                    video.pause();
                    video.currentTime = 0;
                    if (poster) poster.style.opacity = 1;
                    card.classList.remove('playing');
                    playBtn.innerHTML = '▶';
                    isVideoPlaying = false;
                    restartAuto();
                }
            });

            // 🔥 clone the card-level click too, to clear old centering listeners
            // (we attach centering on the card but guard against the button)
            card.onclick = (ev) => {
                if (ev.target.closest('.play-btn')) return;
                const idx = [...carousel.children].indexOf(card);
                if (idx !== centerSlot) {
                    stopAllVideos();
                    centerCardInstant(idx);
                    restartAuto();
                }
            };
        });
    }

    function startAuto() {
        stopAuto();
        autoSlideTimer = setInterval(() => {
            if (!isHoveringCarousel && !isVideoPlaying) nextSlide();
        }, 3000);
    }

    function stopAuto() {
        if (autoSlideTimer) { clearInterval(autoSlideTimer); autoSlideTimer = null; }
    }

    function restartAuto() {
        stopAuto();
        if (!isVideoPlaying) setTimeout(startAuto, 900);
    }

    nextBtn.addEventListener('click', () => { stopAllVideos(); stopAuto(); nextSlide(); restartAuto(); });
    prevBtn.addEventListener('click', () => { stopAllVideos(); stopAuto(); prevSlide(); restartAuto(); });

    wrapper.addEventListener('mouseenter', () => { isHoveringCarousel = true; stopAuto(); });
    wrapper.addEventListener('mouseleave', () => { isHoveringCarousel = false; restartAuto(); });

    window.addEventListener('resize', recalcSizes);

    window.addEventListener('load', () => {
        cards = [...carousel.children];
        recalcSizes();
        updateClasses();
        startAuto();
    });

})();
</script>

<script>
    var vert_swiper = new Swiper(".vertical-swiper", {
    direction: "vertical",
    slidesPerView: "auto",
    spaceBetween: 20,
    loop: true,
    allowTouchMove: false, // avoid user-induced “stuck” states
    autoplay: {
    delay: 0, // continuous
    disableOnInteraction: false,
    },
    speed: 4000,
    });
    
    var vert_swiper1 = new Swiper(".vertical-swiper1", {
      direction: "vertical",
      slidesPerView: "auto",
      spaceBetween: 20,
      loop: true,
      allowTouchMove: false, // avoid user-induced “stuck” states
      autoplay: {
      delay: 0, // continuous
      disableOnInteraction: false,
      },
      speed: 4000,
      });
</script>

