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
                        <span class="accordion-title">Does ISDI provide support for aspiring entrepreneurs?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne1" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Yes, ATLAS ISDI supports entrepreneurship. The thoughtfully curated module, in collaboration with Parsons School of Design, is designed for students to learn about the principles as well as the dynamics of business. The curriculum is mostly aimed at:</p>
                        <ul role="list">
                            <li>Project-based learning that builds problem-solving and innovation skills</li>
                            <li>Exposure to real-world challenges through assignments and collaborations</li>
                            <li>Interdisciplinary learning that combines design with business perspectives</li>
                            <li>Global exposure elements that broaden understanding of international markets</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne2" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">Can ATLAS ISDI students start their ventures after graduation?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne2" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Yes, ATLAS ISDI graduates who have completed their design program can effortlessly open their own ventures. This can be easily achieved because:</p>
                        <ul role="list">
                            <li>ATLAS ISDI curates a curriculum that includes modules on entrepreneurial leadership. The modules encourage a business mindset with innovation and design in the lead.</li>
                            <li>The learning environment at ATLAS ISDI is nurtured by a mentorship ecosystem where industry stalwarts lead masterclasses for students.</li>
                            <li>Students gain comprehensive knowledge about innovation, entrepreneurship and practical challenges.</li>
                            <li>Graduates graduate with a mindset that combines design and entrepreneurship skills, which are crucial for their venture.</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne3" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">Does ISDI support entrepreneurship?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne3" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Yes, entrepreneurship is integrated into the ATLAS ISDI learning experience. Students develop entrepreneurial capabilities through:</p>
                        <ul role="list">
                            <li>Industry collaborations and live projects</li>
                            <li>Capstone projects that encourage independent thinking</li>
                            <li>Internships and exposure to real-world business environments</li>
                            <li>Portfolio development that reflects both creative and strategic skills</li>
                        </ul>
                    </div>
                </div>
            </div>
			
		
			
		</div>
	</div>
</section>