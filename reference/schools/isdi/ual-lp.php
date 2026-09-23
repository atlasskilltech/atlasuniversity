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
        <img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/ual-lp/herobanner/desk.png"
             alt="Tower Bridge London at night"
             class="absolute inset-0 w-full h-full object-cover"
             loading="lazy">

        <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"></div>

        <div class="relative z-10 max-w-[1366px] mx-auto h-full px-[62px] flex flex-col justify-end pb-[100px]">
            <h1 class="text-white text-[36px] lg:text-[42px] font-semibold leading-[1.2] flex flex-wrap items-center gap-x-3">
                <span>ISDI Global Experiential Pathway with</span>
                <img
                    src="https://atlasuniversity.edu.in/schools/isdi/assets/images/ual-lp/herobanner/logo/3.png"
                    alt="SCAD"
                    class="h-8 w-auto object-contain inline-block"
                />
            </h1>
        </div>

        <div class="absolute mb-8  left-0 right-0 bottom-0 z-10 bg-[#D20158] text-white py-2.5 [text-shadow:0_1px_3px_rgba(0,0,0,0.3)]">
            <div class="max-w-[1366px] mx-auto px-[62px] text-[15px] lg:text-[16px] leading-snug">
               Study in London for Two Years at a Global Top-Ranked University for Art & Design
            </div>
        </div>
    </div>

    <div class="md:hidden relative w-full">

        <div class="relative w-full h-[400px]">
            <img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/ual-lp/herobanner/mob.png"
                 alt="Tower Bridge London at night"
                 class="absolute inset-0 w-full h-full object-cover"
                 loading="lazy">

            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            <div class="absolute inset-x-4 bottom-4 z-10">
                <h1 class="text-white text-[22px] font-semibold leading-tight mb-3 gap-x-2">
                    <span>ISDI Global Experiential Pathway with</span>
                    <img
                        src="https://atlasuniversity.edu.in/schools/isdi/assets/images/ual-lp/herobanner/logo/3.png"
                        alt="SCAD"
                        class="h-4 w-auto object-contain inline-block"
                    />
                </h1>

                <div class="bg-gradient-to-r bg-[#D20158] text-white px-4 py-2.5 text-[13px] leading-snug [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                    Study in London for Two Years at a Global Top-Ranked University for Art & Design
                </div>

               
            </div>
        </div>
    </div>
</section>


<section class="flex flex-col md:flex-row w-full bg-white custom-gap">

    <div class="flex-1 px-6 md:px-16 py-8 md:py-0 text-white bg-[#0c1f4b] relative overflow-hidden min-h-[180px] md:h-[208px] flex flex-col justify-center bg-[url('https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685d0463ae8595f463d6fc77_eligible-bg-1.png')] bg-no-repeat bg-right">
        <div class="relative z-10 text-[#fff] text-[20px] md:text-[16px] mb-2 md:mb-3">Exclusively for ISDI Students</div>
        <div class="relative z-10 text-[22px] md:text-[23px] font-medium leading-tight">Undergraduate  Pathway</div>
    </div>

    <div class="flex-1 px-6 md:px-16 py-8 md:py-0 text-white bg-[#103380] relative overflow-hidden min-h-[180px] md:h-[208px] flex flex-col justify-center bg-[url('https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685d04fb08ffd03be74d4905_eligible-bg-2.png')] bg-no-repeat bg-right">
        <div class="relative z-10 text-[#fff] text-[20px] md:text-[16px] mb-2 md:mb-3">International Creative Education</div>
        <div class="relative z-10 text-[22px] md:text-[23px] font-medium leading-tight">BA (Hons) Illustration & Visual Media </div>
    </div>

    <div class="flex-1 px-6 md:px-16 py-8 md:py-0 text-white bg-[#0a2466] relative overflow-hidden min-h-[180px] md:h-[208px] flex flex-col justify-center bg-[url('https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685d05de2abaf8bf50592d58_eligible-bg-3.png')] bg-no-repeat bg-right">
        <div class="relative z-10 text-[#fff] text-[20px] md:text-[16px] mb-2 md:mb-3">QS World Rankings by Subject</div>
        <div class="relative z-10 text-[22px] md:text-[23px] font-medium leading-tight">#2 in the World for Art & Design</div>
    </div>

    <div class="flex-1 px-6 md:px-16 py-8 md:py-0 text-white bg-[#103380] relative overflow-hidden min-h-[180px] md:h-[208px] flex flex-col justify-center bg-[url('https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685d04fb08ffd03be74d4905_eligible-bg-2.png')] bg-no-repeat bg-right">
        <div class="relative z-10 text-[#fff] text-[20px] md:text-[16px] mb-2 md:mb-3">Join a Global Creative Community</div>
        <div class="relative z-10 text-[22px] md:text-[23px] font-medium leading-tight">19,000+ Students
130+ Nationalities</div>
    </div>
</section>


<section class="py-12 md:py-20 overflow-hidden">
    <div class="max-w-[1366px] mx-auto px-6 md:px-[62px]">

        
              
            <div class="flex flex-col-reverse md:flex-row md:items-center gap-8 md:gap-10">

               
                <div class="w-full md:w-[45%] md:flex-none">
                    <h2 class="text-[20px] md:text-[34px] font-medium text-[#1a1a1a] leading-[1.2] mt-4 md:mt-0 mb-6 md:mb-8">
                      The ISDI X UAL Undergraduate  Pathway
                    </h2>

                    <div class="text-[12px] md:text-[15px] leading-[1.65] text-[#333] space-y-4 md:space-y-5">
                        <p>
                           The University of the Arts London (UAL) Undergraduate Transfer Pathway offers eligible ISDI students the opportunity to begin their design education in Mumbai and complete their final two years at <b>London College of Communication (LCC), UAL</b>.

                            
                        </p>
                        
                          <p>
                         Students complete Years 1 and 2 at ISDI before transferring to UAL for Years 3 and 4, graduating with a <b>BA (Hons) Illustration & Visual Media</b> degree awarded by University of the Arts London.
                          
                        </p>
                        
                             <p>
                          This international academic experience combines the strong creative foundation developed at ISDI with the global perspective,
                          industry engagement and contemporary creative education offered by UAL. Students gain access to one of the world's most influential creative 
                          ecosystems while building the skills, portfolio and professional networks needed for future careers in illustration, visual communication, publishing, branding, media and related creative industries.
                          
                        </p>
                     
                    </div>
                </div>

                <div class="w-full md:flex-1">
                    <img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/ual-lp/the-isdi-ual-undergraduate-pathway/2.png"
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
         How This Pathway Works

        </h2>

        <div class="font-['Manrope',sans-serif]">

            <?php
            $stackCards = [
                [
                    'imgBase' => 'https://atlasuniversity.edu.in/schools/isdi/assets/images/ual-lp/how-this-pathway-works/1.png',
                    'bg'      => '#D20158',
                    'title'   => 'Years 1 to 2 | ISDI, Mumbai',
                    'intro'   => 'Build a strong foundation in creative practice and visual communication at ISDI through:',
                    'items'   => [
                        'Design thinking and creative problem solving',
                        'Visual storytelling and conceptual development',
                        'studio-based and interdisciplinary learning',
                        'Exploration of illustration, communication and image-making practices',
                        'Industry projects and professional exposure',
                        'Global perspectives on design, culture and contemporary media',
                    ],
                    'outro'   => '',
                ],
                [
                    'imgBase' => 'https://atlasuniversity.edu.in/schools/isdi/assets/images/ual-lp/how-this-pathway-works/2.png',
                    'bg'      => '#0038B1',
                    'title'   => 'Years 3 to 4 | London College of Communication, UAL',
                    'intro'   => 'Transfer to London College of Communication, University of the Arts London and complete your undergraduate degree in one of the world’s most influential creative capitals.',
                    'items'   => [
                        'Study within UAL’s internationally recognised academic environment',
                        'Immersive London learning experience',
                        'Contemporary approaches to illustration and visual media',
                        'Studio, research and collaborative project opportunities',
                        'Exposure to creative industries, publishing, branding and media sectors',
                        'Access to a diverse international student community',
                        
                    ],
                    'outro'   => '',
                ],
                [
                    'imgBase' => 'https://atlasuniversity.edu.in/schools/isdi/assets/images/ual-lp/how-this-pathway-works/3.png',
                    'bg'      => '#D20158',
                    'title'   => 'Graduate with a UAL Degree',
                    'intro'   => 'Complete your academic journey at University of the Arts London and gain a globally recognised creative education.',
                    'items'   => [
                        'Earn a BA (Hons) Illustration & Visual Media degree from UAL',
                        'Build an internationally relevant creative portfolio',
                        'Develop a global professional network',
                        'Learn alongside students and faculty from around the world',
                        'Join an influential international community of UAL graduate',
                    ],
                    'outro'   => '',
                ],
                [
                    'imgBase' => 'https://atlasuniversity.edu.in/schools/isdi/assets/images/ual-lp/how-this-pathway-works/4.png',
                    'bg'      => '#0038B1',
                    'title'   => 'Global Career Opportunities',
                    'intro'   => 'Leverage your international education experience to pursue opportunities across the global creative industries.',
                    'items'   => [
                        'Build a portfolio informed by international perspectives',
                        'Develop connections within creative communities worldwide',
                        'Gain exposure to publishing, branding, media, communication and design sectors',
                        'Learn from industry-connected projects and professional engagement',
                        'Prepare for postgraduate study and international career pathways',
                    ],
                    'outro'   => 'Visa regulations, employment eligibility and post-study work opportunities are subject to prevailing government policies and immigration requirements at the time of graduation.',
                ],
            ];

            foreach ($stackCards as $idx => $card):
                $isLast = ($idx === count($stackCards) - 1);
            ?>

            <div class="stack-card flex flex-col md:flex-row h-auto md:h-[500px] overflow-hidden bg-transparent rounded-2xl md:rounded-none <?= $isLast ? '!mb-0' : '' ?>">

                <!-- Image - top on mobile, left on desktop -->
                <img sizes="(max-width: 759px) 100vw, 759px"
                     srcset="<?= $card['imgBase'] ?>/500.png 500w, <?= $card['imgBase'] ?> 759w"
                     src="<?= $card['imgBase'] ?>"
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



<section class="bg-[#011A4B] py-8 md:py-12">
    <div class="max-w-[1366px] mx-auto px-4 md:px-8">

        <!-- Heading + Button -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 class="text-white text-2xl md:text-4xl font-medium leading-tight ">
             Learn More about BA (Hons) Illustration & Visual Media at LCC

            </h2>

            <a href="https://www.arts.ac.uk/subjects/illustration/undergraduate/ba-hons-illustration-and-visual-media-lcc"
                class="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#00F5B4] text-[#011A4B] font-medium text-sm w-fit">
                Learn More
            </a>
        </div>

        <!-- Full Width Image -->
        <div class="overflow-hidden rounded-lg">
            <img
                src="https://atlasuniversity.edu.in/schools/isdi/assets/images/ual-lp/learn-more-about-ba-hons-illustration-visual-media-at-university-of-the-arts-london/1.png"
                alt="Northeastern University London"
                class="w-full h-auto object-cover"
                loading="lazy"
            />
        </div>

    </div>
</section>





<section class="bg-[#011A4B] py-8 md:py-12">
    <div class="max-w-[1366px] mx-auto px-4 md:px-8">

        <h2 class="text-white text-2xl md:text-4xl font-medium mb-6">
            Who Can Apply
        </h2>

        <div class="border border-white/20 rounded-2xl p-6 md:p-8">
            <p class="text-white/90 text-base md:text-lg leading-relaxed">
                Current ISDI students enrolled in the second year of their undergraduate
                program are eligible to explore the <strong>UAL Undergraduate Global Pathway</strong>,
                subject to meeting the academic progression and English language requirements
                prescribed by the University of the Arts London at the time of transfer.
            </p>
        </div>

    </div>
</section>











<section class="py-10 md:py-16">
  <div class="max-w-7xl mx-auto px-4 md:px-8">
      
      <div class="mb-8 md:mb-12">
      <h2 class="text-2xl sm:text-3xl md:text-[40px] font-medium text-gray-900 leading-tight">
       Why Choose This Pathway?
      </h2>
      <!--<p class="mt-2 text-sm md:text-base text-gray-600">-->
      <!--  As one of the most comprehensive art and design universities in the world, SCAD provides a unique ecosystem where talent meets industry.-->
      <!--</p>-->
    </div>

   <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

  <!-- Card 1 -->
  <div class="bg-isdi-blue bg-chevron-watermark bg-no-repeat bg-right-bottom bg-[length:180px_auto] rounded-2xl p-6 min-h-[220px]">
    <span class="inline-block bg-isdi-pink text-white text-sm font-semibold px-2.5 py-1 rounded">#1</span>
    <h3 class="text-white text-xl font-semibold mt-3 mb-3">Live and Learn in a Global Creative Capital</h3>
    <p class="text-white/90 text-sm leading-relaxed">
     Complete your final two years in London and immerse yourself in a city known for creativity, innovation, publishing, media, branding, culture and design.

    </p>
  </div>

  <!-- Card 2 -->
  <div class="bg-isdi-blue bg-chevron-watermark bg-no-repeat bg-right-bottom bg-[length:180px_auto] rounded-2xl p-6 min-h-[220px]">
    <span class="inline-block bg-isdi-pink text-white text-sm font-semibold px-2.5 py-1 rounded">#2</span>
    <h3 class="text-white text-xl font-semibold mt-3 mb-3">Progress to a Globally Recognised UAL Degree</h3>
    <p class="text-white/90 text-sm leading-relaxed">
     Transfer into the BA (Hons) Illustration & Visual Media program at London College of Communication and benefit from UAL's internationally respected approach to creative education.

    </p>
  </div>

  <!-- Card 3 -->
  <div class="bg-isdi-blue bg-chevron-watermark bg-no-repeat bg-right-bottom bg-[length:180px_auto] rounded-2xl p-6 min-h-[220px]">
    <span class="inline-block bg-isdi-pink text-white text-sm font-semibold px-2.5 py-1 rounded">#3</span>
    <h3 class="text-white text-xl font-semibold mt-3 mb-3">Strong Academic Foundation at ISDI
</h3>
    <p class="text-white/90 text-sm leading-relaxed">
     Develop creative thinking, technical capabilities, conceptual understanding and interdisciplinary perspectives during your first two years before progressing to UAL.

    </p>
  </div>

  <!-- Card 4 -->
  <div class="bg-isdi-blue bg-chevron-watermark bg-no-repeat bg-right-bottom bg-[length:180px_auto] rounded-2xl p-6 min-h-[220px]">
    <span class="inline-block bg-isdi-pink text-white text-sm font-semibold px-2.5 py-1 rounded">#4</span>
    <h3 class="text-white text-xl font-semibold mt-3 mb-3">Graduate with a Global Creative Network
</h3>
    <p class="text-white/90 text-sm leading-relaxed">
     Earn a UAL degree while building relationships with peers, faculty, industry professionals and alumni from across the world.

    </p>
  </div>

  <!-- Card 5 -->
  <!--<div class="bg-isdi-blue bg-chevron-watermark bg-no-repeat bg-right-bottom bg-[length:180px_auto] rounded-2xl p-6 min-h-[220px]">-->
  <!--  <span class="inline-block bg-isdi-pink text-white text-sm font-semibold px-2.5 py-1 rounded">#5</span>-->
  <!--  <h3 class="text-white text-xl font-semibold mt-3 mb-3">Future Academic & Career Advantage</h3>-->
  <!--  <p class="text-white/90 text-sm leading-relaxed">-->
  <!--    Gain early exposure to global academics, professional environments & creative practices-->
  <!--  </p>-->
  <!--</div>-->

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

   <div class="swiper lse-swiper">
  <div class="swiper-wrapper">

    <!-- Card 1 -->
    <div class="swiper-slide">
      <div class="rounded-2xl overflow-hidden flex flex-col bg-isdi-blue h-full">
        <img
          src="https://atlasuniversity.edu.in/schools/isdi/assets/images/ual-lp/who-is-this-pathway-for/1.png"
          alt="Students seeking a globally competitive design education"
          class="w-full h-72 lg:h-64 object-cover"
        />
        <div class="p-6 flex-1 flex items-start">
          <p class="text-white text-sm leading-relaxed">
            <span class="font-semibold">
             Students who want to study at one of the world's leading universities for art and design
            </span>
          </p>
        </div>
      </div>
    </div>

    <!-- Card 2 -->
    <div class="swiper-slide">
      <div class="rounded-2xl overflow-hidden flex flex-col bg-isdi-blue h-full">
        <img
          src="https://atlasuniversity.edu.in/schools/isdi/assets/images/ual-lp/who-is-this-pathway-for/2.png"
          alt="Students aspiring to international careers in design and creative industries"
          class="w-full h-72 lg:h-64 object-cover"
        />
        <div class="p-6 flex-1 flex items-start">
          <p class="text-white text-sm leading-relaxed">
            <span class="font-semibold">
             Students who aspire to build international careers in creative industries
            </span>
          </p>
        </div>
      </div>
    </div>

    <!-- Card 3 -->
    <div class="swiper-slide">
      <div class="rounded-2xl overflow-hidden flex flex-col bg-isdi-blue h-full">
        <img
          src="https://atlasuniversity.edu.in/schools/isdi/assets/images/ual-lp/who-is-this-pathway-for/3.png"
          alt="Those seeking immersive U.S. design education with industry exposure"
          class="w-full h-72 lg:h-64 object-cover"
        />
        <div class="p-6 flex-1 flex items-start">
          <p class="text-white text-sm leading-relaxed">
            <span class="font-semibold">
             Students seeking to experience London's dynamic, creative and cultural landscape
            </span>
          </p>
        </div>
      </div>
    </div>

    <!-- Card 4 -->
    <div class="swiper-slide">
      <div class="rounded-2xl overflow-hidden flex flex-col bg-isdi-blue h-full">
        <img
          src="https://atlasuniversity.edu.in/schools/isdi/assets/images/ual-lp/who-is-this-pathway-for/4.png"
          alt="Students planning a seamless transition to global postgraduate study or creative careers"
          class="w-full h-72 lg:h-64 object-cover"
        />
        <div class="p-6 flex-1 flex items-start">
          <p class="text-white text-sm leading-relaxed">
            <span class="font-semibold">
              Students interested in illustration, visual storytelling, publishing, media, branding and communication
            </span>
          </p>
        </div>
      </div>
    </div>
    
      <!-- Card 4 -->
    <div class="swiper-slide">
      <div class="rounded-2xl overflow-hidden flex flex-col bg-isdi-blue h-full">
        <img
          src="https://atlasuniversity.edu.in/schools/isdi/assets/images/ual-lp/who-is-this-pathway-for/5.png"
          alt="Students planning a seamless transition to global postgraduate study or creative careers"
          class="w-full h-72 lg:h-64 object-cover"
        />
        <div class="p-6 flex-1 flex items-start">
          <p class="text-white text-sm leading-relaxed">
            <span class="font-semibold">
             Students who want to build an international creative portfolio and professional network
            </span>
          </p>
        </div>
      </div>
    </div>
    
      <!-- Card 4 -->
    <div class="swiper-slide">
      <div class="rounded-2xl overflow-hidden flex flex-col bg-isdi-blue h-full">
        <img
          src="https://atlasuniversity.edu.in/schools/isdi/assets/images/ual-lp/who-is-this-pathway-for/6.png"
          alt="Students planning a seamless transition to global postgraduate study or creative careers"
          class="w-full h-72 lg:h-64 object-cover"
        />
        <div class="p-6 flex-1 flex items-start">
          <p class="text-white text-sm leading-relaxed">
            <span class="font-semibold">
             Students who want to graduate with a globally recognised UK degree
            </span>
          </p>
        </div>
      </div>
    </div>

  </div>

  <div class="swiper-pagination lse-swiper-pagination !relative !mt-6"></div>
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
                      About London College of Communication

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
                   About London College of Communication

                </h2>
            </div>
        </div>
    </div>

    <div class="bg-[#011136] text-white">
        <div class="max-w-[1366px] mx-auto px-6 md:px-[62px] py-8 md:py-12">
            <div class="flex flex-col md:flex-row gap-6 md:gap-12 items-stretch">

                <!-- Text + button column -->
                <div class="md:flex-1 md:max-w-[45%] flex flex-col md:order-1 order-2 ">
                    <p class="text-[13px] md:text-[18px] leading-[1.7]  text-white text-justify">
                       University of the Arts London (UAL) is one of the world's leading universities for art, design, fashion, communication and creative education. Consistently ranked among the top institutions globally for Art & Design, UAL brings together six internationally renowned colleges that have shaped generations of artists, designers, communicators, performers and creative professionals.
                    </p>
                    <p class="text-[13px] md:text-[18px] leading-[1.7]  text-white text-justify">
                        Within UAL, London College of Communication (LCC) is a leading centre for design, media, screen, and communications education. Through industry-led learning, innovative research, and hands-on practice, LCC empowers students to develop creative solutions, challenge conventions, and build impactful careers across the global creative industries.
                    </p>

                    
                    
                    <div>
                        <a href="https://www.arts.ac.uk/colleges/london-college-of-communication"
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
                    <img src="https://atlasuniversity.edu.in/schools/isdi/assets/images/ual-lp/about-university-of-the-arts-london/1.png"
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
          Ready to Continue Your Creative Journey in London?<br>
            Let's Get Started.
        </h2>
        <p class="text-[14px] md:text-[16px] mb-6 md:mb-8 max-w-2xl text-white/90">
           Explore how the UAL Undergraduate global Pathway can help you gain global exposure, expand your creative horizons and graduate with a University of the Arts London degree.

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
          
          ISDI does not award foreign degrees and facilitates only the academic pathway and preparatory components of the ISDI × University of the Arts London Undergraduate Transfer Pathway. The degree, accreditation, academic policies, admissions decisions, scholarships and progression outcomes are governed solely by University of the Arts London in accordance with its applicable institutional and regulatory requirements. ISDI does not guarantee admission or progression to UAL. This is not a dual, joint or twinning degree program. Tuition fees, where applicable, are determined by the University of the Arts London and may be revised at its discretion. Terms and conditions apply.

            
            
            
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
  
    //  new Swiper('.lse-swiper', {
    //   slidesPerView: 1,
    //   spaceBetween: 16,
    //   loop: true,
    //   pagination: { el: '.lse-swiper-pagination', clickable: true },
    // });
  

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
  
   
   
   
   
   
   
   
   
   
   
   
   new Swiper(".lse-swiper", {
  loop: true,
  speed: 800,

  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  pagination: {
    el: ".lse-swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 12,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 12,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 12,
    },
  },
});
</script>

<?php include "assets/include/footer.php" ?>