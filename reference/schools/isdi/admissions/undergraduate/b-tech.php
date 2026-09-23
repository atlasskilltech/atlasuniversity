<?php
$title = "B.Tech Admissions – ATLAS ISDI";
$description = "Applying for B.Tech? Explore specializations, eligibility, portfolio tips and start your design career today.";
$keywords = "atlas, contact";
$css = "atlass-fantastic-site-48323a.webflow.68e8e3770f9aaa876d1fe997-818441150.css";
$js = "https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/js/webflow.ee913841.9c23cc986ec5cec0.js";
$htmlDataId = "68e8e3770f9aaa876d1fe997";
$body = "body isdi-page";

include "../../assets/include/header.php" ?> 



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



<section class="course-cover-section">
	<div class="course-hero-wrapper">
		<div class="hero-text">
			<h1 class="h1-tag">B.Tech <br />Admissions</h1>
			<div class="course-duration-isme isdi">Bachelors of Design | Full Time</div>
			<div class="buttons-wrapper"><a data-id="" data-wf--button-primary--variant="pink" href="<?php echo $edudomain ?>applicationform" class="btn-primary w-inline-block">
					<div class="button-tx">Apply for 2027 Intake</div>
				</a></div>
		</div>
	</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68e8e3f2f188fec5275325e8_nav-bar.png" loading="lazy" sizes="(max-width: 1366px) 100vw, 1366px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68e8e3f2f188fec5275325e8_nav-bar-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68e8e3f2f188fec5275325e8_nav-bar-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68e8e3f2f188fec5275325e8_nav-bar-p-1080.png 1080w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68e8e3f2f188fec5275325e8_nav-bar.png 1366w" alt="" class="inner-cover-image" />
</section>
<div class="sticky-menus"><a href="#how-to-apply" class="anchor-link">How to Apply</a><a href="#key-dates" class="anchor-link">Key Dates</a><a href="#eligibility" class="anchor-link">Eligibility</a><a href="#fee-structure" class="anchor-link">Fee Structure</a><a href="#scholarship" class="anchor-link">ATLAS Scholarships</a><a href="#education-loan" class="anchor-link">Financial Assistance</a><a href="#faq" class="anchor-link">FAQs</a></div>
<section id="how-to-apply" class="section">
	<div class="container">
		<h2 class="h2-tag isdi">Here’s how to apply</h2>
		<div class="guide-steps-wrapper-isdi">
			<div class="gd-steps tbg1 isdi-blue-5">
				<div class="gd-cont-wrap">
					<div class="tb-num-mt isdi">01</div>
					<div class="tb-title-mt isdi">Submit the Application Form</div><a Data-id="" data-wf--button-secondary--variant="pink" href="<?php echo $edudomain ?>applicationform" class="secondary-btn">Apply for July 2027 Intake</a>
				</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685f999de32a3300b7ff028f_tab-3-img-1.png" alt="" class="tb-image isdi" />
			</div>
			<div class="gd-steps tbg2 isdi">
				<div class="gd-cont-wrap">
					<div class="tb-num-mt isdi">02</div>
					<div class="tb-title-mt isdi">Design Aptitude Test</div>
				</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685f9d87ede0b21a20588100_tab-3-img-2.png" alt="" class="tb-image isdi" />
			</div>
			<div class="gd-steps tbg2 isdi-blue-5">
				<div class="gd-cont-wrap">
					<div class="tb-num-mt isdi">03</div>
					<div class="tb-title-mt isdi">Portfolio<br />Review</div>
				</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685f9d87ede0b21a20588100_tab-3-img-2.png" alt="" class="tb-image isdi" />
			</div>
			<div class="gd-steps tbg3">
				<div class="gd-cont-wrap">
					<div class="tb-num-mt isdi">04</div>
					<div class="tb-title-mt isdi">Personal Interview</div>
				</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685f9d87ede0b21a20588100_tab-3-img-2.png" alt="" class="tb-image isdi" />
			</div>
			<div class="gd-steps tbg3 isdi">
				<div class="gd-cont-wrap">
					<div class="tb-num-mt isdi">05</div>
					<div class="tb-title-mt isdi">Final Selection &amp; Offer Letter</div>
				</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68d3dfc00764fad15ab007a9_jigsaw.png" alt="" class="tb-image isdi" />
			</div>
			<div class="mob-vert-line"></div>
		</div>
	</div>
</section>
<section id="key-dates" class="section">
	<div class="container">
		<h2 class="h2-tag isdi">Key Dates &amp; Deadlines</h2>
		<div class="dates-fees-container-atlas">
                        <div class="df-container-atlas" style="border: none;">
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
        border-top-left-radius: 32px;
    border-bottom-right-radius: 32px;
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

include $_SERVER['DOCUMENT_ROOT'] . "/assets/include/keydates/keydates-static/bdes.php" 


?> 




















</div>
                        </div>
                        
                    </div>
		<!--<div class="dates-fees-container isdi no-padding">-->
		<!--	<div class="df-container isdi">-->
		<!--		<div class="df-card blue isdi-blue">-->
		<!--			<div class="df-text-2 bld">Cycle 1A</div>-->
		<!--			<div class="df-txt-wrap">-->
		<!--				<div class="df-text-3"><strong>Application Opens</strong><br />11th Sept 2025</div>-->
		<!--			</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68e8e143b04dae2f58c2cef0_Polygon%202.png" alt="" class="image-8" />-->
		<!--		</div>-->
		<!--		<div class="df-card gray">-->
		<!--			<div class="df-text-2">Last Date for Portfolio/Design Project Upload &amp; DAT</div>-->
		<!--			<div class="df-text-1"><strong>Closed</strong></div>-->
		<!--		</div>-->
		<!--		<div class="df-card gray">-->
		<!--			<div class="df-text-2">Interview Date</div>-->
		<!--			<div class="df-text-1"><strong>Closed</strong></div>-->
		<!--		</div>-->
		<!--		<div class="df-card">-->
		<!--			<div class="df-text-2">Result<br />Announcement</div>-->
		<!--			<div class="df-text-1"><strong>01st Dec 25</strong></div>-->
		<!--		</div>-->
		<!--		<div class="df-card">-->
		<!--			<div class="df-text-2">Acceptance Deadline</div>-->
		<!--			<div class="df-text-1"><strong>15th Jan 26</strong></div>-->
		<!--		</div>-->
		<!--		<div class="df-card">-->
		<!--			<div class="df-text-2">Semester 1 Fee Payment Deadline</div>-->
		<!--			<div class="df-text-1"><strong>30th May 2027</strong></div>-->
		<!--		</div>-->
		<!--	</div>-->
		<!--</div>-->
		<!--<div class="dates-fees-container isdi no-padding">-->
		<!--	<div class="df-container isdi">-->
		<!--		<div class="df-card blue isdi-blue">-->
		<!--			<div class="df-text-2 bld">Cycle 1B</div>-->
		<!--			<div class="df-txt-wrap">-->
		<!--				<div class="df-text-3"><strong>Application Opens</strong><br />11th Sept 2025</div>-->
		<!--			</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68e8e143b04dae2f58c2cef0_Polygon%202.png" alt="" class="image-8" />-->
		<!--		</div>-->
		<!--		<div class="df-card">-->
		<!--			<div class="df-text-2">Last Date for Portfolio/Design Project Upload &amp; DAT</div>-->
		<!--			<div class="df-text-1"><strong>15th Dec 25</strong></div>-->
		<!--		</div>-->
		<!--		<div class="df-card">-->
		<!--			<div class="df-text-2">Interview Date</div>-->
		<!--			<div class="df-text-1"><strong>15th Dec 25 to 16th Jan 26</strong></div>-->
		<!--		</div>-->
		<!--		<div class="df-card">-->
		<!--			<div class="df-text-2">Result<br />Announcement</div>-->
		<!--			<div class="df-text-1"><strong>27th Jan 26</strong></div>-->
		<!--		</div>-->
		<!--		<div class="df-card">-->
		<!--			<div class="df-text-2">Acceptance Deadline</div>-->
		<!--			<div class="df-text-1"><strong>27th Feb 26</strong></div>-->
		<!--		</div>-->
		<!--		<div class="df-card">-->
		<!--			<div class="df-text-2">Semester 1 Fee Payment Deadline</div>-->
		<!--			<div class="df-text-1"><strong>30th May 2027</strong></div>-->
		<!--		</div>-->
		<!--	</div>-->
		<!--</div>-->
	</div>
</section>
<section id="eligibility" class="section">
	<div class="container">
		<div class="head-wrap mrgbtm32 isdi">
			<div class="tt-wrap">
				<h2 class="h2-tag mrgtbm0 isdi">Eligibility</h2>
			</div><a Data-id="" data-wf--button-regular--variant="small-icon" href="https://atlasuniversity.edu.in/admissions-policy/" target="_blank" class="button-regular w-variant-fae6c071-65cb-b1a3-0e97-3054914f8c5a w-inline-block">
				<div data-wf--button-space--variant="normal" class="extra-space">
					<div data-font-size="" class="button-text">View Admission Policy</div>
					<div class="code-button w-embed w-script">
						<script>
						document.addEventListener("DOMContentLoaded", function() {
							document.querySelectorAll('.button-text').forEach(function(text) {
								var fontsz = text.getAttribute('data-font-size');
								text.style.fontSize = fontsz + 'px';
							});
						});
						</script>
					</div>
				</div>
			</a>
		</div>
		<div class="list-text-wrap">
			<div class="ln-bd-txt"><strong>Class XII:</strong> Current Students &amp; Pass-outs (2023 Onwards)</div>
		</div>
		<div data-hover="false" data-delay="0" data-w-id="2f663270-7b27-1550-9cc9-886f58abae0f" style="height:80px" class="accordion-item-blue-fill w-dropdown">
			<div class="accordion-toggle-blue-fill isdi w-dropdown-toggle">
				<div class="accordion-title-blue-fill">Indian Boards (ISC / CBSE / State Boards)</div>
				<div class="accordion-icon white w-icon-dropdown-toggle"></div>
			</div>
			<nav class="accordion-content-blue-fill w-dropdown-list">
				<div class="content-blue-fill w-richtext">
					<p>An aggregate of 50% marks in Grade XII in any discipline. </p>
				</div>
			</nav>
		</div>
		<div data-hover="false" data-delay="0" data-w-id="8475acb7-4b0f-ef60-0a61-df5d860f56f9" style="height:80px" class="accordion-item-blue-fill w-dropdown">
			<div data-w-id="8475acb7-4b0f-ef60-0a61-df5d860f56fa" style="height:80px" class="accordion-toggle-blue-fill isdi w-dropdown-toggle">
				<div class="accordion-title-blue-fill">A-Levels (UK)</div>
				<div class="accordion-icon white w-icon-dropdown-toggle"></div>
			</div>
			<nav class="accordion-content-blue-fill w-dropdown-list">
				<div class="content-blue-fill w-richtext">
					<p>GSCE/IGCSE Examinations of the approved British Examination Bodies, with minimum 5 (Five) subjects in A, B, C, D and E grades, including English at Ordinary &#x27;O&#x27; Level and 2 subjects at Advanced &#x27;A&#x27; Level, has been equated with +2 stage qualification.</p>
				</div>
			</nav>
		</div>
		<div data-hover="false" data-delay="0" data-w-id="d23ae4ad-7233-9f57-0000-1f64d70de76a" style="height:80px" class="accordion-item-blue-fill w-dropdown">
			<div class="accordion-toggle-blue-fill isdi w-dropdown-toggle">
				<div class="accordion-title-blue-fill">International Baccalaureate (IB)</div>
				<div class="accordion-icon white w-icon-dropdown-toggle"></div>
			</div>
			<nav class="accordion-content-blue-fill w-dropdown-list">
				<div class="content-blue-fill w-richtext">
					<p><strong>IB Diploma Program</strong></p>
					<ul role="list">
						<li>3 HL, 3 SL with a minimum of 24 credit points.</li>
					</ul>
					<p><strong>IB Diploma Course (i.e. Certificate) Programme</strong>‍</p>
					<ul role="list">
						<li>3 HL, 3 SL with a minimum of 24 credit points.</li>
					</ul>
					<p><strong>IB career Related Study Programmes</strong></p>
					<ul role="list">
						<li>02 DP subjects with at ;east 01 subject at HL Level and minimum 3 points in each DP subject.</li>
						<li>Career Related Study (CRS) with at least 03 subjects.</li>
						<li>IBCP Equivalence for General Strand (Design, Science, B. Sc Finance): International Baccalaureate Career Related Study (IBCP) qualification with core components requirement awarded by International Baccalaureate (IB).</li>
					</ul>
				</div>
			</nav>
		</div>
	</div>
</section>
<section id="fee-structure" class="section">
	<div class="container">
		<div class="head-wrap top">
			<div class="tt-wrap">
				<h2 class="h2-tag mrg16 isdi">Fee Structure</h2>
				<div class="sub-heading mrgbtm32">We believe in clarity &amp; Here’s a simple breakdown of our fees!</div>
			</div><a Data-id="" data-wf--button-regular--variant="base" href="https://online.fliphtml5.com/vrcjg/luhy/#p=1" target="_blank" class="button-regular w-inline-block">
				<div data-wf--button-space--variant="normal" class="extra-space">
					<div data-font-size="" class="button-text">View Fee Structure</div>
					<div class="code-button w-embed w-script">
						<script>
						document.addEventListener("DOMContentLoaded", function() {
							document.querySelectorAll('.button-text').forEach(function(text) {
								var fontsz = text.getAttribute('data-font-size');
								text.style.fontSize = fontsz + 'px';
							});
						});
						</script>
					</div>
				</div>
			</a>
		</div>
		<div class="dates-fees-container isdi">
			<div class="df-container isdi mrg-mo-top">
				<div class="df-card blue isdi-pink">
					<div class="df-text-2 bld"><strong>Total Duration</strong></div>
					<div class="df-txt-wrap">
						<div class="df-text-1"><strong>4 Years</strong><br /></div>
						<div class="df-text-3"><br />*Indicative &amp; subject to change</div>
					</div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68e8e81316aa6194ba004433_Polygon-pink.png" alt="" class="image-8" />
				</div>
				<div class="df-card">
					<div class="df-text-2">Application Fee</div>
					<div class="df-text-1"><strong class="fee-dates">3500</strong></div>
				</div>
				<div class="df-card">
					<div class="df-text-2">Enrollment Fee</div>
					<div class="df-text-1"><strong class="fee-dates">50,000</strong></div>
				</div>
				<div class="df-card">
					<div class="df-text-2">Year 1</div>
					<div class="df-text-1"><strong class="fee-dates">7,03,500</strong></div>
				</div>
			</div>
		</div>
	</div>
</section>
<section id="scholarship" class="section">
	<div class="container">
		<div class="head-wrap">
			<div class="tt-wrap">
				<h2 class="h2-tag mrg16 isdi">ATLAS Scholarships</h2>
				<div class="sub-heading mrgbtm-0">Enabling bright minds to go further.</div>
			</div><a Data-id="" data-wf--button-regular--variant="small-icon" href="<?php echo $ogdomain ?>scholarships-and-financial-aid" class="button-regular w-variant-fae6c071-65cb-b1a3-0e97-3054914f8c5a w-inline-block">
				<div data-wf--button-space--variant="normal" class="extra-space">
					<div data-font-size="" class="button-text">Know more about ATLAS Scholarship</div>
					<div class="code-button w-embed w-script">
						<script>
						document.addEventListener("DOMContentLoaded", function() {
							document.querySelectorAll('.button-text').forEach(function(text) {
								var fontsz = text.getAttribute('data-font-size');
								text.style.fontSize = fontsz + 'px';
							});
						});
						</script>
					</div>
				</div>
			</a>
		</div>
		<div class="scholarship-cards-wrapper">
			<div class="scholarship-card bg1 isdi">
				<div class="scholarship-number">#1</div>
				<div class="scholarship-title isdi">Merit-Based and Talent Scholarships</div>
				<p class="scholarship-description">ATLAS SkillTech University recognises and rewards exceptional talent and academic excellence through its Merit-Based and <br />Talent Scholarships. <br /><br />Whether you shine in academics, sports, entrepreneurship, or digital skills.</p>
			</div>
			<div class="scholarship-card bg2 isdi">
				<div class="scholarship-number">#2</div>
				<div class="scholarship-title isdi">Give Back to Society Scholarships</div>
				<p class="scholarship-description">Special Category Scholarships at ATLAS SkillTech University honour the unique contributions of educators, defence personnels, and philanthropic donors across the country.<br /><br />These scholarships support the children of teachers and armed forces members, etc.</p>
			</div>
			<div class="scholarship-card bg3 isdi">
				<div class="scholarship-number">#3</div>
				<div class="scholarship-title isdi">Need-Based and Support Scholarships</div>
				<p class="scholarship-description">Our Need-Based and Support Scholarships are committed to making quality education accessible to deserving students, regardless of their financial background.<br /><br /> ATLAS SkillTech University offers tuition fee waivers, interest-free loan support.</p>
			</div>
		</div>
	</div>
</section>

    	<?php

                include $_SERVER['DOCUMENT_ROOT'] . "/assets/include/loans/education-loans.php" 
                
            ?> 

<section id="faq" class="section">
	<div class="container">
	
		<div class="search-ques-wrap">
			<?php 
                $chatBxVariant = "";
                $chatBxText = "More questions?";
                include "../../../../assets/include/more-questions.php"
            ?>
		</div>
	</div>
</section> 

<?php
$arrow = "isdi-down-arrow.svg";
include "../../../../assets/include/faq/isdi/admissions/ug.php" ?>

<?php include "../../assets/include/footer.php" ?>