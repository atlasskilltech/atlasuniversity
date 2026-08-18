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
            <span class="accordion-title">What is the Global Immersion Program at ATLAS SkillTech University?</span>
        </button>
    </h2>
    <div id="flush-collapseOne1" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
            <p>The Global Immersion Program at ATLAS ISME is a curated international learning experience that blends industry exposure, academic learning and cultural immersion. It provides students and faculty with 7–10 days of exposure to top universities and global companies. Students interact with international faculty, explore different cultures, visit top multinational corporations, participate in academic sessions, networking events and certification programs across cities like New York, London and Singapore.</p>
            <p>Global immersions at ATLAS equip students with global business acumen, cross-cultural competence and practical insights into how businesses operate worldwide.</p>
            <p><b>Example: New York Global Immersion</b></p>
            <p>During the New York Immersion, students visited leading institutions, including:</p>
            <ul role="list">
                <li>Columbia University School of Professional Studies</li>
                <li>NYU School of Professional Studies</li>
                <li>NYU Stern School of Business</li>
                <li>Pace University Lubin School of Business</li>
                <li>Fordham Gabelli School of Business</li>
                <li>Parsons School of Design</li>
            </ul>
            <p>These visits included classroom sessions, business & tech. learning, design workshops and guest lectures.</p>
            <p><b>Industry Exposure in New York included:</b></p>
            <ul role="list">
                <li>Bloomberg (Fintech & Data Analytics)</li>
                <li>ICICI Bank (Global Finance)</li>
                <li>Arcesium (AI in Finance)</li>
                <li>MRM (Advertising & Branding)</li>
                <li>Zoo Media (AI in Marketing)</li>
            </ul>
            <p>Sessions covered applications of AI, GPT, finance, design thinking, publishing and entrepreneurship.</p>
            <p style="margin-bottom:0;"><b>Certifications or credentials that students received</b></p>
            <p>Students completed a certified 3-day executive education program at NYU School of Professional Studies, covering areas such as luxury branding, sports management, sustainability and publishing innovation.</p>
        </div>
    </div>
</div>

<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne2" aria-expanded="false" aria-controls="flush-collapseOne">
            <span class="accordion-title">How does the Global Immersion Program benefit ATLAS students?</span>
        </button>
    </h2>
    <div id="flush-collapseOne2" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
            <p>The program bridges classroom learning with global exposure through interactive and hands-on experiences.</p>
            <p>Key outcomes include:</p>
            <ul role="list">
                <li>Global academic exposure and perspective</li>
                <li>Practical industry readiness</li>
                <li>Cross-cultural communication skills</li>
                <li>Certifications from international institutions</li>
                <li>Enhanced creativity and entrepreneurial thinking</li>
                <li>Stronger career and academic outlook</li>
                <li>Networking with global peers and professionals</li>
            </ul>
            <p>Sessions often include case studies, group projects, presentations and experiential learning formats.</p>
        </div>
    </div>
</div>

<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne3" aria-expanded="false" aria-controls="flush-collapseOne">
            <span class="accordion-title">Who can participate in the Global Immersion Program at ATLAS?</span>
        </button>
    </h2>
    <div id="flush-collapseOne3" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
            <p>The program is open to undergraduate and postgraduate students across all schools at ATLAS SkillTech University, including ISME, ISDI, uGDX and the School of Law. Selection is typically based on:</p>
            <ul role="list">
                <li>Student interest and application</li>
                <li>Academic performance</li>
                <li>Leadership potential and participation</li>
            </ul>
            <p>Applications are invited during specific admission windows.</p>
        </div>
    </div>
</div>

<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne4" aria-expanded="false" aria-controls="flush-collapseOne">
            <span class="accordion-title">Are faculty involved in the Global Immersion Program?</span>
        </button>
    </h2>
    <div id="flush-collapseOne4" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
            <p>Yes. All the global immersions happen under the supervision of our experienced faculty. Senior faculty from ATLAS accompany students to guide them academically and facilitate global collaborations. Faculty also engage in institutional meetings to establish long-term partnerships with international universities.</p>
        </div>
    </div>
</div>

<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne5" aria-expanded="false" aria-controls="flush-collapseOne">
            <span class="accordion-title">Is the ATLAS Global Immersion only for Management students?</span>
        </button>
    </h2>
    <div id="flush-collapseOne5" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
            <p>No, the program is open to students across disciplines.</p>
            <p>While management students from ISME may focus on entrepreneurship and global strategy, students from design, technology and law programs participate in domain-specific experiences.</p>
            <p>For example, in Paris, design students explore luxury fashion, branding and event planning through workshops at institutions such as International Fashion Academy.</p>
        </div>
    </div>
</div>

<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne6" aria-expanded="false" aria-controls="flush-collapseOne">
            <span class="accordion-title">Do ATLAS students visit or engage with global firms? Which industries and companies have ATLAS students visited in the past under global immersions?</span>
        </button>
    </h2>
    <div id="flush-collapseOne6" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
            <p>Yes, ATLAS students engage with top-tier companies such as:</p>
            <p>Google, WPP Group, Samsung, Bloomberg, Deloitte, Red Fuse, Mini Cooper Factory, Dubai Technology Entrepreneurship Centre (DTEC), etc.</p>
            <p>These visits expose students to sectors such as finance, fintech, retail, energy, automotive, advertising, media, technology, automotive, luxury fashion, sustainability, etc. These visits also offer insights into real-world business operations, innovation and global markets.</p>
        </div>
    </div>
</div>

<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne7" aria-expanded="false" aria-controls="flush-collapseOne">
            <span class="accordion-title">What kind of workshops and academic sessions are included in global immersions?</span>
        </button>
    </h2>
    <div id="flush-collapseOne7" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
            <p>Students participate in a variety of experiential learning formats, including:</p>
            <ul role="list">
                <li>Entrepreneurship and business incubation workshops</li>
                <li>Case study-based learning</li>
                <li>Group presentations and collaborative problem-solving</li>
                <li>Academic sessions at international universities</li>
            </ul>
            <p>All sessions are led by global faculty and industry experts.</p>
        </div>
    </div>
</div>

<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne8" aria-expanded="false" aria-controls="flush-collapseOne">
            <span class="accordion-title">Which universities have ATLAS students visited in the past under the global immersions program?</span>
        </button>
    </h2>
    <div id="flush-collapseOne8" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
            <p>Some prestigious institutions that have hosted ATLAS students include:</p>
            <ul role="list">
                <li>London School of Economics (LSE)</li>
                <li>London Business School</li>
                <li>University of Oxford – Somerville College</li>
                <li>New York Film Academy</li>
                <li>Stanford University</li>
                <li>NYU SPS & Stern NewYork University</li>
                <li>MIT Media Lab</li>
                <li>Columbia University School of Professional Studies</li>
                <li>Parsons School of Design New York</li>
                <li>International Fashion Academy (IFA) Paris, etc.</li>
            </ul>
            <p>Each university provides custom-designed sessions aligned with students' fields of study.</p>
        </div>
    </div>
</div>

<div class="accordion-item">
    <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne9" aria-expanded="false" aria-controls="flush-collapseOne">
            <span class="accordion-title">Is the Global Immersion program the same for all courses and schools at ATLAS?</span>
        </button>
    </h2>
    <div id="flush-collapseOne9" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
            <p>No, the Global Immersion experience is tailored to each program at ATLAS SkillTech University.</p>
            <ul role="list">
                <li>ISME (Management): Focus on entrepreneurship, innovation and global strategy</li>
                <li>ISDI (Design): Exposure to fashion weeks, design studios and branding workshops</li>
            </ul>
            <p>Each itinerary is designed to be academically relevant and industry-specific.</p>
        </div>
    </div>
</div>
		
		</div>
	</div>
</section>