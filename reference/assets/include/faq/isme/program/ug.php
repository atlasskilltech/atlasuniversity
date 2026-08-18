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
                        <span class="accordion-title">What undergraduate programs are offered by ATLAS ISME?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne1" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>ATLAS ISME offers several undergraduate programs in BBA (Hons.) and one program in B.Sc. (Hons.), i.e., B.Sc. in Finance.</p>
                        <p>Specialisations such as Finance, Marketing, Digital Branding & Advertising and AI & Emerging Technologies are full-time, 4-year undergraduate programs designed to build industry-ready, future-focused business leaders:</p>
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
                        <p>Students learn about Financial analysis, investment strategies, markets and portfolio management.</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne2" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">Are internships a mandatory part of the ATLAS ISME curriculum? Is there a Placement Team at ATLAS ISME?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne2" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Yes, internships are a mandatory part of the curriculum at ATLAS SkillTech University.</p>
                        <p>The university has a dedicated <b>Career Services Team</b> that supports students with:</p>
                        <ul role="list">
                            <li>Internship opportunities</li>
                            <li>Placement assistance</li>
                            <li>CV building and interview preparation</li>
                            <li>Career guidance and industry connections</li>
                        </ul>
                        <p>This ensures students graduate with both experience and career readiness.</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne3" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">What out-of-classroom learning opportunities are available at ATLAS ISME?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne3" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>ATLAS ISME is proud of its teaching methods. The methods extend beyond traditional learning. They include opportunities, such as</p>
                        <ul role="list">
                            <li><b>Live projects:</b> Students apply theoretical knowledge to real-life scenarios and projects.</li>
                            <li><b>Global immersions:</b> Through international exposure and networking opportunities, students can learn about different businesses.</li>
                            <li><b>Industry mentorship:</b> The program allows students to connect with industry stalwarts and gain knowledge from their expertise.</li>
                            <li><b>ATLAS electives:</b> The ATLAS elective allows students to be a part of the vibrant campus life and learn from the experience.</li>
                            <li><b>Product showcases:</b> ATLAS focuses on developing skills such as critical thinking for students to come up with innovative solutions.</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne4" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">Do CXOs and industry leaders give guest lectures at ATLAS ISME and how does their direct industry teaching differ from traditional classroom learning?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne4" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Yes, at ATLAS ISME, students receive direct industry teaching from CXOs and industry leaders, gaining real-world business insights through guest lectures, masterclasses, etc, unlike traditional classroom learning, which is mostly theory-based.</p>
                        <p>At ISME, students learn directly from top industry leaders, such as CXOs, CEOs, CMOs, startup founders, serial investors and business innovators, to name a few. And these industry leaders bring a wealth of knowledge on current industry trends (firsthand market knowledge), hands-on experience and practical case studies into the classroom teaching, making learning more impactful and relevant for students.</p>
                        <p>Traditional classroom learning focuses solely on theoretical knowledge, whereas ATLAS ISME goes beyond traditional teaching. And this direct industry teaching from CXOs and founders at ATLAS ISME equips students with all the skills necessary for career readiness.</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne5" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">Does ATLAS ISME offer international exchange or global immersion programs?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne5" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Yes, ATLAS ISME offers international exchange and global immersion programs. Harnessing the power of technology, entrepreneurs transform a blank canvas of ideas into vibrant and thriving businesses that create job opportunities and contribute significantly to the national and global economy. With world-class faculty, experiential ecosystems, industry-driven curriculum and future-ready management programs, we transform young learners into leaders.</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne6" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">How does ATLAS ISME help students build both domain depth and cross-functional skills through its T-shaped learning model?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne6" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>ATLAS ISME's learning model is designed for students to specialise in their fields. The domain depth ensures deep expertise through focused specialisations and ensures students receive rigorous training in core areas.</p>
                        <p>Cross-functional skills include:</p>
                        <ul role="list">
                            <li>Interdisciplinary learning</li>
                            <li>Experiential learning</li>
                            <li>Diverse student pathways</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne7" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">What are the career benefits of studying in Mumbai's BKC business district at ATLAS ISME?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne7" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>ATLAS ISME offers unparalleled benefits. Strategic placement in BKC offers numerous opportunities for students. The advantages are:</p>
                        <ul role="list">
                            <li><b>Enhanced placement opportunities:</b> Being a financial hub, the area is home to many MNCs and leading financial institutions, allowing students to engage with corporate environments and have a higher likelihood of securing coveted roles.</li>
                            <li><b>Real-world exposure:</b> With businesses and different activities roaring in the vicinity, students are able to witness real-time market trends and business operations and enrich their academic learning.</li>
                            <li><b>Networking opportunities:</b> The ecosystem of BKC allows students to network and connect with business leaders and take part in events, which enhances their chances to seek better opportunities.</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne8" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">What kinds of real-world simulations and decision-making scenarios are included in the ATLAS ISME academic curriculum?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne8" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>ATLAS offers a rich array of real-world simulations and decision-making scenarios integrated into the academic curriculum. We are renowned for:</p>
                        <ul role="list">
                            <li><b>Case studies:</b> ATLAS extensively utilises current and complex cases from various industries.</li>
                            <li><b>Business simulations:</b> Leveraging advanced business simulation tools, we are able to replicate dynamic market environments, allowing students to experience the immediate consequences of their choices in a risk-free setting.</li>
                            <li><b>Live projects:</b> The program mandates participation in live industry projects and corporate immersions.</li>
                            <li><b>ATLAS Electives:</b> ATLAS electives focus on ensuring students can gain immense learning from structured debates on contemporary business dilemmas, enhancing critical thinking.</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne9" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">What out-of-classroom learning opportunities are available at ATLAS ISME?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne9" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>ATLAS ISME is proud of its teaching methods. The methods extend beyond traditional learning. They include opportunities, such as</p>
                        <ul role="list">
                            <li><b>Live projects:</b> Students apply theoretical knowledge to real-life scenarios and projects.</li>
                            <li><b>Global immersions:</b> Through international exposure and networking opportunities, students can learn about different businesses.</li>
                            <li><b>Industry mentorship:</b> The program allows students to connect with industry stalwarts and gain knowledge from their expertise.</li>
                            <li><b>ATLAS elective:</b> The ATLAS elective allows students to be a part of the vibrant campus life and learn from the experience.</li>
                            <li><b>Product showcases:</b> ATLAS focuses on developing skills such as critical thinking for students to come up with innovative solutions.</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne10" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">Does ATLAS ISME provide CAT and CFA exam coaching on campus?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne10" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Yes, ATLAS ISME provides structured academic support aligned with competitive exams such as CAT and CFA.</p>
                        <p>Students benefit from:</p>
                        <ul role="list">
                            <li>Curriculum-integrated preparation</li>
                            <li>Concept-based learning through case studies</li>
                            <li>Industry-relevant academic content</li>
                        </ul>
                    </div>
                </div>
            </div>
			
		
			
		</div>
	</div>
</section>