<?php
$title = "Postgraduate Admissions & Programs in Mumbai – ATLAS ISME";
$description = "Find postgraduate admission details, course lists, eligibility, application process and career outcomes for masters and specialized programs.";
$keywords = "atlas, contact";
$css = "atlass-fantastic-site-48323a.webflow.690de083898469d22c882cab-0c046c29c.css";
$js = "https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/js/webflow.47e2f3e5.603494a8f4839ac2.js";
$htmlDataId = "690de083898469d22c882cab";
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
$cyclesISDIMDES = getAdmissionCycles($conn, 6);
$cyclesISDIMBA = getAdmissionCycles($conn, 7);
$cyclesISMEMBA = getAdmissionCycles($conn, 8);

?>


<section class="main-cover-section-isme">
    <div class="hero-cont-wrapper-isme">
        <div class="hero-text">
            <div class="course-duration-isme atlas">Postgraduate Admissions</div>
            <h1 class="h1-tag">Your Future Starts Here</h1>
            <div class="course-desc-isme big-txt">Admissions Open for 2026. Explore programs in Design and Management - and join us to be the pioneers of tomorrow.</div>
            <div class="buttons-wrapper"><a data-id="" data-wf--button-primary--variant="atlas" href="<?php echo $edudomain ?>applicationform" class="btn-primary w-variant-9df390f6-abdb-218d-e8a6-500b981692ba w-inline-block">
                    <div class="button-tx">Apply Now</div>
                </a>
                <a  data-wf--button-primary--variant="outline-white" href="<?php echo $domain ?>campusvisit" class="btn-primary w-variant-edbe4a85-a762-b5b5-c583-585856b72378 w-inline-block">
                    <div class="button-tx">Schedule a Visit</div>
                </a>
                <!--https://online.fliphtml5.com/vrcjg/orkl/#p=1-->
                <a data-id="" data-wf--button-primary--variant="outline-white" href="<?php echo $domain?>flipbook/pg-policy/" target="_blank" class="btn-primary w-variant-edbe4a85-a762-b5b5-c583-585856b72378 w-inline-block">
                    <div class="button-tx">Download Admissions Policy</div>
                </a>
                </div>
        </div>
    </div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6911b8e9754f049d95f30190_atlas-pg.png" loading="lazy" sizes="(max-width: 1366px) 100vw, 1366px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6911b8e9754f049d95f30190_atlas-pg-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6911b8e9754f049d95f30190_atlas-pg-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6911b8e9754f049d95f30190_atlas-pg-p-1080.png 1080w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6911b8e9754f049d95f30190_atlas-pg.png 1366w" alt="" class="inner-cover-image" />
</section>
<div class="section">
    <div class="container">
        <h2 class="h2-tag mrg16">Find Your Path within ATLAS SkillTech University</h2>
        <div class="sub-heading">Design and Management. Your path starts here.</div>
        <div class="atlas-cards-wrapper">
            <div class="atlas-cards-grid">
                <div class="atlas-square-card-a"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/691ee08e53f71cc8b355b704_isdi-thumbnail-main.png" loading="lazy" sizes="(max-width: 619px) 100vw, 619px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/691ee08e53f71cc8b355b704_isdi-thumbnail-main-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/691ee08e53f71cc8b355b704_isdi-thumbnail-main.png 619w" alt="" class="atlas-sq-image-a" />
                    <div class="atlas-sq-content-a">
                        <div class="common-flex btm-justify">
                            <div class="atlas-sq-cont-wrp-a"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690a519975b477a6db5b249d_atlas-logo-1.png" loading="lazy" alt="" class="atlas-sq-logo" />
                                <div class="atlas-sq-title-a">ISDI School of Design &amp; Innovation</div>
                            </div>
                            <div class="atlas-sq-btn"><a Data-id="apply-now" data-wf--button-secondary--variant="atlas" href="<?php echo $domain ?>schools/isdi" class="secondary-btn w-variant-25d04a90-3822-0d33-318d-11d2b1182066">Know More</a></div>
                        </div>
                    </div>
                </div>
                <div class="atlas-square-card-a"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690eeb74b76169134587fa34_ismeschool-cards.png" loading="lazy" sizes="(max-width: 619px) 100vw, 619px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690eeb74b76169134587fa34_ismeschool-cards-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690eeb74b76169134587fa34_ismeschool-cards.png 619w" alt="" class="atlas-sq-image-a" />
                    <div class="atlas-sq-content-a">
                        <div class="common-flex btm-justify">
                            <div class="atlas-sq-cont-wrp-a"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690eeb838546cb4c7a77c8db_isme-logologos-school-cards.png" loading="lazy" alt="" class="atlas-sq-logo" />
                                <div class="atlas-sq-title-a">ISME School of Management &amp; Entrepreneurship</div>
                            </div>
                            <div class="atlas-sq-btn"><a Data-id="apply-now" data-wf--button-secondary--variant="atlas" href="<?php echo $domain ?>schools/isme" class="secondary-btn w-variant-25d04a90-3822-0d33-318d-11d2b1182066">Know More</a></div>
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
        <div data-current="Tab 1" data-easing="ease" data-duration-in="300" data-duration-out="100" class="rounded-tabs-mint w-tabs">
            <div class="tabs-menu-mint less-space w-tab-menu"><a data-w-tab="Tab 1" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link w--current">
                    <div>ISDI School of Design &amp; Innovation</div>
                </a><a data-w-tab="Tab 2" class="tab-roundmint-tab-1 atlas w-inline-block w-tab-link">
                    <div>ISME School of Management &amp; Entrepreneurship</div>
                </a></div>
            <div class="tab-content-mint atlas w-tab-content">
                <div data-w-tab="Tab 1" class="tab-pane-tab-1 w-tab-pane w--tab-active">
                    <div class="dates-fees-container-atlas">
                       
                        
                        <?php

include $_SERVER['DOCUMENT_ROOT'] . "/assets/include/keydates/mdes.php" 


?> 
                    </div>
                    <div class="buttons-wrapper"><a data-id="" data-wf--button-primary--variant="atlas" href="<?php echo $domain ?>schools/isdi/admissions/postgraduate/m-des" class="btn-primary w-variant-9df390f6-abdb-218d-e8a6-500b981692ba w-inline-block">
                            <div class="button-tx">Learn More About M.Des Admissions</div>
                        </a></div>
                    <div class="dates-fees-container-atlas mrgtp">
                       
                         <?php

include $_SERVER['DOCUMENT_ROOT'] . "/assets/include/keydates/mba-dmst.php" 


?> 
                    </div>
                    <div class="buttons-wrapper"><a data-id="" data-wf--button-primary--variant="atlas" href="<?php echo $domain ?>schools/isdi/admissions/postgraduate/mba" class="btn-primary w-variant-9df390f6-abdb-218d-e8a6-500b981692ba w-inline-block">
                            <div class="button-tx">Learn More About MBA DMST Admissions</div>
                        </a></div>
                </div>
                <div data-w-tab="Tab 2" class="tab-pane-tab-2 w-tab-pane">
                    <div class="dates-fees-container-atlas">
                       
                        
                        
                         <?php

include $_SERVER['DOCUMENT_ROOT'] . "/assets/include/keydates/mba.php" 


?> 
                    </div>
                    <div class="buttons-wrapper"><a data-id="" data-wf--button-primary--variant="atlas" href="<?php echo $domain ?>schools/isme/admissions/postgraduate/admissions-mba-master-of-business-administration" class="btn-primary w-variant-9df390f6-abdb-218d-e8a6-500b981692ba w-inline-block">
                            <div class="button-tx">Learn More About MBA Admissions</div>
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
                <h2 class="sub-heading">At ATLAS, we look beyond marks and test scores. We seek curiosity, initiative, and the drive to make an impact - qualities that define every successful learner and leader.</h2>
            </div>
        </div>
        <div class="swiper common-swiper mrg-mob-tp-0">
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
            <h2 class="h2-tag mrg16">Empowering Ambition <br />Through Scholarships</h2>
            <div class="btn-normal-wrap"><a data-id="" data-wf--button-primary--variant="atlas" href="<?php echo $domain ?>scholarships-and-financial-aid" class="btn-primary w-variant-9df390f6-abdb-218d-e8a6-500b981692ba w-inline-block">
                    <div class="button-tx">Know More</div>
                </a></div>
        </div>
        <div class="about-story-wrapper-ugdx">
            <div class="abt-cont-ugdx-1">
                <div class="abt-text">The ATLAS Scholarship is an initiative to empower students from across India and beyond, helping them realize their vision and aspirations.<br /><br />It lays the foundation to fuel the evolution of today’s youth into global leaders of the future who can overcome the complex challenges faced by the world today.The program allows the ATLAS Scholars to thrive in the multidisciplinary, diverse and inclusive community of the ATLAS SkillTech University in the heart of India’s financial capital – Mumbai.</div>
            </div>
            <div class="about-image-wrap-ugdx"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690dcff64fee361d7dc88e9e_ug-add-abt-picture.png" loading="lazy" sizes="(max-width: 710px) 100vw, 710px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690dcff64fee361d7dc88e9e_ug-add-abt-picture-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690dcff64fee361d7dc88e9e_ug-add-abt-picture.png 710w" alt="" class="about-image-atlas" /></div>
        </div>
    </div>
</section>
<section class="section">
    <div class="container">
        <h2 class="h2-tag mrg16 isdi">In their own words: Why ATLAS feels right</h2>
        <div class="sub-heading mrgbtm32">Don’t take our word for it - hear what our Parents, Students, Industry &amp; Global Partners have to say about their ATLAS journey, experience, and transformation.</div>
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
                                    <div data-poster-url="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F690063a714618790701260fd_e8c5830b-db22-49cc-a402-79079c650303-poster-00001.jpg" data-video-urls="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F690063a714618790701260fd_e8c5830b-db22-49cc-a402-79079c650303-transcode.mp4,https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F690063a714618790701260fd_e8c5830b-db22-49cc-a402-79079c650303-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" class="testimonial-video w-background-video w-background-video-atom"><video id="bce6ab89-5851-5df1-8c61-210d4112975d-video" autoplay="" loop="" style="background-image:url(&quot;https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F690063a714618790701260fd_e8c5830b-db22-49cc-a402-79079c650303-poster-00001.jpg&quot;)" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
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
                                    <div data-poster-url="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F69006508b579125c7e8cbfca_IMG_5462%20%281%29-poster-00001.jpg" data-video-urls="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F69006508b579125c7e8cbfca_IMG_5462%20%281%29-transcode.mp4,https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F69006508b579125c7e8cbfca_IMG_5462%20%281%29-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" class="testimonial-video w-background-video w-background-video-atom"><video id="bce6ab89-5851-5df1-8c61-210d4112976c-video" autoplay="" loop="" style="background-image:url(&quot;https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F69006508b579125c7e8cbfca_IMG_5462%20%281%29-poster-00001.jpg&quot;)" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F69006508b579125c7e8cbfca_IMG_5462%20%281%29-transcode.mp4" data-wf-ignore="true" />
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F69006508b579125c7e8cbfca_IMG_5462%20%281%29-transcode.webm" data-wf-ignore="true" />
                                        </video></div>
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">The fact that he’s already working on real industry projects while still in college makes me feel like he’s headed in the right direction.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685d2a64617cf3953f662b96_quote-icon.svg" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi">Varsha Sharma</div>
                                            <div class="st-course st-name isdi">Student</div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c444bf8ce0bfb1726389e_vector-atlas-2.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas">
                                    <div data-poster-url="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-poster-00001.jpg" data-video-urls="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-transcode.mp4,https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" class="testimonial-video w-background-video w-background-video-atom"><video id="bce6ab89-5851-5df1-8c61-210d4112977a-video" autoplay="" loop="" style="background-image:url(&quot;https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-poster-00001.jpg&quot;)" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-transcode.mp4" data-wf-ignore="true" />
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-transcode.webm" data-wf-ignore="true" />
                                        </video></div>
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
                                    <div data-poster-url="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-poster-00001.jpg" data-video-urls="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-transcode.mp4,https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" class="testimonial-video w-background-video w-background-video-atom"><video id="bce6ab89-5851-5df1-8c61-210d4112978a-video" autoplay="" loop="" style="background-image:url(&quot;https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-poster-00001.jpg&quot;)" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-transcode.mp4" data-wf-ignore="true" />
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-transcode.webm" data-wf-ignore="true" />
                                        </video></div>
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
                                <div class="testimonial-card bgc1 atlas">
                                    <div data-poster-url="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F690063a714618790701260fd_e8c5830b-db22-49cc-a402-79079c650303-poster-00001.jpg" data-video-urls="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F690063a714618790701260fd_e8c5830b-db22-49cc-a402-79079c650303-transcode.mp4,https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F690063a714618790701260fd_e8c5830b-db22-49cc-a402-79079c650303-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" class="testimonial-video w-background-video w-background-video-atom"><video id="bce6ab89-5851-5df1-8c61-210d4112979d-video" autoplay="" loop="" style="background-image:url(&quot;https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F690063a714618790701260fd_e8c5830b-db22-49cc-a402-79079c650303-poster-00001.jpg&quot;)" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
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
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6900912fd4dcfce5d6ec4f44_0817395e9980fa4380e493448ccc3fe7_testimonial-vector.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas">
                                    <div data-poster-url="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F69006508b579125c7e8cbfca_IMG_5462%20%281%29-poster-00001.jpg" data-video-urls="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F69006508b579125c7e8cbfca_IMG_5462%20%281%29-transcode.mp4,https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F69006508b579125c7e8cbfca_IMG_5462%20%281%29-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" class="testimonial-video w-background-video w-background-video-atom"><video id="bce6ab89-5851-5df1-8c61-210d411297ac-video" autoplay="" loop="" style="background-image:url(&quot;https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F69006508b579125c7e8cbfca_IMG_5462%20%281%29-poster-00001.jpg&quot;)" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F69006508b579125c7e8cbfca_IMG_5462%20%281%29-transcode.mp4" data-wf-ignore="true" />
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F69006508b579125c7e8cbfca_IMG_5462%20%281%29-transcode.webm" data-wf-ignore="true" />
                                        </video></div>
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">The fact that he’s already working on real industry projects while still in college makes me feel like he’s headed in the right direction.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68d2829ec92ef46265414625_quote.svg" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi">Varsha Sharma</div>
                                            <div class="st-course st-name isdi">Student</div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6900912fd4dcfce5d6ec4f44_0817395e9980fa4380e493448ccc3fe7_testimonial-vector.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas">
                                    <div data-poster-url="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-poster-00001.jpg" data-video-urls="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-transcode.mp4,https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" class="testimonial-video w-background-video w-background-video-atom"><video id="bce6ab89-5851-5df1-8c61-210d411297ba-video" autoplay="" loop="" style="background-image:url(&quot;https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-poster-00001.jpg&quot;)" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-transcode.mp4" data-wf-ignore="true" />
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-transcode.webm" data-wf-ignore="true" />
                                        </video><a data-video="https://www.youtube.com/watch?v=9RQBN7kYPaY&amp;list=PLlLPSlAVUtBpTSKKrBkFsR0QQ2YnmdgqL&amp;index=1" href="#" class="play-icon w-inline-block"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68d285207dc192f172028ea3_play-button.svg" alt="" /></a></div>
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">I am very impressed to see the creativity and work that has been put up. The complete experience here has been amazing</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68d2829ec92ef46265414625_quote.svg" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi">Amit and Ankita Jeriwala</div>
                                            <div class="st-course st-name isdi">Parent</div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6900912fd4dcfce5d6ec4f44_0817395e9980fa4380e493448ccc3fe7_testimonial-vector.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 isdi">
                                    <div data-poster-url="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-poster-00001.jpg" data-video-urls="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-transcode.mp4,https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" class="testimonial-video w-background-video w-background-video-atom"><video id="bce6ab89-5851-5df1-8c61-210d411297ca-video" autoplay="" loop="" style="background-image:url(&quot;https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-poster-00001.jpg&quot;)" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-transcode.mp4" data-wf-ignore="true" />
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-transcode.webm" data-wf-ignore="true" />
                                        </video><a data-video="https://www.youtube.com/watch?v=9RQBN7kYPaY&amp;list=PLlLPSlAVUtBpTSKKrBkFsR0QQ2YnmdgqL&amp;index=1" href="#" class="play-icon w-inline-block"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68d285207dc192f172028ea3_play-button.svg" alt="" /></a></div>
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">It was very insightful to watch and I am very happy with the out of the box approach</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68d2829ec92ef46265414625_quote.svg" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi">Nevil Karvalo</div>
                                            <div class="st-course st-name isdi">Parent</div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6900912fd4dcfce5d6ec4f44_0817395e9980fa4380e493448ccc3fe7_testimonial-vector.png" alt="" class="bg-image" />
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
                                <div class="testimonial-card bgc1 atlas">
                                    <div data-poster-url="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F690063a714618790701260fd_e8c5830b-db22-49cc-a402-79079c650303-poster-00001.jpg" data-video-urls="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F690063a714618790701260fd_e8c5830b-db22-49cc-a402-79079c650303-transcode.mp4,https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F690063a714618790701260fd_e8c5830b-db22-49cc-a402-79079c650303-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" class="testimonial-video w-background-video w-background-video-atom"><video id="bce6ab89-5851-5df1-8c61-210d411297dd-video" autoplay="" loop="" style="background-image:url(&quot;https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F690063a714618790701260fd_e8c5830b-db22-49cc-a402-79079c650303-poster-00001.jpg&quot;)" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
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
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6900912fd4dcfce5d6ec4f44_0817395e9980fa4380e493448ccc3fe7_testimonial-vector.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas">
                                    <div data-poster-url="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F69006508b579125c7e8cbfca_IMG_5462%20%281%29-poster-00001.jpg" data-video-urls="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F69006508b579125c7e8cbfca_IMG_5462%20%281%29-transcode.mp4,https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F69006508b579125c7e8cbfca_IMG_5462%20%281%29-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" class="testimonial-video w-background-video w-background-video-atom"><video id="bce6ab89-5851-5df1-8c61-210d411297ec-video" autoplay="" loop="" style="background-image:url(&quot;https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F69006508b579125c7e8cbfca_IMG_5462%20%281%29-poster-00001.jpg&quot;)" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F69006508b579125c7e8cbfca_IMG_5462%20%281%29-transcode.mp4" data-wf-ignore="true" />
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F69006508b579125c7e8cbfca_IMG_5462%20%281%29-transcode.webm" data-wf-ignore="true" />
                                        </video></div>
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">The fact that he’s already working on real industry projects while still in college makes me feel like he’s headed in the right direction.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68d2829ec92ef46265414625_quote.svg" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi">Varsha Sharma</div>
                                            <div class="st-course st-name isdi">Student</div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6900912fd4dcfce5d6ec4f44_0817395e9980fa4380e493448ccc3fe7_testimonial-vector.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas">
                                    <div data-poster-url="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-poster-00001.jpg" data-video-urls="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-transcode.mp4,https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" class="testimonial-video w-background-video w-background-video-atom"><video id="bce6ab89-5851-5df1-8c61-210d411297fa-video" autoplay="" loop="" style="background-image:url(&quot;https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-poster-00001.jpg&quot;)" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-transcode.mp4" data-wf-ignore="true" />
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-transcode.webm" data-wf-ignore="true" />
                                        </video><a data-video="https://www.youtube.com/watch?v=9RQBN7kYPaY&amp;list=PLlLPSlAVUtBpTSKKrBkFsR0QQ2YnmdgqL&amp;index=1" href="#" class="play-icon w-inline-block"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68d285207dc192f172028ea3_play-button.svg" alt="" /></a></div>
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">I am very impressed to see the creativity and work that has been put up. The complete experience here has been amazing</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68d2829ec92ef46265414625_quote.svg" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi">Amit and Ankita Jeriwala</div>
                                            <div class="st-course st-name isdi">Parent</div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6900912fd4dcfce5d6ec4f44_0817395e9980fa4380e493448ccc3fe7_testimonial-vector.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 isdi">
                                    <div data-poster-url="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-poster-00001.jpg" data-video-urls="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-transcode.mp4,https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" class="testimonial-video w-background-video w-background-video-atom"><video id="bce6ab89-5851-5df1-8c61-210d4112980a-video" autoplay="" loop="" style="background-image:url(&quot;https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-poster-00001.jpg&quot;)" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-transcode.mp4" data-wf-ignore="true" />
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-transcode.webm" data-wf-ignore="true" />
                                        </video><a data-video="https://www.youtube.com/watch?v=9RQBN7kYPaY&amp;list=PLlLPSlAVUtBpTSKKrBkFsR0QQ2YnmdgqL&amp;index=1" href="#" class="play-icon w-inline-block"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68d285207dc192f172028ea3_play-button.svg" alt="" /></a></div>
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">It was very insightful to watch and I am very happy with the out of the box approach</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68d2829ec92ef46265414625_quote.svg" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi">Nevil Karvalo</div>
                                            <div class="st-course st-name isdi">Parent</div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6900912fd4dcfce5d6ec4f44_0817395e9980fa4380e493448ccc3fe7_testimonial-vector.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-w-tab="Tab 5" class="w-tab-pane">
                    <div class="swiper common-swiper-full mrgtp0">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas">
                                    <div data-poster-url="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F690063a714618790701260fd_e8c5830b-db22-49cc-a402-79079c650303-poster-00001.jpg" data-video-urls="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F690063a714618790701260fd_e8c5830b-db22-49cc-a402-79079c650303-transcode.mp4,https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F690063a714618790701260fd_e8c5830b-db22-49cc-a402-79079c650303-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" class="testimonial-video w-background-video w-background-video-atom"><video id="bce6ab89-5851-5df1-8c61-210d4112981d-video" autoplay="" loop="" style="background-image:url(&quot;https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F690063a714618790701260fd_e8c5830b-db22-49cc-a402-79079c650303-poster-00001.jpg&quot;)" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
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
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6900912fd4dcfce5d6ec4f44_0817395e9980fa4380e493448ccc3fe7_testimonial-vector.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas">
                                    <div data-poster-url="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F69006508b579125c7e8cbfca_IMG_5462%20%281%29-poster-00001.jpg" data-video-urls="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F69006508b579125c7e8cbfca_IMG_5462%20%281%29-transcode.mp4,https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F69006508b579125c7e8cbfca_IMG_5462%20%281%29-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" class="testimonial-video w-background-video w-background-video-atom"><video id="bce6ab89-5851-5df1-8c61-210d4112982c-video" autoplay="" loop="" style="background-image:url(&quot;https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F69006508b579125c7e8cbfca_IMG_5462%20%281%29-poster-00001.jpg&quot;)" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F69006508b579125c7e8cbfca_IMG_5462%20%281%29-transcode.mp4" data-wf-ignore="true" />
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F69006508b579125c7e8cbfca_IMG_5462%20%281%29-transcode.webm" data-wf-ignore="true" />
                                        </video></div>
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">The fact that he’s already working on real industry projects while still in college makes me feel like he’s headed in the right direction.</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68d2829ec92ef46265414625_quote.svg" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi">Varsha Sharma</div>
                                            <div class="st-course st-name isdi">Student</div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6900912fd4dcfce5d6ec4f44_0817395e9980fa4380e493448ccc3fe7_testimonial-vector.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 atlas">
                                    <div data-poster-url="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-poster-00001.jpg" data-video-urls="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-transcode.mp4,https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" class="testimonial-video w-background-video w-background-video-atom"><video id="bce6ab89-5851-5df1-8c61-210d4112983a-video" autoplay="" loop="" style="background-image:url(&quot;https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-poster-00001.jpg&quot;)" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-transcode.mp4" data-wf-ignore="true" />
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a73d02ee081790b5d66_parents-testimonial-2-transcode.webm" data-wf-ignore="true" />
                                        </video><a data-video="https://www.youtube.com/watch?v=9RQBN7kYPaY&amp;list=PLlLPSlAVUtBpTSKKrBkFsR0QQ2YnmdgqL&amp;index=1" href="#" class="play-icon w-inline-block"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68d285207dc192f172028ea3_play-button.svg" alt="" /></a></div>
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">I am very impressed to see the creativity and work that has been put up. The complete experience here has been amazing</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68d2829ec92ef46265414625_quote.svg" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi">Amit and Ankita Jeriwala</div>
                                            <div class="st-course st-name isdi">Parent</div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6900912fd4dcfce5d6ec4f44_0817395e9980fa4380e493448ccc3fe7_testimonial-vector.png" alt="" class="bg-image" />
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="testimonial-card bgc1 isdi">
                                    <div data-poster-url="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-poster-00001.jpg" data-video-urls="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-transcode.mp4,https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" class="testimonial-video w-background-video w-background-video-atom"><video id="bce6ab89-5851-5df1-8c61-210d4112984a-video" autoplay="" loop="" style="background-image:url(&quot;https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-poster-00001.jpg&quot;)" muted="" playsinline="" data-wf-ignore="true" data-object-fit="cover">
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-transcode.mp4" data-wf-ignore="true" />
                                            <source src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6%2F68e78a7bec775baea601ddf0_parents-testimonial-3-transcode.webm" data-wf-ignore="true" />
                                        </video><a data-video="https://www.youtube.com/watch?v=9RQBN7kYPaY&amp;list=PLlLPSlAVUtBpTSKKrBkFsR0QQ2YnmdgqL&amp;index=1" href="#" class="play-icon w-inline-block"><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68d285207dc192f172028ea3_play-button.svg" alt="" /></a></div>
                                    <div class="student-text">
                                        <div class="st-quote">
                                            <div class="st-text">It was very insightful to watch and I am very happy with the out of the box approach</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68d2829ec92ef46265414625_quote.svg" alt="" class="quote" />
                                        </div>
                                        <div class="st-details">
                                            <div class="stname isdi">Nevil Karvalo</div>
                                            <div class="st-course st-name isdi">Parent</div>
                                        </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6900912fd4dcfce5d6ec4f44_0817395e9980fa4380e493448ccc3fe7_testimonial-vector.png" alt="" class="bg-image" />
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
            <h2 class="info-banner-title no-bar">Experience the ATLAS <br />Campus in Person</h2>
            <div class="info-banner-sub-text">Explore our future-ready campus — from innovation labs and design studios to collaborative spaces and student hangouts. Visit us to see where creativity, technology, and community come together.</div>
            <div class="info-banner-btns"><a data-id="" data-wf--button-primary--variant="atlas" href="<?php echo $edudomain ?>applicationform" class="btn-primary w-variant-9df390f6-abdb-218d-e8a6-500b981692ba w-inline-block">
                    <div class="button-tx">Apply Now</div>
                </a><a  data-wf--button-primary--variant="atlas" href="<?php echo $domain ?>campusvisit" class="btn-primary w-variant-9df390f6-abdb-218d-e8a6-500b981692ba w-inline-block">
                    <div class="button-tx">Schedule a Visit</div>
                </a></div>
        </div><img sizes="100vw" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690ddff0dcb0aae95d8e3677_pr-banner-admission-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690ddff0dcb0aae95d8e3677_pr-banner-admission.png 590w" alt="" loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690ddff0dcb0aae95d8e3677_pr-banner-admission.png" class="faq-image-blue" />
    </div>
</div>







  <?php
$arrow = "law-down-arrow.svg";
include "../assets/include/faq/atlas/admissions/pg-admissions.php" ?>





<!--<section id="faq" class="section">-->
<!--    <div class="container">-->
<!--        <h2 class="h2-tag mrg16">Questions? We can read your mind</h2>-->
<!--        <div class="faq-button-wrap"><a Data-id="" data-wf--button-regular--variant="rect-blue-outline" href="#" class="button-regular w-variant-59ff7c65-9de5-3829-a99f-450f8d3392eb w-inline-block">-->
<!--                <div data-wf--button-space--variant="normal" class="extra-space">-->
<!--                    <div data-font-size="" class="button-text">All</div>-->
<!--                    <div class="code-button w-embed w-script">-->
<!--                        <script>-->
<!--                            document.addEventListener("DOMContentLoaded", function() {-->
<!--                                document.querySelectorAll('.button-text').forEach(function(text) {-->
<!--                                    var fontsz = text.getAttribute('data-font-size');-->
<!--                                    text.style.fontSize = fontsz + 'px';-->
<!--                                });-->
<!--                            });-->
<!--                        </script>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </a><a Data-id="" data-wf--button-regular--variant="rect-blue-outline" href="#" class="button-regular w-variant-59ff7c65-9de5-3829-a99f-450f8d3392eb w-inline-block">-->
<!--                <div data-wf--button-space--variant="normal" class="extra-space">-->
<!--                    <div data-font-size="" class="button-text">For Parents</div>-->
<!--                    <div class="code-button w-embed w-script">-->
<!--                        <script>-->
<!--                            document.addEventListener("DOMContentLoaded", function() {-->
<!--                                document.querySelectorAll('.button-text').forEach(function(text) {-->
<!--                                    var fontsz = text.getAttribute('data-font-size');-->
<!--                                    text.style.fontSize = fontsz + 'px';-->
<!--                                });-->
<!--                            });-->
<!--                        </script>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </a><a Data-id="" data-wf--button-regular--variant="rect-blue-outline" href="#" class="button-regular w-variant-59ff7c65-9de5-3829-a99f-450f8d3392eb w-inline-block">-->
<!--                <div data-wf--button-space--variant="normal" class="extra-space">-->
<!--                    <div data-font-size="" class="button-text">For Non-Mumbai Applicants</div>-->
<!--                    <div class="code-button w-embed w-script">-->
<!--                        <script>-->
<!--                            document.addEventListener("DOMContentLoaded", function() {-->
<!--                                document.querySelectorAll('.button-text').forEach(function(text) {-->
<!--                                    var fontsz = text.getAttribute('data-font-size');-->
<!--                                    text.style.fontSize = fontsz + 'px';-->
<!--                                });-->
<!--                            });-->
<!--                        </script>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </a></div>-->
<!--        <div class="w-dyn-list">-->
<!--            <div role="list" class="w-dyn-items">-->
<!--                <div data-filter-cat="Home Page" role="listitem" class="w-dyn-item">-->
<!--                    <div data-hover="false" data-delay="0" data-w-id="5da75251-baf4-0388-0026-478724323918" style="height:80px" class="accordion-item w-dropdown">-->
<!--                        <div class="accordion-toggle w-dropdown-toggle">-->
<!--                            <div class="accordion-icon blue w-icon-dropdown-toggle"></div>-->
<!--                            <div class="accordion-title">How is ATLAS ISME?</div>-->
<!--                        </div>-->
<!--                        <nav class="accordion-content w-dropdown-list">-->
<!--                            <div class="content w-richtext">-->
<!--                                <p>Atlas ISME is a reputed institution that is known for its distinct teaching methods. We are UGC recognised and offer the following specialised undergraduate programs:</p>-->
<!--                                <ul role="list">-->
<!--                                    <li>BBA Hons. (With Majors &amp; Minors) </li>-->
<!--                                    <li>BBA Hons. in Digital Branding &amp; Advertising</li>-->
<!--                                    <li>BBA Hons. in AI &amp; Emerging Technologies</li>-->
<!--                                    <li>B.Sc Hons. in Finance</li>-->
<!--                                </ul>-->
<!--                                <p>These are 4-year programs that are taught by experts and include global immersions and equip students with the skills required for the industry.</p>-->
<!--                                <p>ATLAS ISME also offers postgraduate MBA programs in various specialisations. The two-year MBA curriculum has been created to ensure a transformative leadership experience for students. It has been carefully curated to ensure integration of current industry best practices and future needs of Industry 4.0.</p>-->
<!--                                <p>Please note we do not offer any diploma courses or standalone certificate courses. </p>-->
<!--                                <p>ATLAS ISME’s program equips you to become a future-ready leader with:</p>-->
<!--                                <ul role="list">-->
<!--                                    <li>Multidisciplinary Education for a dynamic business world.</li>-->
<!--                                    <li>Entrepreneurial Skills to thrive in any industry.</li>-->
<!--                                    <li>International Exposure for a global perspective. </li>-->
<!--                                    <li>Industry-Focused Education through exclusive masterclasses and industry visits by top professionals.</li>-->
<!--                                    <li>Tech-Integrated Learning to prepare you for a digital-first business environment.</li>-->
<!--                                </ul>-->
<!--                                <p>ATLAS ISME is proud of its teaching methods. The methods extend beyond traditional learning. They include opportunities, such as</p>-->
<!--                                <ul role="list">-->
<!--                                    <li>Live projects</li>-->
<!--                                    <li>Global immersions</li>-->
<!--                                    <li>Industry mentorship</li>-->
<!--                                    <li>Atlas electives</li>-->
<!--                                    <li>Startup Building</li>-->
<!--                                    <li>MVP showcases etc. </li>-->
<!--                                </ul>-->
<!--                                <p>‍</p>-->
<!--                            </div>-->
<!--                        </nav>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div data-filter-cat="Home Page" role="listitem" class="w-dyn-item">-->
<!--                    <div data-hover="false" data-delay="0" data-w-id="5da75251-baf4-0388-0026-478724323918" style="height:80px" class="accordion-item w-dropdown">-->
<!--                        <div class="accordion-toggle w-dropdown-toggle">-->
<!--                            <div class="accordion-icon blue w-icon-dropdown-toggle"></div>-->
<!--                            <div class="accordion-title">Do ATLAS ISME offer bachelors or UG programs and what are the specialisations available?</div>-->
<!--                        </div>-->
<!--                        <nav class="accordion-content w-dropdown-list">-->
<!--                            <div class="content w-richtext">-->
<!--                                <p>Yes, ATLAS ISME offers the undergraduate programs i.e. BBA (Hons.) and B.Sc. (Hons.) in Finance. </p>-->
<!--                                <p>‍</p>-->
<!--                                <p>Specialisations such as Finance, Marketing, Digital Branding &amp; Advertising, and AI &amp; Emerging Technologies are full-time, 4-year undergraduate programs designed to build industry-ready, future-focused business leaders:</p>-->
<!--                                <p>1. BBA (Hons.) with Majors &amp; Minors</p>-->
<!--                                <p>A customisable program that lets students specialise in one area while exploring others.</p>-->
<!--                                <ul role="list">-->
<!--                                    <li>Majors:<br /> <br />-->
<!--                                        <ul role="list">-->
<!--                                            <li>Marketing</li>-->
<!--                                            <li>Finance<br /><br /></li>-->
<!--                                        </ul>-->
<!--                                    </li>-->
<!--                                    <li>Minors (choice-based):<br /> <br />-->
<!--                                        <ul role="list">-->
<!--                                            <li>Entrepreneurship</li>-->
<!--                                            <li>Business Analytics</li>-->
<!--                                            <li>Finance</li>-->
<!--                                            <li>Operations and Supply Chain Management</li>-->
<!--                                            <li>Marketing</li>-->
<!--                                            <li>Economics</li>-->
<!--                                            <li>Human Resource Management<br /><br /></li>-->
<!--                                        </ul>-->
<!--                                    </li>-->
<!--                                </ul>-->
<!--                                <p>2. BBA (Hons.) in Digital Branding &amp; Advertising</p>-->
<!--                                <p>Students learn branding strategy, digital media, content marketing etc. <br /><br /></p>-->
<!--                                <p>3. BBA (Hons.) in AI &amp; Emerging Technologies</p>-->
<!--                                <p>Students learn about Artificial Intelligence, automation, and emerging business technologies.<br /><br /></p>-->
<!--                                <p>4. B.Sc. (Hons.) in Finance</p>-->
<!--                                <p>Students learn about Financial analysis, investment strategies, markets, and portfolio management.</p>-->
<!--                            </div>-->
<!--                        </nav>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div data-filter-cat="Home Page" role="listitem" class="w-dyn-item">-->
<!--                    <div data-hover="false" data-delay="0" data-w-id="5da75251-baf4-0388-0026-478724323918" style="height:80px" class="accordion-item w-dropdown">-->
<!--                        <div class="accordion-toggle w-dropdown-toggle">-->
<!--                            <div class="accordion-icon blue w-icon-dropdown-toggle"></div>-->
<!--                            <div class="accordion-title">Are ATLAS ISME undergraduate programs UGC‑certified? </div>-->
<!--                        </div>-->
<!--                        <nav class="accordion-content w-dropdown-list">-->
<!--                            <div class="content w-richtext">-->
<!--                                <p>Yes, all the undergraduate programs at ATLAS ISME i.e. BBA (Hons) and <a href="http://b.sc">B.Sc</a> in Finance are UGC-recognised. ATLAS SkillTech University is recognised by the University Grants Commission (UGC). It was established by an Act of the Maharashtra State Legislature and is recognised under Section 2(f) of the UGC Act, 1956. Furthermore, it is also a member of the Association of Indian Universities (AIU).</p>-->
<!--                            </div>-->
<!--                        </nav>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div data-filter-cat="Home Page" role="listitem" class="w-dyn-item">-->
<!--                    <div data-hover="false" data-delay="0" data-w-id="5da75251-baf4-0388-0026-478724323918" style="height:80px" class="accordion-item w-dropdown">-->
<!--                        <div class="accordion-toggle w-dropdown-toggle">-->
<!--                            <div class="accordion-icon blue w-icon-dropdown-toggle"></div>-->
<!--                            <div class="accordion-title">What is the Multidisciplinary Approach at ATLAS ISME?</div>-->
<!--                        </div>-->
<!--                        <nav class="accordion-content w-dropdown-list">-->
<!--                            <div class="content w-richtext">-->
<!--                                <p>Design thinking, creativity and technological innovation is what fuels our Multidisciplinary Approach at ATLAS ISME.</p>-->
<!--                                <p>Rooted in interdisciplinary skill development, our business programs, bolstered by a tech-integrated campus, offer every learner the unique opportunity to pursue diverse interests. Steer your career in unconventional directions by exploring passions like fashion design, AI &amp; ML, VFX through carefully curated electives along with a business degree.</p>-->
<!--                                <p>Every ATLAS ISME School of Management &amp; Entrepreneurship student undergoes a prodigious journey that empowers them with technologically, entrepreneurially and creatively dense skills that hold the power to change the world. </p>-->
<!--                                <p>At ATLAS ISME, we always ensure flexibility. Our main focus is for students to explore diverse interests and broaden their horizons by taking carefully curated electives in areas like fashion design, AI &amp; machine learning, and VFX, even alongside a business degree. This flexibility is key to developing well-rounded, future-ready professionals.</p>-->
<!--                                <p>‍</p>-->
<!--                            </div>-->
<!--                        </nav>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div data-filter-cat="Home Page" role="listitem" class="w-dyn-item">-->
<!--                    <div data-hover="false" data-delay="0" data-w-id="5da75251-baf4-0388-0026-478724323918" style="height:80px" class="accordion-item w-dropdown">-->
<!--                        <div class="accordion-toggle w-dropdown-toggle">-->
<!--                            <div class="accordion-icon blue w-icon-dropdown-toggle"></div>-->
<!--                            <div class="accordion-title">Do ATLAS ISME really provide industry immersions?</div>-->
<!--                        </div>-->
<!--                        <nav class="accordion-content w-dropdown-list">-->
<!--                            <div class="content w-richtext">-->
<!--                                <p>ATLAS ISME School of Management &amp; Entrepreneurship works intricately with the dynamic business industry bustling right outside the campus gates to create unmatched opportunities like masterclasses, global and rural immersions, internships, industry mentorship and visiting faculty sessions that put our students on the global map.</p>-->
<!--                                <p>Apart from live projects, ATLAS ISME students also get multiple opportunities to work on real business case studies.</p>-->
<!--                                <p>Our boundary-pushing management courses boast an industry-recognised curriculum, backed by global standards of business practice, designed to help students develop critical Industry 4.0 skills and make an unforgettable mark on the international stage.</p>-->
<!--                                <p>‍</p>-->
<!--                            </div>-->
<!--                        </nav>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div data-filter-cat="Home Page" role="listitem" class="w-dyn-item">-->
<!--                    <div data-hover="false" data-delay="0" data-w-id="5da75251-baf4-0388-0026-478724323918" style="height:80px" class="accordion-item w-dropdown">-->
<!--                        <div class="accordion-toggle w-dropdown-toggle">-->
<!--                            <div class="accordion-icon blue w-icon-dropdown-toggle"></div>-->
<!--                            <div class="accordion-title">What are the top career opportunities after a BBA from ATLAS ISME?</div>-->
<!--                        </div>-->
<!--                        <nav class="accordion-content w-dropdown-list">-->
<!--                            <div class="content w-richtext">-->
<!--                                <p>A BBA(Hons.) program opens doors to many opportunities such as </p>-->
<!--                                <ul role="list">-->
<!--                                    <li>Marketing Executive/Manager</li>-->
<!--                                    <li>Startup Founder/Entrepreneur,</li>-->
<!--                                    <li>Financial Analyst</li>-->
<!--                                    <li>Business Analyst</li>-->
<!--                                    <li>Product Manager</li>-->
<!--                                    <li>Credit Analysts</li>-->
<!--                                    <li>Business Development Manager</li>-->
<!--                                    <li>Sales Executive/Manager etc. </li>-->
<!--                                    <li>Consultant, </li>-->
<!--                                    <li>Data Analyst</li>-->
<!--                                    <li>Event Manager</li>-->
<!--                                    <li>Healthcare Manager</li>-->
<!--                                    <li>Management Trainee</li>-->
<!--                                    <li>Portfolio Manager</li>-->
<!--                                    <li>Investment Banker etc. </li>-->
<!--                                </ul>-->
<!--                            </div>-->
<!--                        </nav>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div data-filter-cat="Home Page" role="listitem" class="w-dyn-item">-->
<!--                    <div data-hover="false" data-delay="0" data-w-id="5da75251-baf4-0388-0026-478724323918" style="height:80px" class="accordion-item w-dropdown">-->
<!--                        <div class="accordion-toggle w-dropdown-toggle">-->
<!--                            <div class="accordion-icon blue w-icon-dropdown-toggle"></div>-->
<!--                            <div class="accordion-title">What are the top career opportunities after a BSC in Finance from ATLAS ISME?</div>-->
<!--                        </div>-->
<!--                        <nav class="accordion-content w-dropdown-list">-->
<!--                            <div class="content w-richtext">-->
<!--                                <p>After completing a BSc in Finance from ATLAS ISME, students can pursue any of these top career opportunities:</p>-->
<!--                                <ul role="list">-->
<!--                                    <li>Financial Analyst</li>-->
<!--                                    <li>Investment Banker</li>-->
<!--                                    <li>Corporate Finance</li>-->
<!--                                    <li>Wealth Management</li>-->
<!--                                    <li>Risk Management</li>-->
<!--                                    <li>Commercial Banking</li>-->
<!--                                    <li>Equity Research Analyst</li>-->
<!--                                    <li>Data Analyst (Finance Domain)</li>-->
<!--                                    <li>Financial Planner/Auditor/Consultant</li>-->
<!--                                    <li>Credit Analyst</li>-->
<!--                                    <li>Portfolio Manager</li>-->
<!--                                    <li>Financial Entrepreneur</li>-->
<!--                                    <li>Regulatory Compliance Officer</li>-->
<!--                                    <li>Venture Capital Analyst</li>-->
<!--                                    <li>Derivatives Analyst</li>-->
<!--                                    <li>Mutual Fund Analyst</li>-->
<!--                                    <li>Economic Research Analyst</li>-->
<!--                                    <li>Mergers &amp; Acquisitions (M&amp;A) Analyst</li>-->
<!--                                </ul>-->
<!--                                <p>‍</p>-->
<!--                            </div>-->
<!--                        </nav>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div data-filter-cat="Home Page" role="listitem" class="w-dyn-item">-->
<!--                    <div data-hover="false" data-delay="0" data-w-id="5da75251-baf4-0388-0026-478724323918" style="height:80px" class="accordion-item w-dropdown">-->
<!--                        <div class="accordion-toggle w-dropdown-toggle">-->
<!--                            <div class="accordion-icon blue w-icon-dropdown-toggle"></div>-->
<!--                            <div class="accordion-title">How are ATLAS ISME’s future-focused programs, like BBA in Digital Branding or AI &amp; Emerging Tech, different from a traditional BBA degree?</div>-->
<!--                        </div>-->
<!--                        <nav class="accordion-content w-dropdown-list">-->
<!--                            <div class="content w-richtext">-->
<!--                                <p>Our BBA programs are future-focused, with an emphasis on digital branding or AI and emerging tech, which stands out from traditional BBA degrees. We offer:</p>-->
<!--                                <ul role="list">-->
<!--                                    <li>Industry-endorsed curriculum: Integrating cutting-edge tools and market-relevant skills, it prepares students for the AI-powered economy.</li>-->
<!--                                    <li>Specialised focus: Unlike broad, traditional BBAs, we focus on sharpening skills that are market-relevant and equipping students with applicable skills for specific industry roles through the program.</li>-->
<!--                                </ul>-->
<!--                            </div>-->
<!--                        </nav>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div data-filter-cat="Home Page" role="listitem" class="w-dyn-item">-->
<!--                    <div data-hover="false" data-delay="0" data-w-id="5da75251-baf4-0388-0026-478724323918" style="height:80px" class="accordion-item w-dropdown">-->
<!--                        <div class="accordion-toggle w-dropdown-toggle">-->
<!--                            <div class="accordion-icon blue w-icon-dropdown-toggle"></div>-->
<!--                            <div class="accordion-title">What kinds of real-world simulations and decision-making scenarios are included in the ATLAS ISME academic curriculum?</div>-->
<!--                        </div>-->
<!--                        <nav class="accordion-content w-dropdown-list">-->
<!--                            <div class="content w-richtext">-->
<!--                                <p>Atlas offers a rich array of real-world simulations and decision-making scenarios integrated into the academic curriculum. We are renowned for:</p>-->
<!--                                <ul role="list">-->
<!--                                    <li>Case studies: Atlas extensively utilises current and complex cases from various industries.</li>-->
<!--                                    <li>Business simulations: Leveraging advanced business simulation tools, we are able to replicate dynamic market environments, allowing students to experience the immediate consequences of their choices in a risk-free setting. </li>-->
<!--                                    <li>Live projects: The program mandates participation in live industry projects and corporate immersions.</li>-->
<!--                                    <li>Atlas electives: Atlas electives focus on ensuring students can gain immense learning from structured debates on contemporary business dilemmas, enhancing critical thinking.</li>-->
<!--                                </ul>-->
<!--                            </div>-->
<!--                        </nav>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div data-filter-cat="Home Page" role="listitem" class="w-dyn-item">-->
<!--                    <div data-hover="false" data-delay="0" data-w-id="5da75251-baf4-0388-0026-478724323918" style="height:80px" class="accordion-item w-dropdown">-->
<!--                        <div class="accordion-toggle w-dropdown-toggle">-->
<!--                            <div class="accordion-icon blue w-icon-dropdown-toggle"></div>-->
<!--                            <div class="accordion-title">Can ATLAS ISME undergraduate students launch real startups while earning credits, and how do these ventures receive support?</div>-->
<!--                        </div>-->
<!--                        <nav class="accordion-content w-dropdown-list">-->
<!--                            <div class="content w-richtext">-->
<!--                                <p>ATLAS ISME focuses on equipping students with entrepreneurial skills. The curriculum enables students to prepare for real VC pitches and explore startup ideas. The faculty assists students with building and launching ventures. We distinguish ourselves from other reputable institutions by offering</p>-->
<!--                                <ul role="list">-->
<!--                                    <li>Credit-bearing ventures</li>-->
<!--                                    <li>Structured curriculum</li>-->
<!--                                    <li>Real-world application</li>-->
<!--                                    <li>Incubation support and mentorship</li>-->
<!--                                </ul>-->
<!--                            </div>-->
<!--                        </nav>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div data-filter-cat="Home Page" role="listitem" class="w-dyn-item">-->
<!--                    <div data-hover="false" data-delay="0" data-w-id="5da75251-baf4-0388-0026-478724323918" style="height:80px" class="accordion-item w-dropdown">-->
<!--                        <div class="accordion-toggle w-dropdown-toggle">-->
<!--                            <div class="accordion-icon blue w-icon-dropdown-toggle"></div>-->
<!--                            <div class="accordion-title">Do ATLAS ISME students get global exposure during their undergraduate studies? </div>-->
<!--                        </div>-->
<!--                        <nav class="accordion-content w-dropdown-list">-->
<!--                            <div class="content w-richtext">-->
<!--                                <p>Yes, ATLAS ISME provides multiple avenues for global exposure, helping students build an international perspective and prepare for careers or further education abroad. The school’s internationalisation efforts are deeply integrated into the student journey:</p>-->
<!--                                <ol role="list">-->
<!--                                    <li>Global Immersion Programs</li>-->
<!--                                </ol>-->
<!--                                <p>Students participate in short-term study visits to international universities and business ecosystems, where they attend lectures, visit multinational companies, and interact with global faculty and students. These immersions offer real-world insights into global business environments and cultures. In recent years, ATLAS ISME students have visited global firms and universities located in Newyork, Boston, London etc. </p>-->
<!--                                <p>2. Summer Schools at Partner Universities</p>-->
<!--                                <p>ATLAS ISME students have the opportunity to attend summer schools at reputed global universities such as Northeastern University.</p>-->
<!--                                <p>3. International Faculty Week</p>-->
<!--                                <p>ATLAS also hosts international faculty members from global universities for a special week of teaching. This brings a global teaching style into the classroom and exposes students to international academic standards and practices.</p>-->
<!--                                <p>4. Master’s Pathways</p>-->
<!--                                <p>Through structured partnerships and articulation agreements, students can explore Master’s progression pathways with top universities in the UK, Europe, and beyond. Many ATLAS fellows have successfully transitioned to postgraduate programs at institutions like:</p>-->
<!--                                <ul role="list">-->
<!--                                    <li>London Business School<br /><br /></li>-->
<!--                                    <li>King’s College London<br /><br /></li>-->
<!--                                    <li>University of Bath<br /><br /></li>-->
<!--                                </ul>-->
<!--                                <p>5. International Universities Visiting Campus</p>-->
<!--                                <p>Throughout the academic year, representatives from global universities visit the ATLAS campus to conduct workshops, admissions counselling, and info sessions. This helps students directly connect with international institutions and explore opportunities abroad.</p>-->
<!--                                <p>How does it help students?</p>-->
<!--                                <p>These initiatives give students a competitive edge in global job markets, expand their academic and professional networks, and prepare them for a multicultural workplace. Whether pursuing international careers or higher education, ATLAS ISME students graduate globally confident and career-ready.</p>-->
<!--                            </div>-->
<!--                        </nav>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div data-filter-cat="Home Page" role="listitem" class="w-dyn-item">-->
<!--                    <div data-hover="false" data-delay="0" data-w-id="5da75251-baf4-0388-0026-478724323918" style="height:80px" class="accordion-item w-dropdown">-->
<!--                        <div class="accordion-toggle w-dropdown-toggle">-->
<!--                            <div class="accordion-icon blue w-icon-dropdown-toggle"></div>-->
<!--                            <div class="accordion-title">Does ATLAS ISME have campus placements for its students? What are some real career outcomes of ATLAS ISME students?</div>-->
<!--                        </div>-->
<!--                        <nav class="accordion-content w-dropdown-list">-->
<!--                            <div class="content w-richtext">-->
<!--                                <p>Yes, ATLAS ISME has campus placements for its students. Also ATLAS ISME graduates have achieved remarkable early-career success across diverse fields. </p>-->
<!--                                <p>Some of the standout outcomes include:</p>-->
<!--                                <ol role="list">-->
<!--                                    <li>Joining Global Firms or Startups: Graduates have secured roles at top firms like BCG, EY, JP Morgan, Google, where they work as digital marketers, strategists, financial Analysts, growth analysts or pursue Product &amp; Tech Roles</li>-->
<!--                                </ol>-->
<!--                                <ol start="2" role="list">-->
<!--                                    <li>Founding Startups at a Young Age: Several students have launched their startups while studying at ATLAS ISME. </li>-->
<!--                                </ol>-->
<!--                                <ol start="3" role="list">-->
<!--                                    <li> Pursuing Global Higher Education: ATLAS fellows have gained admission into top global universities including London Business School and King&#x27;s College, London.</li>-->
<!--                                </ol>-->
<!--                            </div>-->
<!--                        </nav>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div data-filter-cat="Home Page" role="listitem" class="w-dyn-item">-->
<!--                    <div data-hover="false" data-delay="0" data-w-id="5da75251-baf4-0388-0026-478724323918" style="height:80px" class="accordion-item w-dropdown">-->
<!--                        <div class="accordion-toggle w-dropdown-toggle">-->
<!--                            <div class="accordion-icon blue w-icon-dropdown-toggle"></div>-->
<!--                            <div class="accordion-title">Do ATLAS ISME offer experiential learning? What is the teaching methodology at ATLAS ISME?</div>-->
<!--                        </div>-->
<!--                        <nav class="accordion-content w-dropdown-list">-->
<!--                            <div class="content w-richtext">-->
<!--                                <p>Yes, ATLAS ISME follows an experiential, industry-integrated teaching methodology. </p>-->
<!--                                <ol role="list">-->
<!--                                    <li>Inside the classroom learning at ATLAS ISME</li>-->
<!--                                </ol>-->
<!--                                <ul role="list">-->
<!--                                    <li>Role Play &amp; Simulations</li>-->
<!--                                    <li>Pre-Reads </li>-->
<!--                                    <li>Case Studies</li>-->
<!--                                    <li>Discussions &amp; Debates</li>-->
<!--                                    <li>Academic Articles</li>-->
<!--                                    <li>Text-Book References</li>-->
<!--                                    <li>Industry Notes </li>-->
<!--                                </ul>-->
<!--                                <p>‍</p>-->
<!--                                <ol start="2" role="list">-->
<!--                                    <li>Outside the classroom learning</li>-->
<!--                                </ol>-->
<!--                                <ul role="list">-->
<!--                                    <li>Industry Integration</li>-->
<!--                                    <li>Industry Immersions &amp; Visits</li>-->
<!--                                    <li>Internships</li>-->
<!--                                    <li>CXO Masterclasses</li>-->
<!--                                    <li>Mentorship</li>-->
<!--                                    <li>Live Projects</li>-->
<!--                                    <li>Entrepreneurial Thinking</li>-->
<!--                                    <li>Incubation</li>-->
<!--                                    <li>Innovation Hackathon</li>-->
<!--                                    <li>Shark Tank</li>-->
<!--                                    <li>Startup Events</li>-->
<!--                                    <li>Global Learning</li>-->
<!--                                    <li>Immersions International Faculty</li>-->
<!--                                    <li>Summer Schools</li>-->
<!--                                    <li>Masterclasses</li>-->
<!--                                    <li>Student Exchange</li>-->
<!--                                    <li>Socio-Cultural Learning</li>-->
<!--                                    <li>Social Responsibility</li>-->
<!--                                    <li>Rural Immersions</li>-->
<!--                                    <li>Student Council</li>-->
<!--                                    <li>Student Festivals</li>-->
<!--                                    <li>Extra Curriculars Sports Clubs</li>-->
<!--                                </ul>-->
<!--                                <p>‍</p>-->
<!--                            </div>-->
<!--                        </nav>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="view-more-faq">-->
<!--            <div class="view-text blue">View More</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/686a28e280928f10883d9e42_plus-icon-blue.svg" loading="lazy" alt="" class="plus-circle" />-->
<!--        </div>-->
<!--    </div>-->
<!--</section>-->
<?php include "../assets/include/footer.php" ?>