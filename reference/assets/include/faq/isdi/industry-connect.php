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
                    <span class="accordion-title">How does Atlas ISDI ensure academic and industry alignment?</span>
                </button>
            </h2>
            <div id="flush-collapseOne1" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <p>ATLAS ISDI has designed its curriculum in collaboration with Parsons School of Design. The curriculum ensures academic excellence and alignment with industry by:</p>
                    <ul role="list">
                        <li>Design professionals design the curriculum</li>
                        <li>Professionals conduct masterclasses for students to learn from experience</li>
                        <li>Students are encouraged to take on projects that challenge them to address real-life design situations</li>
                        <li>Working on projects with leading companies in the industry</li>
                        <li>Regular workshops conducted by industry professionals</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne2" aria-expanded="false" aria-controls="flush-collapseOne">
                    <span class="accordion-title">Does Atlas ISDI have an advisory board for guidance on curriculum and industry relevance?</span>
                </button>
            </h2>
            <div id="flush-collapseOne2" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <p>Yes, ATLAS ISDI has an advisory for guidance and curriculum industry relevance. The Industry Advisory Board helps in guiding the curriculum. The advisory consists of:</p>
                    <ul role="list">
                        <li>Founders, creative directors, innovators and entrepreneurs.</li>
                        <li>Taking guidance from trending tools and offering input to shape future skills</li>
                        <li>Mentors encourage innovation and share reviews based on the current design field.</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne3" aria-expanded="false" aria-controls="flush-collapseOne">
                    <span class="accordion-title">How does ISDI integrate industry learning into its curriculum?</span>
                </button>
            </h2>
            <div id="flush-collapseOne3" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <p>ATLAS ISDI integrates industry into its curriculum in several ways. We aim to blend classroom learning with real-world experience. The industry learnings are integrated through:</p>
                    <ul role="list">
                        <li>Masterclasses with experts</li>
                        <li>Industry-led collaborations and projects</li>
                        <li>Hackathon for understanding real-life disciplines</li>
                        <li>Visits to different design studios for better learning</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne4" aria-expanded="false" aria-controls="flush-collapseOne">
                    <span class="accordion-title">Who are the members of ISDI's Advisory Board and how do they contribute?</span>
                </button>
            </h2>
            <div id="flush-collapseOne4" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <p>The members of the ATLAS ISDI Advisory Board include renowned personalities. They contribute to the curriculum through expertise:</p>
                    <ul role="list">
                        <li>Providing industry insights with their expertise</li>
                        <li>Offering mentorship</li>
                        <li>Career guidance</li>
                        <li>Shaping the future through competitions</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne5" aria-expanded="false" aria-controls="flush-collapseOne">
                    <span class="accordion-title">Does Atlas ISDI organise live projects with brands?</span>
                </button>
            </h2>
            <div id="flush-collapseOne5" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <p>Yes, ATLAS ISDI organises live projects with brands as part of its curriculum. This is in collaboration with Parsons School of Design. The curriculum includes internships with top brands. This internship nurtures:</p>
                    <ul role="list">
                        <li>Applying theoretical knowledge to real-life problems</li>
                        <li>Strengthen problem-solving skills</li>
                        <li>Build a strong portfolio</li>
                        <li>Learn from the experience of senior citizens.</li>
                        <li>Guided by industry experts</li>
                    </ul>
                </div>
            </div>
        </div>
			
		
			
		</div>
	</div>
</section>