<?php
$title = "ATLAS Advantage: Industry-Led Learning  â€“ ATLAS SkillTech University";
$description = "Discover the ATLAS Advantage industry mentorship, experiential projects, global pathways and skills-focused curriculum that prepare you for future careers.";
$keywords = "atlas, contact";
$css = "atlass-fantastic-site-48323a.webflow.690c43333ef0c9612dced003-396789c14.css";
$js = "https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/js/webflow.1ba7f46b.af01a5ad99350cf0.js";
$htmlDataId = "690c43333ef0c9612dced003";
$body = "body atlas-page";


include "../../assets/include/header.php" ?>

<script src="https://cdn.tailwindcss.com"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<style>
    .large-text{
    font-size: 20px;
}

.head-top-card{
    padding-left: 10px;
    padding-right: 10px;
}

.head-top-card{
    align-items: center;
}
.sm-text-isme {
    font-size: 36px;
}

.tabs-menu-mint{
    display: inline-block;
}
.tabs-menu-mint.less-space{
    padding:0;
}

.custom-sidetab-con{
    display: flex;
    gap:40px;
}

.tabs-menu-mint{
    width:auto;
}

.tab-content-mint{
    flex:1;
    padding-left:8rem;
}

.tab-content-mint.atlas {
    padding-top: 0px;
}


.cd-ty-el-cont{
        padding-bottom: 16px;
            padding-left: 18px;
}
.cd-ty-el-text.isdi{
    font-size: 18px;
}


.card-type-el-ugdx{
    height: 295px;
}
.common-flex-16-wrap{
   justify-content: space-between; 
}

.cd-ty-el-img{
    object-fit: contain;
}

/*Reel Video Css*/

       .reels-section{
    margin:auto;
    }
    
    .reels-heading{
    font-size:36px;
    font-weight:700;
    margin-bottom:40px;
    text-align:center;
    }
    
    /* GRID on desktop (default) */
.reels-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 28px;
}

.reel-card {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    background: #000;
    box-shadow: 0 15px 35px rgba(0,0,0,0.12);
}

.reel-card video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

/* PLAY / PAUSE button — bottom right */
.play-toggle-btn {
    position: absolute;
    bottom: 14px;
    right: 14px;
    width: 48px;
    height: 48px;
    min-width: 48px;
    border: none;
    border-radius: 50%;
    background: rgba(0,0,0,0.65);
    color: #fff;
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4;
    padding: 0;
}

/* show play icon by default, hide pause */
.play-toggle-btn .pi-pause { display: none; }
.play-toggle-btn .pi-play  { display: block; }

/* when playing: swap icons, and hide pause unless hovering */
.reel-card.playing .play-toggle-btn .pi-play  { display: none; }
.reel-card.playing .play-toggle-btn .pi-pause { display: block; }

.reel-card.playing .play-toggle-btn {
    opacity: 0;
    transition: opacity 0.3s ease;
}
.reel-card.playing:hover .play-toggle-btn {
    opacity: 1;
}

.reel-card:hover .sound-toggle { opacity: 1; }

/* Swiper arrows — hidden on desktop (grid mode) */
.reels-prev, .reels-next { display: none; }
    .rk-single-video-section-unique {
  padding: 50px 20px;
  background: #f5f7fa;
}

/* WRAPPER */
.rk-video-wrapper-unique {
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  background: #000;
  box-shadow: 0 15px 40px rgba(0,0,0,0.15);
}

/* VIDEO */
.rk-video-element-unique {
  width: 100%;
  height: 698px;
  object-fit: cover;
  display: block;
  cursor: pointer;
}

/* PLAY BUTTON */
.rk-play-btn-unique {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  background: rgba(0,0,0,0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 26px;
  cursor: pointer;
  transition: 0.3s;
}

.rk-play-btn-unique:hover {
  background: rgba(0,0,0,0.8);
  transform: translate(-50%, -50%) scale(1.1);
}

/* HIDE BUTTON WHEN PLAYING */
.rk-video-wrapper-unique.playing .rk-play-btn-unique {
  opacity: 0;
  pointer-events: none;
}

/* RESPONSIVE */


/* While playing, hide the pause button by default */
.toggleBtn.playing .pauseIcon {
  opacity: 0;
  transition: opacity 0.3s ease;
}
/* Fade it in when hovering the card */
.swiper-slide:hover .toggleBtn.playing .pauseIcon {
  opacity: 1;
}
/* Play icon (when paused) always visible */
.toggleBtn .playIcon {
  transition: opacity 0.3s ease;
}


.myGuideSlider3 .swiper-slide > div {
  height: auto !important;
}
.myGuideSlider3 .videoEl {
  position: relative !important;
  inset: auto !important;
  width: 100% !important;
  height: auto !important;
  max-height: 600px;            /* keeps tall portrait videos in check */
  object-fit: contain !important;
  background: #000;
  display: block;
}

    @media screen and (max-width: 767px) {
        
          .rk-video-element-unique {
            height: 260px;
          }
        
          .rk-play-btn-unique {
            width: 55px;
            height: 55px;
            font-size: 20px;
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
        
        .tabs-menu-mint{
            width:100%;
            display: flex;
            flex-direction: row;
        }
        
        .tabs-menu-mint.less-space{
            
            margin-left: 0px;
            margin-right: 0px;
        }
        
        .custom-object-fit video{
            	width: 100%;
    		height: auto;
    		object-fit: contain;   
    		background: #000;
        }
        
        
           .reels-grid {
        display: flex;       /* swiper needs flex, not grid */
        gap: 0;
    }
    .reels-swiper {
        position: relative;
        overflow: hidden;
    }
    .reel-card {
        height: 480px;       /* fixed height so mobile video shows fully */
    }

    /* arrows visible on mobile */
    .reels-prev, .reels-next {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background: #41418E;
        color: #fff;
        z-index: 10;
        cursor: pointer;
        font-size: 20px;
    }
    .reels-prev { left: 6px; }
    .reels-next { right: 6px; }
    .reels-prev::after { content: "‹"; }
    .reels-next::after { content: "›"; }
    }

</style>
<section class="main-cover-section-isme">
    <div class="hero-cont-wrapper-isme">
        <div class="hero-text">
            <h1 class="h1-tag">Global Immersions</h1>
            <div class="course-desc-isme big-txt">
              Explore Engage and Evolve your Horizons
                
                </div>
            <!--<div class="buttons-wrapper"><a data-id="" data-wf--button-primary--variant="atlas" href="<?php echo $edudomain ?>applicationform" class="btn-primary w-variant-9df390f6-abdb-218d-e8a6-500b981692ba w-inline-block">-->
            <!--        <div class="button-tx">Apply Now</div>-->
            <!--    </a><a id="campus-visit" data-wf--button-primary--variant="outline-white" href="<?php echo $domain ?>campusvisit" class="btn-primary w-variant-edbe4a85-a762-b5b5-c583-585856b72378 w-inline-block">-->
            <!--        <div class="button-tx">Schedule a Visit</div>-->
            <!--    </a><a data-id="" data-wf--button-primary--variant="outline-white" href="https://online.fliphtml5.com/vrcjg/orkl/#p=1" target="_blank" class="btn-primary w-variant-edbe4a85-a762-b5b5-c583-585856b72378 w-inline-block">-->
            <!--        <div class="button-tx">Download Admissions Policy</div>-->
            <!--    </a></div>-->
        </div>
    </div>
    <img src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/hero-banner.png" 
    loading="lazy" sizes="(max-width: 1366px) 100vw, 1366px" 
    srcset="
    https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/herobanner/500.png 500w, 
    https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/herobanner/800.png 800w, 
    https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/herobanner/1080.png 1080w, 
    https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/herobanner/1366.png 1366w" 
    alt="" class="header-image-inner" />
</section>
<div class="top-cards-wrapper padbtm0">
	<div class="head-top-card atlas-bg-1">
		<div class="sm-text-isme atlas-blue">10+  </div>
		<div class="large-text text-center">Countries Explored </div>
	</div>
	<div class="head-top-card atlas-bg-2">
		<div class="sm-text-isme atlas-blue">35+</div>
		<div class="large-text text-center">Global Immersions Curated</div>
	</div>
	<div class="head-top-card atlas-bg-3">
		<div class="sm-text-isme atlas-blue">200+</div>
		<div class="large-text text-center">University & Industry Visits</div>
	</div>
	<div class="head-top-card atlas-bg-3">
		<div class="sm-text-isme atlas-blue">800+ </div>
		<div class="large-text text-center">Students Impacted </div>
	</div>
	
</div>
<div class="main-wrapper">
    
    
    
    
      <section class="section">
        <div class="container">
    
           
            <div class="about-story-wrapper-ugdx">
                <div class="abt-cont-ugdx-1">
                     <h2 class="h2-tag mrg42">About Global Immersions
</h2>
                    <div class="abt-text">
                       ATLAS students embark on transformative study excursions to foreign countries, unlocking a world of academic enrichment and cultural immersion.
                       
                       
                       
   <br /><br /> These global immersions are meticulously designed to blend academic rigor with real-world insights, offering students a holistic learning experience. Through academic sessions held at renowned partner universities, students engage with cutting-edge knowledge and global teaching methodologies, broadening their perspectives and honing their skills.
<br /><br />


Complementing these academic endeavors are curated industry sessions, providing firsthand exposure to the operational intricacies of diverse businesses and industries. Beyond academia, students delve into the rich tapestry of cultures, fostering a deep understanding of global diversity and cultivating a global mindset. These global immersions not only expand students academic horizons but also equip them with the perspectives needed to thrive in an interconnected world.

                        
                        </div>
                    <div class="common-wrapper">
                        <div class="btn-wraper hide"><a data-id="" data-wf--button-primary--variant="atlas" href="#" class="btn-primary w-variant-9df390f6-abdb-218d-e8a6-500b981692ba w-inline-block">
                                <div class="button-tx">Explore Center of Research</div>
                            </a></div>
                    </div>
                </div>
                <div><img src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/section/1.png" loading="lazy" sizes="(max-width: 688px) 100vw, 688px" srcset="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/section/1-500.png 500w, https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/section/1.png 688w" alt="" class="about-image-atlas" /></div>
            </div>
        </div>
    </section>
    
    
    
    
    
      <section class="section">
        <div class="container">
           <h2 class="h2-tag mrg42">Global Experiences of ATLAS Students
</h2>
           
            <div data-current="Tab 1" data-easing="ease" data-duration-in="300" data-duration-out="100" class="rounded-tabs-mint w-tabs custom-sidetab-con">
                
                
                    <div class="tabs-menu-mint less-space w-tab-menu">
                        <a data-w-tab="Tab 1" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link w--current">
                            <div>London</div>
                        </a>
                        <a data-w-tab="Tab 2" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link">
                            <div>New York</div>
                        </a>
                        <a data-w-tab="Tab 4" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link">
                            <div>Boston</div>
                        </a>
                        <a data-w-tab="Tab 5" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link">
                            <div>San Francisco</div>
                        </a>
                        <a data-w-tab="Tab 6" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link">
                            <div>Singapore</div>
                        </a>
                        
                        
                        
                         <a data-w-tab="Tab 7" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link">
                            <div>Malaysia</div>
                        </a>
                         <a data-w-tab="Tab 8" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link">
                            <div>Paris</div>
                        </a>
                          <a data-w-tab="Tab 9" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link">
                            <div>Netherlands</div>
                        </a>
                         <a data-w-tab="Tab 10" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link">
                            <div>Indiana</div>
                        </a>
                         <a data-w-tab="Tab 11" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link">
                            <div>Tokyo</div>
                        </a>
                         <a data-w-tab="Tab 12" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link">
                            <div>China</div>
                        </a>
                          <a data-w-tab="Tab 13" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link">
                            <div>Belgium</div>
                        </a>
                          <a data-w-tab="Tab 14" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link">
                            <div>Dubai</div>
                        </a>
                         <a data-w-tab="Tab 15" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link">
                            <div>UK</div>
                        </a>
                        
                         <a data-w-tab="Tab 16" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link">
                            <div>Babson College</div>
                        </a>
                        
                        
                        
                        
                         <a data-w-tab="Tab 18" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link">
                            <div>NASA</div>
                        </a>
                        
                    </div>
                
                    
                
                <div class="tab-content-mint atlas w-tab-content">
                    <div data-w-tab="Tab 1" class="tab-pane-tab-1 w-tab-pane w--tab-active">
                        <div class="common-flex-16-wrap">
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Imperial College London </div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/london/1.png" alt="" class="cd-ty-el-img" />
                            </div>
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">London School of Economics</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/london/2.png" alt="" class="cd-ty-el-img" />
                            </div>
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Deloitte</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/london/3.png" alt="" class="cd-ty-el-img" />
                            </div>
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">King's College London</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/london/4.png" alt="" class="cd-ty-el-img" />
                            </div>
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">London Eye</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/london/5.png" alt="" class="cd-ty-el-img" />
                            </div>
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Bloomberg</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/london/6.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                        </div>
                    </div>
                    <div data-w-tab="Tab 2" class="tab-pane-tab-2 w-tab-pane">
                        <div class="common-flex-16-wrap">
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Columbia University</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/new-york/1.png" alt="" class="cd-ty-el-img" />
                            </div>
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">New York Stock Exchange</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/new-york/2.png" alt="" class="cd-ty-el-img" />
                            </div>
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">New York University</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/new-york/3.png" alt="" class="cd-ty-el-img" />
                            </div>
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Pace University</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/new-york/4.png" alt="" class="cd-ty-el-img" />
                            </div>
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Parsons The New School</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/new-york/5.png" alt="" class="cd-ty-el-img" />
                            </div>
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Samsung</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/new-york/6.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                        </div>
                    </div>
                    <div data-w-tab="Tab 4" class="w-tab-pane">
                        <div class="common-flex-16-wrap">
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Harvard Business School</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/boston/1.png" alt="" class="cd-ty-el-img" />
                            </div>
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Tufts University</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/boston/2.png" alt="" class="cd-ty-el-img" />
                            </div>
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Northeastern University</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/boston/3.png" alt="" class="cd-ty-el-img" />
                            </div>
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Boston University</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/boston/4.png" alt="" class="cd-ty-el-img" />
                            </div>
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Bentley University</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/boston/5.png" alt="" class="cd-ty-el-img" />
                            </div>
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Brandeis University</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/boston/6.png" alt="" class="cd-ty-el-img" />
                            </div>
                         
                        </div>
                    </div>
                    <div data-w-tab="Tab 5" class="w-tab-pane">
                        <div class="common-flex-16-wrap">
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Stanford University</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/san-francisco/1.png" alt="" class="cd-ty-el-img" />
                            </div>
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Amazon</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/san-francisco/2.png" alt="" class="cd-ty-el-img" />
                            </div>
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Berkeley Haas School of Business</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/san-francisco/3.png" alt="" class="cd-ty-el-img" />
                            </div>
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Apple</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/san-francisco/4.png" alt="" class="cd-ty-el-img" />
                            </div>
                             <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Golden Gate University</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/san-francisco/5.png" alt="" class="cd-ty-el-img" />
                            </div>
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Google</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/san-francisco/6.png" alt="" class="cd-ty-el-img" />
                            </div>
                        </div>
                    </div>
                    <div data-w-tab="Tab 6" class="w-tab-pane">
                        <div class="common-flex-16-wrap">
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">NTU Singapore</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/singapore/4.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                             <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">NUS Business School</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/singapore/5.png" alt="" class="cd-ty-el-img" />
                            </div>

                             <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">SMU</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/singapore/6.png" alt="" class="cd-ty-el-img" />
                            </div>
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Apple</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/singapore/1.png" alt="" class="cd-ty-el-img" />
                            </div>
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Google</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/singapore/2.png" alt="" class="cd-ty-el-img" />
                            </div>
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Meta</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/singapore/3.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                        </div>
                    </div>
                    <div data-w-tab="Tab 7" class="w-tab-pane">
                        <div class="common-flex-16-wrap">
                             <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Petronas Twin Towers</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/malaysia/4.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                             <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Universiti Malaya</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/malaysia/5.png" alt="" class="cd-ty-el-img" />
                            </div>
  
                             <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">University of Wollongong</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/malaysia/6.png" alt="" class="cd-ty-el-img" />
                            </div>
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Bank of Negara</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/malaysia/1.png" alt="" class="cd-ty-el-img" />
                            </div>
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Batu Caves</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/malaysia/2.png" alt="" class="cd-ty-el-img" />
                            </div>
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">MRANTI</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/malaysia/3.png" alt="" class="cd-ty-el-img" />
                            </div>
     
                            
                        </div>
                    </div>
                    <div data-w-tab="Tab 8" class="w-tab-pane">
                        <div class="common-flex-16-wrap">
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">IFA Paris</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/paris/1.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                            
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Eiffel Tower</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/paris/2.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Schiaparelli Exhibition</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/paris/3.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                            
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Schiaparelli Exhibition</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/paris/4.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Palis de Tokyo</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/paris/5.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Musee des Arts Decoratifs</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/paris/6.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                        </div>
                    </div>
                    <div data-w-tab="Tab 9" class="w-tab-pane">
                        <div class="common-flex-16-wrap">
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">HKU University of the Arts</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/netherlands/1.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                            
                             <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Concept Studio</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/netherlands/2.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                            
                            
                            
                            
                            
                             <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Exhibition Studio</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/netherlands/3.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                            
                             <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Prototype Lab</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/netherlands/4.png" alt="" class="cd-ty-el-img" />
                            </div>
                        
                        
                        
                         <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Global Design Studio</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/netherlands/5.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                             <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Print & Production Lab</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/netherlands/6.png" alt="" class="cd-ty-el-img" />
                            </div>
                        
                        
                        </div>
                    </div>
                    <div data-w-tab="Tab 10" class="w-tab-pane">
                        <div class="common-flex-16-wrap">
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi"></div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/indiana/1.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                               <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi"></div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/indiana/2.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                               <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi"></div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/indiana/3.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                               <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi"></div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/indiana/4.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi"></div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/indiana/5.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                            
                            
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi"></div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/indiana/6.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                        </div>
                    </div>
                    <div data-w-tab="Tab 11" class="w-tab-pane">
                        <div class="common-flex-16-wrap">
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Tokyo Fashion Week</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/tokyo/1.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Tranoi Tokyo</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/tokyo/2.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                            
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Yoyogi National Stadium</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/tokyo/3.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                            
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Tokyo Fashion Week</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/tokyo/4.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Sensoji Temple</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/tokyo/5.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                            
                             <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Tokyo Fashion Week</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/tokyo/6.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                        </div>
                    </div>
                    <div data-w-tab="Tab 12" class="w-tab-pane">
                        <div class="common-flex-16-wrap">
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Guangming Museum</div>
                                </div>
                            <img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/china/1.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                               <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Hi-Tech Fair</div>
                                </div>
                            <img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/china/2.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                               <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Hongquiao Park</div>
                                </div>
                            <img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/china/3.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                            
                            
                               <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Nantou Ancient Village</div>
                                </div>
                            <img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/china/4.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Maker Faire</div>
                                </div>
                                <img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/china/6.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                             <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Nantou</div>
                                </div>
                            <img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/china/5.png" alt="" class="cd-ty-el-img" />
                            </div>
  
                              
                        </div>
                    </div>
                    <div data-w-tab="Tab 13" class="w-tab-pane">
                        <div class="common-flex-16-wrap">
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">KASK University</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/belgium/1.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Brugge </div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/belgium/2.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                            
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Krook Library</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/belgium/3.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Ghent</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/belgium/4.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Brussels</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/belgium/5.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Atomium</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/belgium/6.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                        </div>
                    </div>
                    <div data-w-tab="Tab 14" class="w-tab-pane">
                        <div class="common-flex-16-wrap">
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Burj Khalifa</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/dubai/1.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">DTEC</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/dubai/2.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                            
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Intel Lab</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/dubai/3.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Les Roches Dubai</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/dubai/4.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">RIT Dubai</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/dubai/5.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">University of Birmingham</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/dubai/6.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                        </div>
                    </div>
                    <div data-w-tab="Tab 15" class="w-tab-pane">
                        <div class="common-flex-16-wrap">
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">University of Bath</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/uk/1.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">University of Bristol</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/uk/2.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                            
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Nottingham Trent University</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/uk/3.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">University of Oxford</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/uk/4.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">University of Reading</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/uk/5.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">BMW Mini Cooper Factory</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/uk/6.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                        </div>
                    </div>
                    <div data-w-tab="Tab 16" class="w-tab-pane">
                        <div class="common-flex-16-wrap">
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Babson Build</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/babson/1.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Certification Ceremony</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/babson/2.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                            
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Master Class</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/babson/3.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Babson Build</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/babson/4.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Babson Student Alumini</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/babson/5.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi">Global Immersion at Babson</div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/babson/6.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                        </div>
                    </div>
                    <div data-w-tab="Tab 18" class="w-tab-pane">
                        <div class="common-flex-16-wrap">
                            <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi"></div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/nasa/1.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi"></div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/nasa/2.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                            
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi"></div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/nasa/3.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi"></div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/nasa/4.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi"></div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/nasa/5.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                              <div class="card-type-el-ugdx">
                                <div class="cd-ty-el-cont">
                                    <div class="cd-ty-el-text isdi"></div>
                                </div><img loading="lazy" src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/country/nasa/6.png" alt="" class="cd-ty-el-img" />
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    
    <<section class="section">
    <div class="container">
        <div class="reels-section">

            <h2 class="h2-tag mrg16">Global Immersions: Experiences Across Continents</h2>

            <div class="swiper reels-swiper">
                <div class="swiper-wrapper reels-grid">

                    <div class="swiper-slide reel-card">
                        <video loop playsinline muted preload="metadata"
                            poster="https://atlasuniversity.edu.in/assets/images/advantages/poster-img/11.png">
                            <source src="https://atlasuniversity.edu.in/assets/images/advantages/reels/1.mp4" type="video/mp4">
                        </video>
                        <button class="play-toggle-btn"><span class="pi-play">▶</span><span class="pi-pause">❚❚</span></button>
                    </div>

                    <div class="swiper-slide reel-card">
                        <video loop playsinline muted preload="metadata"
                            poster="https://atlasuniversity.edu.in/assets/images/advantages/poster-img/1.png">
                            <source src="https://atlasuniversity.edu.in/assets/images/advantages/reels/2.mp4" type="video/mp4">
                        </video>
                        <button class="play-toggle-btn"><span class="pi-play">▶</span><span class="pi-pause">❚❚</span></button>
                    </div>

                    <div class="swiper-slide reel-card">
                        <video loop playsinline muted preload="metadata"
                            poster="https://atlasuniversity.edu.in/assets/images/advantages/poster-img/7.png">
                            <source src="https://atlasuniversity.edu.in/assets/images/advantages/reels/3.mp4" type="video/mp4">
                        </video>
                        <button class="play-toggle-btn"><span class="pi-play">▶</span><span class="pi-pause">❚❚</span></button>
                    </div>

                    <div class="swiper-slide reel-card">
                        <video loop playsinline muted preload="metadata"
                            poster="https://atlasuniversity.edu.in/assets/images/advantages/poster-img/2.png">
                            <source src="https://atlasuniversity.edu.in/assets/images/advantages/reels/4.mp4" type="video/mp4">
                        </video>
                        <button class="play-toggle-btn"><span class="pi-play">▶</span><span class="pi-pause">❚❚</span></button>
                    </div>

                    <div class="swiper-slide reel-card">
                        <video loop playsinline muted preload="metadata"
                            poster="https://atlasuniversity.edu.in/assets/images/advantages/poster-img/12.png">
                            <source src="https://atlasuniversity.edu.in/assets/images/advantages/reels/5.mp4" type="video/mp4">
                        </video>
                        <button class="play-toggle-btn"><span class="pi-play">▶</span><span class="pi-pause">❚❚</span></button>
                    </div>

                    <div class="swiper-slide reel-card">
                        <video loop playsinline muted preload="metadata"
                            poster="https://atlasuniversity.edu.in/assets/images/advantages/poster-img/3.png">
                            <source src="https://atlasuniversity.edu.in/assets/images/advantages/reels/6.mp4" type="video/mp4">
                        </video>
                        <button class="play-toggle-btn"><span class="pi-play">▶</span><span class="pi-pause">❚❚</span></button>
                    </div>

                    <div class="swiper-slide reel-card">
                        <video loop playsinline muted preload="metadata"
                            poster="https://atlasuniversity.edu.in/assets/images/advantages/poster-img/4.png">
                            <source src="https://atlasuniversity.edu.in/assets/images/advantages/reels/7.mp4" type="video/mp4">
                        </video>
                        <button class="play-toggle-btn"><span class="pi-play">▶</span><span class="pi-pause">❚❚</span></button>
                    </div>

                    <div class="swiper-slide reel-card">
                        <video loop playsinline muted preload="metadata"
                            poster="https://atlasuniversity.edu.in/assets/images/advantages/poster-img/5.png">
                            <source src="https://atlasuniversity.edu.in/assets/images/advantages/reels/8.mp4" type="video/mp4">
                        </video>
                        <button class="play-toggle-btn"><span class="pi-play">▶</span><span class="pi-pause">❚❚</span></button>
                    </div>

                    <div class="swiper-slide reel-card">
                        <video loop playsinline muted preload="metadata"
                            poster="https://atlasuniversity.edu.in/assets/images/advantages/poster-img/6.png">
                            <source src="https://atlasuniversity.edu.in/assets/images/advantages/reels/9.mp4" type="video/mp4">
                        </video>
                        <button class="play-toggle-btn"><span class="pi-play">▶</span><span class="pi-pause">❚❚</span></button>
                    </div>

                    <div class="swiper-slide reel-card">
                        <video loop playsinline muted preload="metadata"
                            poster="https://atlasuniversity.edu.in/assets/images/advantages/poster-img/10.png">
                            <source src="https://atlasuniversity.edu.in/assets/images/advantages/reels/10.mp4" type="video/mp4">
                        </video>
                        <button class="play-toggle-btn"><span class="pi-play">▶</span><span class="pi-pause">❚❚</span></button>
                    </div>

                    <div class="swiper-slide reel-card">
                        <video loop playsinline muted preload="metadata"
                            poster="https://atlasuniversity.edu.in/assets/images/advantages/poster-img/9.png">
                            <source src="https://atlasuniversity.edu.in/assets/images/advantages/reels/11.mp4" type="video/mp4">
                        </video>
                        <button class="play-toggle-btn"><span class="pi-play">▶</span><span class="pi-pause">❚❚</span></button>
                    </div>

                    <div class="swiper-slide reel-card">
                        <video loop playsinline muted preload="metadata"
                            poster="https://atlasuniversity.edu.in/assets/images/advantages/poster-img/8.png">
                            <source src="https://atlasuniversity.edu.in/assets/images/advantages/reels/12.mp4" type="video/mp4">
                        </video>
                        <button class="play-toggle-btn"><span class="pi-play">▶</span><span class="pi-pause">❚❚</span></button>
                    </div>

                </div>

                <!-- mobile arrows -->
                <div class="reels-prev"></div>
                <div class="reels-next"></div>
            </div>
        </div>
    </div>
</section>

     <section class="section">
        <div class="container">
            <div class="head-wrap top">
                <h2 class="h2-tag mrg16">Global Immersions at ATLAS</h2>
                <!--<a Data-id="" data-wf--button-regular--variant="atlas" href="<?php  echo $domain?>advantages/atlas-enterprenurship" class="button-regular w-variant-58b88113-0303-ab7d-83c4-2eb02ad8c0d4 w-inline-block">-->
                <!--    <div data-wf--button-space--variant="normal" class="extra-space">-->
                <!--        <div data-font-size="" class="button-text">Explore Entrepreneurship in ATLAS</div>-->
                <!--        <div class="code-button w-embed w-script">-->
                <!--            <script>-->
                <!--                document.addEventListener("DOMContentLoaded", function() {-->
                <!--                    document.querySelectorAll('.button-text').forEach(function(text) {-->
                <!--                        var fontsz = text.getAttribute('data-font-size');-->
                <!--                        text.style.fontSize = fontsz + 'px';-->
                <!--                    });-->
                <!--                });-->
                <!--            </script>-->
                <!--        </div>-->
                <!--    </div>-->
                <!--</a>-->
            </div>
            <div class="sub-heading mrgbtm">At ATLAS, global immersion is not an experience it is a perspective. Through curated international academic visits, industry interactions, and cultural explorations, students gain real-world global exposure that broadens their understanding of international practices, innovation ecosystems, and diverse ways of thinking.</div>
            <div class="center-image-full-wrap-atlas">
                <div style="padding-top:56.17021276595745%" class="w-embed-youtubevideo">
                    <iframe src="https://www.youtube.com/embed/RsQRHkCG9oI?si=A1FDN84QOlwgcUrx?rel=0&amp;controls=1&amp;autoplay=1&amp;mute=1&amp;start=0" frameBorder="0" style="position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:auto" allow="autoplay; encrypted-media" allowfullscreen="" title="MVP Showcase 2024"></iframe>
                    </div>
            </div>
            
              <!--<div class="rk-video-wrapper-unique" id="rkVideoWrapper">-->

              <!--  <video class="rk-video-element-unique" id="rkVideo" poster="poster.jpg">-->
              <!--    <source src="https://atlasuniversity.edu.in/assets/images/advantages/global-immersion/global-immersions-video.mp4" type="video/mp4">-->
              <!--    <source src="https://atlasuniversity.edu.in/assets/images/advantages/global-immersion/global-immersions-video.webm" type="video/webm">-->
              <!--  </video>-->
            
              <!--  <div class="rk-play-btn-unique" id="rkPlayBtn">▶</div>-->
            
              <!--</div>-->
        </div>
    </section>
    
    
    
    
    
    
    
    
    
    
    

<section class="py-20 bg-gray-100">



    
    
<div class="flex items-center h-auto pr-[40px]">
    <div class="bg-[#011136] flex-none flex justify-center items-center self-end  max-w-none   w-[68px] h-[74px] sm:w-[174px] sm:h-[122px] relative">
<img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/687637b0b7c300bc9ab1f45d_notification.png" class="w-[40px] static sm:w-auto sm:absolute align-baseline  top-[28px] left-[55px] right-0 " />



</div>

<div class="flex-1 flex justify-between items-center self-center max-w-full">
 <h2 class="text-[#072058]  text-[22px] ml-[18px] sm:ml-[48px] sm:text-[44px] font-medium leading-[1.2]">
 Student Testimonials 

</h2>
</div>


</div>

<div class="text-white bg-[#011136] pb-[56px]">
 <div class="max-w-[1536px] z-[1] flex-none max-w-[1366px] mx-auto  relative overflow-x-auto scrollbar-none px-[22px] sm:px-[62px]">

<div class="flex-1 min-w-0 max-w-full pt-[40px] sm:pt-[56px] pb-[20px] text-[18px] sm:text-[24px] ">
    
Through strategic global associations spanning continents, our students gain invaluable exposure via
international immersions, student exchanges, and masterclasses. This global learning experience at ATLAS equips students with the insights and confidence to make informed decisions, inspiring them to pursue master's programs at top-ranked universities and institutions worldwide.
</div>


<div class="swiper myGuideSlider3">
<div class="swiper-wrapper items-stretch">


<script>
document.addEventListener("click", function (e) {

  const btn = e.target.closest(".toggleBtn");
  if (!btn) return;

  const card = btn.closest(".swiper-slide");
  const video = card.querySelector(".videoEl");

  // If this video is already playing → pause + reset (poster comes back)
  if (!video.paused) {
    video.pause();
    video.currentTime = 0;
    video.load();              // brings poster back
    showPlay(card);
    return;
  }

  // Stop + reset ALL other videos (their posters come back)
  document.querySelectorAll(".videoEl").forEach((v) => {
    v.pause();
    v.currentTime = 0;
    v.load();                  // brings poster back
    v.muted = true;
  });
  document.querySelectorAll(".toggleBtn").forEach((b) => showPlay(b.closest(".swiper-slide")));

  // Play this one (muted first so browser allows it, then unmute)
  video.muted = true;
  video.play().then(() => {
    video.muted = false;
    showPause(card);
  }).catch((err) => {
    console.log("Play error:", err);
  });
});

// When a video ends, reset + bring poster back
document.querySelectorAll(".videoEl").forEach((v) => {
  v.addEventListener("ended", () => {
    v.currentTime = 0;
    v.load();
    showPlay(v.closest(".swiper-slide"));
  });
});

function showPlay(card) {
  if (!card) return;
  const btn = card.querySelector(".toggleBtn");
  btn.querySelector(".playIcon").style.display = "block";
  btn.querySelector(".pauseIcon").style.display = "none";
  btn.classList.remove("playing");
}

function showPause(card) {
  if (!card) return;
  const btn = card.querySelector(".toggleBtn");
  btn.querySelector(".playIcon").style.display = "none";
  btn.querySelector(".pauseIcon").style.display = "flex";
  btn.classList.add("playing");
}
</script>



    <div class="swiper-slide flex h-auto">
    
      <div class="overflow-hidden cursor-pointer h-[600px] sm:h-[450px] flex">
    
        <div class="relative w-full overflow-hidden custom-object-fit">
    
          <!-- Video -->
          <video
      class="videoEl absolute inset-0 w-full h-full object-cover"
      preload="none"
      playsinline
      poster="https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-immersions/testimonials/keyan-dantra/1.png"
    >
            <source src="https://atlasuniversity.edu.in//assets/images/advantages/partnership/global-immersions/testimonials/keyan-dantra/1.webm" type="video/webm">
            <source src="https://atlasuniversity.edu.in//assets/images/advantages/partnership/global-immersions/testimonials/keyan-dantra/1.mp4" type="video/mp4">
          </video>
    
          <!-- Play / Pause Button -->
          <div class="absolute inset-0 flex items-end justify-end z-20 toggleBtn cursor-pointer">
            <img 
              src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/master-progression/icon/play-button.svg"
              class="w-14 h-14 playIcon"
            />
            <div class="pauseIcon w-14 h-14 rounded-full bg-black/60 flex items-center justify-center text-white text-2xl" style="display:none;">❚❚</div>
          </div>
    
         
    
        </div>
    
      </div>
    
    </div>
    
    <div class="swiper-slide flex h-auto">
    
      <div class="overflow-hidden cursor-pointer h-[600px] sm:h-[450px] flex">
    
        <div class="relative w-full overflow-hidden custom-object-fit">
    
          <!-- Video -->
          <video
      class="videoEl absolute inset-0 w-full h-full object-cover"
      preload="none"
      playsinline
      poster="https://atlasuniversity.edu.in//assets/images/advantages/partnership/global-immersions/testimonials/aishwarya-alamelu/1.png"
    >
            <source src="https://atlasuniversity.edu.in//assets/images/advantages/partnership/global-immersions/testimonials/aishwarya-alamelu/1.webm" type="video/webm">
            <source src="https://atlasuniversity.edu.in//assets/images/advantages/partnership/global-immersions/testimonials/aishwarya-alamelu/1.mp4" type="video/mp4">
          </video>
    
           <!-- Play / Pause Button -->
          <div class="absolute inset-0 flex items-end justify-end z-20 toggleBtn cursor-pointer">
            <img 
              src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/master-progression/icon/play-button.svg"
              class="w-14 h-14 playIcon"
            />
            <div class="pauseIcon w-14 h-14 rounded-full bg-black/60 flex items-center justify-center text-white text-2xl" style="display:none;">❚❚</div>
          </div>
    
         
    
        </div>
    
      </div>
    
    </div>
    
    <div class="swiper-slide flex h-auto">
    
      <div class="overflow-hidden cursor-pointer h-[600px] sm:h-[450px] flex">
    
        <div class="relative w-full overflow-hidden custom-object-fit">
    
          <!-- Video -->
          <video
      class="videoEl absolute inset-0 w-full h-full object-cover"
      preload="none"
      playsinline
      poster="https://atlasuniversity.edu.in//assets/images/advantages/partnership/global-immersions/testimonials/mihika-firani/1.png"
    >
            <source src="https://atlasuniversity.edu.in//assets/images/advantages/partnership/global-immersions/testimonials/mihika-firani/1.webm" type="video/webm">
            <source src="https://atlasuniversity.edu.in//assets/images/advantages/partnership/global-immersions/testimonials/mihika-firani/1.mp4" type="video/mp4">
          </video>
    
          <!-- Play / Pause Button -->
          <div class="absolute inset-0 flex items-end justify-end z-20 toggleBtn cursor-pointer">
            <img 
              src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/master-progression/icon/play-button.svg"
              class="w-14 h-14 playIcon"
            />
            <div class="pauseIcon w-14 h-14 rounded-full bg-black/60 flex items-center justify-center text-white text-2xl" style="display:none;">❚❚</div>
          </div>
    
         
    
        </div>
    
      </div>
    
    </div>
    
    <div class="swiper-slide flex h-auto">
    
      <div class="overflow-hidden cursor-pointer h-[600px] sm:h-[450px] flex">
    
        <div class="relative w-full overflow-hidden custom-object-fit">
    
          <!-- Video -->
          <video
      class="videoEl absolute inset-0 w-full h-full object-cover"
      preload="none"
      playsinline
      poster="https://atlasuniversity.edu.in//assets/images/advantages/partnership/global-immersions/testimonials/rushil-jhaveri/1.png"
    >
            <source src="https://atlasuniversity.edu.in//assets/images/advantages/partnership/global-immersions/testimonials/rushil-jhaveri/1.webm" type="video/webm">
            <source src="https://atlasuniversity.edu.in//assets/images/advantages/partnership/global-immersions/testimonials/rushil-jhaveri/1.mp4" type="video/mp4">
          </video>
    
           <!-- Play / Pause Button -->
          <div class="absolute inset-0 flex items-end justify-end z-20 toggleBtn cursor-pointer">
            <img 
              src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/master-progression/icon/play-button.svg"
              class="w-14 h-14 playIcon"
            />
            <div class="pauseIcon w-14 h-14 rounded-full bg-black/60 flex items-center justify-center text-white text-2xl" style="display:none;">❚❚</div>
          </div>
    
         
    
        </div>
    
      </div>
    
    </div>
    
    <div class="swiper-slide flex h-auto">
    
      <div class="overflow-hidden cursor-pointer h-[600px] sm:h-[450px] flex">
    
        <div class="relative w-full overflow-hidden custom-object-fit">
    
          <!-- Video -->
          <video
      class="videoEl absolute inset-0 w-full h-full object-cover"
      preload="none"
      playsinline
      poster="https://atlasuniversity.edu.in//assets/images/advantages/partnership/global-immersions/testimonials/sumeiya-khan/1.png"
    >
            <source src="https://atlasuniversity.edu.in//assets/images/advantages/partnership/global-immersions/testimonials/sumeiya-khan/1.webm" type="video/webm">
            <source src="https://atlasuniversity.edu.in//assets/images/advantages/partnership/global-immersions/testimonials/sumeiya-khan/1.mp4" type="video/mp4">
          </video>
    
           <!-- Play / Pause Button -->
          <div class="absolute inset-0 flex items-end justify-end z-20 toggleBtn cursor-pointer">
            <img 
              src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/master-progression/icon/play-button.svg"
              class="w-14 h-14 playIcon"
            />
            <div class="pauseIcon w-14 h-14 rounded-full bg-black/60 flex items-center justify-center text-white text-2xl" style="display:none;">❚❚</div>
          </div>
    
         
    
        </div>
    
      </div>
    
    </div>

    <div class="swiper-slide flex h-auto">
    
      <div class="overflow-hidden cursor-pointer h-[600px] sm:h-[450px] flex">
    
        <div class="relative w-full overflow-hidden custom-object-fit">
    
          <!-- Video -->
          <video
      class="videoEl absolute inset-0 w-full h-full object-cover"
      preload="none"
      playsinline
      poster="https://atlasuniversity.edu.in//assets/images/advantages/partnership/global-immersions/testimonials/vanshika-modi/1.png"
    >
            <source src="https://atlasuniversity.edu.in//assets/images/advantages/partnership/global-immersions/testimonials/vanshika-modi/1.webm" type="video/webm">
            <source src="https://atlasuniversity.edu.in//assets/images/advantages/partnership/global-immersions/testimonials/vanshika-modi/1.mp4" type="video/mp4">
          </video>
    
           <!-- Play / Pause Button -->
          <div class="absolute inset-0 flex items-end justify-end z-20 toggleBtn cursor-pointer">
            <img 
              src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/master-progression/icon/play-button.svg"
              class="w-14 h-14 playIcon"
            />
            <div class="pauseIcon w-14 h-14 rounded-full bg-black/60 flex items-center justify-center text-white text-2xl" style="display:none;">❚❚</div>
          </div>
    
         
    
        </div>
    
      </div>
    
    </div>



</div>
<div class="swiper-button-next"></div>
  <div class="swiper-button-prev"></div>




</div>




</div>


</div>
</div>








</section>
    
    
    
    
    
    
    
    
    
    
<script>
const guideSlider3 = new Swiper(".myGuideSlider3", {
  slidesPerView: 1,
  spaceBetween: 20,

  loop: true,

  // 👉 navigation
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 5,
    },
  },
});
   
</script>
    
  
    
    
    
    
    
    
    
    
    
    
    
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

        <div id="npf-popup-overlay-campus">
            <div id="npf-popup-campus">
                <button id="npf-close-campus">âœ•</button>
                <div class="npf_wgts" data-w="dbf13399d4ea438d3bb2b147f5687059"></div>
            </div>
        </div>

        <script>
            document.addEventListener("DOMContentLoaded", function() {
                const triggers = document.querySelectorAll('[data-id="campus-visit"]');
                const overlay = document.getElementById("npf-popup-overlay-campus");
                const closeBtn = document.getElementById("npf-close-campus");

                triggers.forEach(trigger => {
                    trigger.addEventListener("click", function(e) {
                        e.preventDefault();
                        overlay.style.display = "flex";

                        if (!window.npfLoadedCampus) {
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
                    if (e.target === overlay) overlay.style.display = "none";
                });
            });
        </script>
    </div>
</div>

<script>
(function () {

  // PLAY / PAUSE toggle (click, plays WITH sound)
  document.querySelectorAll('.play-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.reel-card');
      const video = card.querySelector('video');

      if (video.paused) {

        // Stop + reset every other reel → brings their posters back
        document.querySelectorAll('.reel-card').forEach(c => {
          if (c !== card) {
            const v = c.querySelector('video');
            v.pause();
            v.currentTime = 0;
            v.load();                 // poster reappears
            c.classList.remove('playing');
          }
        });

        // Play this one WITH sound
        video.muted = false;
        video.play();
        card.classList.add('playing');

      } else {
        // Stop this one → reset so its poster comes back
        video.pause();
        video.currentTime = 0;
        video.load();                 // poster reappears
        card.classList.remove('playing');
      }
    });
  });

  // reset when a video ends
  document.querySelectorAll('.reel-card video').forEach(v => {
    v.addEventListener('ended', () => {
      v.currentTime = 0;
      v.load();
      v.closest('.reel-card').classList.remove('playing');
    });
  });

})();
</script>

<script>
(function () {
  let reelsSwiper = null;

  function setupReelsSwiper() {
    if (window.innerWidth <= 767) {
      if (!reelsSwiper) {
        reelsSwiper = new Swiper('.reels-swiper', {
          slidesPerView: 1.15,
          spaceBetween: 14,
          grabCursor: true,
          autoplay: false,   // no auto swipe
          navigation: {
            nextEl: '.reels-next',
            prevEl: '.reels-prev'
          }
        });
      }
    } else {
      if (reelsSwiper) {
        reelsSwiper.destroy(true, true);
        reelsSwiper = null;
      }
    }
  }

  setupReelsSwiper();
  window.addEventListener('resize', setupReelsSwiper);
})();
</script>

<script>

const video = document.getElementById("rkVideo");
const playBtn = document.getElementById("rkPlayBtn");
const wrapper = document.getElementById("rkVideoWrapper");

// PLAY BUTTON CLICK
playBtn.addEventListener("click", () => {
  video.play();
});

// VIDEO CLICK (TOGGLE)
video.addEventListener("click", () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});

// SHOW/HIDE BUTTON
video.addEventListener("play", () => {
  wrapper.classList.add("playing");
});

video.addEventListener("pause", () => {
  wrapper.classList.remove("playing");
});

video.addEventListener("ended", () => {
  wrapper.classList.remove("playing");
});

</script>





<?php include "../../assets/include/footer.php" ?>