
<?php
$faqs = [
    [
        "question" => "Can I do 5 year LLB without CLAT?",
        "answer" => "Yes. Admission to a 5-year integrated law programme does not always require CLAT. Universities like ATLAS SkillTech University follow their own admissions process, which may include academic evaluation, aptitude assessment, and personal interaction."
    ],
    [
        "question" => "Which is better, 3-year LLB or 5-year LLB?",
        "answer" => "A 5-year LLB is ideal for students joining straight after Class 12, offering an integrated foundation in law and management, while a 3-year LLB is suitable for graduates. ATLAS School of Law offers a 5-year integrated law programme designed to provide early exposure, interdisciplinary learning, and strong experiential training. The 5-year format allows students more time for skill development, internships, and industry engagement."
    ],
    [
        "question" => "What is integrated BBA LLB?",
        "answer" => "Integrated BBA LL.B. is a five-year undergraduate law programme that combines business administration with legal education. Students study management subjects alongside core law courses, preparing them for careers at the intersection of business and law."
    ],
    [
        "question" => "Can we do BBA and LLB together?",
        "answer" => "Yes. The Integrated BBA LL.B. programme allows students to pursue business and law simultaneously within a structured five-year degree, eliminating the need to complete two separate courses."
    ],
    [
        "question" => "What is a 5 year integrated LLB?",
        "answer" => "A 5-year integrated LLB is a programme designed for students after Class 12 that blends undergraduate studies with legal education. It provides a strong academic foundation, practical exposure, and early professional readiness."
    ],
    [
        "question" => "Can BBA LLB be a lawyer?",
        "answer" => "Yes. After completing the Integrated BBA LL.B. and fulfilling regulatory requirements, graduates are eligible to enrol with the Bar Council and practise as lawyers. The programme also opens pathways beyond litigation."
    ],
    [
        "question" => "Is BBA LLB a double major?",
        "answer" => "BBA LL.B. is an integrated dual-degree programme, not a traditional double major. It awards a combined qualification in business administration and law, designed to build interdisciplinary expertise."
    ],
    [
        "question" => "Can you study business and law at the same time?",
        "answer" => "Yes. The Integrated BBA LL.B. programme is specifically structured to let students study management, finance, and economics alongside legal subjects, preparing them for corporate, regulatory, and entrepreneurial roles."
    ],
    [
        "question" => "What are the eligibility criteria for enrolling in the 5-year Integrated BBA LL.B. program?",
        "answer" => "Applicants must have completed Class 12 or an equivalent qualification from a recognised board. Additional programme-specific requirements, aptitude assessments, or interviews may apply as part of the admissions process."
    ],
    [
        "question" => "What subjects are covered in the Integrated BBA LL.B. curriculum?",
        "answer" => "The curriculum includes business management, economics, accounting, corporate law, constitutional law, contract law, criminal law, and legal research. It is designed to balance managerial knowledge with strong legal foundations."
    ],
    [
        "question" => "How does the Integrated BBA LL.B. program prepare students for the legal profession?",
        "answer" => "The programme emphasises experiential learning through case studies, moot courts, internships, live projects, and industry interaction. This approach builds legal reasoning, business acumen, and practical skills essential for modern legal careers."
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