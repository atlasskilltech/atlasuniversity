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
                    <span class="accordion-title">What is the student experience like at Atlas ISDI?</span>
                </button>
            </h2>
            <div id="flush-collapseOne1" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <p>ATLAS ISDI offers an immersive and multidisciplinary student experience built around design-led learning and innovation. With a curriculum supported by Parsons School of Design, students engage in hands-on projects, workshops, industry interactions and collaborative learning. Student life includes:</p>
                    <ul role="list">
                        <li>Participation in design competitions and showcases</li>
                        <li>Workshops and masterclasses led by industry experts</li>
                        <li>Project-based learning to build portfolios</li>
                        <li>Cultural events, clubs and campus activities that support personal and creative growth</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne2" aria-expanded="false" aria-controls="flush-collapseOne">
                    <span class="accordion-title">What facilities and campus infrastructure does Atlas ISDI offer?</span>
                </button>
            </h2>
            <div id="flush-collapseOne2" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <p>ATLAS ISDI provides a modern, design-focused campus environment with industry-standard infrastructure that supports creative learning. Facilities include:</p>
                    <ul role="list">
                        <li>Design studios and collaborative workspaces</li>
                        <li>Fashion labs and studios</li>
                        <li>Product design workshops</li>
                        <li>Digital and UX labs</li>
                        <li>Maker spaces for prototyping and experimentation</li>
                    </ul>
                    <p>These facilities are designed to enable hands-on learning, innovation and portfolio development.</p>
                </div>
            </div>
        </div>
        
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne3" aria-expanded="false" aria-controls="flush-collapseOne">
                    <span class="accordion-title">What specialisation options does ATLAS ISDI offer?</span>
                </button>
            </h2>
            <div id="flush-collapseOne3" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <p>ATLAS ISDI stands out from other institutions for its interdisciplinary teaching methods. We have designed the curriculum from an international perspective in collaboration with Parsons School of Design. ATLAS ISDI offers its students various design specialisations, such as:</p>
                    <ul role="list">
                        <li>Animation & VFX</li>
                        <li>Communication Design</li>
                        <li>Fashion Communication & Styling</li>
                        <li>Fashion Design</li>
                        <li>Interior Design</li>
                        <li>Product Design</li>
                        <li>Strategic Design Management</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne4" aria-expanded="false" aria-controls="flush-collapseOne">
                    <span class="accordion-title">What should one expect from student life at Atlas ISDI?</span>
                </button>
            </h2>
            <div id="flush-collapseOne4" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <p>Students at ATLAS ISDI are expected to have a thriving and vibrant learning experience. With interactive faculty and accommodating students from diverse backgrounds, each student can enjoy a rich learning experience at ATLAS ISDI.</p>
                    <ul role="list">
                        <li>Students are encouraged to work on projects which make them aware of the ongoing challenges</li>
                        <li>Many festivals aim to showcase the students' design abilities.</li>
                        <li>Active participation in clubs facilitates networking and provides access to exclusive opportunities</li>
                        <li>A plethora of kiosks and food joints, where students can interact and actively blend with other students</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne5" aria-expanded="false" aria-controls="flush-collapseOne">
                    <span class="accordion-title">What infrastructure and facilities support student learning?</span>
                </button>
            </h2>
            <div id="flush-collapseOne5" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <p>ATLAS ISDI has been renowned for its facilities and infrastructure. The vast campus itself is a testament to their growth and aim to ensure students have a fun learning experience. ATLAS ISDI supports students' learning by providing them with housing. ATLAS ISDI supports student learning by providing housing facilities within a 10-meter radius. Along with that, ATLAS ISDI has state-of-the-art infrastructure with:</p>
                    <ul role="list">
                        <li>Industry-grade design labs</li>
                        <li>Immersive workshops</li>
                        <li>Talks led by CXO and industry experts</li>
                        <li>Tech enables classrooms</li>
                        <li>Education in a real-life setting</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne6" aria-expanded="false" aria-controls="flush-collapseOne">
                    <span class="accordion-title">What kind of extracurricular opportunities does ISDI offer?</span>
                </button>
            </h2>
            <div id="flush-collapseOne6" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <p>ATLAS ISDI offers its students a variety of events for them to participate in and cherish their campus life. From flagship events to cultural events, ATLAS ISDI is always thriving throughout the year. Extracurricular activities offered by ATLAS ISDI are:</p>
                    <ul role="list">
                        <li>Design showcases and exhibitions</li>
                        <li>Industry masterclasses and workshops</li>
                        <li>Hackathons and creative challenges</li>
                        <li>Cultural festivals and student-led events</li>
                        <li>Podcasts & Fireside Chats</li>
                    </ul>
                    <p>These interactions boost engagement by allowing students to display projects, share ideas and connect with visitors.</p>
                </div>
            </div>
        </div>
        
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne7" aria-expanded="false" aria-controls="flush-collapseOne">
                    <span class="accordion-title">Does ISDI offer global exposure opportunities?</span>
                </button>
            </h2>
            <div id="flush-collapseOne7" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <p>Yes, ATLAS ISDI offers global exposure opportunities. The thoughtfully globally immersed curriculum is developed in collaboration with Parsons School of Design. The global exposure opportunities are:</p>
                    <ul role="list">
                        <li>Fashion design students have the opportunity to work with eminent personalities and participate in fashion week projects in Paris</li>
                        <li>Interior design students can engage with students in Paris and visit fairs and exhibitions as part of the global immersion modules of the program</li>
                        <li>ATLAS ISDI encourages cross-cultural studies, enabling students to engage in international projects that align with their areas of interest</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne8" aria-expanded="false" aria-controls="flush-collapseOne">
                    <span class="accordion-title">How diverse is the student community at Atlas ISDI?</span>
                </button>
            </h2>
            <div id="flush-collapseOne8" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <p>The community at ATLAS ISDI is quite diverse, inclusive and accommodating. We aim to create a culturally rich and creative environment for the students.</p>
                    <ul role="list">
                        <li>ATLAS Elective allows students to communicate with students from different interests</li>
                        <li>We aim to bring students together and create a dynamic, inclusive environment for everyone through events</li>
                        <li>Collaborative workshops invite parents and students together, creating a space for diverse interaction</li>
                    </ul>
                </div>
            </div>
        </div>
			
		
			
		</div>
	</div>
</section>