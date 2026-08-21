<?php
$title = "Integrated Program Admissions in Mumbai  – ATLAS SkillTech University";
$description = "Apply for integrated UG+PG programs, dual degrees and combined pathways that fast-track academic progression and professional readiness.";
$keywords = "atlas, contact";
$css = "atlass-fantastic-site-48323a.webflow.6915ca0b61d85144edd1d44e-e809c9c17.css";
$js = "https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/js/webflow.e81273eb.323dc8c2715cb7fa.js";
$htmlDataId = "6915ca0b61d85144edd1d44e";
$body = "body atlas-page";


include "../assets/include/header.php" ?>

<?php


$conn = new mysqli("localhost","diceapp_dice","upetch@2017","diceapp_dice");

// STATIC ID — you set manually
//$master_id = 2;   // change to 1, 2, 3 etc. whenever needed



// -------------------------------------------------------
// FUNCTION: GET CYCLES USING STATIC ID
// -------------------------------------------------------
function getAdmissionCycles($conn, $master_id) {

    $sql = "
    SELECT
        isdi_admsn_cycle.cycle_name,
        isdi_admsn_cycle_list.cycle_app_open,
        isdi_admsn_cycle_list.cycle_last_day_exam,
        isdi_admsn_cycle_list.cycle_interview_date,
        isdi_admsn_cycle_list.cycle_result,
        isdi_admsn_cycle_list.cycle_acceptance_deadline,
        isdi_admsn_cycle_list.cycle_sem_fee
    FROM
        isdi_admsn_cycle_list
    JOIN isdi_admsn_cycle_master 
        ON isdi_admsn_cycle_master.isdi_admsn_cycle_master_id = isdi_admsn_cycle_list.cycle_master_pk
    JOIN isdi_admsn_cycle 
        ON isdi_admsn_cycle.cycle_id = cycle_pk
    WHERE
        isdi_admsn_cycle_list.cycle_active = 1
        AND isdi_admsn_cycle_master.isdi_admsn_cycle_master_id = $master_id
    ORDER BY isdi_admsn_cycle.cycle_id ASC
    ";

    $result = $conn->query($sql);

    if (!$result) {
        die("SQL ERROR: " . $conn->error);
    }

    $cycles = [];
    while ($row = $result->fetch_assoc()) {
        $cycles[] = $row;
    }

    return $cycles;
}



// -------------------------------------------------------
// DATE FORMAT FUNCTION (WITH SUP + CLOSED RULE)
// -------------------------------------------------------
function showDate($date) {

    if ($date == "" || $date == NULL) {
        return "<b>Closed</b>";
    }

    $special_date = "2025-09-11";  

    $date_clean = date("Y-m-d", strtotime($date));
    $today      = date("Y-m-d");

    if ($date_clean < $today && $date_clean != $special_date) {
        return "<b>Closed</b>";
    }

    $timestamp = strtotime($date);
    $day = date("j", $timestamp);

    if (in_array($day, [1, 21, 31])) $suffix = "st";
    elseif (in_array($day, [2, 22])) $suffix = "nd";
    elseif (in_array($day, [3, 23])) $suffix = "rd";
    else $suffix = "th";

    $month = date("M", $timestamp);
    $year  = date("Y", $timestamp);

    return $day . "<sup>$suffix</sup> " . $month . " " . $year;
}

// LOAD DATA USING STATIC ID
$cycles = getAdmissionCycles($conn, 1);

$cyclesISME = getAdmissionCycles($conn, 2);
$cyclesISMEBSC = getAdmissionCycles($conn, 3);
$cyclesUGDX = getAdmissionCycles($conn, 4);
$cyclesLLB = getAdmissionCycles($conn, 5);
?>



<section class="main-cover-section-isme">
    <div class="hero-cont-wrapper-isme">
        <div class="hero-text">
            <div class="course-duration-isme atlas">Integrated Admissions</div>
            <h1 class="h1-tag">Your Future Starts Here</h1>
            <div class="course-desc-isme big-txt">Admissions Open for 2026. Explore programs in Design, Management, Entrepreneurship, Technology, and Law - and join us to be the pioneers of tomorrow.</div>
            <div class="buttons-wrapper"><a data-id="" data-wf--button-primary--variant="atlas" href="<?php echo $edudomain ?>applicationform" class="btn-primary w-variant-9df390f6-abdb-218d-e8a6-500b981692ba w-inline-block">
                    <div class="button-tx">Apply Now</div>
                </a><a id="campus-visit" data-wf--button-primary--variant="outline-white" href="<?php echo $domain ?>campusvisit" class="btn-primary w-variant-edbe4a85-a762-b5b5-c583-585856b72378 w-inline-block">
                    <div class="button-tx">Schedule a Visit</div>
                </a><a data-id="" data-wf--button-primary--variant="outline-white" href="https://online.fliphtml5.com/vrcjg/orkl/#p=1" target="_blank" class="btn-primary w-variant-edbe4a85-a762-b5b5-c583-585856b72378 w-inline-block">
                    <div class="button-tx">Download Admissions Policy</div>
                </a></div>
        </div>
    </div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6911b90ab5de01443ee852e5_atlas-ug.png" loading="lazy" sizes="(max-width: 1366px) 100vw, 1366px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6911b90ab5de01443ee852e5_atlas-ug-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6911b90ab5de01443ee852e5_atlas-ug-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6911b90ab5de01443ee852e5_atlas-ug-p-1080.png 1080w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6911b90ab5de01443ee852e5_atlas-ug.png 1366w" alt="" class="inner-cover-image" />
</section>
<div class="section">
    <div class="container">
        <h2 class="h2-tag mrg16">Find Your Path within ATLAS SkillTech University</h2>
        <div class="sub-heading">Technology and Law. Your path starts here.</div>
        <div class="atlas-cards-wrapper">
            <div class="atlas-cards-grid">
                <div class="atlas-square-card-a"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690eec3fb761691345886375_uGDXschool-cards-2.png" loading="lazy" sizes="(max-width: 620px) 100vw, 620px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690eec3fb761691345886375_uGDXschool-cards-2-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690eec3fb761691345886375_uGDXschool-cards-2.png 620w" alt="" class="atlas-sq-image-a" />
                    <div class="atlas-sq-content-a">
                        <div class="common-flex btm-justify">
                            <div class="atlas-sq-cont-wrp-a"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690eeb8ec0ac3679f8c186e6_uGDXlogos-school-cards.png" loading="lazy" alt="" class="atlas-sq-logo" />
                                <div class="atlas-sq-title-a">uGDX School of Technology</div>
                            </div>
                            <div class="atlas-sq-btn"><a Data-id="apply-now" data-wf--button-secondary--variant="atlas" href="<?php echo $edudomain ?>applicationform" class="secondary-btn w-variant-25d04a90-3822-0d33-318d-11d2b1182066">Apply Now</a></div>
                        </div>
                    </div>
                </div>
                <div class="atlas-square-card-a"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690eec42b76169134588637f_c3e3af4078104f48d0fd61e94fc28ec5_lawschool-cards-2.png" loading="lazy" sizes="(max-width: 620px) 100vw, 620px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690eec42b76169134588637f_c3e3af4078104f48d0fd61e94fc28ec5_lawschool-cards-2-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690eec42b76169134588637f_c3e3af4078104f48d0fd61e94fc28ec5_lawschool-cards-2.png 619w" alt="" class="atlas-sq-image-a" />
                    <div class="atlas-sq-content-a">
                        <div class="common-flex btm-justify">
                            <div class="atlas-sq-cont-wrp-a"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690eeb8bbbd212afa7f2e99e_lawlogos-school-cards.png" loading="lazy" alt="" class="atlas-sq-logo" />
                                <div class="atlas-sq-title-a">ATLAS School of Law</div>
                            </div>
                            <div class="atlas-sq-btn"><a Data-id="apply-now" data-wf--button-secondary--variant="atlas" href="<?php echo $edudomain ?>applicationform" class="secondary-btn w-variant-25d04a90-3822-0d33-318d-11d2b1182066">Apply Now</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<section class="section">
    <div class="container">
        <h2 class="h2-tag">Key Dates &amp; Deadlines</h2>
        <div data-current="Tab 5" data-easing="ease" data-duration-in="300" data-duration-out="100" class="rounded-tabs-mint w-tabs">
            <div class="tabs-menu-mint less-space w-tab-menu"><a data-w-tab="Tab 4" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link">
                    <div>uGDX School of Technology</div>
                </a><a data-w-tab="Tab 5" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link w--current">
                    <div>ATLAS School of Law</div>
                </a></div>
            <div class="tab-content-mint atlas w-tab-content">
                <div data-w-tab="Tab 4" class="w-tab-pane">
                    <div class="dates-fees-container-atlas">
                        <div class="df-container-atlas">
                             <?php

include $_SERVER['DOCUMENT_ROOT'] . "/assets/include/keydates/btech.php" 


?> 
                        </div>
                    </div>
                    <div class="buttons-wrapper"><a data-id="" data-wf--button-primary--variant="atlas" href="<?php echo $domain ?>schools/ugdx/admissions/ugdx-admissions" class="btn-primary w-variant-9df390f6-abdb-218d-e8a6-500b981692ba w-inline-block">
                            <div class="button-tx">Learn More About B.Tech + MBA Admissions</div>
                        </a></div>
                </div>
                <div data-w-tab="Tab 5" class="w-tab-pane w--tab-active">
                    
                    
                    
                    
                    
                    
                    
                     <div class="dates-fees-container-atlas">
                        <div class="df-container-atlas">
                               <style>

.table {
    max-width: 100%;
    /*margin-bottom: 1rem;*/
    color: #212529;
}

.header-table{
    width: 100%;
    color: #fff;
    background-color: #d20158;
    font-size: 24px;
    padding: 20px 14px;
}

.table-responsive {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

.table-responsive > .table-bordered {
    border: 2px solid rgba(0,0,0,0.15);;
}

.table-bordered td, .table-bordered th {
    border: 1px solid #dee2e6;
}

.table td, .table th {
    padding: .75rem;
    vertical-align: middle;
    border-top: 1px solid #dee2e6;
      white-space: nowrap; /* Prevents text from wrapping */
  overflow: hidden; /* Hides overflowing text */
  text-overflow: ellipsis; /* Adds an ellipsis for hidden text */
    
}

.br{
    display:none;
}

@media (max-width: 1100px) {
    .br{
    display:block;
}
.header-table{
   
    font-size: 16px;
   
}
    .table-responsive {
        position: relative;
        overflow-x: auto;
    }
    
    .table {
        min-width: 900px;
        width: auto;
    }
    
    .table td, .table th {
        white-space: normal;
        min-width: 150px;
      
    }
    
    
  
    .table tr:nth-child(2) td:first-child,
    .table tr:nth-child(3) td:first-child {
        background-color: white;
        font-weight: bold;
    }

    .table{
         border-collapse: separate !important;
         border-spacing: 0 !important;
    }
}

</style>
                   <div  class="table-responsive">                 

<?php

include $_SERVER['DOCUMENT_ROOT'] . "/assets/include/keydates/keydates-static/law.php" 


?> 
                          </div>     
                           
                        </div>
                        
                        
                    </div>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                   
                    <div class="buttons-wrapper"><a data-id="" data-wf--button-primary--variant="atlas" href="<?php echo $domain ?>schools/law/law-admissions" class="btn-primary w-variant-9df390f6-abdb-218d-e8a6-500b981692ba w-inline-block">
                            <div class="button-tx">Learn More About BBA LL.B Admissions.</div>
                        </a></div>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="section">
    <div class="container">
        <div class="head-wrap top">
            <div class="tt-wrap">
                <h2 class="h2-tag mrg16">What Makes You Stand Out</h2>
                <h2 class="sub-heading">At ATLAS, we seek curiosity, initiative, and the drive to make an impact - qualities that define every successful learner and leader.</h2>
            </div>
        </div>
        <div class="swiper common-swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="core-atlas-card">
                        <div class="core-content">
                            <div class="core-card-title-atlas">Statement of Purpose (SOP)</div>
                            <div class="core-card-subs">A clear expression of your goals, values, and why you want to be part of ATLAS.</div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="core-atlas-card">
                        <div class="core-content">
                            <div class="core-card-title-atlas">Academic Excellence</div>
                            <div class="core-card-subs">Strong academic foundation that reflects consistency, curiosity, and a drive to learn.</div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="core-atlas-card">
                        <div class="core-content">
                            <div class="core-card-title-atlas">Entrance Test &amp; Interview Performance</div>
                            <div class="core-card-subs">Confidence, clarity, and original thinking during assessments and discussions.</div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="core-atlas-card">
                        <div class="core-content">
                            <div class="core-card-title-atlas">Co-curricular &amp; Extra-curricular Activities</div>
                            <div class="core-card-subs">Highlight your participation, leadership, &amp; creative pursuits beyond academics.</div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="core-atlas-card">
                        <div class="core-content">
                            <div class="core-card-title-atlas">Problem-solving &amp; Critical Thinking</div>
                            <div class="core-card-subs">Show how you approach challenges with logic, insight, and innovation.</div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="core-atlas-card">
                        <div class="core-content">
                            <div class="core-card-title-atlas">Community &amp; Volunteer Work</div>
                            <div class="core-card-subs">Reflect your empathy, humility, and contribution to society through meaningful action.</div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="core-atlas-card">
                        <div class="core-content">
                            <div class="core-card-title-atlas">Motivations &amp; Achievements</div>
                            <div class="core-card-subs">Illustrate your personal milestones and what fuels your ambition.</div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="core-atlas-card">
                        <div class="core-content">
                            <div class="core-card-title-atlas">Transformative Experiences</div>
                            <div class="core-card-subs">Share defining moments that shaped your perspective and personal growth.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="section">
    <div class="w-layout-blockcontainer container w-container">
        <div class="head-wrap top">
            <h2 class="h2-tag mrg16">Empowering Ambition <br />Through Scholarships</h2><a data-id="" data-wf--button-primary--variant="atlas" href="<?php echo $domain ?>scholarships-and-financial-aid" class="btn-primary w-variant-9df390f6-abdb-218d-e8a6-500b981692ba w-inline-block">
                <div class="button-tx">Know More</div>
            </a>
        </div>
        <div class="about-story-wrapper-ugdx">
            <div class="abt-cont-ugdx-1">
                <div class="abt-text">The ATLAS Scholarship is an initiative to empower students from across India and beyond, helping them realize their vision and aspirations.<br /><br />It lays the foundation to fuel the evolution of today’s youth into global leaders of the future who can overcome the complex challenges faced by the world today.The program allows the ATLAS Scholars to thrive in the multidisciplinary, diverse and inclusive community of the ATLAS SkillTech University in the heart of India’s financial capital – Mumbai.</div>
            </div>
            <div class="about-image-wrap-ugdx"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6911c887fd95e48925519f3f_png.png" loading="lazy" sizes="100vw" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6911c887fd95e48925519f3f_png-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6911c887fd95e48925519f3f_png.png 594w" alt="" class="about-image-atlas" /></div>
        </div>
    </div>
</section>
<section class="section">
    <div class="container">
        <h2 class="h2-tag mrg16 isdi">In their own words: Why ATLAS feels right</h2>
        <div class="sub-heading mrgbtm32">Don’t take our word for it - hear what our Parents, Students,Industry &amp; Global Partners have to say about their ATLAS journey, experience, and transformation.</div>
        <div data-current="Tab 1" data-easing="ease" data-duration-in="300" data-duration-out="100" class="rounded-tabs-mint w-tabs">
            <div class="tabs-menu-mint less-space w-tab-menu"><a data-w-tab="Tab 1" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link w--current">
                    <div>Parents</div>
                </a><a data-w-tab="Tab 2" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link">
                    <div>Students</div>
                </a><a data-w-tab="Tab 4" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link">
                    <div>Industry</div>
                </a><a data-w-tab="Tab 5" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link">
                    <div>Global</div>
                </a></div>
            <div class="tab-content-mint atlas w-tab-content">
                <div data-w-tab="Tab 1" class="tab-pane-tab-1 w-tab-pane w--tab-active">
                    <div class="swiper common-swiper-full mrgtp0">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas">
                                    <div data-poster-url="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F690063a714618790701260fd_e8c5830b-db22-49cc-a402-79079c650303-poster-00001.jpg" data-video-urls="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F690063a714618790701260fd_e8c5830b-db22-49cc-a402-79079c650303-transcode.mp4,https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F690063a714618790701260fd_e8c5830b-db22-49cc-a402-79079c650303-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" class="testimonial-video w-background-video w-background-video-atom"><video id="de6409d9-0ce5-8576-5b6b-deb76bc14414-video" autoplay="" loop="" style="background-image:url(&quot;https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F690063a714618790701260fd_e8c5830b-db22-49cc-a402-79079c650303-poster-00001.jpg&quot;)" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F690063a714618790701260fd_e8c5830b-db22-49cc-a402-79079c650303-transcode.mp4" data-wf-ignore="true" />
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F690063a714618790701260fd_e8c5830b-db22-49cc-a402-79079c650303-transcode.webm" data-wf-ignore="true" />
                                        </video></div>
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">I loved seeing the work of students, it was very professional and well curated. Heavily impressed with the work they have done</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685d2a64617cf3953f662b96_quote-icon.svg" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi"></div>
                                            <div class="st-course st-name isdi">Parent <br />Goa</div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas">
                                    <div data-poster-url="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-poster-00001.jpg" data-video-urls="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-transcode.mp4,https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" class="testimonial-video w-background-video w-background-video-atom"><video id="de6409d9-0ce5-8576-5b6b-deb76bc14423-video" autoplay="" loop="" style="background-image:url(&quot;https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-poster-00001.jpg&quot;)" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-transcode.mp4" data-wf-ignore="true" />
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-transcode.webm" data-wf-ignore="true" />
                                        </video><a data-video="https://www.youtube.com/watch?v=9RQBN7kYPaY&amp;list=PLlLPSlAVUtBpTSKKrBkFsR0QQ2YnmdgqL&amp;index=1" href="#" class="play-icon w-inline-block"></a></div>
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">I am very impressed to see the creativity and work that has been put up. The complete experience here has been amazing</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685d2a64617cf3953f662b96_quote-icon.svg" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi">Amit and Ankita Jeriwala</div>
                                            <div class="st-course st-name isdi">Parent</div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas">
                                    <div data-poster-url="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-poster-00001.jpg" data-video-urls="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-transcode.mp4,https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" class="testimonial-video w-background-video w-background-video-atom"><video id="de6409d9-0ce5-8576-5b6b-deb76bc14432-video" autoplay="" loop="" style="background-image:url(&quot;https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-poster-00001.jpg&quot;)" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-transcode.mp4" data-wf-ignore="true" />
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-transcode.webm" data-wf-ignore="true" />
                                        </video><a data-video="https://www.youtube.com/watch?v=9RQBN7kYPaY&amp;list=PLlLPSlAVUtBpTSKKrBkFsR0QQ2YnmdgqL&amp;index=1" href="#" class="play-icon w-inline-block"></a></div>
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">It was very insightful to watch and I am very happy with the out of the box approach</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685d2a64617cf3953f662b96_quote-icon.svg" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi">Nevil Karvalo</div>
                                            <div class="st-course st-name isdi">Parent</div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-w-tab="Tab 2" class="tab-pane-tab-2 w-tab-pane">
                    <div class="swiper common-swiper-full mrgtp0">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690e15fa98d046e7d997a63d_anshmaheshwari.png" alt="" class="student-image" />
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">ATLAS Career Team did a great job with their Career Connect event. Well managed, had great talks.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c9968e368468bbc8fe8ff_quote-atlas.png" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi"></div>
                                            <div class="st-course st-name atlas">Ansh Maheshwari<br /><strong>Batch of 2025</strong></div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690e16fcfff3296f1030940e_kritijamugdha.png" alt="" class="student-image" />
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">ATLAS helped me grow exponentially, and pushed me to my limits to understand what I wanted to do professionally.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c9968e368468bbc8fe8ff_quote-atlas.png" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi"></div>
                                            <div class="st-course st-name atlas">Kritija Mugdha<br /><strong class="st-at-pos">Batch of 2026</strong></div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690e1780d67d74d13ec7f175_sidharthfernandez.png" alt="" class="student-image" />
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">ATLAS Career&#x27;s team helped me get a PPO. They also believed in me and got me introduced to various industry professionals.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685d2a64617cf3953f662b96_quote-icon.svg" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi"></div>
                                            <div class="st-course st-name atlas">Siddharth Fernandez<br /><strong class="st-at-pos">Batch of 2025</strong></div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690e10cb7cce6553926feb83_Thotangare%20Aavishi.png" alt="" class="student-image" />
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">This course was a memorable experience that combined education, imagination, and cross-cultural discovery.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c9968e368468bbc8fe8ff_quote-atlas.png" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi"></div>
                                            <div class="st-course st-name atlas"><strong>Thotangare Aavishi</strong></div>
                                            <div class="st-at-pos">2nd Year, BBA<br />Seoul National University</div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690e10d9d2a6c4ce2f6cf067_Ananya%20Bhattacharya.png" alt="" class="student-image" />
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">Overall, it was a transformative, once-in-a-lifetime experience that built my confidence, creativity, and independence.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c9968e368468bbc8fe8ff_quote-atlas.png" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi"></div>
                                            <div class="st-course st-name atlas"><strong>Ananya Bhattacharya</strong></div>
                                            <div class="st-at-pos">2nd Year, B.Des<br />NTU Summer School</div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690e10dbfc374f1d2c24b054_Milan%20Sharma.png" alt="" class="student-image" />
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">It was a transformative blend of learning and cultural discovery. It deepened my creative and strategic skills, while living in Seoul broadened my mind.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c9968e368468bbc8fe8ff_quote-atlas.png" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi"></div>
                                            <div class="st-course st-name atlas"><strong>Milan Sharma</strong></div>
                                            <div class="st-at-pos">2nd Year, BBA<br />Yonsei Summer School</div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690e10e4f926dc39d3482f73_tomsin-biju.png" alt="" class="student-image" />
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">From clay modeling to Photoshop rendering, each session deepened my understanding of car design.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c9968e368468bbc8fe8ff_quote-atlas.png" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi"></div>
                                            <div class="st-course st-name atlas"><strong>Tomsin Biju</strong></div>
                                            <div class="st-at-pos">2nd Year, B.Des<br />IED Summer School</div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690e10e92f3a1aa107658c31_Arushi%20Dekate.png" alt="" class="student-image" />
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">My UAL PR &amp; Advertising summer course transformed my communication skills, research, client relations, &amp; global collaboration.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c9968e368468bbc8fe8ff_quote-atlas.png" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi"></div>
                                            <div class="st-course st-name atlas"><strong>Arushi Dekate</strong></div>
                                            <div class="st-at-pos">2nd Year, SDM<br />UAL Summer School</div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690e10ed2f3a1aa107658d8f_Ayaan%20Shetty.png" alt="" class="student-image" />
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">It was a transformative journey that built my confidence, and creativity, offering unforgettable experiences, lessons, and lasting growth.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c9968e368468bbc8fe8ff_quote-atlas.png" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi"></div>
                                            <div class="st-course st-name atlas"><strong>Ayaan Shetty</strong></div>
                                            <div class="st-at-pos">2nd Year, BBA<br />LSE Summer School</div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690e1104224d6fc356ab83d9_Aashita%20A.png" alt="" class="student-image" />
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">It gave me a broader understanding of a how Consumer’s take decisions and how companies can connect with them meaningfully.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c9968e368468bbc8fe8ff_quote-atlas.png" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi"></div>
                                            <div class="st-course st-name atlas"><strong>Aashita A</strong></div>
                                            <div class="st-at-pos">2nd Year, BBA<br />LSE Summer School</div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-w-tab="Tab 4" class="w-tab-pane">
                    <div class="swiper common-swiper-full mrgtp0">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c866c6045b135a133bfa5_atlas-industry-centric-test.png" alt="" class="student-image" />
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">I was genuinely impressed by the students’ finesse, strategic thinking, and thorough understanding of user experience and design processes.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685d2a64617cf3953f662b96_quote-icon.svg" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi"></div>
                                            <div class="st-course st-name isdi">Biju Damodharan<br /><strong>Amazon</strong></div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690cdfa398a91fa02396e8fc_Navneet%20Munot.jpg" alt="" class="student-image" />
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">Visiting ATLAS SkillTech University was truly inspiring. The energy and creativity of the students were incredible.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685d2a64617cf3953f662b96_quote-icon.svg" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi"></div>
                                            <div class="st-course st-name isdi">Navneet Munot<br /><strong>HDFC Mutual Fund</strong></div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690cdfab98a91fa02396edf2_ESHA%20DATTA.jpg" alt="" class="student-image" />
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">ATLAS is truly an institution with a futuristic approach. Led by Indu mam, I can very confidently say the students are definitely the future leaders of the nation.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685d2a64617cf3953f662b96_quote-icon.svg" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi"></div>
                                            <div class="st-course st-name isdi">Esha Datta<br /><strong>WPP</strong></div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690cdfb5407975e9d404d023_Shefali%20Khalsa.jpg" alt="" class="student-image" />
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">ATLAS SkillTech University is an exemplary institution that excels in fostering leadership qualities in its students.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685d2a64617cf3953f662b96_quote-icon.svg" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi"></div>
                                            <div class="st-course st-name isdi">Shefali Khalsa<br /><strong>IndusInd Bank</strong></div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-w-tab="Tab 5" class="w-tab-pane">
                    <div class="swiper common-swiper-full mrgtp0">
                        <div class="swiper-wrapper">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <div class="testimonial-card bgc1 atlas"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690dd20f1defa6e87b295785_Florent%20-%20tt.png" alt="" class="student-image" />
                                        <div class="student-text">
                                            <div class="st-quote">
                                                <div class="st-text">A rewarding experience—ISME students bring skill, drive, and fresh perspective.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c9968e368468bbc8fe8ff_quote-atlas.png" alt="" class="quote" />
                                            </div>
                                            <div class="st-details">
                                                <div class="stname isdi"></div>
                                                <div class="st-course st-name atlas"><strong>Florent</strong></div>
                                                <div class="st-at-pos">Dean<br />Sorbonne Business School</div>
                                            </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="testimonial-card bgc1 atlas"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690dd213f1079ed7eb972d69_Katherine%20Tanu%20-%20tt.png" alt="" class="student-image" />
                                        <div class="student-text">
                                            <div class="st-quote">
                                                <div class="st-text">ISME students bring sharp thinking and hands-on skill collaborating with them has added real momentum to our work.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c9968e368468bbc8fe8ff_quote-atlas.png" alt="" class="quote" />
                                            </div>
                                            <div class="st-details">
                                                <div class="stname isdi"></div>
                                                <div class="st-course st-name atlas"><strong>Katherine Tanu</strong></div>
                                                <div class="st-at-pos">HEC College</div>
                                            </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="testimonial-card bgc1 atlas"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690dd215f52cb25c2d66a682_Dr.%20Elena%20Dieckmann%20-%20tt.png" alt="" class="student-image" />
                                        <div class="student-text">
                                            <div class="st-quote">
                                                <div class="st-text">Learning from international faculty and pitching ideas in a global setting made me feel more confident, connected</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c9968e368468bbc8fe8ff_quote-atlas.png" alt="" class="quote" />
                                            </div>
                                            <div class="st-details">
                                                <div class="stname isdi"></div>
                                                <div class="st-course st-name atlas"><strong>Dr. Elena Dieckmann</strong></div>
                                                <div class="st-at-pos">Imperial College London</div>
                                            </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="testimonial-card bgc1 atlas"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690dd2187e3108c24e6798a5_Jennie%20Backstrom%20-%20tt.png" alt="" class="student-image" />
                                        <div class="student-text">
                                            <div class="st-quote">
                                                <div class="st-text">It’s been amazing working with ATLAS, few months I have been here. It’s been overwhelming and positive hospitality.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c9968e368468bbc8fe8ff_quote-atlas.png" alt="" class="quote" />
                                            </div>
                                            <div class="st-details">
                                                <div class="stname isdi"></div>
                                                <div class="st-course st-name atlas"><strong>Jennie Backstrom</strong></div>
                                                <div class="st-at-pos">Babson College, USA</div>
                                            </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="testimonial-card bgc1 atlas"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690dd21eee03bfbf2a8c4ec2_Sharon%20Bailey%20-%20tt.png" alt="" class="student-image" />
                                        <div class="student-text">
                                            <div class="st-quote">
                                                <div class="st-text">Thanks to Dr. Sahani for the warm welcome that we’ve recieved as we start our partnership with ATLAS SkillTech University.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c9968e368468bbc8fe8ff_quote-atlas.png" alt="" class="quote" />
                                            </div>
                                            <div class="st-details">
                                                <div class="stname isdi"></div>
                                                <div class="st-course st-name atlas">Sharon Bailey</div>
                                                <div class="st-at-pos">Leeds Arts University</div>
                                            </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="testimonial-card bgc1 atlas"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690dd22238290268ebf167a8_Marlon%20Meikle%20-%20tt.png" alt="" class="student-image" />
                                        <div class="student-text">
                                            <div class="st-quote">
                                                <div class="st-text">I have had the time of my life at ISDI, seeing the campus has really been inspiring. I love all of the views of the city.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c9968e368468bbc8fe8ff_quote-atlas.png" alt="" class="quote" />
                                            </div>
                                            <div class="st-details">
                                                <div class="stname isdi"></div>
                                                <div class="st-course st-name atlas">Marlon Meikle</div>
                                                <div class="st-at-pos">Parsons School of Design</div>
                                            </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="testimonial-card bgc1 atlas"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690dd224ee03bfbf2a8c53df_Maria%20Pineda%20-%20tt.png" alt="" class="student-image" />
                                        <div class="student-text">
                                            <div class="st-quote">
                                                <div class="st-text">We met many fantastic student, very engaged, and more than anything, they are open to opportunities.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c9968e368468bbc8fe8ff_quote-atlas.png" alt="" class="quote" />
                                            </div>
                                            <div class="st-details">
                                                <div class="stname isdi"></div>
                                                <div class="st-course st-name atlas">Maria Pineda</div>
                                                <div class="st-at-pos">University of Maryland</div>
                                            </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="testimonial-card bgc1 atlas"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690dd228ee03bfbf2a8c5710_Professor%20Simone%20Varotto%20-%20tt.png" alt="" class="student-image" />
                                        <div class="student-text">
                                            <div class="st-quote">
                                                <div class="st-text">Learning abroad changed the way I think. It wasn’t just a trip—it was clarity on where I want to go</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c9968e368468bbc8fe8ff_quote-atlas.png" alt="" class="quote" />
                                            </div>
                                            <div class="st-details">
                                                <div class="stname isdi"></div>
                                                <div class="st-course st-name atlas"><strong>Professor Simone Varotto</strong></div>
                                                <div class="st-at-pos">Henley Business School</div>
                                            </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="testimonial-card bgc1 atlas"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690dd22c38290268ebf16831_Dr.%20Sabah%20Boustila%20-%20tt.png" alt="" class="student-image" />
                                        <div class="student-text">
                                            <div class="st-quote">
                                                <div class="st-text">The energy at ATLAS ISME was refreshing the students asked sharp questions and approached real problems with genuine curiosity.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c9968e368468bbc8fe8ff_quote-atlas.png" alt="" class="quote" />
                                            </div>
                                            <div class="st-details">
                                                <div class="stname isdi"></div>
                                                <div class="st-course st-name atlas"><strong>Dr. Sabah Boustila</strong></div>
                                                <div class="st-at-pos">Manchester Metropolitan University</div>
                                            </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
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
<div class="section">
    <div data-faqbg-color="" class="info-banner-atlas no-radius">
        <div class="container blue-3">
            <h2 class="info-banner-title no-bar">Experience the ATLAS Campus in Person</h2>
            <div class="info-banner-sub-text">Explore our future-ready campus — from innovation labs and design studios to collaborative spaces and student hangouts. Visit us to see where creativity, technology, and community come together.</div>
            <div class="info-banner-btns"><a data-id="" data-wf--button-primary--variant="atlas" href="<?php echo $edudomain ?>applicationform" class="btn-primary w-variant-9df390f6-abdb-218d-e8a6-500b981692ba w-inline-block">
                    <div class="button-tx">Apply Now</div>
                </a><a id="campus-visit" data-wf--button-primary--variant="atlas" href="<?php echo $domain ?>campusvisit" class="btn-primary w-variant-9df390f6-abdb-218d-e8a6-500b981692ba w-inline-block">
                    <div class="button-tx">Schedule a Visit</div>
                </a></div>
        </div><img sizes="100vw" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690e0baaaac4c56e0a41fa2d_campus-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690e0baaaac4c56e0a41fa2d_campus.png 531w" alt="" loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690e0baaaac4c56e0a41fa2d_campus.png" class="faq-image-blue" />
    </div>
</div>











  <?php
$arrow = "law-down-arrow.svg";
include "../assets/include/faq/atlas/admissions/integrated-admissions.php" ?>






<?php include "../assets/include/footer.php" ?>