<?php
$title = "ATLAS Advantage: Industry-Led Learning  Ã¢â‚¬â€œ ATLAS SkillTech University";
$description = "Discover the ATLAS Advantage industry mentorship, experiential projects, global pathways and skills-focused curriculum that prepare you for future careers.";
$keywords = "atlas, contact";
$css = "atlass-fantastic-site-48323a.webflow.690c43333ef0c9612dced003-396789c14.css";
$js = "https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/js/webflow.1ba7f46b.af01a5ad99350cf0.js";
$htmlDataId = "690c43333ef0c9612dced003";
$body = "body atlas-page";

include "../../assets/include/header.php" ?>




<?php










$facultyData = [
  ["id"=>1,"name"=>"Ramesh Raskar","university"=>"MIT - Massachusetts Institute of Technology","school"=>"ISDI","image"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/the-world-comes-to-atlas/1.jpg","logo"=>"https://atlasuniversity.edu.in/assets/images/internationalisation-logo/massachusetts.png"],
  ["id"=>2,"name"=>"Rajesh Bhargave","university"=>"Imperial College","school"=>"ISME","image"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/the-world-comes-to-atlas/2.jpg","logo"=>"https://atlasuniversity.edu.in/atlas-global/wp-content/themes/astra/assets/images/master_progression/logo/imperial.png"],
  ["id"=>3,"name"=>"Jeoffrey Garrett","university"=>"The Wharton School","school"=>"ISME","image"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/the-world-comes-to-atlas/3.jpg","logo"=>"https://atlasuniversity.edu.in/assets/images/internationalisation-logo/wharton.png"],
  ["id"=>4,"name"=>"Vikram Bhaku","university"=>"University of Melbourne","school"=>"ISME","image"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/the-world-comes-to-atlas/4.jpg","logo"=>"https://atlasuniversity.edu.in/assets/images/internationalisation-logo/melbourne.png"],
  ["id"=>5,"name"=>"Rahat Munir","university"=>"Macquarie University","school"=>"ISME","image"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/the-world-comes-to-atlas/6.jpg","logo"=>"https://atlasuniversity.edu.in/assets/images/internationalisation-logo/macquarie-university.png"],
  ["id"=>6,"name"=>"Anindya Ghose","university"=>"New York University, Stern","school"=>"ISME","image"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/the-world-comes-to-atlas/7.jpg","logo"=>"https://atlasuniversity.edu.in/assets/images/internationalisation-logo/nyu-stern.png"],
  ["id"=>7,"name"=>"Martin Ihrieg","university"=>"New York University, SPS","school"=>"ISME","image"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/the-world-comes-to-atlas/8.jpg","logo"=>"https://atlasuniversity.edu.in/assets/images/internationalisation-logo/nyu.png"],
  ["id"=>8,"name"=>"Ian Nabney","university"=>"University of Bristol","school"=>"UGDX","image"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/the-world-comes-to-atlas/23.jpg","logo"=>"https://atlasuniversity.edu.in/assets/images/internationalisation-logo/bristol-university.png"],
  ["id"=>9,"name"=>"Maya Cara","university"=>"University College London","school"=>"ISME","image"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/the-world-comes-to-atlas/25.jpg","logo"=>"https://atlasuniversity.edu.in/assets/images/internationalisation-logo/ucl.png"],
  ["id"=>10,"name"=>"Stephen Brammer","university"=>"University of Bath","school"=>"ISME","image"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/the-world-comes-to-atlas/9.jpg","logo"=>"https://atlasuniversity.edu.in/assets/images/internationalisation-logo/university-of-bath.png"],

  ["id"=>11,"name"=>"Emily Huggard","university"=>"Parsons, The New School","school"=>"ISDI","image"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/the-world-comes-to-atlas/10.jpg","logo"=>"https://atlasuniversity.edu.in/assets/images/internationalisation-logo/parsons-new-school.png"],
  ["id"=>12,"name"=>"Dr. Carolina Ramirez-Figueroa","university"=>"Royal College of Art","school"=>"ISDI","image"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/the-world-comes-to-atlas/11.jpg","logo"=>"https://atlasuniversity.edu.in/assets/images/internationalisation-logo/royal.png"],
  ["id"=>13,"name"=>"Kate Scully","university"=>"University of the Arts London","school"=>"ISDI","image"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/the-world-comes-to-atlas/12.jpg","logo"=>"https://atlasuniversity.edu.in/assets/images/internationalisation-logo/arts-london.png"],
  ["id"=>14,"name"=>"Mark Lee","university"=>"University of Birmingham","school"=>"ISME","image"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/the-world-comes-to-atlas/13.jpg","logo"=>"https://atlasuniversity.edu.in/assets/images/internationalisation-logo/birmignham.png"],
  ["id"=>15,"name"=>"Chico Camargo","university"=>"University of Exeter","school"=>"ISME","image"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/the-world-comes-to-atlas/14.jpg","logo"=>"https://atlasuniversity.edu.in/assets/images/internationalisation-logo/exeter.png"],
  ["id"=>16,"name"=>"Viren Lall","university"=>"London Business School","school"=>"ISME","image"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/the-world-comes-to-atlas/15.jpg","logo"=>"https://atlasuniversity.edu.in/assets/images/internationalisation-logo/lbs.png"],

  ["id"=>17,"name"=>" Maken Payne","university"=>"Savannah College of Art and Design (SCAD)","school"=>"ISDI","image"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/the-world-comes-to-atlas/16.jpg","logo"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/logo/scad.png"],
  ["id"=>18,"name"=>"Steven Mcguire","university"=>"University of Sussex","school"=>"ISME","image"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/the-world-comes-to-atlas/17.jpg","logo"=>"https://atlasuniversity.edu.in/assets/images/internationalisation-logo/university-of-sussex.png"],
  ["id"=>19,"name"=>"Alexandra Bardez","university"=>"University of Glasgow","school"=>"ISME","image"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/the-world-comes-to-atlas/18.jpg","logo"=>"https://atlasuniversity.edu.in/assets/images/internationalisation-logo/glasgow.png"],
  ["id"=>20,"name"=>"Eloise Salter","university"=>"Nottingham Trent University","school"=>"ISDI","image"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/the-world-comes-to-atlas/19.jpg","logo"=>"https://atlasuniversity.edu.in/assets/images/internationalisation-logo/nottingham-university.png"],
  ["id"=>21,"name"=>"Simone Varotto","university"=>"University of Reading","school"=>"ISME","image"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/the-world-comes-to-atlas/20.jpg","logo"=>"https://atlasuniversity.edu.in/assets/images/internationalisation-logo/reading.png"],
  ["id"=>22,"name"=>"Bob Townsley","university"=>"University of York","school"=>"ISME","image"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/the-world-comes-to-atlas/21.jpg","logo"=>"https://atlasuniversity.edu.in/assets/images/internationalisation-logo/york.png"],
  ["id"=>23,"name"=>"Heidi Neck","university"=>"Babson College","school"=>"ISME","image"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/the-world-comes-to-atlas/22.jpg","logo"=>"https://atlasuniversity.edu.in/assets/images/internationalisation-logo/babson.png"],
  ["id"=>24,"name"=>"Lorenzo Morganti","university"=>"Politecnico di Milano, Italy","school"=>"ISDI","image"=>"https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/the-world-comes-to-atlas/24.jpg","logo"=>"https://atlasuniversity.edu.in/assets/images/internationalisation-logo/politechnico.png"],
  
];


























?>



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

/*slider container css */

      .rk_students_scroll_section{
    width:100%;
    overflow:hidden;
}

/* ROW */

.rk_scroll_row{
    overflow:hidden;
    width:100%;
    margin-bottom:35px;
}

/* TRACK */

.rk_scroll_track{
    display:flex;
    gap:30px;
    width:max-content;
}

/* LEFT ANIMATION */

.rk_scroll_left .rk_scroll_track{
    animation:rk_move_left 40s linear infinite;
}

/* RIGHT ANIMATION */

.rk_scroll_right .rk_scroll_track{
    animation:rk_move_right 40s linear infinite;
}

/* CARD */

.rk_student_card{
    width:240px;
    background:#ffffff;
    border-radius:18px;
    border:1px solid #e3e3e3;
    text-align:center;
    padding:28px 20px;
    flex-shrink:0;
    transition:0.3s;
}

/* IMAGE */

.rk_student_image{
    width:85px;
    height:85px;
    border-radius:50%;
    object-fit:cover;
    margin-bottom:18px;
}

/* NAME */

.rk_student_name{
    font-size:17px;
    font-weight:600;
    color:#333;
    margin-bottom:6px;
}

/* ROLE */

.rk_student_role{
    font-size:14px;
    color:#777;
}

/* LOGO AREA */

.rk_student_logo{
    margin-top:22px;
    padding-top:14px;
    border-top:1px solid #eeeeee;
}

.rk_student_logo img{
    height:32px;
}


/* Desktop + mobile: show full video/poster, no crop */
.myGuideSlider3 .swiper-slide > div {
  height: auto !important;          /* card fits the video instead of fixed height */
}
.myGuideSlider3 .videoEl {
  position: relative !important;    /* unstick from absolute fill */
  inset: auto !important;
  width: 100% !important;
  height: auto !important;          /* full height, no crop */
  object-fit: contain !important;
  background: #000;
  display: block;
}

/* ANIMATIONS */

@keyframes rk_move_left{
    0%{transform:translateX(0);}
    100%{transform:translateX(-50%);}
}

@keyframes rk_move_right{
    0%{transform:translateX(-50%);}
    100%{transform:translateX(0);}
}

/* RESPONSIVE */


    @media screen and (max-width: 767px) {
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
        
        .myGuideSlider3 .swiper-slide > div { height: auto !important; }
          .myGuideSlider3 .videoEl {
            position: relative !important;
            inset: auto !important;
            width: 100% !important;
            height: auto !important;
            object-fit: contain !important;
            background: #000;
            display: block;
          }
    }

</style>
<section class="main-cover-section-isme">
    <div class="hero-cont-wrapper-isme">
        <div class="hero-text">
            <h1 class="h1-tag">International Faculty </h1>
            <div class="course-desc-isme big-txt">
            Bringing World Class Expertise to Your Classroom
                
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
    <img src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/herobanner/1366.png" loading="lazy" sizes="(max-width: 1366px) 100vw, 1366px" 
    srcset="
    https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/herobanner/500.png 500w, 
    https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/herobanner/800.png 800w, 
    https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/herobanner/1080.png 1080w, 
    https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/herobanner/1366.png 1366w" alt="" 
    class="header-image-inner" />
</section>
<div class="top-cards-wrapper padbtm0">
	<div class="head-top-card atlas-bg-1">
		<div class="sm-text-isme atlas-blue">200+ </div>
		<div class="large-text text-center"> International Faculty Hosted </div>
	</div>
	<div class="head-top-card atlas-bg-3">
		<div class="sm-text-isme atlas-blue">120+</div>
		<div class="large-text text-center"> Global Universities Represented</div>
	</div>
		<div class="head-top-card atlas-bg-2">
		<div class="sm-text-isme atlas-blue">600+</div>
		<div class="large-text text-center"> Global Learning Sessions</div>
	</div>
	<div class="head-top-card atlas-bg-3">
		<div class="sm-text-isme atlas-blue">5,000+</div>
		<div class="large-text text-center">Students Engaged</div>
	</div>
	
</div>
<div class="main-wrapper">
    
    
    
    
      <section class="section">
        <div class="container">
    
           
            <div class="about-story-wrapper-ugdx">
                <div class="abt-cont-ugdx-1">
                    <h2 class="h2-tag mrg42">About International Faculty
</h2>
                    <div class="abt-text">
            
            
            
          At ATLAS, excellence knows no boundaries. International Faculty at ATLAS comprises distinguished scholars and practitioners hailing from diverse corners of the world, each bringing a wealth of expertise and cultural perspectives to our academic community. With a rich tapestry of backgrounds and specializations, our international faculty members are not only educators but also mentors, guiding students towards becoming forward-thinking innovators and global trailblazers.
                       
                       
                       
   <br /><br />
   
Through our immersive educational environment, students have the unique opportunity to engage with global thought leaders, gaining invaluable insights and experiences that transcend traditional classroom boundaries. As ambassadors of global knowledge and collaboration, our international faculty inspire a culture of curiosity, inclusivity, and collaboration, empowering students to thrive in todayâ€™s interconnected world.
.

   
                   
                        </div>
                        
                        
                        
                    <div class="common-wrapper">
                        <div class="btn-wraper hide"><a data-id="" data-wf--button-primary--variant="atlas" href="#" class="btn-primary w-variant-9df390f6-abdb-218d-e8a6-500b981692ba w-inline-block">
                                <div class="button-tx">Explore Center of Research</div>
                            </a></div>
                    </div>
                </div>
                <div>
                    
                    
                    <img src="https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/section-1/688.png" 
                    loading="lazy" sizes="(max-width: 688px) 100vw, 688px" 
                    srcset="https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/section-1/500.png 500w, 
                    https://atlasuniversity.edu.in/assets/images/advantages/partnership/international-faculty/section-1/688.png 688w" alt="" class="about-image-atlas" /></div>
            </div>
            
            
            
            
        </div>
    </section>
    
    
    





<section class="py-20 bg-gray-100">


<div class="max-w-7xl mx-auto px-6">

<h2 class="mb-[16px] text-[#1a1a1a] mt-0  text-[44px] font-medium leading-[1.2] relative">
    The World Comes to ATLAS
</h2>


<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
<?php foreach($facultyData as $f): ?>
  <div class="text-center relative rounded-lg overflow-hidden">
    <img src="<?= $f['image'] ?>" class="w-full lg:h-[320px] object-cover">

    <!-- gradient for text readability -->
   <div class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/100 to-transparent pointer-events-none"></div>

    <!-- name on left, logo on right -->
    <div class="absolute bottom-0 left-0 w-full flex items-end justify-between p-4">
      <div class="text-left">
        <h3 class="font-semibold text-white text-[14px] lg:text-[16px] leading-tight"><?= $f['name'] ?></h3>
        <!--<p class="text-gray-200 text-[12px] lg:text-[14px] leading-tight"><?= $f['university'] ?></p>-->
      </div>
      <?php if(!empty($f['logo'])): ?>
        <img src="<?= $f['logo'] ?>" alt="" class="bg-white h-8 lg:h-12 w-auto object-contain p-[3px]">
      <?php endif; ?>
    </div>
  </div>
<?php endforeach; ?>
</div>


</div>

</section>


















<section class="py-20 bg-white">


<div class="max-w-7xl mx-auto px-6">

<h2 class="mb-[16px] text-[#1a1a1a] mt-0  text-[44px] font-medium leading-[1.2] relative">
International Faculty Week 

</h2>
<p class="mb-[42px] pb-0 pr-[50px] text-[24px] font-light leading-[1.4]">
 ATLAS SkillTech University hosts the International Faculty Week, bringing academic leaders from top International Universities
 to our Mumbai campus. This event showcased our commitment to global learning and cross-cultural exchange, with faculty delivering
 over 350 hours of teaching. Nearly 300 ATLAS students benefited from masterclasses, lectures, and workshops providing insights into
 cutting-edge subjects.


</p>
  <div class="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-[40px] overflow-hidden shadow-xl">
    
    <iframe 
      class="w-full h-full"
      src="https://www.youtube.com/embed/RhF0AWFc1e0?autoplay=1&mute=1&controls=1&rel=0"
      title="YouTube video"
      frameborder="0"
      allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen>
    </iframe>

  </div>



</div>

</section>











    
    
    
    
    
    
    
    

    
    
          <section class="section">
      <section class="w-full px-4 md:px-8 py-10 bg-[#f5f5f5]">

  <div class="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-8 items-center">

    <!-- LEFT IMAGE -->
    <div class="relative rounded-[30px] overflow-hidden">
      
      <img 
        src="https://atlasuniversity.edu.in/atlas-global/wp-content/themes/astra/assets/images/faculty/news.png" 
        class="w-full h-full object-cover"
      >

      <!-- Date badge -->
      <div class="absolute top-4 left-4 bg-[#1e3a8a] text-white text-sm px-3 py-1 rounded-md">
        19 Jan 2023
      </div>

    </div>

    <!-- RIGHT CONTENT -->
    <div>

      <p class="text-gray-500 mb-2">19.01.2023</p>

      <h2 class="text-2xl md:text-4xl font-bold leading-tight mb-6">
        ATLAS SkillTech University Brings Leading International Faculty To Mumbai Campus
      </h2>

    <a href="https://atlasuniversity.edu.in/news/atlas-international-faculty-week-gets-featured-in-mint/"
   class="inline-flex items-center justify-center h-[56px] px-6 rounded-[36px] bg-[#02b3c3] text-black no-underline">
  <div class="text-[18px] font-medium leading-none">
    Read More
  </div>
</a>

    </div>

  </div>

</section>
    </section>
    
    
    
    
    
    
    
    
    
    
    
    
    <section class="py-20 bg-gray-100">



    
    
<div class="flex items-center h-auto pr-[40px]">
    <div class="bg-[#011136] flex-none flex justify-center items-center self-end  max-w-none   w-[68px] h-[74px] sm:w-[174px] sm:h-[122px] relative">
<img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/687637b0b7c300bc9ab1f45d_notification.png" class="w-[40px] static sm:w-auto sm:absolute align-baseline  top-[28px] left-[55px] right-0 " />



</div>

<div class="flex-1 flex justify-between items-center self-center max-w-full">
 <h2 class="text-[#072058]  text-[22px] ml-[18px] sm:ml-[48px] sm:text-[44px] font-medium leading-[1.2]">
 Faculty Testimonials 

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
  // Find the card that was clicked (works even if click lands on video or button)
  const card = e.target.closest(".swiper-slide");
  if (!card) return;

  const video = card.querySelector(".videoEl");
  if (!video) return;

  // already playing → pause + reset so poster returns
  if (!video.paused) {
    video.pause();
    video.currentTime = 0;
    video.load();
    showPlay(card);
    return;
  }

  // pause + reset ALL videos → posters return
  document.querySelectorAll(".videoEl").forEach((v) => {
    v.pause();
    v.currentTime = 0;
    v.muted = true;
    v.load();
  });
  document.querySelectorAll(".swiper-slide").forEach((s) => showPlay(s));

  // play this one
  video.muted = true;
  const p = video.play();
  if (p !== undefined) {
    p.then(() => {
      video.muted = false;
      showPause(card);
    }).catch((err) => {
      console.log("Play error:", err);
      video.muted = true;
      video.play().then(() => showPause(card)).catch(e => console.log("Retry failed:", e));
    });
  }
});

// on end → reset + poster back
document.addEventListener("ended", function (e) {
  if (!e.target.classList || !e.target.classList.contains("videoEl")) return;
  e.target.currentTime = 0;
  e.target.load();
  showPlay(e.target.closest(".swiper-slide"));
}, true);

function showPlay(card) {
  if (!card) return;
  const btn = card.querySelector(".toggleBtn");
  if (!btn) return;
  const play = btn.querySelector(".playIcon");
  const pause = btn.querySelector(".pauseIcon");
  if (play) play.style.display = "block";
  if (pause) pause.style.display = "none";
  btn.classList.remove("playing");
}

function showPause(card) {
  if (!card) return;
  const btn = card.querySelector(".toggleBtn");
  if (!btn) return;
  const play = btn.querySelector(".playIcon");
  const pause = btn.querySelector(".pauseIcon");
  if (play) play.style.display = "none";
  if (pause) pause.style.display = "flex";
  btn.classList.add("playing");
}
</script>




<div class="swiper-slide flex h-auto">

  <div class="overflow-hidden cursor-pointer bg-[#193e90] h-[600px] sm:h-[400px] flex">

    <div class="relative w-full overflow-hidden">

      <!-- Video -->
      <video
  class="videoEl absolute inset-0 w-full h-full object-cover"
  preload="none"
  playsinline
  poster="https://atlasuniversity.edu.in//assets/images/advantages/partnership/global-immersions/testimonials/keyan-dantra/1.png"
>
        <source src="https://atlasuniversity.edu.in//assets/images/advantages/partnership/global-immersions/testimonials/keyan-dantra/1.webm" type="video/webm">
        <source src="https://atlasuniversity.edu.in//assets/images/advantages/partnership/global-immersions/testimonials/keyan-dantra/1.mp4" type="video/mp4">
      </video>

      <!-- Play / Pause Button -->
      <div class="absolute inset-0 flex items-end justify-end z-20 toggleBtn cursor-pointer p-3">
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

  <div class="overflow-hidden cursor-pointer bg-[#193e90] h-[600px] sm:h-[400px] flex">

    <div class="relative w-full overflow-hidden">

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
      <div class="absolute inset-0 flex items-end justify-end z-20 toggleBtn cursor-pointer p-3">
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

  <div class="overflow-hidden cursor-pointer bg-[#193e90] h-[600px] sm:h-[400px] flex">

    <div class="relative w-full overflow-hidden">

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
      <div class="absolute inset-0 flex items-end justify-end z-20 toggleBtn cursor-pointer p-3">
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

  <div class="overflow-hidden cursor-pointer bg-[#193e90] h-[600px] sm:h-[400px] flex">

    <div class="relative w-full overflow-hidden">

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
      <div class="absolute inset-0 flex items-end justify-end z-20 toggleBtn cursor-pointer p-3">
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

  <div class="overflow-hidden cursor-pointer bg-[#193e90] h-[600px] sm:h-[400px] flex">

    <div class="relative w-full overflow-hidden">

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
      <div class="absolute inset-0 flex items-end justify-end z-20 toggleBtn cursor-pointer p-3">
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

  <div class="overflow-hidden cursor-pointer bg-[#193e90] h-[600px] sm:h-[400px] flex">

    <div class="relative w-full overflow-hidden">

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
      <div class="absolute inset-0 flex items-end justify-end z-20 toggleBtn cursor-pointer p-3">
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









<section class="py-20 bg-white">


<div class="max-w-7xl mx-auto px-6">

<h2 class="mb-[16px] text-[#1a1a1a] mt-0  text-[44px] font-medium leading-[1.2] relative">
International Faculty Master Classes 

</h2>
<p class="mb-[42px] pb-0 pr-[50px] text-[24px] font-light leading-[1.4]">
 ATLAS SkillTech University hosts the International Faculty Week, bringing academic leaders from top International Universities
 to our Mumbai campus. This event showcased our commitment to global learning and cross-cultural exchange, with faculty delivering
 over 350 hours of teaching. Nearly 300 ATLAS students benefited from masterclasses, lectures, and workshops providing insights into
 cutting-edge subjects.


</p>
  <div class="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-[40px] overflow-hidden shadow-xl">
    
    <iframe 
      class="w-full h-full"
      src="https://www.youtube.com/embed/VDjQPSBlTgY?si=d3XCyUpSv0EEeH2Z?autoplay=1&mute=1&controls=1&rel=0"
      title="YouTube video"
      frameborder="0"
      allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen>
    </iframe>

  </div>



</div>

</section>
    
    

    
    
    
    
    
    
    
    
    
    
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
                <button id="npf-close-campus">Ã¢Å“â€¢</button>
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
            
            
            
            
            
            
            
            
            


            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            const guideSlider = new Swiper(".myGuideSlider", {
                  // ðŸ‘‰ navigation
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

slidesPerView: 1,
spaceBetween: 20,

breakpoints: {

640: {
slidesPerView: 1.2,
},

768: {
slidesPerView: 2,
},

1024: {
slidesPerView: 3,
}

}

});




const guideSlider2 = new Swiper(".myGuideSlider2", {
  slidesPerView: 1,
  spaceBetween: 20,

  // ðŸ‘‰ 2 rows grid
  grid: {
    rows: 2,
    fill: "row", // important (default column hota hai)
  },

  // ðŸ‘‰ autoplay
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  // ðŸ‘‰ infinite loop (important for autoplay smoothness)
  loop: false,

  // ðŸ‘‰ navigation
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    640: {
      slidesPerView: 2,
      grid: { rows: 2 },
    },
    768: {
      slidesPerView: 3,
      grid: { rows: 2 },
    },
    1024: {
      slidesPerView: 4,
      grid: { rows: 2 },
    },
  },
});


        const guideSlider3 = new Swiper(".myGuideSlider3", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: false,   // ← was true
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      breakpoints: {
        640:  { slidesPerView: 2 },
        768:  { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
      },
    });
    
    
            guideSlider3.on('slideChange', () => {
          document.querySelectorAll(".videoEl").forEach((v) => {
            v.pause();
            v.currentTime = 0;
            v.load();
          });
          document.querySelectorAll(".toggleBtn").forEach((b) => {
            const btn = b;
            btn.querySelector(".playIcon").style.display = "block";
            btn.querySelector(".pauseIcon").style.display = "none";
            btn.classList.remove("playing");
          });
        });




        </script>
    </div>
</div>







<?php include "../../assets/include/footer.php" ?>