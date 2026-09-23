<?php
$title = "ISDI - Thought Leaderships";
$description = "Get in touch with Atlas Skilltech.";
$keywords = "atlas, contact";
$css = "atlass-fantastic-site-48323a.webflow.68e7936f141c3283f461d766-366cfd569.css";
$js = "https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/js/webflow.ea20fc56.1cfa9d115d8474b9.js";
$htmlDataId = "68e7936f141c3283f461d766";
$body = "body isdi-page";

include "../assets/include/header.php" ?> 

<style>
    .inner-header-wrapper {
        background-image: none;
        background-position: 0 0;
        background-repeat: repeat;
        background-size: auto;
        width: 100%;
        height: 658px;
        position: relative;
    }
    
    .inner-header-wrapper.mrgbtm {
        margin-bottom: 56px;
    }
    
    .inner-header-cover {
        z-index: 1;
        background-image: linear-gradient(#0000, #000000e6);
        align-items: flex-end;
        height: 50%;
        padding-bottom: 56px;
        display: flex;
        position: absolute;
        inset: auto 0% 0%;
    }
    
    .container.btm-flext {
        grid-column-gap: 100px;
        grid-row-gap: 100px;
        flex: 1;
        justify-content: space-between;
        align-items: flex-end;
        display: flex;
    }
    
    .h1-tag {
        color: #fff;
        margin-top: 0;
        margin-bottom: 0;
        font-size: 56px;
        font-weight: 400;
        line-height: 1.2;
    }
    
    .header-image-inner {
        object-fit: cover;
        width: 100%;
        height: 100%;
        display: block;
    }
    
    .isdi-page .section {
        padding: 0px 0px;
    }
    
    .section {
        background-color: #0000;
        height: auto;
        padding-top: 0px;
        padding-bottom: 60px;
        display: block;
        overflow: hidden;
    }
    
    .container {
        z-index: 1;
        scrollbar-width: none;
        border-bottom: 0 solid #000;
        border-left: 0 #000;
        flex: none;
        max-width: 1366px;
        margin: 0 auto;
        padding-left: 62px;
        padding-right: 62px;
        position: relative;
    }

.common-flex-16-wrap {
    grid-column-gap: 16px;
    grid-row-gap: 16px;
    flex-flow: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    display: flex;
}

.card {
    color: #000;
    background-color: #fff;
    border: 1px #d9d9d9;
    border-radius: 16px;
    flex: none;
    width: 295px;
    overflow: hidden;
}

.card:where(.w-variant-69867ffd-54e1-e69a-29fa-25eb32f38093) {
    background-color: #f2f2f2;
    border-radius: 0;
    width: 285px;
    height: 517px;
}

.c-image {
    background-color: #8facec;
    height: 298px;
    position: relative;
}

.c-a-image {
    object-fit: cover;
    width: 100%;
    height: 100%;
}

.card-a-gradient {
    height: 50%;
    position: absolute;
    inset: auto 0% 0%;
}

.content-box {
    padding: 16px;
}
       
.c-title {
    direction: ltr;
    text-overflow: ellipsis;
    height: 50px;
    font-weight: 600;
    overflow: hidden;
}   

.c-date {
    grid-column-gap: 6px;
    grid-row-gap: 6px;
    justify-content: flex-start;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 44px;
    display: flex;
}

.day {
    font-size: 12px;
}

.button-tertiary {
    grid-column-gap: 5px;
    grid-row-gap: 5px;
    color: #fff;
    text-align: left;
    background-color: #ec1376;
    border-radius: 24px;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    height: 44px;
    padding: 0 24px;
    font-size: 14px;
    line-height: 1.5;
    text-decoration: none;
    display: flex;
}

.button-tertiary:where(.w-variant-289d3037-974a-8f4a-a16a-2673b4ff56dd) {
    background-color: #EC1376;
    color: #000;
}


.text-t {
    line-height: 1.2;
}

.icon-t:where(.w-variant-289d3037-974a-8f4a-a16a-2673b4ff56dd), .icon-t:where(.w-variant-253dce77-5ef9-5168-c6d9-857f9d8bdac0) {
    filter: invert();
}

.blog-tabs-container {
  width: 100%;
  display: flex;
  margin: 40px 0;
}

.blog-tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* Base tab */
.blog-tab {
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
  color: #000;
  font-weight: 500;
  border: 1px solid #ccc;
  transition: all 0.3s ease;
}

/* Hover effect */
.blog-tab:hover {
  background-color: #EC1376;
  border-color: transparent;
  color: #fff;
}

/* Active tab */
.blog-tab.active {
  background-color: #EC1376;
  border-color: transparent;
  color: #fff;
}

.no-blogs {
    width: 100%;
    text-align: center;
    padding: 40px 20px;
    font-size: 18px;
    color: #666;
}

        
    @media screen and (max-width: 767px) {
        .inner-header-wrapper.mrgbtm {
            margin-bottom: 40px;
        }
        
        .inner-header-cover {
            height: 100%;
        }
        
        .container.btm-flext {
            grid-column-gap: 22px;
            grid-row-gap: 22px;
            flex-flow: column;
            justify-content: flex-start;
            align-items: flex-start;
        }
        
        .h1-tag {
            font-size: 28px;
            font-weight: 600;
            line-height: 1.5;
        }
        
        .section {
            padding-top: 0px;
            padding-bottom: 40px;
        }
        
        .container {
            padding-left: 22px;
            padding-right: 22px;
        }
        
        .common-flex-16-wrap {
            justify-content: center;
            align-items: center;
        }
        
        .card {
            width: 295px;
        }
        
            .card:where(.w-variant-69867ffd-54e1-e69a-29fa-25eb32f38093) {
            width: 100%;
            height: auto;
        }
    
        .blog-tabs {
            flex-wrap: nowrap;
            overflow-x: auto;
            justify-content: flex-start;
            padding-bottom: 5px;
        
            /* Hide scrollbar */
            -ms-overflow-style: none;  /* IE */
            scrollbar-width: none;     /* Firefox */
          }
        
          .blog-tabs::-webkit-scrollbar {
            display: none; /* Chrome, Safari */
          }
        
          .blog-tab {
            flex: 0 0 auto;
            font-size: 14px;
            padding: 8px 16px;
          }
          
          .blog-tabs-container {
              margin: 20px 0;
            }
      
    }
    
</style>


<div class="inner-header-wrapper mrgbtm">
	<div class="inner-header-cover">
		<div class="container btm-flext">
			<h1 class="h1-tag">Thought Leadership<br /></h1>
		</div>
	</div><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/687c0174c4b27f6a20fe2fc8_publication-image.webp" loading="lazy" sizes="(max-width: 1439px) 100vw, 1365.9896240234375px" srcset="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/687c0174c4b27f6a20fe2fc8_publication-image-p-500.webp 500w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/687c0174c4b27f6a20fe2fc8_publication-image-p-800.webp 800w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/687c0174c4b27f6a20fe2fc8_publication-image-p-1080.webp 1080w, https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/687c0174c4b27f6a20fe2fc8_publication-image.webp 1366w" alt="" class="header-image-inner" />
</div>
<div class="section" id="blog-section">
	<div class="container">

        <!--Tabs Section-->
        <div class="blog-tabs-container">
          <div class="blog-tabs">
        
            <a href="https://atlasuniversity.edu.in/thought-leaderships#blog-section" class="blog-tab">ATLAS</a>
            <a href="https://atlasuniversity.edu.in/schools/isdi/thought-leaderships/" class="blog-tab active">ISDI</a>
            <a href="https://atlasuniversity.edu.in/schools/isme/thought-leaderships#blog-section" class="blog-tab">ISME</a>
            <a href="https://atlasuniversity.edu.in/schools/ugdx/thought-leaderships#blog-section" class="blog-tab">uGDX</a>
            <a href="https://atlasuniversity.edu.in/schools/law/thought-leaderships#blog-section" class="blog-tab">LAW</a>
        
          </div>
        </div>
        
		<div class="w-dyn-list">
			<div role="list" class="common-flex-16-wrap w-dyn-items">
				
				<?php

                    $school = 'isdi';
                    $apiUrl = "https://uat-dashboard.atlasskilltech.app/api/atlas-blogs/by-school/" . $school;

                    // Use cURL for better error handling and timeout control
                    $ch = curl_init();
                    curl_setopt($ch, CURLOPT_URL, $apiUrl);
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
                    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
                    curl_setopt($ch, CURLOPT_HTTPHEADER, [
                        'Accept: application/json'
                    ]);

                    $response = curl_exec($ch);
                    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                    $curlError = curl_error($ch);
                    curl_close($ch);

                    $cards = [];

                    if ($response !== false && $httpCode === 200) {
                        $apiData = json_decode($response, true);

                        if (json_last_error() === JSON_ERROR_NONE && isset($apiData['success']) && $apiData['success'] === true) {
                            $cards = $apiData['data'] ?? [];
                        }
                    }

                    if (!empty($cards)) {
                        foreach ($cards as $card) {

                            // Only show published blogs for the current school
                            if (($card['status'] ?? '') !== 'published') continue;
                            if (($card['school'] ?? '') !== $school) continue;
                ?>
                    
                    <div role="listitem" class="w-dyn-item">
                        <div BG-Color="#F2F2F2" data-wf--card-a--variant="type-b-responsive" class="card w-variant-69867ffd-54e1-e69a-29fa-25eb32f38093">
                            
                            <div class="c-image">
                                <img src="<?= htmlspecialchars($card['image'] ?? ''); ?>" loading="lazy" alt="<?= htmlspecialchars($card['alt_text'] ?? ''); ?>" class="c-a-image" />
                                <div class="card-a-gradient"></div>
                            </div>
                    
                            <div class="content-box">
                                <div class="c-title"><?= htmlspecialchars($card['title'] ?? ''); ?></div>
                    
                                <div class="c-date">
                                    <img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68545623f9f7d3f4be0c1f98_calendar.svg" loading="lazy" alt="" class="calendar" />
                                    <div class="day"><?= htmlspecialchars($card['date_label'] ?? ''); ?></div>
                                </div>
                    
                                <a data-wf--button-tertiary--variant="mint" href="<?= htmlspecialchars($card['link'] ?? '#'); ?>" class="button-tertiary w-variant-289d3037-974a-8f4a-a16a-2673b4ff56dd w-inline-block">
                                    <div class="text-t">Read now</div>
                                    <img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6852d19acdf72353d32adc95_arrow-downward.svg" loading="lazy" alt="" class="icon-t w-variant-289d3037-974a-8f4a-a16a-2673b4ff56dd" />
                                </a>
                            </div>
                    
                        </div>
                    </div>
                    
                <?php
                        }
                    } else {
                ?>
                    <div class="no-blogs">No blogs available at the moment. Please check back later.</div>
                <?php
                    }
                ?>
				
			</div>
		</div>
	</div>
</div>

<script>
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.card').forEach(function(box) {
        var bgColor = box.getAttribute('bg-color');
        if (bgColor) {
            box.style.backgroundColor = bgColor;
        }
    });
});
</script>



<?php include "../assets/include/footer.php" ?>
