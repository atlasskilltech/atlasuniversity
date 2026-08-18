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
                    <span class="accordion-title">Is Interior Design worth studying at ISDI?</span>
                </button>
            </h2>
            <div id="flush-collapseOne1" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <p>Interior Design is one of the most emerging fields in today's time. With people increasingly being aware of the aesthetics and functionality of home, yes, Interior Design is a thriving field and definitely needs to be worked on. Studying at ISDI can benefit individuals with:</p>
                    <ul role="list">
                        <li>Workshops led by industrial leaders</li>
                        <li>A global curriculum designed in collaboration with Parsons School of Design</li>
                        <li>Experiential learning and live projects for students to explore and nurture their creative skills.</li>
                        <li>A curriculum spanning over 4 years, strengthening the basics of interior design, along with a state-of-the-art place to study.</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne2" aria-expanded="false" aria-controls="flush-collapseOne">
                    <span class="accordion-title">What is different about the Interior Design curriculum taught at ISDI?</span>
                </button>
            </h2>
            <div id="flush-collapseOne2" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <p>The interior design curriculum differs from other courses teaching Interior design because our curriculum has been designed in collaboration with Parsons School of Design. It helps students with:</p>
                    <ul role="list">
                        <li>Design fundamentals such as space, materiality and visualisation</li>
                        <li>Studio-based learning and hands-on projects</li>
                        <li>Problem-solving through real-world design scenarios</li>
                        <li>Exposure to interdisciplinary learning</li>
                        <li>The internships are made mandatory for students to know their strengths and work on themselves.</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne3" aria-expanded="false" aria-controls="flush-collapseOne">
                    <span class="accordion-title">Are there many career prospects I can pursue upon finishing the Interior Design program taught at ISDI?</span>
                </button>
            </h2>
            <div id="flush-collapseOne3" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <p>There are many career prospects students can pursue after finishing their Interior design course at ISDI. The roles are:</p>
                    <ul role="list">
                        <li>Workspace Designer</li>
                        <li>Brand Consultants</li>
                        <li>Interior Designer</li>
                        <li>Exhibition Space Designer</li>
                        <li>Production Set Designer</li>
                        <li>Art Director</li>
                        <li>Retail Designer</li>
                        <li>Interior Consultant</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne4" aria-expanded="false" aria-controls="flush-collapseOne">
                    <span class="accordion-title">How does ISDI nurture creativity and innovation with their Interior Design program?</span>
                </button>
            </h2>
            <div id="flush-collapseOne4" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <p>ISDI nurtures creativity immensely through their Inter Design program. They foster creativity with:</p>
                    <ul role="list">
                        <li>Studio-based and hands-on learning</li>
                        <li>Project-led and experiential approaches</li>
                        <li>Emphasis on design thinking and problem-solving</li>
                        <li>Exploration of materials, space and user experience</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne5" aria-expanded="false" aria-controls="flush-collapseOne">
                    <span class="accordion-title">Is the curriculum of the ISDI Interior Design program aligned with global standards and needs?</span>
                </button>
            </h2>
            <div id="flush-collapseOne5" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <p>Yes, the curriculum of ISDI Interior Design is aligned with global standards and needs. The collaboration with Parsons School of Design ensures a completely globally benchmarked curriculum. The curriculum is:</p>
                    <ul role="list">
                        <li>Curriculum integrates disruptive design sense with experiential learning</li>
                        <li>The curriculum focuses on strengthening their potential to make the interior design field more innovative</li>
                        <li>Real projects and internships help students acknowledge the challenges faced in the interior design field</li>
                        <li>Designed with intellectuals and industry leaders</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne6" aria-expanded="false" aria-controls="flush-collapseOne">
                    <span class="accordion-title">Will I be provided with internship opportunities while studying Interior Design?</span>
                </button>
            </h2>
            <div id="flush-collapseOne6" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <p>Yes, students will be provided with opportunities and internships after finishing their course and graduating from ATLAS ISDI. Our placement committee shares the opportunities. The committee helps in strengthening their portfolio and helps in discovering the right role.</p>
                </div>
            </div>
        </div>
			
		
			
		</div>
	</div>
</section>