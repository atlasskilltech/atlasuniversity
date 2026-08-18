<?php
// LOAD DATA USING STATIC ID
$cycles = getAdmissionCyclesCon($conn, 2);
$cyclesCount = count($cycles);
?>

<table class="table table-bordered" style="border-collapse: collapse; width: 100.229%; height: 461px">
	<tbody>
		<tr style="height: 33px" valign="middle">
			<td style="text-align: center;padding: 0" colspan="<?php echo $cyclesCount+1;?>">
				<div class="header-table" style="background-color: #009fe0;"><strong>BBA / BBA (Hons.) Admissions Calendar for July 2026 Intake&nbsp;</strong></div>
			</td>
		</tr>
		<tr style="height: 33px" valign="middle">
			<td style="text-align: left;"><b>Cycle</b></td>
			<?php foreach ($cycles as $c) { ?>
    		<td style="text-align:center;"><b><?php echo $c['cycle_name']; ?></b></td> 
    		<?php } ?>
    		
		</tr>
		<tr style="height: 33px">
			<td style="text-align: left;"><b>Applications <br class="br"> Opened</b> <b>(<?php foreach ($cycles as $c) { echo showDateUpdate($c['cycle_app_open']); break; } ?>)</b> </td> 
				<?php
                    $count = count($cycles);
                    $i = 0;
                    
                    foreach ($cycles as $c) {
                        $i++;
                        ?>
                        <td style="text-align: center;">
                            <b>
                                <?php
                                if ($i === $count) {
                                    // last key only
                                    echo "Applications Open";
                                } else {
                                    // first all keys
                                    echo '-';
                                }
                                ?>
                            </b>
                        </td>
                    <?php } ?>

		
		</tr>
		<tr style="height: 64px">
			<td style="text-align: left;"><b>Last date <br class="br">for Business<br> Aptitude Test & Interview </b></td>
		        
		        
		        
			    <?php foreach ($cycles as $c) { ?>
                                            <td style="text-align: center;"><b><?php echo showDateUpdate($c['cycle_last_day_exam']); ?></b></td>
                 <?php } ?> 
			    <!--<td style="text-align: left;"><b>Closed</b></td>-->
			    <!--<td style="text-align: left;"><b>Closed</b></td>-->
			    <!--<td style="text-align: left;">10<sup>th</sup> Jan 2026</td>-->
			    
			    
			    
		</tr>
		<tr style="height: 33px">
			<td style="text-align: left;"><b>Collaborative <br class="br">Accelerator </b></td>
			
			<?php foreach ($cycles as $c) { ?>
                                            <td style="text-align: center;"><b><?php echo showDateUpdate($c['cycle_interview_date']); ?></b></td>
                 <?php } ?> 
       <!--  		 <td style="text-align: left;"><b>Closed</b></td>-->
			    <!--<td style="text-align: left;"><b>Closed</b></td>-->
			    <!--<td style="text-align: left;">17<sup>th</sup> Jan 2026</td>-->
		</tr>
		<tr style="height: 33px">
			<td style="text-align: left;"><b>Result <br class="br">Announcement</b></td> 
			
			<?php foreach ($cycles as $c) { ?>
                                            <td style="text-align: center;"><b><?php echo showDateUpdate($c['cycle_result']); ?></b></td>
                 <?php } ?> 
			
			 <!--<td style="text-align: left;"><b>Closed</b></td>-->
			 <!--   <td style="text-align: left;">23<sup>rd</sup> Dec 2025</td>-->
			 <!--   <td style="text-align: left;">27<sup>th</sup> Jan 2026</td>-->
			
			
		
		</tr>
		<tr style="height: 33px">
			<td style="text-align: left;"><b>Acceptance <br class="br">Deadline</b></td>
			
			<?php foreach ($cycles as $c) { ?>
                                            <td style="text-align: center;"><b><?php echo showDateUpdate($c['cycle_acceptance_deadline']); ?></b></td>
                 <?php } ?> 
			 <!--<td style="text-align: left;">20<sup>th</sup> Dec 2025</td>-->
			 <!--   <td style="text-align: left;">15<sup>th</sup> Jan 2026</td>-->
			 <!--   <td style="text-align: left;">17<sup>th</sup> Feb 2026</td>-->
			
		
		</tr>
		<tr style="height: 64px">
			<td style="text-align: left;"><b>Annual Fee <br class="br">Payment Deadline</b></td>
			
		
                 
                 
                 
                 	<?php foreach ($cycles as $c) { ?>
                                            <td style="text-align: center;"><b><?php echo showDateUpdate($c['cycle_sem_fee']); ?></b></td>
                 <?php } ?> 
		  <!--<td style="text-align:center;" colspan="3">30<sup>th</sup> May 2026  </td>-->
		</tr>
	</tbody>
</table>
<script>
document.querySelectorAll('td b').forEach(el => {
    const text = el.textContent.trim();

    if (text === 'Closed') {
        el.style.color = 'grey';
    } 
    else if (text === 'Applications Open') {
        el.style.color = 'green';   // you can change color if needed
    }
    // simple date detection
    else if (/\d{1,2}(st|nd|rd|th)\s[A-Za-z]+\s\d{4}/.test(text)) {
        el.style.color = 'green';
    }
});
</script>