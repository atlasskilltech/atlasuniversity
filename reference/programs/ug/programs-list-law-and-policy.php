<?php

$title = "Law and Policy Programs in Mumbai";
$description = "Want to study law and policy? Explore legal careers, specializations, course options and apply now for admissions.";
$keywords = "atlas, programs-list-integrated";
$css = "atlass-fantastic-site-48323a.webflow.690c3a7d32aa2b65c20f8a60-b041f4c74.css";
$js = "https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/js/webflow.ee913841.9c23cc986ec5cec0.js";
$htmlDataId = "690c3a7d32aa2b65c20f8a60";
$body = "body-isme";

include "../../assets/include/header.php" ?>

<div class="inner-header-wrapper full-ht">
	<div class="inner-header-cover">
		<div class="container grow">
			<h1 class="h1-tag">Law &amp; Policy</h1>
		</div>
	</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c8aa550e7529887771c45_lawatlasssss.png" loading="lazy" sizes="(max-width: 1366px) 100vw, 1366px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c8aa550e7529887771c45_lawatlasssss-p-500.png 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c8aa550e7529887771c45_lawatlasssss-p-800.png 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c8aa550e7529887771c45_lawatlasssss-p-1080.png 1080w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690c8aa550e7529887771c45_lawatlasssss.png 1366w" alt="" class="header-image-inner" />
</div>
<div class="section">
	<div class="container">
		<div class="program-list-wrapper">
			<div class="program-list">
				<div class="list-title-wrap">
					<h3 class="h3-tag-bold black mrgbm0">BBA LL.B. (Hons.)</h3>
					<div class="btn-flex"><a id="law" data-id="law" data-wf--button-primary--variant="outline-medium" href="#" class="btn-primary w-variant-6b63810f-e988-0cce-bafa-92afc0c78b1c w-inline-block">
							<div class="button-tx">Download Brochure</div>
						</a><a data-id="" data-wf--button-primary--variant="outline-medium" href="<?php echo $domain ?>schools/law/program-page-law" class="btn-primary w-variant-6b63810f-e988-0cce-bafa-92afc0c78b1c w-inline-block">
							<div class="button-tx">Explore Program</div>
						</a><a Data-id="" data-wf--button-regular--variant="altas-med" href="<?php echo $edudomain ?>applicationform" class="button-regular w-variant-9ad79873-d432-216f-f826-01e9892cb358 w-inline-block">
							<div data-wf--button-space--variant="normal" class="extra-space">
								<div data-font-size="14" class="button-text">Apply Now </div>
								<div class="code-button w-embed w-script">
									<script>
									document.addEventListener("DOMContentLoaded", function() {
										document.querySelectorAll('.button-text').forEach(function(text) {
											var fontsz = text.getAttribute('data-font-size');
											text.style.fontSize = fontsz + 'px';
										});
									});
									</script>
								</div>
							</div>
						</a></div>
				</div>
				<div class="dates-fees-container-atlas">
					<div class="df-container-atlas">
						<div class="df-card atlas-bg">
							<div class="df-txt-wrap">
								<div class="df-text-2 atlas">Eligibility Criteria</div>
							</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690be9dc6aefd2f71dbadb09_28f64a8806bc74ec57598a9667b504e3_Polygon-atlas.png" loading="lazy" alt="" class="image-8" />
						</div>
						<div class="df-card">
							<div class="df-text-2 f14">Indian Boards (ISC / CBSE / State Boards)</div>
							<div class="df-text-1 f18">Minimum 50% in<br />Class XII</div>
						</div>
						<div class="df-card top">
							<div class="df-text-2 f14">A-Levels (UK)</div>
							<div class="df-text-1 f18">GSCE/IGCSE Examinations of the approved British Examination Bodies, with minimum 5 (Five) subjects in A, B, C, D and E grades, including English at Ordinary 'O' Level and 2 subjects at Advanced 'A' Level</div>
						</div>
						<div class="df-card top">
							<div class="df-text-2 f14">International Baccalaureate (IB)</div>
							<div class="df-text-1 f18">A minimum of 24 points, including 3 Higher Level (HL) and 3 Standard Level (SL) subjects.</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="section">
	<div class="container">
	  <?php 
            $chatBxVariant = "w-variant-35db4856-34de-b71f-0f4d-3a27b78fcc63";
            $chatBxText = "What program are you looking for?";
            include "../../assets/include/more-questions.php"
            ?>
	</div>
</div>
<?php include "../../assets/include/faq.php" ?>
<div class="w-embed w-script"><style>
  /* Popup overlay */
  #law-popup-overlay {
    display: none;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    justify-content: center;
    align-items: center;
  }

  /* Popup box */
  /*#law-popup {*/
  /*  background: #fff;*/
  /*  width: 90%;*/
  /*  max-width: 800px;*/
  /*  height: 80%;*/
  /*  position: relative;*/
  /*  border-radius: 8px;*/
  /*  overflow-y: auto;*/
  /*  padding: 20px;*/
  /*}*/
  
  	#law-popup {
      background: #fff;
      width: 100%;
      /*max-width: 800px;*/
      max-width: 580px;
      height: auto;
      max-height: 90vh;
      position: relative;
      border-radius: 8px;
      padding: 20px;
    
      overflow-y: auto;           /* scroll ON rakha — taaki button kabhi na chhupe */
      scrollbar-width: none;      /* Firefox: scrollbar hide */
      -ms-overflow-style: none;   /* old Edge: scrollbar hide */
    }
    #law-popup::-webkit-scrollbar {
      display: none;              /* Chrome/Safari: scrollbar hide */
    }

  /* Close button */
  #law-close {
    position: absolute;
    top: 10px;
    right: 15px;
    background: #000;
    color: #fff;
    border: none;
    font-size: 18px;
    line-height: 1;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    z-index: 10;
  }


</style>

<!-- Hidden popup -->
<div id="law-popup-overlay">
  <div id="law-popup">
    <button id="law-close">✕</button>

    <!-- NoPaperForms widget container -->
    <div id="law-container">
      <iframe id="atlasForm_6a3e7d3ba1fd0680c6c1ba90" src="https://crm.atlasskilltech.app/widgets/6a3e7d3ba1fd0680c6c1ba90/embed" width="100%" height="621" frameborder="0" style="border:none;max-width:100%"></iframe>
      <script>(function(){var f=document.getElementById("atlasForm_6a3e7d3ba1fd0680c6c1ba90");if(!f)return;try{var p=new URLSearchParams(window.location.search),a=[];["utm_source","utm_medium","utm_campaign","utm_content"].forEach(function(k){var v=p.get(k);if(v)a.push(k+"="+encodeURIComponent(v));});if(a.length)f.src+=(f.src.indexOf("?")>=0?"&":"?")+a.join("&");}catch(e){}})();</script>
    </div>
  </div>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    const triggers = document.querySelectorAll('[data-id="law"]');
    const overlay = document.getElementById("law-popup-overlay");
    const closeBtn = document.getElementById("law-close");

    triggers.forEach(trigger => {
      trigger.addEventListener("click", function(e) {
        e.preventDefault();
        overlay.style.display = "flex";

        // Load NoPaperForms script once for LAW
        if (!window.lawNpfLoaded) {
          const s = document.createElement("script");
          s.type = "text/javascript";
          s.async = true;
          s.src = "https://widgets.in5.nopaperforms.com/emwgts.js";
          document.body.appendChild(s);
          window.lawNpfLoaded = true;
        }
      });
    });

    // Close popup
    closeBtn.addEventListener("click", () => {
      overlay.style.display = "none";
    });

    // Close when clicking outside popup
    overlay.addEventListener("click", e => {
      if (e.target === overlay) overlay.style.display = "none";
    });
  });
</script></div>
<?php include "../../assets/include/footer.php" ?>