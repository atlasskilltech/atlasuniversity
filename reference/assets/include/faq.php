<?php
function getFAQs($conn, $faqID) {
    $sql = "
    SELECT
    z_atlas_faq_list.faq_list_id,
    z_atlas_faq_list.faq_title,
    z_atlas_faq_list.faq_answer,
    faq_order
FROM
    `z_atlas_faq_master`
JOIN z_atlas_faq_list ON z_atlas_faq_list.faq_master_pk_id = z_atlas_faq_master.faq_master_id
WHERE
    z_atlas_faq_master.faq_master_id = $faqID
     ORDER BY faq_order ASC
     ";

    $result = $conn->query($sql);

    if (!$result) {
        die("SQL ERROR: " . $conn->error);
    }

    $cycles = [];
    while ($row = $result->fetch_assoc()) {
        $cycles[] = $row;
    }

    return $cycles;
}

$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https://" : "http://";
$fullUrl = $protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

// echo $fullUrl;

if($domain == "https://atlasuniversity.edu.in/schools/isdi/"){
    $faqID = 1;
}elseif($domain == "https://atlasuniversity.edu.in/schools/isme/"){
    $faqID = 2;
}elseif($fullUrl == "https://atlasuniversity.edu.in/schools/ugdx/"){
    $faqID = 3;
}elseif($fullUrl == "https://atlasuniversity.edu.in/schools/law/"){
    $faqID = 4;
}else{
    $faqID = 1;
}




$faq = getFAQs($conn, $faqID);
?>
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
		<h2 class="h2-tag mrg16">Questions? We can read your mind </h2>
		<div class="accordion accordion-flush" id="accordionFlushExample">
		    
			<?php if(!empty($faq)){ $i=1; foreach($faq as $faqr){ ?>
			<div class="accordion-item">
				<h2 class="accordion-header">
					<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne<?php echo $i;?>" aria-expanded="false" aria-controls="flush-collapseOne">
						<span class="accordion-title"> <?php echo $faqr['faq_title'];?> </span>
					</button>
				</h2>
				<div id="flush-collapseOne<?php echo $i;?>" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
					<div class="accordion-body">
						<?php echo $faqr['faq_answer']; ?>
					</div>
				</div>
			</div>
			<?php $i++; } } ?>
			
		</div>
	</div>
</section>