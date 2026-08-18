<?php
// LOAD DATA USING STATIC ID
$cycles = getAdmissionCyclesCon($conn, 5);
?>
<style>
  
</style>

<table class="table table-bordered" style="border-collapse: collapse; width: 100.229%;margin: 0;">
	<tbody>
		<tr style="height: 33px" valign="middle">
			<td style="text-align: center;padding: 0" colspan="<?php echo $cyclesCount+3;?>">
				<div class="header-table" style="background-color: #CC5500;"><strong>BBA LL.B. Admissions Calendar for July 2026 Intake&nbsp;</strong></div>
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
			<!--<td style="text-align: left;"><b>Last date <br class="br">for Design<br> Aptitude Test & Portfolio </b></td>-->
			<td style="text-align: left;"><b>Last date for ATLAS Law Aptitude Test </b></td>
		
			    
			    <?php foreach ($cycles as $c) { ?>
                                            <td style="text-align: center;"><b><?php echo showDateUpdate($c['cycle_last_day_exam']); ?></b></td>
                 <?php } ?> 
			    <!--<td style="text-align: left;"><b>To be announced</b></td>-->
			    
			    
			    
		</tr>
		<tr style="height: 33px">
			<td style="text-align: left;"><b>Personal <br class="br">Interview </b></td>
		
			    
			    	<?php foreach ($cycles as $c) { ?>
                                            <td style="text-align: center;"><b><?php 
                                                                            $dateInterviewDate = showDateUpdate($c['cycle_interview_date']);
                                                                            
                                                                            if($dateInterviewDate == "<b>Closed</b>"){ 
                                                                                echo "<b>Closed</b>"; 
                                                                            } 
                                                                            else if(showDateUpdate($c['cycle_start_interview_date']) == "<b>Closed</b>" && showDateUpdate($c['cycle_interview_date']) != "<b>Closed</b>"){ 
                                                                                echo showDateBDES($c['cycle_start_interview_date']); 
                                                                                echo " to <br>"; 
                                                                                echo showDateUpdate($c['cycle_interview_date']); 
                                                                            }
                                                                            else{ 
                                                                                echo showDateUpdate($c['cycle_start_interview_date']); 
                                                                                echo " to <br>"; 
                                                                                echo showDateUpdate($c['cycle_interview_date']); 
                                                                            } 
                                                                            ?></b></td>
                 <?php } ?>  
			    <!--<td style="text-align: left;"><b>To be announced</b></td>-->
		</tr>
		<tr style="height: 33px">
			<td style="text-align: left;"><b>Result <br class="br">Announcement</b></td> 
			
			<?php foreach ($cycles as $c) { ?>
                                            <td style="text-align: center;"><b><?php echo showDateUpdate($c['cycle_result']); ?></b></td>
                 <?php } ?> 
			    <!--<td style="text-align: left;"><b>To be announced</b></td>-->
			
			
		
		</tr>
		<tr style="height: 33px">
			<td style="text-align: left;"><b>Acceptance <br class="br">Deadline</b></td>
			 <?php foreach ($cycles as $c) { ?>
                                            <td style="text-align: center;"><b><?php echo showDateUpdate($c['cycle_acceptance_deadline']); ?></b></td>
                 <?php } ?>
			    <!--<td style="text-align: left;"><b>To be announced</b></td>-->
			
		
		</tr>
		<tr style="height: 64px">
			<td style="text-align: left;"><b>Semester Fee<br class="br"> Payment Deadline</b></td>
			
			 <?php foreach ($cycles as $c) { ?>
                                            <td style="text-align: center;"><b><?php echo showDateUpdate($c['cycle_sem_fee']); ?></b></td>
                 <?php } ?>
			
			
			
		 
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

