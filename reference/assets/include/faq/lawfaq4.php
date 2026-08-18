
<?php
$faqs = [
    [
        "question" => "What is the eligibility criteria for BBA LL.B. admissions at ATLAS SkillTech University?",
        "answer" => "Applicants must have completed Class 12 or an equivalent qualification from a recognised board. Eligibility may also include minimum academic performance and programme-specific criteria as defined by ATLAS SkillTech University."
    ],
    [
        "question" => "How can I apply for the BBA LL.B. program?",
        "answer" => "Prospective students can apply online through the official ATLAS SkillTech University admissions portal. The application process includes submitting academic records, completing the form, and participating in any programme-specific assessments or interviews."
    ],
    [
        "question" => "What documents are required for BBA LL.B. admissions?",
        "answer" => "Typically required documents include Class 12 mark sheets, identity proof, passport-sized photographs, and any programme-specific certificates. Ensuring all documents are complete helps speed up the admission process."
    ],
    [
        "question" => "Is there an entrance exam for BBA LL.B. admissions?",
        "answer" => "Some programs may include an entrance assessment or evaluation, depending on intake and university guidelines. Applicants should check the official admissions page for current requirements."
    ],
    [
        "question" => "When is the application deadline for BBA LL.B. admissions?",
        "answer" => "Application deadlines may vary by intake cycle. ATLAS SkillTech University follows rolling or phase-based admissions, so students are advised to refer to the official admissions portal for updated dates."
    ],
    [
        "question" => "Are there any scholarships available for BBA LL.B. students?",
        "answer" => "Yes. ATLAS SkillTech University offers merit-based scholarships, need-based support, and programme-specific awards to eligible students. Details and eligibility criteria can be found on the official admissions page."
    ]
];

?>
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

.collapse {
    visibility: unset;
}

.accordion-button::after {
	background-image:url("https://atlasuniversity.edu.in/assets/images/icon/law-down-arrow.svg");
width:20px;
	height:20px;
	background-size:20px;
}

.accordion-button:not(.collapsed)::after {
	background-image:url("https://atlasuniversity.edu.in/assets/images/icon/law-down-arrow.svg");

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
		<h2 class="h2-tag mrg16">Questions? We can read your mind </h2>
		<div class="accordion accordion-flush" id="accordionFlushExample">
		    
		
		<?php foreach($faqs as $index => $faq): ?>
<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapse<?= $index ?>"
            aria-expanded="false"
            aria-controls="flush-collapse<?= $index ?>">
            
            <span class="accordion-title"><?= $faq['question'] ?></span>
        </button>
    </h2>

    <div id="flush-collapse<?= $index ?>" class="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample">
        
        <div class="accordion-body">
            <?= $faq['answer'] ?>
        </div>
    </div>
</div>
<?php endforeach; ?>
		
			
		</div>
	</div>
</section>