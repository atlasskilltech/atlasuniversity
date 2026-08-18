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
                        <span class="accordion-title">What Programs are offered at ATLAS ISME?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne1" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>ATLAS ISME is a reputed institution that is known for its distinct teaching methods. We are UGC recognised and offer the following specialised undergraduate programs:</p>
                        <ul role="list">
                            <li>BBA / BBA Hons. (With Majors & Minors)</li>
                            <li>BBA / BBA (Hons.) Majoring in Marketing</li>
                            <li>BBA / BBA (Hons.) Majoring in Finance</li>
                            <li>BBA / BBA (Hons.) Majoring in Business Analytics</li>
                            <li>BBA / BBA (Hons.) Majoring in Digital Branding & Advertising</li>
                            <li>BBA / BBA (Hons.) Majoring in AI & Emerging Technologies</li>
                            <li>BBA / BBA (Hons.) Majoring in Business Psychology</li>
                            <li>BBA / BBA (Hons.) International Accounting and Finance</li>
                            <li>B.Sc (Hons.) in Finance</li>
                            <li>B.Sc (Hons.) in Economics & Data Analytics</li>
                        </ul>
                        <p>These are 4-year programs that are taught by experts and include global immersions and equip students with the skills required for the industry.</p>
                        <p>Please note that we do not offer any diploma courses or standalone certificate courses.</p>
                        <p><b>ATLAS ISME's program equips you to become a future-ready leader with:</b></p>
                        <ul role="list">
                            <li>Multidisciplinary Education for a dynamic business world.</li>
                            <li>Entrepreneurial Skills to thrive in any industry</li>
                            <li>International Exposure for a global perspective.</li>
                            <li>Industry-Focused Education through exclusive masterclasses and industry visits by top professionals.</li>
                            <li>Tech-Integrated Learning to prepare you for a digital-first business environment.</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne2" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">Do ATLAS ISME offer bachelor's or UG programs and what are the specialisations available?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne2" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Yes, ATLAS ISME offers full-time undergraduate (UG) programs, primarily:</p>
                        <p><b>BBA / BBA (Hons.)</b></p>
                        <p>This is offered with multiple specialisations/majors, including:</p>
                        <ul role="list">
                            <li>Marketing</li>
                            <li>Finance</li>
                            <li>Business Analytics</li>
                            <li>Digital Branding & Advertising</li>
                            <li>AI & Emerging Technologies</li>
                            <li>Business Psychology</li>
                            <li>International Accounting and Finance</li>
                        </ul>
                        <p>Students can also opt for a <b>BBA (Hons.) with Majors & Minors</b>, allowing flexibility to combine disciplines.</p>
                        <p><b>B.Sc. (Hons.) Programs</b></p>
                        <ul role="list">
                            <li>B.Sc. (Hons.) in Finance</li>
                            <li>B.Sc. (Hons.) in Economics & Data Analytics</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne3" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">Are ATLAS ISME undergraduate programs UGC-certified?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne3" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Yes, all the undergraduate programs at ATLAS ISME, i.e. BBA / BBA (Hons) and B.Sc (Hons.), are UGC-recognised.</p>
                        <p>ATLAS SkillTech University is recognised by the University Grants Commission (UGC) under Section 2(f) of the UGC Act, 1956 and is established by an Act of the Maharashtra State Legislature. It is also a member of the Association of Indian Universities.</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne4" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">What is the Multidisciplinary Approach at ATLAS ISME?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne4" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Design thinking, creativity and technological innovation are what fuel our Multidisciplinary Approach at ATLAS ISME</p>
                        <p>Rooted in interdisciplinary skill development, our business programs, bolstered by a tech-integrated campus, offer every learner the unique opportunity to pursue diverse interests.</p>
                        <p>At ATLAS ISME, we always ensure flexibility. Our main focus is for students to explore diverse interests and broaden their horizons by taking carefully curated electives in areas like fashion design, AI & machine learning and VFX, even alongside a business degree. This flexibility is key to developing well-rounded, future-ready professionals.</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne5" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">Do ATLAS ISME really provide industry immersions?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne5" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Yes, ATLAS ISME School of Management & Entrepreneurship works intricately with the dynamic business industry bustling right outside the campus gates to create unmatched opportunities like:</p>
                        <ul role="list">
                            <li>Industry masterclasses</li>
                            <li>Internships</li>
                            <li>Industry mentorship</li>
                            <li>Guest lectures and visiting faculty</li>
                            <li>Exposure to real-world business practices</li>
                        </ul>
                        <p>Our boundary-pushing management courses boast an industry-recognised curriculum, backed by global standards of business practice, designed to help students develop critical Industry 4.0 skills and make an unforgettable mark on the international stage.</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne6" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">What are the top career opportunities after a BBA from ATLAS ISME?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne6" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>A BBA (Hons.) program opens doors to a variety of career paths depending on their specialisation and interests, such as:</p>
                        <ul role="list">
                            <li>Marketing Executive/Manager</li>
                            <li>Startup Founder/Entrepreneur,</li>
                            <li>Financial Analyst</li>
                            <li>Business Analyst</li>
                            <li>Product Manager</li>
                            <li>Credit Analysts</li>
                            <li>Business Development Manager</li>
                            <li>Data Analyst</li>
                            <li>Management Trainee</li>
                            <li>Portfolio Manager</li>
                            <li>Investment Banker, etc.</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne7" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">What are the top career opportunities after a BSC in Finance from ATLAS ISME?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne7" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>After completing a B.Sc. in Finance from ATLAS ISME, students can pursue any of these top career opportunities:</p>
                        <ul role="list">
                            <li>Financial Analyst</li>
                            <li>Investment Banker</li>
                            <li>Corporate Finance</li>
                            <li>Wealth Management</li>
                            <li>Risk Management</li>
                            <li>Mutual Fund Analyst</li>
                            <li>Economic Research Analyst</li>
                            <li>Mergers & Acquisitions (M&A) Analyst, etc.</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne8" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">How are ATLAS ISME's future-focused programs different from a traditional BBA degree?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne8" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>ATLAS ISME's programs are designed to be industry-relevant and future-oriented, featuring:</p>
                        <ul role="list">
                            <li>Exposure to emerging fields like AI, analytics and digital business</li>
                            <li>Practical, application-based learning</li>
                            <li>Specialised pathways instead of only general management education</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne9" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">What kinds of real-world simulations and decision-making scenarios are included in the ATLAS ISME academic curriculum?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne9" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>ATLAS offers a rich array of real-world simulations and decision-making scenarios integrated into the academic curriculum. We are renowned for:</p>
                        <ul role="list">
                            <li><b>Case studies:</b> ATLAS extensively utilises current and complex cases from various industries.</li>
                            <li><b>Business simulations:</b> Leveraging advanced business simulation tools, we are able to replicate dynamic market environments, allowing students to experience the immediate consequences of their choices in a risk-free setting.</li>
                            <li><b>Live projects:</b> The program mandates participation in live industry projects and corporate immersions.</li>
                            <li><b>ATLAS electives:</b> ATLAS electives focus on ensuring students can gain immense learning from structured debates on contemporary business dilemmas, enhancing critical thinking.</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne10" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">Can ATLAS ISME undergraduate students launch real startups while earning credits and how do these ventures receive support?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne10" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>ATLAS ISME focuses on equipping students with entrepreneurial skills. The curriculum enables students to prepare for real VC pitches and explore startup ideas. The faculty assists students with building and launching ventures. We distinguish ourselves from other reputable institutions by offering</p>
                        <ul role="list">
                            <li>Credit-bearing ventures</li>
                            <li>Structured curriculum</li>
                            <li>Real-world application</li>
                            <li>Incubation support and mentorship</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne11" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">Does ATLAS ISME have campus placements for its students? What are some real career outcomes of ATLAS ISME students?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne11" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Yes, ATLAS ISME provides career development and placement support, along with industry exposure and internships to enhance employability.</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne12" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">Do ATLAS ISME offer experiential learning? What is the teaching methodology at ATLAS ISME?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne12" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Yes, ATLAS ISME follows an experiential, industry-integrated teaching methodology.</p>
                        <p><b>1. Inside the classroom learning at ATLAS ISME</b></p>
                        <ul role="list">
                            <li>Case Studies</li>
                            <li>Discussions & Debates</li>
                            <li>Academic Articles</li>
                            <li>Text-Book References</li>
                            <li>Industry Notes</li>
                        </ul>
                        <p><b>2. Outside the classroom learning</b></p>
                        <ul role="list">
                            <li>Industry Integration</li>
                            <li>Industry Immersions & Visits</li>
                            <li>Internships</li>
                            <li>CXO Masterclasses</li>
                            <li>Mentorship</li>
                            <li>Live Projects</li>
                            <li>Extra Curriculars Sports Clubs</li>
                        </ul>
                    </div>
                </div>
            </div>
			
		
			
		</div>
	</div>
</section>