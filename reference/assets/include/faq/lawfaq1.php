<?php
$faqs = [
    [
        "question" => "What makes ATLAS School of Law unique compared to other law schools?",
        "answer" => "ATLAS blends law with business, technology, and innovation, equipping students with skills in AI, legal-tech, and business strategy."
    ],
    [
        "question" => "What programs are offered at ATLAS School of Law?",
        "answer" => "5-year Integrated BBA LL.B. (Hons.) and 1-year LL.M. in Law, Technology & Artificial Intelligence."
    ],
    [
        "question" => "Is ATLAS School of Law approved by the Bar Council of India?",
        "answer" => "Yes, it is fully approved by the Bar Council of India."
    ],
    [
        "question" => "What subjects are covered in the BBA LL.B. program?",
        "answer" => "It covers core law subjects, business management, technology, and electives in innovation and legal-tech."
    ],
    [
        "question" => "Does the BBA LL.B. program include internships or field experience?",
        "answer" => "Yes, students gain practical experience through internships, moot courts, and live projects."
    ],
    [
        "question" => "What is the structure of the LL.M. in Law, Technology & Artificial Intelligence program?",
        "answer" => "A one-year program focusing on technology law, AI applications, research, and practical legal projects."
    ],
    [
        "question" => "What is the application process for ATLAS School of Law?",
        "answer" => "Apply online via the ATLAS University portal, submit academic documents, and appear for the entrance test."
    ],
    [
        "question" => "What is the ATLAS Law Entrance Test?",
        "answer" => "A selection exam assessing legal aptitude, reasoning, and general knowledge for BBA LL.B. admissions."
    ],
    [
        "question" => "What is the eligibility criteria for applying to ATLAS School of Law?",
        "answer" => "For BBA LL.B.: 50% in Class XII; for LL.M.: a law graduate with a relevant degree."
    ],
    [
        "question" => "What career pathways can I pursue after graduating from ATLAS School of Law?",
        "answer" => "Legal practice, corporate law, legal-tech, AI law advisory, compliance, and policy roles."
    ],
    [
        "question" => "What kind of internships or industry engagements are available to students?",
        "answer" => "Students intern with law firms, corporates, startups, and tech-driven legal initiatives."
    ],
    [
        "question" => "What is the campus like at ATLAS School of Law? Are there any student housing options available?",
        "answer" => "The campus offers modern classrooms, moot courts, libraries, and on-campus housing options for students."
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