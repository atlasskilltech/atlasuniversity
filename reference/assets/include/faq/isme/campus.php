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
                        <span class="accordion-title">Where is the ATLAS ISME campus located?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne1" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>The ATLAS ISME campus is located in Bandra Kurla Complex (BKC), Mumbai.</p>
                        <p>Our official address is ATLAS SkillTech University Tower 1, Equinox Business Park, BKC, Lal Bahadur Shastri Marg, off Bandra-Kurla Complex, Ambedkar Nagar, Kurla West, Kurla, Mumbai, Maharashtra 400070.</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne2" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">How accessible is the ATLAS campus?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne2" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>ATLAS ISME is located in the heart of BKC, with easy access to the Mumbai Airport, Bandra and Kurla railway stations and multiple metro lines (Bandra Colony, Santacruz and Sakinaka metro stations). The area is also surrounded by markets, malls, hotels, utility shops and medical facilities.</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne3" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">What facilities are available at the ATLAS ISME campus?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne3" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>ATLAS ISME campus offers a wide range of facilities designed to support student learning, comfort, innovation and overall well-being.</p>
                        <p><b>Campus Facilities:</b></p>
                        <ul role="list">
                            <li>State-of-the-art learning labs</li>
                            <li>Collaborative Zones, Tech-enabled classrooms, Spacious Auditorium</li>
                            <li>A digitally integrated smart library offering extensive resources & comfortable study spaces.</li>
                            <li>Multiple dining options & Cafes and a vibrant courtyard with open spaces</li>
                            <li>Medical Facilities, 24x7 wi-fi campus & security</li>
                            <li>Enterprise incubators to support student startups</li>
                            <li>Gym, sports, & theatre groups, Student Clubs and Organisations to engage students</li>
                            <li>24/7 medical assistance, first-aid facilities and on-campus doctor availability</li>
                            <li>Fully accessible campus infrastructure with elevators and wheelchair-friendly pathways for students with mobility needs</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne4" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">What food options are available on the ATLAS campus?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne4" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Food options include ATLAS Cafeterias (in both buildings), Equinox's Spice Corridor, Subway, Pizza Hut, Thambi, Sabbaro, Third Wave Coffee, Waffles, Society Tea, food carts and vending machines.</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne5" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">Does ATLAS ISME offer student accommodation and what amenities are included in ATLAS student housing?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne5" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Yes, ATLAS offers premium student housing just 10 meters from campus, featuring AC rooms, lounges, gyms, a cafeteria, a medical clinic and 24/7 security.</p>
                        <p>Amenities include Wi-Fi, biometric access, gaming zones, study pods, housekeeping, fitness studios, wellness counsellors and balanced meals served four times a day.</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne6" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">Is the ATLAS ISME campus eco-friendly and what green initiatives does ATLAS follow?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne6" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Yes, the campus integrates solar power, biogas recycling, rainwater harvesting, energy-efficient lighting and smart motion sensors to promote sustainability.</p>
                        <p>ATLAS implements water recycling, LED-based lighting, sensor-based energy conservation and uses borewell water for irrigation, all as part of a future-conscious infrastructure.</p>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne7" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">How is the ATLAS ISME Smart Library helpful to students in terms of technology and access?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne7" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>The ATLAS ISME Smart Library enhances student learning through technology and multiple access (campus & remote) by providing a digital catalogue for easy resource discovery, remote access to journals and databases and a digital repository for e-resources.</p>
                        <ul role="list">
                            <li><b>Online Catalogue:</b> Students can easily search for books and other resources available in the library through the online catalogue, improving discoverability and access.</li>
                            <li><b>Digital Library</b> with RFID Technology (and other automated systems), along with remote access</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne8" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class="accordion-title">Does ATLAS ISME offer on-campus housing?</span>
                    </button>
                </h2>
                <div id="flush-collapseOne8" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <p>Yes, ATLAS ISME provides on-campus housing facilities for outstation students. And we also help students find nearby accommodations.</p>
                        <p><b>In-Campus Hostel:</b></p>
                        <ul role="list">
                            <li>The hostel is located just 10 meters from the University campus</li>
                            <li>Comfortable, secure and well-maintained vibrant living experience</li>
                            <li>24/7 Wi-Fi, electricity and water access.</li>
                            <li>Diverse food options (Veg/Jain/Non-Veg)</li>
                            <li>24/7 Immediate Medical staff & support available.</li>
                        </ul>
                    </div>
                </div>
            </div>
			
		
			
		</div>
	</div>
</section>