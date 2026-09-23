<section class="footer">
    <div class="content-left">
      <div class="ft-head">Still have Questions? <br/>We’re here to help!</div>
      <a href="#" class="ft-links">isdi@atlasuniversity.edu.in</a>
      <div class="ft-head mrgtp">Find us</div>
      <div class="school-name">
          ISDI School of Design and Innovation<br/></div>
    <div class="address">
        ISDI - ATLAS SkillTech University<br>
Building 2, BKC 51<br>
Next to Equinox Business Park<br>
Bandra Kurla Complex Junction<br>
Mumbai – 400051<br></div><div class="copy mrgtp">© 2026. ISDI School of Design. All Rights Reserved.</div></div><div class="content-right"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6851318f6a9cba89a3c914db_ISDI-foot-logo.png" loading="lazy" alt="Isdi Parsons logo" class="isdi-logo"/><div class="social-icons"><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685130271660bc0af7054609_Twitter.svg" loading="lazy" alt="" class="tw"/><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/6851304097adb83117fc09ab_instagram.svg" loading="lazy" alt="" class="ins"/><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685130575dabf4de697e56d9_youtube.svg" loading="lazy" alt="" class="yt"/><img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/68513071df2c84c1efbedf65_linkedin.svg" loading="lazy" alt="" class="ln"/></div></div><section id="videoModal" class="video-modal"><div class="w-embed w-iframe"><span id="videoModalClose" class="video-modal-close">&times;</span>
<div class="video-modal-content">
    <iframe id="videoIframe" src="" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </div></div>
  
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.min.js" integrity="sha384-G/EV+4j2dNv+tEPo3++6LCgdCROaejBqfUeNjuKAiuXbjrxilcCdDz6ZAVfHWe1Y" crossorigin="anonymous"></script>
  
  <div class="w-embed w-script"><script>
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoIframe');
  const closeBtn = document.getElementById('videoModalClose');

  // Function to build embed URL
  function getEmbedUrl(videoUrl) {
    let embedUrl = "";
    const ytParams = "&autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&disablekb=1&fs=0&iv_load_policy=3";

    try {
      const url = new URL(videoUrl);

      // Google Drive
      if (url.hostname.includes("drive.google.com")) {
        let fileId;
        if (url.pathname.includes("/file/d/")) {
          fileId = url.pathname.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)[1];
        } else if (url.searchParams.get("id")) {
          fileId = url.searchParams.get("id");
        }
        if (fileId) {
          embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
        }
      }

      // YouTube watch or playlist (public/unlisted)
      else if (url.hostname.includes("youtube.com") && url.searchParams.get("v")) {
        const videoId = url.searchParams.get("v");
        embedUrl = `https://www.youtube.com/embed/${videoId}?${ytParams}`;
      }

      // YouTube short URL (youtu.be)
      else if (url.hostname === "youtu.be") {
        const videoId = url.pathname.slice(1);
        embedUrl = `https://www.youtube.com/embed/${videoId}?${ytParams}`;
      }

      // YouTube Shorts
      else if (url.hostname.includes("youtube.com") && url.pathname.includes("/shorts/")) {
        const videoId = url.pathname.split("/shorts/")[1];
        embedUrl = `https://www.youtube.com/embed/${videoId}?${ytParams}`;
      }

      // YouTube embed format already
      else if (url.hostname.includes("youtube.com") && url.pathname.includes("/embed/")) {
        embedUrl = videoUrl.includes("?") 
          ? `${videoUrl}${ytParams}`
          : `${videoUrl}?${ytParams}`;
      }

      // Fallback
      else {
        embedUrl = videoUrl;
      }
    } catch (err) {
      console.error("Invalid URL:", videoUrl, err);
    }

    return embedUrl;
  }

  // Universal handler for elements with data-video
  document.querySelectorAll('[data-video]').forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();

      const videoUrl = this.getAttribute('data-video');
      const embedUrl = getEmbedUrl(videoUrl);

      console.log("Original URL:", videoUrl);
      console.log("Embed URL:", embedUrl);

      if (embedUrl) {
        iframe.src = embedUrl;
        modal.style.display = 'block';
        document.body.classList.add('modal-open');
      }
    });
  });

  // Close modal
  closeBtn.addEventListener('click', function () {
    iframe.src = '';
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  });

  // Close on background click
  window.addEventListener('click', function (e) {
    if (e.target === modal) {
      iframe.src = '';
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  });
});
</script></div></section></section>



<script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=6846c77f346415bfcbb813b6" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/js/webflow.f7be31c6.5225383d3dd0024f.js" type="text/javascript"></script>


<!--<div class="my_chatbot" data-key="abc123xyz" style="display:none;"></div>-->
<!--<script src="https://www.atlasskilltech.app/chat-bot/chatbot.php?key=3f8e12a74c2b9b8f9231c4c6f2a8d8f9"></script>-->



<?php
$current_url = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

if ($current_url !== "https://atlasuniversity.edu.in/schools/isdi/events/the-edit") {
?>
    <div class="my_chatbot" data-key="abc123xyz" style="display:none;"></div>
    <script src="https://www.atlasskilltech.app/chat-bot/chatbot.php?key=3f8e12a74c2b9b8f9231c4c6f2a8d8f9"></script>
<?php
}
?>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

<script>
  function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  console.log("-----", location.pathname);

  // ========================
  // Header Scroll Behavior
  // ========================
  if (!isMobileDevice()) {
    let lastScrollY = window.scrollY;
    let isAnchorScrolling = false;
    let scrollTimeout;
    
    const topbar = document.getElementById('topbar');
    const mainbar = document.getElementById('mainbar');
    const body = document.body;
    
    function handleNavbarScroll() {
      const currentScrollY = window.scrollY;
      
      if (isAnchorScrolling) {
        if (currentScrollY < lastScrollY && currentScrollY > 0) {
          topbar.classList.add('hide');
          mainbar.classList.add('hide');
          mainbar.style.top = '0px';
          body.classList.add('hide-header', 'scrolled-head');
        }
        lastScrollY = currentScrollY;
        return;
      }
      
      if (currentScrollY === 0) {
        topbar.classList.remove('hide');
        mainbar.classList.remove('hide');
        mainbar.style.top = '48px';
        body.classList.remove('hide-header', 'scrolled-head');
      } else if (currentScrollY > lastScrollY && currentScrollY > 150) {
        topbar.classList.add('hide');
        mainbar.classList.add('hide');
        mainbar.style.top = '0px';
        body.classList.add('hide-header', 'scrolled-head');
      } else if (currentScrollY < lastScrollY) {
        topbar.classList.add('hide');
        mainbar.classList.remove('hide');
        mainbar.style.top = '0px';
        body.classList.remove('hide-header');
        body.classList.add('scrolled-head');
      }
      
      lastScrollY = currentScrollY;
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    
    document.addEventListener('click', function(e) {
      if (e.target.matches('a[href^="#"]') || e.target.closest('a[href^="#"]')) {
        const link = e.target.matches('a[href^="#"]') ? e.target : e.target.closest('a[href^="#"]');
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
          isAnchorScrolling = true;
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            isAnchorScrolling = false;
            lastScrollY = window.scrollY;
          }, 3000);
        }
      }
    });
    
    window.addEventListener('hashchange', function() {
      isAnchorScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isAnchorScrolling = false;
        lastScrollY = window.scrollY;
      }, 1000);
    });

    let programmaticScrolling = false;
    window.scrollToAnchor = function(anchor) {
      programmaticScrolling = true;
      isAnchorScrolling = true;
      
      document.querySelector(anchor).scrollIntoView({
        behavior: 'smooth'
      });
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isAnchorScrolling = false;
        programmaticScrolling = false;
        lastScrollY = window.scrollY;
      }, 1000);
    };
  }

  // ========================
  // Swiper Initializations
  // ========================

  
const marqueeEl = document.querySelector('.marquee-swiper');

var swiperMarquee = new Swiper(".marquee-swiper", {
  slidesPerView: "auto",
  spaceBetween: 20,
  allowTouchMove: false,
  loop: true,
  speed: 4000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: true , 
  },
});

  

  var swiperZoomLarge = new Swiper(".zoom-slider-large", {
    slidesPerView: "auto",
    centeredSlides: true,
    mousewheel: { forceToAxis: true },
    spaceBetween: 20,
    loop: true,
    lazy: {
      loadPrevNext: true,
      loadOnTransitionStart: true,
    },
  });

  function initCommonSwiper(swiperEl, paginationEl) {
    return new Swiper(swiperEl, {
      slidesPerView: "auto",
      spaceBetween: 24,
      lazy: {
        loadPrevNext: true,
        loadOnTransitionStart: true,
      },
      pagination: { el: paginationEl, clickable: true },
      mousewheel: { forceToAxis: true },
    });
  }

  document.querySelectorAll('.common-swiper').forEach((swiperEl, index) => {
    const paginationEl = document.createElement('div');
    paginationEl.classList.add(`swiper-pagination-${index}`);
    swiperEl.appendChild(paginationEl);
    initCommonSwiper(swiperEl, paginationEl);
  });

  document.querySelectorAll('.common-swiper-full').forEach((swiperEl) => {
    const paginationEl = document.createElement('div');
    paginationEl.classList.add('swiper-pagination');
    swiperEl.appendChild(paginationEl);
    initCommonSwiper(swiperEl, paginationEl);
  });

  document.querySelectorAll('.zoom-slider-lg').forEach((swiperElZm, index) => {
    const paginationElZm = document.createElement('div');
    paginationElZm.classList.add(`swiper-pagination-${index}`);
    swiperElZm.appendChild(paginationElZm);

    new Swiper(swiperElZm, {
      slidesPerView: "auto",
      spaceBetween: 24,
      mousewheel: { forceToAxis: true },
      autoplay: {
      delay: 2000,
      disableOnInteraction: false,
       }, 
      loop: true,
      lazy: {
        loadPrevNext: true,
        loadOnTransitionStart: true,
      },
      pagination: { el: paginationElZm, clickable: true },
    });
  });

  new Swiper(".zoom-slider", {
    slidesPerView: "auto",
    loop: true,
    mousewheel: { forceToAxis: true },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    initialSlide: 3,
    centeredSlides: true,
    lazy: {
      loadPrevNext: true,
      loadOnTransitionStart: true,
    },
    breakpoints: {
      0: { spaceBetween: 16 },
      768: { spaceBetween: 0 },
    },
  });

  new Swiper(".mobile-swiper-cm", {
    slidesPerView: "auto",
    spaceBetween: 0, 
    loop: true,
    pagination: { el: ".swiper-pagination-white", clickable: true },
    lazy: {
      loadPrevNext: true,
      loadOnTransitionStart: true,
    },
  });
</script>

<script>
  // ========================
  // Mobile Menu Handling
  // ========================
  if (isMobileDevice()) {
    document.addEventListener("DOMContentLoaded", function () {
      const topNavBar = document.querySelector(".topnavbar");
      const mobileButtons = document.querySelector(".mobile-bottom-buttons");
      const mainbar = document.getElementById("mainbar");
      let menuContainer = document.getElementById("main-menu-container");

      if (menuContainer) {
        const megaMenus = mainbar.querySelector(".mega-menus");
        if (megaMenus) menuContainer.appendChild(megaMenus);
        mainbar.appendChild(menuContainer);
      }

      if (topNavBar && !menuContainer.contains(topNavBar)) {
        menuContainer.appendChild(topNavBar);
      }

      if (mobileButtons && !menuContainer.contains(mobileButtons)) {
        menuContainer.appendChild(mobileButtons);
      }
    });

    document.addEventListener("DOMContentLoaded", function () {
      function addDrawerHeader(drawerEl, titleText) {
        if (!drawerEl.querySelector('.drawer-header')) {
          const header = document.createElement("div");
          header.className = "drawer-header";

          const backBtn = document.createElement("span");
          backBtn.className = "back-btn";
          backBtn.innerHTML = '<img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/688721af346c5fcc44e8cf3f_back-arrow-bkl.svg" alt="Back" >';
          backBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            drawerEl.classList.remove("active");
          });

          const title = document.createElement("span");
          title.textContent = titleText;

          header.appendChild(backBtn);
          header.appendChild(title);
          drawerEl.insertBefore(header, drawerEl.firstChild);
        }
      }

      document.querySelectorAll(".nav-link .text-link").forEach(link => {
        link.addEventListener("click", function () {
          document.querySelectorAll(".sub-nav").forEach(sn => sn.classList.remove("active"));
          const subNav = this.nextElementSibling;
          if (subNav?.classList.contains("sub-nav")) {
            addDrawerHeader(subNav, this.textContent.trim());
            subNav.classList.add("active");
            document.querySelector(".mobile-bottom-buttons")?.classList.add("active");
          }
        });
      });

      document.querySelectorAll(".level-1-link .text-lnk").forEach(link => {
        const parent = link.closest(".level-1-link");
        parent?.addEventListener("click", function (e) {
          const level2 = parent.querySelector(".level-2");
          if (level2) {
            e.stopPropagation();
            document.querySelectorAll(".level-2").forEach(l2 => l2.classList.remove("active"));
            addDrawerHeader(level2, link.textContent.trim());
            level2.classList.add("active");
          }
        });
      });

      document.querySelectorAll(".level-2-link .text-lnk").forEach(link => {
        const parent = link.closest(".level-2-link");
        parent?.addEventListener("click", function (e) {
          const level3 = parent.querySelector(".level-3");
          if (level3) {
            e.stopPropagation();
            document.querySelectorAll(".level-3").forEach(l3 => l3.classList.remove("active"));
            addDrawerHeader(level3, link.textContent.trim());
            level3.classList.add("active");
          }
        });
      });

      document.body.addEventListener("click", function (e) {
        if (!e.target.closest(".nav-link")) {
          document.querySelectorAll(".sub-nav, .level-2, .level-3").forEach(el => el.classList.remove("active"));
        }
      });
    });

    document.querySelector('.hamburger-menu').addEventListener('click', function () {
      this.classList.add('hide');
      document.getElementById('main-menu-container').classList.add('open');
      document.querySelector('.hamb-close-icon').classList.add('show');
    });

    document.querySelector('.hamb-close-icon').addEventListener('click', function () {
      this.classList.remove('show');
      document.querySelector('.hamburger-menu').classList.remove('hide');
      document.getElementById('main-menu-container').classList.remove('open');
    });
  }
  
  // Major tabs functionality in programs page
  const tabsProg = document.querySelectorAll('#prog-major-tabs a');
  const reviewText = document.getElementById('review--text--major');
  const dataBlocks = document.querySelectorAll('[data-id]');

  tabsProg.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      const tabText = this.querySelector('.sec-tab-text').textContent;
      reviewText.textContent = tabText;

      const targetId = this.id;
      dataBlocks.forEach(block => {
        if (block.getAttribute('data-id') === targetId) {
          block.classList.remove('hide-card-swiper');
          const activeCard = block.querySelector(".port-card-o-wrap.cd-active .port-card-o-tiitle");
          if (activeCard) {
            document.querySelector("#review--text--minor").textContent = activeCard.textContent;
            console.log(`Active title in swiper "${targetId}" →`, activeCard.textContent);
          }
        } else {
          block.classList.add('hide-card-swiper');
        }
      });
    });
  });

  // Program New cards function
 

//isme blue bar 
function createAndPositionBars() {

    // Run only on ISME pages
    if (!window.location.pathname.includes('/isme/')) return;

    // Run only on screens 1200px+
    if (window.innerWidth < 1200) {
        document.querySelectorAll('.left-bar-element').forEach(bar => bar.remove());
        return;
    }

    // Remove existing bars
    document.querySelectorAll('.left-bar-element').forEach(bar => bar.remove());

    const h2Tags = document.querySelectorAll('.h2-tag:not(.no-bar)');

    h2Tags.forEach(h2 => {
        const rect = h2.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        const bar = document.createElement('div');
        bar.className = 'left-bar-element';
        bar.style.top = (rect.top + scrollTop - 70) + 'px';

        document.body.appendChild(bar);
    });
}

window.addEventListener('load', createAndPositionBars);
window.addEventListener('resize', createAndPositionBars);
window.addEventListener('scroll', createAndPositionBars);


  document.addEventListener("DOMContentLoaded", function () {
    const navigationMap = {
      "cards-marketing-bba": "/isme/majoring-in-marketing/finance#marketing-section",
      "cards-finance-bba": "/isme/majoring-in-finance/marketing#finance-section",
      "cards-ba-bba": "/isme/majoring-in-business-analytics/marketing#ba-section",
      "cards-hyper-mba": "/isme/mba-hyper/mba-with-specialisation#hyper-mba-selection",
      "cards-dual-mba": "/isme/dual-specialisation/marketing-finance#dual-mba-selection",

    };

    Object.keys(navigationMap).forEach(function (id) {
      const element = document.getElementById(id);
      if (element) {
        element.addEventListener("click", function () {
          window.location.href = navigationMap[id];
        });
      }
    });
  });
  
  
  
 //clamp and unclamp 
 document.querySelectorAll('.accordion-toggle').forEach(toggle => {
  toggle.addEventListener('click', function () {
    const title = this.querySelector('.accordion-title');
    title.classList.toggle('unclamp');
    console.log("clamp hit");
  });
});

  
  
</script>


<script>
$(document).ready(function() {

$('#blue-cards-boxs .cards-inner-isme, #blue-cards-boxs .bl-cards').hover(
function () {
const desc = $(this).find('.card-desc');
if (desc.length) {
desc.css({
maxHeight: desc[0].scrollHeight + "px",
opacity: 1
});
}
},
function () {
const desc = $(this).find('.card-desc');
if (desc.length) {
desc.css({
maxHeight: '0px',
opacity: 0
});
}
}
);

});
</script>


<script>
$(document).ready(function () {

    // ---------- INTERESTS ----------
    const interests = [
        { id: 1, text: "Making art & craft" },
        { id: 2, text: "Scrolling through Instagram & Pinterest" },
        { id: 3, text: "Mixing bold outfits" },
        { id: 4, text: "Selling my work" },
        { id: 5, text: "Building things from scratch" },
        { id: 6, text: "Playing video games" },
        { id: 7, text: "Rearranging my room" },
        { id: 8, text: "Experimenting with makeup & fashion" },
        { id: 9, text: "Tinkering with apps & gadgets" },
        { id: 10, text: "Telling stories" },
        { id: 11, text: "Daydreaming design ideas" },
        { id: 12, text: "Editing fun reels" },
        { id: 13, text: "Capturing candid moments" },
        { id: 14, text: "Flipping through fashion mags" },
        { id: 15, text: "Doodling in the margins" },
        { id: 16, text: "Curating mood boards" }
    ];

    $.each(interests, function (_, item) {
        $("#interest-list").append(`
            <label class="custom-checkbox">
                <input type="checkbox" class="check-input interest" value="${item.id}">
                <span class="check-label">${item.text}</span>
            </label>
        `);
    });


    // ---------- DREAM LIST ----------
    const dreams = [
        "Push boundaries of fashion",
        "Be part of creative magic in media",
        "Make fashion more sustainable & cool",
        "Invent cool products people need",
        "Start my own brand or company",
        "Work on projects that feel different",
        "Design with a purpose",
        "Bring characters & worlds to life",
        "Create campaigns that stop scrolling",
        "Design magazine-worthy spaces"
    ];

    $.each(dreams, function(i, text){
        $("#dream-list").append(`
            <label class="custom-checkbox">
                <input type="checkbox" class="check-input dream" value="${i+1}">
                <span class="check-label">${text}</span>
            </label>
        `);
    });

    // Limit Interests to max 3 selections
    $(document).on("change", ".interest", function () {
        let selectedCount = $(".interest:checked").length;

        if (selectedCount >= 3) {
            $(".interest:not(:checked)").prop("disabled", true);
            $("#getInterestResult").prop("disabled", false);
        } else {
            $(".interest").prop("disabled", false);
            $("#getInterestResult").prop("disabled", true);
        }
    });

    // Limit Dreams to max 3 selections
    $(document).on("change", ".dream", function () {
        let selectedCount = $(".dream:checked").length;

        if (selectedCount >= 3) {
            $(".dream:not(:checked)").prop("disabled", true);
            $("#getFinalResult").prop("disabled", false);
        } else {
            $(".dream").prop("disabled", false);
            $("#getFinalResult").prop("disabled", true);
        }
    });


    // ---------- INTEREST SCORE MATRIX ----------
    const scoreMatrix = {
        1: { fashionDesign: 2, fashionComm: 1, commDesign: 2, productDesign: 2, interiorDesign: 1, strategicDesign: 1, animationVFX: 1 },
        2: { fashionDesign: 1, fashionComm: 3, commDesign: 2, productDesign: 0, interiorDesign: 1, strategicDesign: 1, animationVFX: 2 },
        3: { fashionDesign: 3, fashionComm: 3, commDesign: 1, productDesign: 0, interiorDesign: 0, strategicDesign: 0, animationVFX: 2 },
        4: { fashionDesign: 1, fashionComm: 2, commDesign: 2, productDesign: 2, interiorDesign: 1, strategicDesign: 3, animationVFX: 1 },
        5: { fashionDesign: 1, fashionComm: 0, commDesign: 1, productDesign: 3, interiorDesign: 3, strategicDesign: 2, animationVFX: 1 },
        6: { fashionDesign: 0, fashionComm: 1, commDesign: 3, productDesign: 2, interiorDesign: 0, strategicDesign: 1, animationVFX: 3 },
        7: { fashionDesign: 0, fashionComm: 0, commDesign: 1, productDesign: 1, interiorDesign: 3, strategicDesign: 1, animationVFX: 0 },
        8: { fashionDesign: 3, fashionComm: 3, commDesign: 1, productDesign: 0, interiorDesign: 0, strategicDesign: 0, animationVFX: 1 },
        9: { fashionDesign: 0, fashionComm: 0, commDesign: 3, productDesign: 2, interiorDesign: 0, strategicDesign: 2, animationVFX: 2 },
        10: { fashionDesign: 1, fashionComm: 3, commDesign: 3, productDesign: 0, interiorDesign: 0, strategicDesign: 2, animationVFX: 3 },
        11: { fashionDesign: 1, fashionComm: 2, commDesign: 2, productDesign: 2, interiorDesign: 2, strategicDesign: 1, animationVFX: 1 },
        12: { fashionDesign: 0, fashionComm: 3, commDesign: 3, productDesign: 0, interiorDesign: 0, strategicDesign: 1, animationVFX: 1 },
        13: { fashionDesign: 1, fashionComm: 3, commDesign: 2, productDesign: 0, interiorDesign: 0, strategicDesign: 1, animationVFX: 2 },
        14: { fashionDesign: 3, fashionComm: 3, commDesign: 2, productDesign: 0, interiorDesign: 0, strategicDesign: 0, animationVFX: 0 },
        15: { fashionDesign: 2, fashionComm: 2, commDesign: 3, productDesign: 1, interiorDesign: 0, strategicDesign: 1, animationVFX: 3 },
        16: { fashionDesign: 1, fashionComm: 3, commDesign: 2, productDesign: 1, interiorDesign: 1, strategicDesign: 1, animationVFX: 1 }
    };


    // ---------- DREAM SCORE MATRIX ----------
    const dreamMatrix = {
        1: { fashionDesign: 3, fashionComm: 3, commDesign: 1, productDesign: 0, interiorDesign: 0, strategicDesign: 0, animationVFX: 0 },
        2: { fashionDesign: 1, fashionComm: 3, commDesign: 3, productDesign: 0, interiorDesign: 0, strategicDesign: 1, animationVFX: 3 },
        3: { fashionDesign: 3, fashionComm: 3, commDesign: 1, productDesign: 0, interiorDesign: 0, strategicDesign: 2, animationVFX: 0 },
        4: { fashionDesign: 0, fashionComm: 0, commDesign: 1, productDesign: 3, interiorDesign: 1, strategicDesign: 2, animationVFX: 0 },
        5: { fashionDesign: 2, fashionComm: 2, commDesign: 2, productDesign: 2, interiorDesign: 1, strategicDesign: 3, animationVFX: 0 },
        6: { fashionDesign: 1, fashionComm: 2, commDesign: 2, productDesign: 2, interiorDesign: 1, strategicDesign: 3, animationVFX: 3 },
        7: { fashionDesign: 2, fashionComm: 2, commDesign: 2, productDesign: 2, interiorDesign: 2, strategicDesign: 3, animationVFX: 1 },
        8: { fashionDesign: 0, fashionComm: 2, commDesign: 3, productDesign: 1, interiorDesign: 0, strategicDesign: 1, animationVFX: 3 },
        9: { fashionDesign: 1, fashionComm: 3, commDesign: 3, productDesign: 0, interiorDesign: 0, strategicDesign: 1, animationVFX: 0 },
        10:{ fashionDesign: 0, fashionComm: 0, commDesign: 0, productDesign: 1, interiorDesign: 3, strategicDesign: 1, animationVFX: 0 }
    };


    	// ---------- COURSE LIST ----------
	const courses = [{
		id: 1,
		course: "Fashion Design",
		img: "https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685ab0185d6724603ab11f95_program-simg-6.png",
		bg: "#387BFF",
		courseLink: "<?php echo $domain ?>programs/undergraduate/b-des/b-des-in-fashion-design"
	}, {
		id: 2,
		course: "Fashion Communication & Styling",
		img: "https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685a967bd45516917b281f09_program-simg-2.png",
		bg: "#387BFF",
		courseLink: "<?php echo $domain ?>programs/undergraduate/b-des/b-des-in-fashion-communication-&-styling"
	}, {
		id: 3,
		course: "Communication Design",
		img: "https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685aaf91d1bf44ac2b778d73_program-simg-5.png",
		bg: "#DF287B",
		courseLink: "<?php echo $domain ?>programs/undergraduate/b-des/b-des-communication-design"
	}, {
		id: 4,
		course: "Product Design",
		img: "https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685a8ed1252a85bf73ffd047_program-simg-1.png",
		bg: "#387BFF",
		courseLink: "<?php echo $domain ?>programs/undergraduate/b-des/b-des-in-product-design"
	}, {
		id: 5,
		course: "Interior Design",
		img: "https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685ab0a0fbb17dbab3595f9a_program-simg-7.png",
		bg: "#387BFF",
		courseLink: "<?php echo $domain ?>programs/undergraduate/b-des/b-des-in-interior-design"
	}, {
		id: 6,
		course: "Strategic Design & Management",
		img: "https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685a9e311057585fb4b05ae2_program-simg-3.png",
		bg: "#DF287B",
		courseLink: "<?php echo $domain ?>programs/undergraduate/b-des/b-des-in-strategic-design-management"
	}, {
		id: 7,
		course: "Animation and VFX",
		img: "https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/685a9f81a361b8c199f29d5e_program-simg-4.png",
		bg: "#387BFF",
		courseLink: "<?php echo $domain ?>programs/undergraduate/b-des/b-des-in-animation-&-vfx"
	}];
	const courseKeys = {
		"Fashion Design": "fashionDesign",
		"Fashion Communication & Styling": "fashionComm",
		"Communication Design": "commDesign",
		"Product Design": "productDesign",
		"Interior Design": "interiorDesign",
		"Strategic Design & Management": "strategicDesign",
		"Animation and VFX": "animationVFX"
	};

    function calculateCourseScores(selectedInterests, selectedDreams = []) {

        const totals = {
            fashionDesign: 0,
            fashionComm: 0,
            commDesign: 0,
            productDesign: 0,
            interiorDesign: 0,
            strategicDesign: 0,
            animationVFX: 0
        };

        // INTEREST SCORES
        selectedInterests.forEach(id => {
            const row = scoreMatrix[id];
            Object.keys(row).forEach(key => totals[key] += row[key]);
        });

        // DREAM SCORES (optional)
        selectedDreams.forEach(id => {
            const row = dreamMatrix[id];
            Object.keys(row).forEach(key => totals[key] += row[key]);
        });

        // MAP COURSES WITH TOTALS
        let results = courses.map(c => ({
            ...c,
            score: totals[courseKeys[c.course]]
        }));

        // SORT
        results.sort((a, b) => b.score - a.score);

        return results;
    }


    $("#getInterestResult").click(function () {

        const selectedInterests = $(".interest:checked")
            .map(function () { return Number($(this).val()); })
            .get();

        // if (selectedInterests.length < 1) {
        //     alert("Please select at least one interest.");
        //     return;
        // }

        // GET RESULTS BASED ONLY ON INTERESTS
        const results = calculateCourseScores(selectedInterests);
        console.log(results);
        // SHOW CARDS
        // $("#course-results").empty();
        // results.forEach(course => {
        //     $("#course-results").append(`
        //         <div class="course-card">
        //             <h3>${course.course}</h3>
        //             <p><strong>Score:</strong> ${course.score}</p>
        //         </div>
        //     `);
        // });

        // TOP COURSE
        // const top = results[0];
        // $("#top-course-title").show();
        // $("#top-course").html(`
        //     <div class="course-card top-highlight">
        //         <h2>⭐ ${top.course}</h2>
        //         <p><strong>Score:</strong> ${top.score}</p>
        //     </div>
        // `);

        $('#step-2').removeClass('hideElem');
        $('#step-1').addClass('hideElem');
    });

    $("#getFinalResult").click(function () {

        const selectedInterests = $(".interest:checked")
            .map(function () { return Number($(this).val()); })
            .get();

        const selectedDreams = $(".dream:checked")
            .map(function () { return Number($(this).val()); })
            .get();

        // if (selectedInterests.length < 1) {
        //     alert("Please select at least one interest.");
        //     return;
        // }
        // if (selectedDreams.length < 1) {
        //     alert("Please select at least one dream.");
        //     return;
        // }

        // GET RESULTS WITH INTEREST + DREAM SCORES
        const results = calculateCourseScores(selectedInterests, selectedDreams);

        const topThree = results.slice(0, 3);

        console.log(topThree);

        // SHOW CARDS
        
        $("#course-results").empty();
        topThree.forEach(course => {
            $("#course-results").append(`
                <a href="${course.courseLink}"><div class="course-card" style="background: ${course.bg}">
                    <img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/691bf0c03080fa334d696602_top-rt-arrow.svg
" class="c-arrow" />
                    <h3>BDes ${course.course}</h3>
                    <img src="${course.img}" class="c-img" />
                </div></a>
            `);
        });

        $('#step-2').addClass('hideElem');
        $('#loadingCourse').show();
        /*$('#loadingCourse').append(`
            Drumroll in progress... your future is loading<br /><br />
            <img src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/691bf0c4d90556cf449f5a1c_drum-animation.gif" alt="Drum animation" width="450" />
        `);*/

        setTimeout(function () {
            $('#step-3').removeClass('hideElem');
            //$('#loadingCourse').empty();
            $('#loadingCourse').hide();
        }, 2500);
        

        // TOP COURSE
        // const top = results[0];
        // $("#top-course-title").show();
        // $("#top-course").html(`
        //     <div class="course-card top-highlight">
        //         <h2>⭐ ${top.course}</h2>
        //         <p><strong>Score:</strong> ${top.score}</p>
        //     </div>
        // `);
    });

    $("#startOver").on("click", function () {
        $('input.interest[type="checkbox"]').prop("checked", false);
        $('input.interest[type="checkbox"]').prop("disabled", false);
        $('input.dream[type="checkbox"]').prop("checked", false);
        $('input.dream[type="checkbox"]').prop("disabled", false);
        $('#step-1').removeClass('hideElem');
        $('#step-2').addClass('hideElem');
        $('#step-3').addClass('hideElem');
        $("#course-results").empty();
        $("#getInterestResult").prop("disabled", true);
        $("#getFinalResult").prop("disabled", true);
    });

    $("#getBack").on("click", function () {
        $('#step-2').addClass('hideElem');
        $('#step-1').removeClass('hideElem');
    });

});
</script>
<script>
window.addEventListener('load', () => {
  const video = document.querySelector('.swiper-bg-video video');
  if (video) {
    video.setAttribute('autoplay', '');
    video.load();
    video.play().catch(() => {});
  }
});
</script>


</body></html>