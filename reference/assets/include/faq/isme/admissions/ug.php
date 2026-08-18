<style>
.accordion-header {
	margin: 0;
}

.accordion-button {
	color: #2b2b2bcc;
	white-space: normal;
	word-break: normal;
	margin-right: 50px;
	font-size: 24px;
	line-height: 1.2;
	font-weight: normal;
	padding: 0;
	height: 80px;
	white-space: normal;
}

.accordion-title {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}

.accordion-button:not(.collapsed) {
	background-color: #aeceff00;
	box-shadow: unset;
}

.accordion-body {
	padding: 0px 24px 24px 0px;
}

.accordion-button:focus {
	box-shadow: unset;
}

.accordion-button:hover {
	background-color: unset !important;
	color: #2b2b2bcc !important;
}

ul,ol{
    list-style: disc;
    margin-top: 0;
    margin-bottom: 10px;
    padding-left: 40px;
}

p {
    margin-top: 0;
    margin-bottom: 10px;
}

.collapse {
    visibility: unset;
}

.accordion-button::after {
	background-image:url("https://atlasuniversity.edu.in/assets/images/icon/<?php
if ( !empty($arrow)) {
		echo $arrow;
	}

	else {
		echo "atlas-down-arrow.svg";
	}

	?>");
width:20px;
	height:20px;
	background-size:20px;
}

.accordion-button:not(.collapsed)::after {
	background-image:url("https://atlasuniversity.edu.in/assets/images/icon/<?php
if ( !empty($arrow)) {
		echo $arrow;
	}

	else {
		echo "atlas-down-arrow.svg";
	}

	?>");

}

@media screen and (max-width: 767px) {
	.accordion-button {
		font-size: 16px;
		font-weight: 600;
	}

	.accordion-button::after {
		width: 16px;
		height: 16px;
		background-size: 16px;
	}

	.accordion-body {
		font-size: 14px;
	}
}
</style>
<section id="faq" class="section">
	<div class="container">
		<h2 class="h2-tag mrg16">Questions? We can read your mind</h2>
		<div class="accordion accordion-flush" id="accordionFlushExample">
		    
			<div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne1" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">What is the eligibility criteria for the BBA programs at ATLAS ISME?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne1" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Candidates currently in their 12th grade & will be appearing for a 10 + 2 examination (e.g.: CBSE, HSC, IGCSE- A levels, IBDP, ISC, etc.) or its educational equivalent in any discipline (e.g.: Commerce, Science, Arts) are eligible to apply</p>
                        <p>Or</p>
                        <p>have passed their 10+2 (or equivalent) examination in any discipline from a recognised board are eligible for the BBA program at ATLAS.</p>
                        <p><b>Accepted Education Boards & Qualifications</b></p>
                        <p>Central Board of Secondary Education (CBSE) / State Board / Council for the Indian School Certificate Examinations (CISCE) / National Institute of Open Schooling (NIOS) – 10+2 IB Diploma/ IB Certificate/ IB CP with minimum 3 Higher Level and 3 Standard Level subjects mandatory with a minimum of 24 points – 10+2 Cambridge Board – Minimum 2 subjects</p>
                        <p><b>Note:</b> Students from the IGCSE board for class X must have cleared a minimum of 5 subjects</p>
                        <p><b>Minimum Academic Requirements:</b></p>
                        <ul role="list">
                            <li>Minimum 50% in Class 12 (ISC/CBSE/ State Boards)</li>
                            <li>OR</li>
                            <li>IB Diploma/Certificate with 24 points (3 HL + 3 SL subjects)</li>
                            <li>A Levels: Minimum grades A/B/C in 2 subjects</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne2" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">What is the eligibility criteria for the B.Sc. programs at ATLAS ISME?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne2" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>To be eligible for the ATLAS ISME's B.Sc. Finance program, candidates need to have completed their 10+2 (or equivalent) from a recognised board with a minimum of 60% in their previous exams. Math is a mandatory subject for this program.</p>
                        <p><b>Minimum Academic Requirements:</b></p>
                        <ul role="list">
                            <li>Minimum Percentage: A minimum of 60% marks is required in the 10+2 exams.</li>
                            <li>Compulsory Subject: Mathematics is a mandatory subject for the B.Sc. Finance program.</li>
                            <li>Streams Accepted: Candidates from various disciplines (Science, Commerce, Arts) are eligible to apply, as long as they have completed their 10+2 with the required percentage.</li>
                            <li>Recognised Boards: Candidates can apply from various boards, including CBSE, ISC, HSC, IBDP, IGCSE (A levels) and others.</li>
                        </ul>
                        <p>Please note that the selection process for admission is based on a combination of an aptitude test and a personal interview.</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne3" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">What is the eligibility criteria for the MBA programs at ATLAS ISME?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne3" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Candidates who have completed or are in the final year of a minimum 3-year undergraduate degree in any discipline from a recognised university can apply for the MBA program at ATLAS SkillTech University.</p>
                        <p><b>Educational Qualification</b></p>
                        <p>Students pursuing or having completed a minimum of 3-year graduate programs in any discipline with a minimum 50% aggregate marks from any University recognised by the Association of Indian Universities (AIU). Students appearing for their final exams can also apply, provided they maintain a minimum of 50% aggregate marks at the time of graduation as mentioned above. Students applying for their final exams should not have any live backlogs (ATKTs).</p>
                        <p>Examinations (MBA): Candidates who have appeared for one of the following entrance tests – GMAT, CAT, NMAT, XAT, MAT, CMAT, ATMA or any state CET tests are preferred. Cut offs: CAT/XAT: 70%, NMAT: 200 marks & CET: 80%</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne4" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">What is the application fee for BBA at ATLAS ISME?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne4" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>The application fee for BBA programs at ATLAS SkillTech University is ₹3,500.</p>
                        <p>This is a one-time, non-refundable fee and is subject to change as per the admission cycle.</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne5" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">What is the application fee for B.Sc Finance at ATLAS ISME?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne5" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>For B.Sc. Finance at ATLAS ISME, candidates are required to pay a one-time, non-refundable application fee of ₹3,500.</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne6" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">What is the application fee for an MBA at ATLAS ISME?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne6" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>For the MBA at ATLAS ISME, candidates have to pay a one-time non-refundable fee of ₹1,500 to apply for a program at ATLAS SkillTech University.</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne7" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">What is the admission process for the ATLAS ISME BBA program and how do I participate in each stage?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne7" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>The admission process at ATLAS ISME consists of 3 key stages:</p>
                        <ul role="list">
                            <li><b>Business Aptitude Test (BAT):</b> An online MCQs test that assesses your verbal, logical reasoning, quantitative and business communication skills</li>
                            <li><b>Personal Interview (PI):</b> An interactive online interview that evaluates your candidature. One can expect questions from your performance in the BAT and Statement of Purpose (SOP), past achievements, perspectives on global affairs, etc.</li>
                            <li><b>Collaborative Accelerator:</b> This is an on-campus group exercise where students collaborate with other candidates to solve an on-the-spot real-world business case study.</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne8" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">What do I need to submit if I have already taken my final board (Class 12 Examination or Equivalent Exam) examinations?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne8" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Applicants who have completed their Class 12 (or equivalent) must submit their final marksheets for all subjects at the time of admission to ATLAS SkillTech University.</p>
                        <p>If you are a resident of Maharashtra, a domicile certificate is required to be submitted prior to the commencement of classes.</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne9" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">Is a domicile certificate required for Maharashtra-based students during the admission process at ATLAS ISME?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne9" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Yes, Maharashtra State students are required to submit a domicile certificate as part of the admission process at ATLAS ISME. This certificate must be submitted before the commencement of classes to complete admission formalities at ATLAS ISME.</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne10" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">What if I am awaiting my Class 12 or equivalent final exam results during the ATLAS ISME admission process?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne10" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>If you are still awaiting your Class 12 examination or equivalent results, you can still apply for admission at ATLAS ISME.</p>
                        <p>However, at ATLAS ISME, all admissions in such cases are considered provisional and subject to the submission of your final marksheet and pass certificate before the commencement of classes. Failure to submit the required documents in time may affect your enrollment status.</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne11" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">What is the international admission policy at ATLAS SkillTech University for NRI, OCI and foreign candidates?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne11" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>International, NRI (Non-Resident Indian) and OCI (Overseas Citizen of India) candidates are eligible to apply under a supernumerary quota at ATLAS SkillTech University. These applicants must meet eligibility criteria equivalent to Indian academic standards for the respective program they are applying to.</p>
                        <p>This quota is in addition to the regular intake and is governed by university and regulatory guidelines for international admissions.</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne12" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">What is the reservation policy for admissions at ATLAS ISME?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne12" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>As per the ATLAS SkillTech University Act 2021 and the Government of Maharashtra guidelines, up to 50% of the total intake is reserved for candidates from various reserved categories.</p>
                        <p>Please note that admissions shall follow the State Government's reservation policy as stated in the University Act. This reservation policy ensures equitable access to education while strictly adhering to state government regulations.</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne13" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">Which Indian boards are recognised by ATLAS ISME/ATLAS SkillTech University?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne13" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>ATLAS SkillTech University recognises all boards approved by the Council of Boards of School Education India (COBSE). Please <a href="https://www.cobse.org.in/recognized-educational-boards-list/" target="_blank">click here</a> to view the complete list of boards recognised by the COBSE.</p>
                    </div>
                </div>
            </div>
			
		
			
		</div>
	</div>
</section>