
<?php
$faqs = [
    [
        "question" => "What does LLM mean in AI technology?",
        "answer" => "LL.M. stands for Master of Laws, and the LL.M. in AI & Technology focuses on the legal, regulatory, and ethical aspects of emerging technologies. It equips students with knowledge of AI, digital innovation, data privacy, cyber law, and technology-driven legal frameworks."
    ],
    [
        "question" => "Who is eligible to apply for the LL.M. in AI & Technology?",
        "answer" => "Applicants must hold a Bachelor of Laws (LL.B.) degree from a recognised university. Some programs may also consider academic performance, relevant professional experience, or additional assessments as part of eligibility criteria."
    ],
    [
        "question" => "What are the core subjects covered in the LL.M. in AI & Technology curriculum?",
        "answer" => "The curriculum covers AI and technology law, data protection, cybersecurity law, intellectual property in digital innovation, ethics in AI, and regulatory compliance. Students also engage in research, case studies, and practical projects to apply legal concepts to real-world technological scenarios."
    ],
    [
        "question" => "How can I apply for the LL.M. in AI & Technology program?",
        "answer" => "Prospective students can apply online via the ATLAS SkillTech University admissions portal. The process typically includes submitting academic transcripts, completing the application form, and participating in interviews or assessments if required."
    ],
    [
        "question" => "What career opportunities are available after completing the LL.M. in AI & Technology?",
        "answer" => "Graduates can pursue careers as technology law specialists, legal advisors for AI companies, compliance officers, policy analysts, and intellectual property consultants. The program also prepares students for research roles, academia, and regulatory bodies focused on emerging technologies."
    ],
    [
        "question" => "How long is the LL.M. in AI & Technology program?",
        "answer" => "The program is designed to be completed in one to two years, depending on the mode of study and university schedule. It combines classroom instruction, research projects, and practical exposure to ensure comprehensive learning."
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