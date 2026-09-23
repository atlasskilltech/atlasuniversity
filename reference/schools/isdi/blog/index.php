<?php
/* ================================
   ✅ SEO URL + REDIRECT LOGIC
================================ */

// If old URL with ?slug= is used → redirect to clean URL
if (isset($_GET['slug']) && $_GET['slug'] !== '') {

    $slug = $_GET['slug'];

    // Detect base path dynamically
    $uri = $_SERVER['REQUEST_URI'];
    $path = parse_url($uri, PHP_URL_PATH);

    // Remove trailing slash
    $path = rtrim($path, '/');

    // Redirect
    header("Location: $path/$slug", true, 301);
    exit;
}

// Get slug from clean URL
$uri = $_SERVER['REQUEST_URI'];
$path = parse_url($uri, PHP_URL_PATH);
$parts = explode('/', trim($path, '/'));

// Get last segment as slug
$slug = end($parts);

// Detect URL type
$isSchoolPage = ($parts[0] === 'schools');
$isAtlasPage  = ($parts[0] === 'atlas-blog');

$currentSchool = null;

if ($isSchoolPage) {
    $currentSchool = $parts[1] ?? null;
}

// Safety: if only /blog opened
if ($slug === 'blog' || $slug === 'atlas-blog') {
    echo "No blog selected";
    exit;
}

/* ================================
   ✅ FETCH BLOG FROM API BY SLUG
================================ */

$apiUrl = "https://uat-dashboard.atlasskilltech.app/api/atlas-blogs/by-slug/" . urlencode($slug);

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
curl_close($ch);

$blog = null;

if ($response !== false && $httpCode === 200) {
    $apiData = json_decode($response, true);

    if (json_last_error() === JSON_ERROR_NONE
        && isset($apiData['success']) && $apiData['success'] === true
        && !empty($apiData['data'])) {

        $candidate = $apiData['data'];

        // Validate the blog matches the URL context (school / atlas)
        // ✅ Atlas blog
        if (($candidate['school'] ?? '') === 'atlas' && $isAtlasPage) {
            $blog = $candidate;
        }

        // ✅ School blog
        if (($candidate['school'] ?? '') !== 'atlas' && $isSchoolPage && ($candidate['school'] ?? '') === $currentSchool) {
            $blog = $candidate;
        }

        // Only published blogs
        if ($blog && ($blog['status'] ?? '') !== 'published') {
            $blog = null;
        }
    }
}

// Not found
if (!$blog) {
    echo "Blog not found";
    exit;
}

$currentSchool = $blog['school'];

// META FROM API
$title = $blog['meta']['title'] ?? '';
$description = $blog['meta']['description'] ?? '';
$keywords = $blog['meta']['keywords'] ?? '';

// STATIC CSS (as you wanted)
$css = "ugdx/atlass-fantastic-site-48323a.webflow.690c39924f50519a8aeb151c-a735920b8.css";
$js = "https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/js/webflow.1ba7f46b.af01a5ad99350cf0.js";
$htmlDataId = "690c39924f50519a8aeb151c";
$body = "body body-ugdx";

include "../../../assets/include/header.php";
?>

<?php
$schoolConfig = [
    "atlas" => [
        "color" => "#6EC1C2"
    ],
    "isdi" => [
        "color" => "#EC1376"
    ],
    "isme" => [
        "color" => "#07F6A0"
    ],
    "ugdx" => [
        "color" => "#EB1F3C"
    ],
    "law" => [
        "color" => "#CB5827"
    ],
];

$themeColor = $schoolConfig[$currentSchool]['color'] ?? "#000";
?>

<!-- Schema (DYNAMIC) -->
<?php

// Schema is under "schema_data" in the API response (not "schema")
$schemaData = $blog['schema_data'] ?? [];

// ARTICLE
if (!empty($schemaData['article'])) {
    echo '<script type="application/ld+json">';
    echo json_encode($schemaData['article'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    echo '</script>';
}

// FAQ
if (!empty($schemaData['faq'])) {
    echo '<script type="application/ld+json">';
    echo json_encode($schemaData['faq'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    echo '</script>';
}

// HOWTO (optional)
if (!empty($schemaData['howto'])) {
    echo '<script type="application/ld+json">';
    echo json_encode($schemaData['howto'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    echo '</script>';
}

?>

<style>
 html {
      scroll-behavior: smooth;
    }
    
    .article-details {
        grid-column-gap: 8px;
        grid-row-gap: 8px;
        justify-content: flex-start;
        align-items: center;
        padding-bottom: 32px;
        font-size: 20px;
        font-weight: 300;
        display: flex;
    }
    
    .title-text {
        font-size: 38px;
    }
    
    /* Dynamic theme color */
    .dynamic-dot-mint {
        background-color: <?php echo $themeColor; ?>;
        border-radius: 4px;
        width: 8px;
        height: 8px;
    }
    .dynamic-color {
        color: <?php echo $themeColor; ?>;
    }
    
    .dynamic-bg {
        background-color: <?php echo $themeColor; ?>;
    }
    
    .dynamic-hover:hover {
        color: <?php echo $themeColor; ?>;
    }
    
    @media screen and (max-width: 767px) {
    .article-details {
        padding-bottom: 22px;
        font-size: 16px;
    }
        .title-text {
        font-size: 28px;
    }
}
</style>

<?php $wrapperClass = "bg-white text-gray-800"; ?>
<div class="<?php echo $wrapperClass; ?>">

<section class="w-full">
    <img src="<?php echo htmlspecialchars($blog['hero']['desktop'] ?? ''); ?>"
         alt="<?php echo htmlspecialchars($blog['hero']['alt'] ?? ''); ?>"
         title="<?php echo htmlspecialchars($blog['hero']['title'] ?? ''); ?>"
         class="hidden md:block w-full object-cover" />

    <img src="<?php echo htmlspecialchars($blog['hero']['mobile'] ?? ''); ?>"
         alt="<?php echo htmlspecialchars($blog['hero']['alt'] ?? ''); ?>"
         title="<?php echo htmlspecialchars($blog['hero']['title'] ?? ''); ?>"
         class="block md:hidden w-full object-cover" />
</section>

<!-- MAIN -->
<section class="max-w-[1200px] mx-auto px-6 py-10">

    <!-- BREADCRUMB -->
    <div class="text-sm text-gray-500 mb-6">
      Home &gt; <a href="https://atlasuniversity.edu.in/schools/<?php echo htmlspecialchars($currentSchool); ?>/thought-leaderships">Thought Leadership</a>
    </div>

    <!-- TITLE -->
    <h1 class="font-semibold leading-tight mb-4 title-text">
      <?php echo htmlspecialchars($blog['title'] ?? ''); ?>
    </h1>

    <!-- META -->
    <div class="article-details">
      <div class="text-lg text-gray-500"><?php echo htmlspecialchars($blog['author'] ?? ''); ?></div>
      <div class="dynamic-dot-mint"></div>
      <div class="text-lg text-gray-500"><?php echo htmlspecialchars($blog['date_label'] ?? ''); ?></div>
    </div>

    <div class="grid md:grid-cols-[260px_1fr] gap-12">

      <!-- SIDEBAR -->
      <aside class="hidden md:block sticky top-16 h-fit">
        <h3 class="text-gray-700 font-medium mb-4">Jump to</h3>
        <ul class="space-y-4 text-sm text-gray-600">
          
          <?php if (!empty($blog['sections'])): ?>
            <?php foreach ($blog['sections'] as $section): ?>
              <li>
                <a href="#<?php echo htmlspecialchars($section['id']); ?>" 
                   class="dynamic-hover font-bold">
                   <?php echo htmlspecialchars($section['title']); ?>
                </a>
              </li>
            <?php endforeach; ?>
          <?php endif; ?>

        </ul>
      </aside>

      <!-- CONTENT -->
        <div class="space-y-10">
        
        <?php if (!empty($blog['sections'])): ?>
        <?php foreach ($blog['sections'] as $section): ?>
        
          <div id="<?= htmlspecialchars($section['id']); ?>">
        
            <h2 class="text-[22px] font-semibold mb-2">
              <?= htmlspecialchars($section['title']); ?>
            </h2>
        
            <div class="text-gray-600 leading-7">
        
              <?php if (!empty($section['blocks'])): ?>
                <?php foreach ($section['blocks'] as $block): ?>
        
                  <!-- PARAGRAPH -->
                  <?php if ($block['type'] === 'paragraph'): ?>
                    <p class="mb-3">
                      <?php foreach ($block['content'] as $part): ?>
                        <?php
                          $text = $part['text'] ?? '';
        
                          if (!empty($part['bold'])) {
                            $text = "<b class='text-gray-700'>$text</b>";
                          }
        
                          if (!empty($part['link'])) {
                            $text = "<a href='{$part['link']}' class='text-blue-600 underline'>$text</a>";
                          }
        
                          echo $text;
                        ?>
                      <?php endforeach; ?>
                    </p>
                  <?php endif; ?>
        
                  <!-- HEADING -->
                  <?php if ($block['type'] === 'heading'): ?>
                    <<?= 'h' . intval($block['level']); ?> class="text-[18px] font-semibold mb-2 mt-6">
                      <?= $block['text']; ?>
                    </<?= 'h' . intval($block['level']); ?>>
                  <?php endif; ?>
        
                  <!-- LIST -->
                  <?php if ($block['type'] === 'list' && !empty($block['items'])): ?>
                    <ul class="list-disc pl-5 space-y-2 mb-3">
                      <?php foreach ($block['items'] as $item): ?>
                        <li><?= $item; ?></li>
                      <?php endforeach; ?>
                    </ul>
                  <?php endif; ?>
        
                  <!-- FAQ -->
                  <?php if ($block['type'] === 'faq'): ?>
                    <div class="mb-4">
                      <h3 class="font-semibold"><?= $block['question']; ?></h3>
                      <p class="mt-0 mb-3"><?= $block['answer']; ?></p>
                    </div>
                  <?php endif; ?>
        
                <?php endforeach; ?>
              <?php endif; ?>
        
            </div>
        
          </div>
        
        <?php endforeach; ?>
        <?php endif; ?>
        
        </div>
    </div>
</section>
</div>

<script src="https://cdn.tailwindcss.com"></script>

<?php include "../../../assets/include/footer.php"; ?>
