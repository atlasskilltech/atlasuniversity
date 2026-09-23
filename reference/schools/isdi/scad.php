<?php
$title = "ATLAS SkillTech University";
$description = "Get in touch with Atlas Skilltech.";
$keywords = "atlas, contact";
$css = "atlass-fantastic-site-48323a.webflow.68e750599c3f5a0512e8f518-6af755fdd.css";
$js = "https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/js/webflow.47e2f3e5.603494a8f4839ac2.js";
$htmlDataId = "68e750599c3f5a0512e8f518";
$body = "body isdi-page";

include "assets/include/header.php" ?> 

<!-- Swiper CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
<script src="https://cdn.tailwindcss.com"></script>


<style>

.w-tab-pane    { display: none; }
.w--tab-active { display: block; }

.swiper        { position: relative; overflow: hidden; list-style: none; padding: 0; z-index: 1; display: block; }
.swiper-wrapper { position: relative; width: 100%; display: flex; transition-property: transform; box-sizing: content-box; }
.swiper-slide  { flex-shrink: 0; width: 100%; height: auto; position: relative; }

.pathway-tab.w--current {
    background-color: #e12a7b !important;
    color: #fff !important;
    font-weight: 500 !important;
}

.w-tab-link {
    color: #000;
    background-color: #fff;
}

.custom-block-none  { display: block; }
.common-swiper-full { display: none; }
.who-for-desktop    { display: block; }
.who-for-swiper     { display: none; }
@media (max-width: 767px) {
    .custom-block-none  { display: none; }
    .common-swiper-full { display: block; }
    .who-for-desktop    { display: none; }
    .who-for-swiper     { display: block; }
    .custom-gap         { gap: 10px;}
}

.swiper-pagination {
    position: absolute;
    bottom: 12px;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 10;
    line-height: 1;
}
.swiper-pagination-bullet {
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #cfd6e0;
    border-radius: 50%;
    margin: 0 5px;
    opacity: 1;
    cursor: pointer;
}
.swiper-pagination-bullet-active { background: #1947b8; }

.stack-card {
    position: sticky;
    top: 0;
    margin-bottom: 6rem;
    will-change: transform;
    transform-origin: top;
}
@media (min-width: 768px) {
    .stack-card { margin-bottom: 9rem; }
    
}


</style>





<div class="font-sans text-[#1a1a1a]">


<section class="relative w-full overflow-hidden bg-white">

    <div class="hidden md:block relative w-full h-[500px]">
        <img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/hero-banner/desk.png"
             alt="Tower Bridge London at night"
             class="absolute inset-0 w-full h-full object-cover"
             loading="lazy">

        <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"></div>

        <div class="relative z-10 max-w-[1366px] mx-auto h-full px-[62px] flex flex-col justify-end pb-[100px]">
            <h1 class="text-white text-[36px] lg:text-[42px] font-semibold leading-[1.2] flex flex-wrap items-center gap-x-3">
                <span>ISDI Global Experiential Pathway with</span>
                <img
                    src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/scad.png"
                    alt="SCAD"
                    class="h-8 w-auto object-contain inline-block"
                />
            </h1>
        </div>

        <div class="absolute mb-8  left-0 right-0 bottom-0 z-10 bg-[#D20158] text-white py-2.5 [text-shadow:0_1px_3px_rgba(0,0,0,0.3)]">
            <div class="max-w-[1366px] mx-auto px-[62px] text-[15px] lg:text-[16px] leading-snug">
                Earn Your B.Des Degree from ISDI and Gain a Global Learning Experience at SCAD, USA
            </div>
        </div>
    </div>

    <div class="md:hidden relative w-full">

        <div class="relative w-full h-[400px]">
            <img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/hero-banner/mob.png"
                 alt="Tower Bridge London at night"
                 class="absolute inset-0 w-full h-full object-cover"
                 loading="lazy">

            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            <div class="absolute inset-x-4 bottom-4 z-10">
                <h1 class="text-white text-[22px] font-semibold leading-tight mb-3 gap-x-2">
                    <span>ISDI Global Experiential Pathway with</span>
                    <img
                        src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/scad.png"
                        alt="SCAD"
                        class="h-4 w-auto object-contain inline-block"
                    />
                </h1>

                <div class="bg-gradient-to-r bg-[#D20158] text-white px-4 py-2.5 text-[13px] leading-snug [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                    Earn Your B.Des Degree from ISDI and Gain a Global Learning Experience at SCAD, USA
                </div>

               
            </div>
        </div>
    </div>
</section>


<section class="flex flex-col md:flex-row w-full bg-white custom-gap">

    <div class="flex-1 px-6 md:px-16 py-8 md:py-0 text-white bg-[#0c1f4b] relative overflow-hidden min-h-[180px] md:h-[208px] flex flex-col justify-center bg-[url('https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685d0463ae8595f463d6fc77_eligible-bg-1.png')] bg-no-repeat bg-right">
        <div class="relative z-10 text-[#fff] text-[20px] md:text-[16px] mb-2 md:mb-3">For ISDI Students Only</div>
        <div class="relative z-10 text-[22px] md:text-[23px] font-medium leading-tight">15 International Academic Credits</div>
    </div>

    <div class="flex-1 px-6 md:px-16 py-8 md:py-0 text-white bg-[#103380] relative overflow-hidden min-h-[180px] md:h-[208px] flex flex-col justify-center bg-[url('https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685d04fb08ffd03be74d4905_eligible-bg-2.png')] bg-no-repeat bg-right">
        <div class="relative z-10 text-[#fff] text-[20px] md:text-[16px] mb-2 md:mb-3">Learn at SCAD, USA</div>
        <div class="relative z-10 text-[22px] md:text-[23px] font-medium leading-tight">Two Major-Specific SCAD Courses</div>
    </div>

    <div class="flex-1 px-6 md:px-16 py-8 md:py-0 text-white bg-[#0a2466] relative overflow-hidden min-h-[180px] md:h-[208px] flex flex-col justify-center bg-[url('https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685d05de2abaf8bf50592d58_eligible-bg-3.png')] bg-no-repeat bg-right">
        <div class="relative z-10 text-[#fff] text-[20px] md:text-[16px] mb-2 md:mb-3">Real-World Industry Exposure</div>
        <div class="relative z-10 text-[22px] md:text-[23px] font-medium leading-tight">Hands-On Studio & Lab Experience</div>
    </div>

    <div class="flex-1 px-6 md:px-16 py-8 md:py-0 text-white bg-[#103380] relative overflow-hidden min-h-[180px] md:h-[208px] flex flex-col justify-center bg-[url('https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685d04fb08ffd03be74d4905_eligible-bg-2.png')] bg-no-repeat bg-right">
        <div class="relative z-10 text-[#fff] text-[20px] md:text-[16px] mb-2 md:mb-3">Build Global Momentum</div>
        <div class="relative z-10 text-[22px] md:text-[23px] font-medium leading-tight">5-Year U.S. F-1 Visa Support</div>
    </div>
</section>


<section class="py-12 md:py-20 overflow-hidden">
    <div class="max-w-[1366px] mx-auto px-6 md:px-[62px]">

        
              
            <div class="flex flex-col-reverse md:flex-row md:items-center gap-8 md:gap-10">

               
                <div class="w-full md:w-[45%] md:flex-none">
                    <h2 class="text-[20px] md:text-[34px] font-medium text-[#1a1a1a] leading-[1.2] mt-4 md:mt-0 mb-6 md:mb-8">
                        ATLAS ISDI X SCAD Pro Experiential Learning Pathway
                    </h2>

                    <div class="text-[12px] md:text-[15px] leading-[1.65] text-[#333] space-y-4 md:space-y-5">
                        <p>
                            The SCAD Pro Experiential Learning Pathway is a flagship international learning opportunity developed for ISDI students in collaboration with Savannah College of Art and Design (SCAD), one of the world’s leading universities for art and design.
                            
                        </p>
                        <p>
                            As part of their undergraduate journey at ATLAS ISDI, selected students will participate in an immersive academic quarter at SCAD Atlanta in the United States. During this experience, students will:
                        </p>
                        <ul class="list-disc pl-6">
                            <li>Study within SCAD’s globally recognised creative ecosystem</li>
                            <li>Learn alongside international student cohorts</li>
                            <li>Complete discipline-specific SCAD coursework</li>
                            <li>Participate in SCAD Pro, SCAD’s flagship industry innovation studio</li>
                            <li>Work on real-world design and innovation challenges connected to global brands</li>
                        </ul>
                         <p>
                             <p>
                            As part of their undergraduate journey at ATLAS ISDI, selected students will participate in an immersive academic quarter at SCAD Atlanta in the United States. During this experience, students will:
                        </p>
                        </p>
                    </div>
                </div>

                <div class="w-full md:flex-1">
                    <img src="https://atlasuniversity.edu.in/schools/isme/assets/images/atlas-isme-advantage/internationalisation/section-2/1.png"
                         loading="lazy"
                         alt="ATLAS students walking near Devon House"
                         class="w-full h-auto object-cover rounded-tl-[60px] rounded-br-[60px]">
                </div>
            </div>
    </div>
</section>


<section class="py-10 md:py-16 overflow-visible">
    <div class="max-w-[1366px] mx-auto px-6 md:px-[62px]">

        <h2 class="text-[20px] md:text-[36px] font-medium text-[#1a1a1a] leading-[1.2] mb-8 md:mb-10">
            How This Global Experiential Pathway Works
        </h2>

        <div class="font-['Manrope',sans-serif]">

            <?php
            $stackCards = [
                [
                    'imgBase' => 'https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/scroll-con/1',
                    'bg'      => '#D20158',
                    'title'   => 'YEARS 1–2 | ISDI SCHOOL OF DESIGN AND INNOVATION, MUMBAI',
                    'intro'   => 'Build your foundation in design, innovation and creative thinking through:',
                    'items'   => [
                        'Industry-led design education',
                        'Studio-based learning',
                        'Interdisciplinary collaboration',
                        'Portfolio development',
                        'Real-world project exposure',
                    ],
                    'outro'   => 'Students also prepare for the international SCAD experiential pathway through academic performance, portfolio readiness and creative practice.',
                ],
                [
                    'imgBase' => 'https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/scroll-con/2',
                    'bg'      => '#0038B1',
                    'title'   => 'YEAR 3 | INTERNATIONAL LEARNING QUARTER AT SCAD ATLANTA, USA',
                    'intro'   => 'Selected students experience an immersive quarter at Savannah College of Art and Design as part of their ISDI undergraduate journey. <br>
                    Academic Experience Includes:',
                    'items'   => [
                        'Two major-specific SCAD courses aligned with the student’s discipline',
                        'SCAD Pro industry studio participation',
                        '15 international academic credits',
                        'Collaborative learning with global student teams',
                        'Faculty and industry mentorship',
                    ],
                    'outro'   => '',
                ],
                [
                    'imgBase' => 'https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/scroll-con/3',
                    'bg'      => '#D20158',
                    'title'   => 'GRADUATE WITH A DEGREE FROM ATLAS SKILLTECH UNIVERSITY',
                    'intro'   => 'Following the SCAD experience, students return to ISDI to complete their undergraduate degree while leveraging:',
                    'items'   => [
                        'International academic exposure',
                        'Global collaborative experience',
                        'Industry-led portfolio work',
                        'Enhanced postgraduate readiness',
                        'Stronger positioning for global creative careers',
                    ],
                    'outro'   => '',
                ],
                [
                    'imgBase' => 'https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/scroll-con/4',
                    'bg'      => '#0038B1',
                    'title'   => 'GLOBAL CAREER & POSTGRADUATE ADVANTAGE',
                    'intro'   => 'Position yourself for global creative careers with strong international exposure',
                    'items'   => [
                        'Benefit from a 5-year U.S. F-1 student visa supported through the program',
                        'Gain hands-on experience with global brands and real client briefs',
                        'Build industry-ready skills through collaborative, cross-cultural projects',
                        'Experience life on campus with housing, facilities and major events such as SCAD AnimationFest',
                    ],
                    'outro'   => 'Costs are offered under a special study abroad model, with a significant reduction compared to standard tuition. Travel, visa and personal expenses are not included. Visa and work opportunities are subject to prevailing regulations.',
                ],
            ];

            foreach ($stackCards as $idx => $card):
                $isLast = ($idx === count($stackCards) - 1);
            ?>

            <div class="stack-card flex flex-col md:flex-row h-auto md:h-[500px] overflow-hidden bg-transparent rounded-2xl md:rounded-none <?= $isLast ? '!mb-0' : '' ?>">

                <!-- Image - top on mobile, left on desktop -->
                <img sizes="(max-width: 759px) 100vw, 759px"
                     srcset="<?= $card['imgBase'] ?>/500.png 500w, <?= $card['imgBase'] ?>/759.png 759w"
                     src="<?= $card['imgBase'] ?>/759.png"
                     alt=""
                     loading="lazy"
                     class="w-full md:w-[55%] h-[220px] md:h-full object-cover" />

                <!-- Content - below on mobile, right on desktop -->
                <div class="w-full md:w-[45%] flex flex-col justify-center items-stretch px-6 py-7 md:px-14 md:py-10 gap-3 md:gap-7"
                     style="background-color: <?= $card['bg'] ?>;">

                    <div class="text-white font-['Manrope',sans-serif] text-[20px] md:text-[30px] font-bold leading-tight md:leading-[1.2]">
                        <?= $card['title'] ?>
                    </div>

                    <p class="text-white text-[14px] md:text-[15px] font-bold leading-snug md:leading-[1.5]">
                        <?= $card['intro'] ?>
                    </p>

                    <ul class="text-white list-disc pl-5 text-[13px] md:text-[15px] space-y-2 md:space-y-2 leading-snug md:leading-[1.5]">
                        <?php foreach ($card['items'] as $item): ?>
                            <li><?= $item ?></li>
                        <?php endforeach; ?>
                    </ul>

                    <?php if (!empty($card['outro'])): ?>
                        <p class="text-white text-[12px] md:text-[14px] leading-snug md:leading-[1.5] mt-1 md:mt-2">
                            <?= $card['outro'] ?>
                        </p>
                    <?php endif; ?>
                </div>
            </div>
            <?php endforeach; ?>

        </div>
    </div>
</section>

<section class="pt-12 md:pt-16 lg:pt-20">
  <div class="max-w-7xl mx-auto px-6 md:px-10">

    <!-- Two-column: image on left, content on right -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

      <!-- LEFT: Image -->
      <div class="lg:col-span-5">
        <div class="relative rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-[3/4]">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80"
            alt="SCAD Pro Studio"
            class="w-full h-full object-cover"
          />
          <!-- Subtle bottom gradient -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>
      </div>

      <!-- RIGHT: Content -->
      <div class="lg:col-span-7">

        <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight mb-5">
          SCAD Pro <span class="text-isdi-pink">|</span> Industry Innovation Studio
        </h2>

        <p class="text-gray-700 text-base md:text-lg leading-relaxed mb-7">
          SCAD Pro is SCAD's signature collaborative innovation studio where students work on live industry challenges with globally recognised brands.
        </p>

        <!-- Inline logos with intro line -->
        <div class="mb-7 pb-7 border-b border-gray-200">
          <p class="text-gray-600 text-sm md:text-base mb-4">
            Past collaborators have included:
          </p>
          <div class="flex flex-wrap items-center gap-x-10 gap-y-4">
            <img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/google.png" alt="Google" class="h-7 md:h-8 w-auto object-contain" />
            <img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/bmw.png" alt="BMW" class="h-7 md:h-8 w-auto object-contain" />
            <img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/chanel.png" alt="Chanel" class="h-6 md:h-7 w-auto object-contain" />
          </div>
        </div>

        <!-- Remaining body text -->
        <p class="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
          Students work within multidisciplinary teams to research, conceptualise and develop solutions for real client briefs under professional studio conditions.
        </p>

        <p class="text-gray-700 text-sm md:text-base leading-relaxed">
          A customised SCAD Pro experience will be developed specifically for the ISDI cohort to ensure meaningful participation and immersive learning.
        </p>

      </div>

    </div>

  </div>
</section>


<section class="py-10 md:py-16 lg:py-20">
    <div class="max-w-[1366px] mx-auto px-6 md:px-[62px]">
        <div class="mt-9 md:mt-[75px] flex flex-col md:flex-row md:px-0">

  <div class="flex-auto order-0 mb-6 md:mb-0 md:mr-8">
    <div class="text-[28px] sm:text-[32px] md:text-[40px] font-medium leading-tight md:leading-[56px]">
      Experience the SCAD Creative Ecosystem
    </div>
  </div>

  <div class="flex-[3_1_auto] w-full max-w-full md:max-w-[855px] md:min-h-[382px] flex flex-col md:flex-row">

    <div
      class="w-full md:max-w-[414px] h-full px-6 py-7 md:px-10
             rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl
             bg-[#f6f6f6] bg-no-repeat bg-center bg-contain"
      style="background-image: url('https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68e6755fbfb22b21493a4d14_e884a30c112bd2ab2b69e0af81f12f33_comp-vector.png');"
    >

        <div>
          <h3 class="text-isdi-pink text-xl font-semibold mb-4">Students gain access to:</h3>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <span class="w-2 h-2 rounded-full bg-[#ec1376] mt-2 flex-shrink-0"></span>
              <span class="text-sm md:text-base text-gray-700">SCAD student housing</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-2 h-2 rounded-full  bg-[#ec1376] mt-2 flex-shrink-0"></span>
              <span class="text-sm md:text-base text-gray-700">Creative labs and campus facilities</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-2 h-2 rounded-full  bg-[#ec1376] mt-2 flex-shrink-0"></span>
              <span class="text-sm md:text-base text-gray-700">International student communities</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-2 h-2 rounded-full  bg-[#ec1376] mt-2 flex-shrink-0"></span>
              <span class="text-sm md:text-base text-gray-700">Exhibitions, showcases and networking opportunities</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-2 h-2 rounded-full  bg-[#ec1376] mt-2 flex-shrink-0"></span>
              <span class="text-sm md:text-base text-gray-700">Signature SCAD events and experiences</span>
            </li>
          </ul>
        </div>
    </div>

    <div
          class="w-full md:max-w-[414px] h-full px-6 py-7 md:px-10
                 rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl
                 bg-[#ededed] bg-no-repeat bg-center bg-cover"
          style="background-image: url('https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68e67614252fd49c8c799f1e_05ccd941f569750f9553099a76dde5f8_comp-vector-2.png');"
        >
            <div>
                  <h3 class="text-[#173a87] text-xl font-semibold mb-4">Students may also experience:</h3>
                  <ul class="space-y-3">
                    <li class="flex items-start gap-3">
                      <span class="w-2 h-2 rounded-full  bg-[#173a87] mt-2 flex-shrink-0"></span>
                      <span class="text-sm md:text-base text-gray-700">SCAD AnimationFest</span>
                    </li>
                    <li class="flex items-start gap-3">
                      <span class="w-2 h-2 rounded-full bg-[#173a87] mt-2 flex-shrink-0"></span>
                      <span class="text-sm md:text-base text-gray-700">SCAD FASH Museum of Fashion + Film</span>
                    </li>
                    
                  </ul>
                </div>
        </div>
    
      </div>
    
    </div>
    </div>
</section>


<section class="py-10 md:py-16">
  <div class="max-w-7xl mx-auto px-4 md:px-8">

    <div class="mb-8 md:mb-12">
      <h2 class="text-2xl sm:text-3xl md:text-[40px] font-medium text-gray-900 leading-tight">
        Learn Within a Globally Influential Creative Network
      </h2>
      
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">

      <div class="rounded-2xl overflow-hidden flex flex-col">
        <img
          src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/influencer/nathan-engelhardt.png"
          alt="Nathan Engelhardt"
          class="w-full h-56 md:h-64 object-cover"
        />
        <div
          class="bg-isdi-blue text-white p-6 md:p-7 flex-1 bg-no-repeat bg-right-bottom"
          style="background-image: url('https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6900903759afa7e750e11e49_faq-vector.png'); background-size: 200px auto;"
        >
          <h3 class="text-xl md:text-2xl font-semibold leading-tight mb-1">
            Nathan Engelhardt
          </h3>
          
          <p class="text-sm font-medium text-white/95 mb-3">
            Supervising Animator, Walt Disney Animation Studios
          </p>
          <p class="text-sm leading-relaxed text-white/85">
            Oscar-nominated animator recognised for Forevergreen &amp; Animation Supervisor on Zootopia 2.
          </p>
        </div>
      </div>

      <div class="rounded-2xl overflow-hidden flex flex-col">
        <img
          src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/influencer/christopher-john-rogers.png"
          alt="Christopher John Rogers"
          class="w-full h-56 md:h-64 object-cover"
        />
        <div
          class="bg-isdi-pink text-white p-6 md:p-7 flex-1 bg-no-repeat bg-right-bottom"
          style="background-image: url('https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905b6c40725926bdcaac20f_Vector.png'); background-size: 200px auto;"
        >
          <h3 class="text-xl md:text-2xl font-semibold leading-tight mb-1">
            Christopher John Rogers
          </h3>
          <p class="text-sm font-medium text-white/95 mb-3">
            Luxury Fashion Designer | Founder, Christopher John Rogers
          </p>
          <p class="text-sm leading-relaxed text-white/85">
            Luxury fashion designer whose work has been worn by global icons including Kamala Harris and Lady Gaga
          </p>
        </div>
      </div>

      <div class="rounded-2xl overflow-hidden flex flex-col">
        <img
          src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/influencer/kate-barton.png"
          alt="Kate Barton"
          class="w-full h-56 md:h-64 object-cover"
        />
        <div
          class="bg-isdi-blue text-white p-6 md:p-7 flex-1 bg-no-repeat bg-right-bottom"
          style="background-image: url('https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6900903759afa7e750e11e49_faq-vector.png'); background-size: 200px auto;"
        >
          <h3 class="text-xl md:text-2xl font-semibold leading-tight mb-1">
            Kate Barton
          </h3>
          <p class="text-sm font-medium text-white/95 mb-3">
            Founder & Creative Director, Kate Barton
          </p>
          <p class="text-sm leading-relaxed text-white/85">
            Emerging international fashion designer recognised by Vogue
          </p>
        </div>
      </div>
      
      <div class="rounded-2xl overflow-hidden flex flex-col">
        <img
          src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/influencer/kayli-carter.png"
          alt="Kayli Carter"
          class="w-full h-56 md:h-64 object-cover"
        />
        <div
          class="bg-isdi-pink text-white p-6 md:p-7 flex-1 bg-no-repeat bg-right-bottom"
          style="background-image: url('https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6905b6c40725926bdcaac20f_Vector.png'); background-size: 200px auto;"
        >
          <h3 class="text-xl md:text-2xl font-semibold leading-tight mb-1">
            Kayli Carter
          </h3>
          <p class="text-sm font-medium text-white/95 mb-3">
            Actor | Film & Television Performer
          </p>
          <p class="text-sm leading-relaxed text-white/85">
            Actor known for Yellowstone and acclaimed film productions
          </p>
        </div>
      </div>

    </div>
    
    <!--<div class="mt-6 md:mt-8">-->

          <!-- Blue card matching speaker cards style -->
    <!--      <div class="bg-isdi-blue rounded-2xl px-6 py-8 md:px-10 md:py-10">-->
        
    <!--        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">-->
        
              <!-- Left: Text -->
    <!--          <div class="lg:max-w-xl">-->
    <!--            <p class="text-white text-base md:text-lg leading-relaxed">-->
    <!--              <span class="font-semibold">SCAD alumni</span> have also contributed to leading global companies and studios, including:-->
    <!--            </p>-->
    <!--          </div>-->
        
              <!-- Right: Logos -->
    <!--          <div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-12 lg:gap-x-14">-->
        
    <!--            <img-->
    <!--                  src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/pixar.png"-->
    <!--              alt="Disney"-->
    <!--              class="h-7 md:h-9 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition duration-200"-->
    <!--            />-->
        
    <!--            <img-->
    <!--              src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/disney.png"-->
    <!--              alt="Pixar"-->
    <!--              class="h-7 md:h-9 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition duration-200"-->
    <!--            />-->
        
    <!--            <img-->
    <!--              src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/netflix.png"-->
    <!--              alt="Netflix"-->
    <!--              class="h-6 md:h-8 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition duration-200"-->
    <!--            />-->
        
    <!--            <img-->
    <!--              src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/apple.png"-->
    <!--              alt="Apple"-->
    <!--              class="h-7 md:h-9 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition duration-200"-->
    <!--            />-->
             
        
    <!--          </div>-->
        
    <!--        </div>-->
        
    <!--      </div>-->
        
    <!--    </div>-->
        
        <div class="mt-6 md:mt-8">
          <div class="bg-isdi-blue rounded-2xl px-6 py-8 md:px-10 md:py-10">
            <div class="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
        
              <div class="lg:w-2/5 xl:w-1/2 flex-shrink-0">
                <p class="text-white text-base md:text-lg leading-relaxed">
                  <span class="font-semibold">SCAD alumni</span> have also contributed to leading global companies and studios, including:
                </p>
              </div>
        
              <div class="flex-1 w-full overflow-hidden">
                <div id="logoTrack" style="display:flex;width:max-content;will-change:transform;">
                  <div style="padding:0 1.5rem;display:flex;align-items:center;"><img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/disney.png" alt="Disney" class="h-7 md:h-9 w-auto object-contain" /></div>
                  <div style="padding:0 1.5rem;display:flex;align-items:center;"><img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/pixar.png" alt="Pixar" class="h-7 md:h-9 w-auto object-contain" /></div>
                  <div style="padding:0 1.5rem;display:flex;align-items:center;"><img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/netflix.png" alt="Netflix" class="h-6 md:h-8 w-auto object-contain" /></div>
                  <div style="padding:0 1.5rem;display:flex;align-items:center;"><img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/apple.png" alt="Apple" class="h-7 md:h-9 w-auto object-contain" /></div>
                  <div style="padding:0 1.5rem;display:flex;align-items:center;"><img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/deloitte.png" alt="Google" class="h-7 md:h-9 w-auto object-contain" /></div>
                  <div style="padding:0 1.5rem;display:flex;align-items:center;"><img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/amazon.png" alt="Google" class="h-7 md:h-9 w-auto object-contain" /></div>
                  <div style="padding:0 1.5rem;display:flex;align-items:center;"><img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/snapchat.png" alt="Google" class="h-7 md:h-9 w-auto object-contain" /></div>
                  <div style="padding:0 1.5rem;display:flex;align-items:center;"><img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/nbc.png" alt="Google" class="h-7 md:h-9 w-auto object-contain" /></div>
                  <div style="padding:0 1.5rem;display:flex;align-items:center;"><img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/warner-bros.png" alt="Google" class="h-7 md:h-9 w-auto object-contain" /></div>
                  <div style="padding:0 1.5rem;display:flex;align-items:center;"><img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/nike.png" alt="Google" class="h-7 md:h-9 w-auto object-contain" /></div>
                  <div style="padding:0 1.5rem;display:flex;align-items:center;"><img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/bmw.png" alt="Google" class="h-7 md:h-9 w-auto object-contain" /></div>
                  <div style="padding:0 1.5rem;display:flex;align-items:center;"><img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/mattel.png" alt="Google" class="h-7 md:h-9 w-auto object-contain" /></div>
                  <div style="padding:0 1.5rem;display:flex;align-items:center;"><img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/gucci.png" alt="Google" class="h-7 md:h-9 w-auto object-contain" /></div>
                  <div style="padding:0 1.5rem;display:flex;align-items:center;"><img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/loreal.png" alt="Google" class="h-7 md:h-9 w-auto object-contain" /></div>
                  <div style="padding:0 1.5rem;display:flex;align-items:center;"><img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/ralph-lauren.png" alt="Google" class="h-7 md:h-9 w-auto object-contain" /></div>
                  <div style="padding:0 1.5rem;display:flex;align-items:center;"><img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/hermes.png" alt="Google" class="h-7 md:h-9 w-auto object-contain" /></div>
                  <div style="padding:0 1.5rem;display:flex;align-items:center;"><img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/logo/kendra-scott.png" alt="Google" class="h-7 md:h-9 w-auto object-contain" /></div>
                </div>
              </div>
        
            </div>
          </div>
        </div>
  </div>
</section>


<section class="py-10 md:py-16">
  <div class="max-w-7xl mx-auto px-4 md:px-8">
      
      <div class="mb-8 md:mb-12">
      <h2 class="text-2xl sm:text-3xl md:text-[40px] font-medium text-gray-900 leading-tight">
        Why Choose the SCAD Global Pathway?
      </h2>
      <p class="mt-2 text-sm md:text-base text-gray-600">
        As one of the most comprehensive art and design universities in the world, SCAD provides a unique ecosystem where talent meets industry.
      </p>
    </div>

    <div class="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-5">

      <div class="bg-isdi-blue bg-chevron-watermark bg-no-repeat bg-right-bottom bg-[length:180px_auto] rounded-2xl p-6 min-h-[220px]">
        <span class="inline-block bg-isdi-pink text-white text-sm font-semibold px-2.5 py-1 rounded">#1</span>
        <h3 class="text-white text-xl font-semibold mt-3 mb-3">Global Design Exposure</h3>
        <p class="text-white/90 text-sm leading-relaxed">
          Experience an international academic environment during your ISDI journey
        </p>
      </div>

      <div class="bg-isdi-blue bg-chevron-watermark bg-no-repeat bg-right-bottom bg-[length:180px_auto] rounded-2xl p-6 min-h-[220px]">
        <span class="inline-block bg-isdi-pink text-white text-sm font-semibold px-2.5 py-1 rounded">#2</span>
        <h3 class="text-white text-xl font-semibold mt-3 mb-3">Industry-Integrated Learning</h3>
        <p class="text-white/90 text-sm leading-relaxed">
          Work on real client challenges through SCAD Pro
        </p>
      </div>

      <div class="bg-isdi-blue bg-chevron-watermark bg-no-repeat bg-right-bottom bg-[length:180px_auto] rounded-2xl p-6 min-h-[220px]">
        <span class="inline-block bg-isdi-pink text-white text-sm font-semibold px-2.5 py-1 rounded">#3</span>
        <h3 class="text-white text-xl font-semibold mt-3 mb-3">International Portfolio Development</h3>
        <p class="text-white/90 text-sm leading-relaxed">
          Build globally relevant creative work before graduation
        </p>
      </div>

      <div class="bg-isdi-blue bg-chevron-watermark bg-no-repeat bg-right-bottom bg-[length:180px_auto] rounded-2xl p-6 min-h-[220px]">
        <span class="inline-block bg-isdi-pink text-white text-sm font-semibold px-2.5 py-1 rounded">#4</span>
        <h3 class="text-white text-xl font-semibold mt-3 mb-3">Cross-Cultural Collaboration</h3>
        <p class="text-white/90 text-sm leading-relaxed">
          Learn and collaborate with peers from across the world
        </p>
      </div>
      
      <div class="bg-isdi-blue bg-chevron-watermark bg-no-repeat bg-right-bottom bg-[length:180px_auto] rounded-2xl p-6 min-h-[220px]">
        <span class="inline-block bg-isdi-pink text-white text-sm font-semibold px-2.5 py-1 rounded">#5</span>
        <h3 class="text-white text-xl font-semibold mt-3 mb-3">Future Academic & Career Advantage</h3>
        <p class="text-white/90 text-sm leading-relaxed">
          Gain early exposure to global academics, professional environments & creative practices
        </p>
      </div>

    </div>

    <div class="md:hidden">
      <div class="swiper journey-swiper">
        <div class="swiper-wrapper">

          <!-- Slide 1 -->
          <div class="swiper-slide">
            <div class="bg-isdi-blue bg-chevron-watermark bg-no-repeat bg-right-bottom bg-[length:180px_auto] rounded-2xl p-6 min-h-[220px]">
              <span class="inline-block bg-isdi-pink text-white text-sm font-semibold px-2.5 py-1 rounded">#1</span>
              <h3 class="text-white text-xl font-semibold mt-3 mb-3">Global Design Exposure</h3>
              <p class="text-white/90 text-sm leading-relaxed">
                Experience an international academic environment during your ISDI journey
              </p>
            </div>
          </div>

          <!-- Slide 2 -->
          <div class="swiper-slide">
            <div class="bg-isdi-blue bg-chevron-watermark bg-no-repeat bg-right-bottom bg-[length:180px_auto] rounded-2xl p-6 min-h-[220px]">
              <span class="inline-block bg-isdi-pink text-white text-sm font-semibold px-2.5 py-1 rounded">#2</span>
              <h3 class="text-white text-xl font-semibold mt-3 mb-3">Industry-Integrated Learning</h3>
              <p class="text-white/90 text-sm leading-relaxed">
                Work on real client challenges through SCAD Pro
              </p>
            </div>
          </div>

          <!-- Slide 3 -->
          <div class="swiper-slide">
            <div class="bg-isdi-blue bg-chevron-watermark bg-no-repeat bg-right-bottom bg-[length:180px_auto] rounded-2xl p-6 min-h-[220px]">
              <span class="inline-block bg-isdi-pink text-white text-sm font-semibold px-2.5 py-1 rounded">#3</span>
              <h3 class="text-white text-xl font-semibold mt-3 mb-3">International Portfolio Development</h3>
              <p class="text-white/90 text-sm leading-relaxed">
                Build globally relevant creative work before graduation
              </p>
            </div>
          </div>

          <!-- Slide 4 -->
          <div class="swiper-slide">
            <div class="bg-isdi-blue bg-chevron-watermark bg-no-repeat bg-right-bottom bg-[length:180px_auto] rounded-2xl p-6 min-h-[220px]">
              <span class="inline-block bg-isdi-pink text-white text-sm font-semibold px-2.5 py-1 rounded">#4</span>
              <h3 class="text-white text-xl font-semibold mt-3 mb-3">Cross-Cultural Collaboration</h3>
              <p class="text-white/90 text-sm leading-relaxed">
                Learn and collaborate with peers from across the world
              </p>
            </div>
          </div>
          
          <!-- Slide 5 -->
          <div class="swiper-slide">
            <div class="bg-isdi-blue bg-chevron-watermark bg-no-repeat bg-right-bottom bg-[length:180px_auto] rounded-2xl p-6 min-h-[220px]">
              <span class="inline-block bg-isdi-pink text-white text-sm font-semibold px-2.5 py-1 rounded">#5</span>
              <h3 class="text-white text-xl font-semibold mt-3 mb-3">Future Academic & Career Advantage</h3>
              <p class="text-white/90 text-sm leading-relaxed">
                Gain early exposure to global academics, professional environments & creative practices
              </p>
            </div>
          </div>

        </div>

        <!-- Pagination -->
        <div class="swiper-pagination !relative !mt-6"></div>
      </div>
    </div>

  </div>
</section>


<section class="py-10 md:py-16">
  <div class="max-w-7xl mx-auto px-4 md:px-8">
      
      <div class="mb-8 md:mb-12">
      <h2 class="text-2xl sm:text-3xl md:text-[40px] font-medium text-gray-900 leading-tight">
        Who Is This Pathway For?
      </h2>
     
    </div>

    <div class="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-3">

      <!-- Card 1 -->
      <div class="rounded-2xl overflow-hidden flex flex-col bg-isdi-blue">
        <img
          src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/swiper-section/1.png"
          alt="Card 1"
          class="w-full h-72 lg:h-64 object-cover"
        />
        <div class="p-6 flex-1 flex items-start">
          <p class="text-white text-sm leading-relaxed">
            <span class="font-semibold">Students seeking a globally competitive design education</span>
          </p>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="rounded-2xl overflow-hidden flex flex-col bg-isdi-blue">
        <img
          src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/swiper-section/2.png"
          alt="Card 2"
          class="w-full h-72 lg:h-64 object-cover"
        />
        <div class="p-6 flex-1 flex items-start">
          <p class="text-white text-sm leading-relaxed">
            <span class="font-semibold">Students aspiring to international careers in design and creative industries</span>
          </p>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="rounded-2xl overflow-hidden flex flex-col bg-isdi-blue">
        <img
          src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/swiper-section/3.png"
          alt="Card 3"
          class="w-full h-72 lg:h-64 object-cover"
        />
        <div class="p-6 flex-1 flex items-start">
          <p class="text-white text-sm leading-relaxed">
            <span class="font-semibold">Those seeking immersive U.S. design education with industry exposure</span>
          </p>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="rounded-2xl overflow-hidden flex flex-col bg-isdi-blue">
        <img
          src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/swiper-section/4.png"
          alt="Card 4"
          class="w-full h-72 lg:h-64 object-cover"
        />
        <div class="p-6 flex-1 flex items-start">
          <p class="text-white text-sm leading-relaxed">
            <span class="font-semibold">Students planning a seamless transition to global postgraduate study or creative careers</span>
            
          </p>
        </div>
      </div>

    </div>

    <div class="md:hidden">
      <div class="swiper lse-swiper">
        <div class="swiper-wrapper">

          <!-- Slide 1 -->
          <div class="swiper-slide">
            <div class="rounded-2xl overflow-hidden flex flex-col bg-isdi-blue">
              <img
                src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/swiper-section/1.png"
                alt="Card 1"
                class="w-full h-72 object-cover"
              />
              <div class="p-6 flex-1 flex items-start">
                <p class="text-white text-sm leading-relaxed">
                  <span class="font-semibold">Students seeking a globally competitive design education</span>
                </p>
              </div>
            </div>
          </div>

          <!-- Slide 2 -->
          <div class="swiper-slide">
            <div class="rounded-2xl overflow-hidden flex flex-col bg-isdi-blue">
              <img
                src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/swiper-section/2.png"
                alt="Card 2"
                class="w-full h-72 object-cover"
              />
              <div class="p-6 flex-1 flex items-start">
                <p class="text-white text-sm leading-relaxed">
                  <span class="font-semibold">Students aspiring to international careers in design and creative industries</span>
                </p>
              </div>
            </div>
          </div>

          <!-- Slide 3 -->
          <div class="swiper-slide">
            <div class="rounded-2xl overflow-hidden flex flex-col bg-isdi-blue">
              <img
                src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/swiper-section/3.png"
                alt="Card 3"
                class="w-full h-72 object-cover"
              />
              <div class="p-6 flex-1 flex items-start">
                <p class="text-white text-sm leading-relaxed">
                  <span class="font-semibold">Those seeking immersive U.S. design education with industry exposure</span>
                </p>
              </div>
            </div>
          </div>

          <!-- Slide 4 -->
          <div class="swiper-slide">
            <div class="rounded-2xl overflow-hidden flex flex-col bg-isdi-blue">
              <img
                src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/swiper-section/4.png"
                alt="Card 4"
                class="w-full h-72 object-cover"
              />
              <div class="p-6 flex-1 flex items-start">
                <p class="text-white text-sm leading-relaxed">
                  <span class="font-semibold">Students planning a seamless transition to global postgraduate study or creative careers</span>
                </p>
              </div>
            </div>
          </div>

        </div>

        <!-- Pagination -->
       <div class="swiper-pagination lse-swiper-pagination !relative !mt-6"></div>
      </div>
    </div>

  </div>
</section>


<section class="bg-isdi-blue py-12 md:py-16 lg:py-20">
  <div class="max-w-7xl mx-auto px-6 md:px-10">

    <!-- Section Header -->
    <div class="mb-10 md:mb-12">
      <h2 class="text-white text-2xl md:text-3xl lg:text-[36px] font-semibold leading-tight">
        Preferred International Pathway Pricing for ISDI Students
      </h2>
      <p class="text-white/90 text-sm md:text-base leading-relaxed mt-4">
        SCAD has extended a preferred international pathway fee structure exclusively for ISDI students participating in this experience.
      </p>
    </div>

    <!-- Pricing Cards Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">

      <!-- Standard SCAD Cost -->
      <div class="bg-white/5 border border-white/15 rounded-2xl p-6 md:p-8">
        <p class="text-white/70 text-xs md:text-sm uppercase tracking-wider mb-3">Standard SCAD Cost</p>
        <p class="text-white text-2xl font-semibold">
          Approx. $22,395
        </p>
      </div>

      <!-- ISDI Experiential Pathway Cost -->
      <div class="bg-white/5 border border-white/15 rounded-2xl p-6 md:p-8">
        <p class="text-white/70 text-xs md:text-sm uppercase tracking-wider mb-3">ISDI Experiential Pathway Cost</p>
        <p class="text-white text-2xl font-semibold">
          Approx. $12,995
        </p>
      </div>

    </div>

    <!-- Included / Not Included Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

      <!-- Included Within the Program -->
      <div class="bg-white/5 border border-white/15 rounded-2xl p-6 md:p-8">
        <h3 class="text-white text-base md:text-lg font-semibold mb-4">Included Within the Program</h3>
        <ul class="list-disc list-outside ml-5 space-y-2 text-white/90 text-sm md:text-base">
          <li>Two SCAD academic courses</li>
          <li>SCAD Pro participation</li>
          <li>Student housing</li>
          <li>Meal plan</li>
          <li>Health insurance</li>
        </ul>
      </div>

      <!-- Not Included -->
      <div class="bg-white/5 border border-white/15 rounded-2xl p-6 md:p-8">
        <h3 class="text-white text-base md:text-lg font-semibold mb-4">Not Included</h3>
        <ul class="list-disc list-outside ml-5 space-y-2 text-white/90 text-sm md:text-base">
          <li>International travel</li>
          <li>Visa fees</li>
          <li>Personal expenses</li>
        </ul>
      </div>

    </div>

  </div>
</section>



<section class="py-10 md:py-16">
  <div class="max-w-7xl mx-auto px-4 md:px-8">

    <!-- Info Card -->
    <div class="relative overflow-hidden bg-isdi-pink rounded-2xl p-6 md:p-10 lg:p-12">

      <!-- Faint background star pattern (decorative) -->
      <div class="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,5 61,38 95,38 67,57 78,90 50,71 22,90 33,57 5,38 39,38" />
        </svg>
      </div>

      <div class="relative grid md:grid-cols-12 gap-6 md:gap-10 items-start">

        <!-- Icon + Title column -->
        <div class="md:col-span-4 flex md:block items-center gap-4">

          <h2 class="text-white text-xl md:text-3xl font-semibold leading-tight">
            Additional U.S.<br class="hidden md:block" /> Visa Advantage
          </h2>
        </div>

        <!-- Content column -->
        <div class="md:col-span-8 space-y-4 md:space-y-5">

          <!-- Point 1 -->
          <div class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-full bg-isdi-blue flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p class="text-white/95 text-sm md:text-base leading-relaxed">
              Students participating in the pathway will receive support through the
              <span class="font-semibold">F-1 student visa</span> process.
            </p>
          </div>

          <!-- Point 2 -->
          <div class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-full bg-isdi-blue flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p class="text-white/95 text-sm md:text-base leading-relaxed">
              May support future <span class="font-semibold">postgraduate study opportunities</span> in the United States by helping students establish prior international academic exposure and visa history.
            </p>
          </div>

          <!-- Disclaimer -->
          <div class="pt-3 mt-2 border-t border-white/20">
            <p class="text-white/70 text-xs md:text-sm italic leading-relaxed">
              <svg class="inline w-4 h-4 mr-1 -mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Visa approvals remain subject to prevailing U.S. immigration regulations.
            </p>
          </div>

        </div>

      </div>

    </div>

  </div>
</section>


<section class="py-12 md:pb-16">

    <div class="hidden md:block">
        <div class="max-w-[1366px] mx-auto px-0">
            <div class="flex items-stretch">
                <!-- Dark navy icon square -->
                <div class="bg-[#011136] w-[120px] h-[80px] flex items-center justify-center flex-shrink-0">
                    <img src="https://atlasuniversity.edu.in/schools/isme/assets/images/global-pathway/about/building-icon.png"
                         alt="" class="w-9 h-9 object-contain" loading="lazy">
                </div>
                <!-- White title bar -->
                <div class="flex-1 bg-white h-[80px] flex items-center px-8">
                    <h2 class="text-[28px] lg:text-[32px] font-semibold text-[#011136] leading-tight">
                        About Savannah College of Art and Design
                    </h2>
                </div>
            </div>
        </div>
    </div>

    <!-- Mobile top bar - icon block flush with white title bar -->
    <div class="block md:hidden">
        <div class="flex items-stretch">
            <!-- Dark navy icon square - flush, full height -->
            <div class="bg-[#011136] w-[64px] flex items-center justify-center flex-shrink-0">
                <img src="https://atlasuniversity.edu.in/schools/isme/assets/images/global-pathway/about/building-icon.png"
                     alt="" class="w-7 h-7 object-contain" loading="lazy">
            </div>
            <!-- White title bar - flush with icon -->
            <div class="flex-1 bg-white py-4 px-4 flex items-center">
                <h2 class="text-[18px] font-semibold text-[#011136] leading-tight">
                    About Savannah College of Art and Design
                </h2>
            </div>
        </div>
    </div>

    <div class="bg-[#011136] text-white">
        <div class="max-w-[1366px] mx-auto px-6 md:px-[62px] py-8 md:py-12">
            <div class="flex flex-col md:flex-row gap-6 md:gap-12 items-stretch">

                <!-- Text + button column -->
                <div class="md:flex-1 md:max-w-[45%] flex flex-col md:order-1 order-2 ">
                    <p class="text-[13px] md:text-[18px] leading-[1.7] mb-6 md:mb-8 text-white text-justify">
                        Savannah College of Art and Design (SCAD) is a world-leading university renowned for its excellence in creative education, industry-led learning and global outlook. Recognised as one of the foremost institutions for art and design internationally, SCAD combines rigorous academic study with immersive, studio-based practice, ensuring that students gain hands-on creative experience alongside strong conceptual and theoretical foundations. Operating within a dynamic global creative ecosystem, SCAD fosters collaboration, innovation and cross-disciplinary learning across art, design, media and technology. Guided by its mission and values of creativity, positivity, collaboration and transformation, SCAD prepares students who are widely respected for their creative expertise, professional readiness and capacity to lead in complex global creative industries.
                    </p>
                    <div>
                        <a href="https://www.scad.edu/"
                           class="inline-flex items-center gap-2.5 px-6 py-2.5 md:py-3 border border-white rounded-full text-white text-[13px] md:text-[14px] font-medium no-underline">
                            Know More
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M13 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- Image column -->
                <div class="md:flex-1 md:max-w-[55%] md:order-2">
                    <img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/scad/about.png"
                         alt="Northeastern University campus" loading="lazy"
                         class="w-full h-auto object-cover">
                </div>
            </div>
        </div>
    </div>
</section>



<section class="relative bg-[#173A87] text-white py-10 md:py-14 overflow-hidden">

    <!-- Background image positioned right -->
    <img src="https://atlasuniversity.edu.in/schools/isme/assets/images/global-pathway/ready-to-begin/1.png"
         alt="" loading="lazy"
         class="hidden md:block absolute inset-y-0 right-0 h-full w-1/3 object-cover opacity-90">

    <div class="relative max-w-[1366px] mx-auto px-6 md:px-[62px]">
        <h2 class="text-[22px] md:text-[34px] font-semibold leading-tight mb-3 md:mb-4 max-w-2xl">
            Ready to Redefine Your Design Future?<br>
            Let’s Get Started.
        </h2>
        <p class="text-[14px] md:text-[16px] mb-6 md:mb-8 max-w-2xl text-white/90">
            Get a glimpse where the next generation of global designers are shaped through innovation, industry and inspiration.
        </p>

        <div class="flex flex-col sm:flex-row gap-3 md:gap-4">
            <a href="<?= isset($edudomain) ? $edudomain : '' ?>applicationform"
               class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#D20158] text-white font-medium text-[14px] md:text-[15px] no-underline hover:opacity-90 transition">
                Apply now
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
            </a>
            <a href="https://www.atlasuniversity.edu.in/campusvisit/"
               class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-white text-white font-medium text-[14px] md:text-[15px] no-underline">
                Schedule a visit
                 <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
            </a>
        </div>
    </div>
</section>


<section class="bg-white py-8 md:py-12">
    <div class="max-w-[1366px] mx-auto px-6 md:px-[62px]">
        <p class="text-[#1a1a1a] text-[14px] md:text-[16px] leading-[1.6] md:leading-[1.7] text-justify">
            <span class="font-semibold text-[16px] md:text-[18px]">Disclaimer:</span>
            <br>
            ATLAS SkillTech University does not award foreign degrees and facilitates only the academic pathway and preparatory components. All foreign degree programs, accreditations, rankings, scholarships, visa outcomes and progression opportunities are governed solely by the policies of Savannah College of Art and Design (SCAD) and applicable regulatory authorities and ATLAS SkillTech University does not guarantee any such outcomes. This is not a dual, joint or twinning degree program. Tuition fees are determined by Savannah College of Art and Design (SCAD) and may be revised at its discretion. Terms and conditions apply.
        </p>
    </div>
</section>

</div>


<!-- Swiper JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

<script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              'isdi-pink': '#ec1376',
              'isdi-blue': '#1e3a8a',
            },
            backgroundImage: {
              'chevron-watermark': "url('https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/69009847f2b1776ef14a6034_Vector--d.png')",
            }
          }
        }
      }
      
     new Swiper('.journey-swiper', {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        pagination: { el: '.swiper-pagination', clickable: true },
      });
  
     new Swiper('.lse-swiper', {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: true,
      pagination: { el: '.lse-swiper-pagination', clickable: true },
    });
  

    window.addEventListener('load', () => {
      const track = document.getElementById('logoTrack');
      if (!track) return;
      const originals = [...track.children];
      const oneCopyWidth = originals.reduce((s, el) => s + el.offsetWidth, 0);
      if (!oneCopyWidth) return;
      const targetWidth = track.parentElement.offsetWidth + oneCopyWidth;
      while (track.offsetWidth < targetWidth) {
        originals.forEach(el => track.appendChild(el.cloneNode(true)));
      }
      let pos = 0;
      (function frame() {
        pos -= 0.6;
        if (pos <= -oneCopyWidth) pos += oneCopyWidth;
        track.style.transform = `translate3d(${pos}px,0,0)`;
        requestAnimationFrame(frame);
      })();
    });
  
   
</script>

<?php include "assets/include/footer.php" ?>