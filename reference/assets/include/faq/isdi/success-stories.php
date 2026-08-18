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
                        <span class="accordion-title">What career opportunities are available after graduating from ISDI?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne1" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Career opportunities after graduating from ATLAS ISDI are innumerable. Graduates can work as:</p>
                        <ul role="list">
                            <li>Art Director</li>
                            <li>Brand Manager</li>
                            <li>Design Consultant</li>
                            <li>UX/UI Designer or Researcher</li>
                            <li>Fashion Designer</li>
                            <li>Product Designer</li>
                            <li>Visual Designer</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne2" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">How does ATLAS ISDI help students build their design portfolios for job placements?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne2" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>ATLAS ISDI supports portfolio development through a project-led and experiential learning approach. Students build strong portfolios through:</p>
                        <ul role="list">
                            <li>Continuous project work across semesters</li>
                            <li>Live assignments and industry-linked projects</li>
                            <li>Access to design labs and creative tools</li>
                            <li>Workshops, masterclasses and faculty mentorship</li>
                        </ul>
                        <p>Career support teams further guide students in preparing portfolios aligned with industry expectations.</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne3" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">Can ISDI students start their own ventures after graduation?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne3" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Yes, ISDI students can start their own ventures after graduation. ISDI focuses on entrepreneurial skills, too. The coursework and its modules focus on:</p>
                        <ul role="list">
                            <li>The curriculum has been designed to nurture the skills of design management as well as entrepreneurship.</li>
                            <li>Students are asked to build portfolios and work on projects, which help them in challenging and strengthening their skills.</li>
                            <li>Capstone projects are made compulsory for students to navigate the complexities of design and entrepreneurship.</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne4" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">How does ISDI help students build their design portfolios for job placements?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne4" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>ISDI helps the students in building a portfolio and guiding them through job placements as well. We help students by:</p>
                        <ul role="list">
                            <li>Having projects which enhance their portfolio</li>
                            <li>Guest lectures and masterclasses</li>
                            <li>SOPs</li>
                            <li>Projects which are a compulsory part of modules</li>
                            <li>Documentation of the project as a part of the portfolio</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne5" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">What kind of internships do students get during the course?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne5" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>ATLAS ISDI always ensures a promising future for its students. Our committee oversees every student's secure internships with top organisations that match their specialisations and career goals.</p>
                        <ul role="list">
                            <li>Interns can work with renowned companies.</li>
                            <li>Work for esteemed designers</li>
                            <li>Gain hands-on experience with live projects and internships</li>
                            <li>Committees are made to make job hunting easy.</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne6" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">How strong is ISDI's placement record?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne6" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>ATLAS ISDI has an astounding record for placements. ATLAS ISDI has a placement committee which works diligently for every student to ensure their placements. The committee guides the students to reach out to a job where their expertise can shine. The curriculum allows students to gain skills, which are:</p>
                        <ul role="list">
                            <li>Work for alumni organisations</li>
                            <li>Work on certifications, which strengthen their credibility</li>
                            <li>They should maintain an attractive portfolio that aids in securing better placements</li>
                        </ul>
                    </div>
                </div>
            </div>
			
		
			
		</div>
	</div>
</section>