<?php
// LOAD DATA USING STATIC ID
$cycles = getAdmissionCyclesCon($conn, 1);
?>
<table class="table table-bordered" style="border-collapse: collapse; width: 100.229%; height: 461px">
	<tbody>
		<tr style="height: 33px" valign="middle">
			<td style="text-align: center;padding: 0" colspan="4">
				<div class="header-table"><strong>B.Des Admissions Calendar for July 2026 Intake&nbsp;</strong></div>
			</td>
		</tr>
		<tr style="height: 33px" valign="middle">
			<td style="text-align: left;"><b>Cycle</b></td>
			<?php foreach ($cycles as $c) { ?>
    		<td style="text-align:center;"><b><?php echo $c['cycle_name']; ?></b></td> 
    		<?php } ?>
		</tr>
		<tr style="height: 33px">
			<td style="text-align: left;"><b>Applications <br class="br"> Open</b></td> 
				<?php $count = count($cycles);  foreach ($cycles as $c) { ?>
                                            <td  style="text-align: center;" colspan="<?php echo $count;?>" ><b><?php echo showDateUpdate($c['cycle_app_open']); ?></b></td>
                 <?php break; } ?> 
		
		</tr>
		<tr style="height: 64px">
			<td style="text-align: left;"><b>Last date <br class="br">for Design<br> Aptitude Test & Portfolio </b></td>
		
			    
			    <?php foreach ($cycles as $c) { ?>
                                            <td style="text-align: left;"><b><?php echo showDateUpdate($c['cycle_last_day_exam']); ?></b></td>
                 <?php } ?> 
			    <!--<td style="text-align: left;"><b>To be announced</b></td>-->
			    
			    
			    
		</tr>
		<tr style="height: 33px">
			<td style="text-align: left;"><b>Personal <br class="br">Interview </b></td>
		
			    
			    	<?php foreach ($cycles as $c) { ?>
                                            <td style="text-align: left;"><b><?php $dateInterviewDate = showDateUpdate($c['cycle_interview_date']); if($dateInterviewDate == "<b>Closed</b>"){ echo "<b>Closed</b>"; }else{ echo showDateUpdate($c['cycle_start_interview_date']); echo " to <br> "; echo showDateUpdate($c['cycle_interview_date']); } ?></nt></b></td>
                 <?php } ?> 
			    <!--<td style="text-align: left;"><b>To be announced</b></td>-->
		</tr>
		<tr style="height: 33px">
			<td style="text-align: left;"><b>Result <br class="br">Announcement</b></td> 
			
			<?php foreach ($cycles as $c) { ?>
                                            <td style="text-align: left;"><b><?php echo showDateUpdate($c['cycle_result']); ?></b></td>
                 <?php } ?> 
			    <!--<td style="text-align: left;"><b>To be announced</b></td>-->
			
			
		
		</tr>
		<tr style="height: 33px">
			<td style="text-align: left;"><b>Acceptance <br class="br">Deadline</b></td>
			 <?php foreach ($cycles as $c) { ?>
                                            <td style="text-align: left;"><b><?php echo showDateUpdate($c['cycle_acceptance_deadline']); ?></b></td>
                 <?php } ?>
			    <!--<td style="text-align: left;"><b>To be announced</b></td>-->
			
		
		</tr>
		<tr style="height: 64px">
			<td style="text-align: left;"><b>Annual Fee <br class="br">Payment Deadline</b></td>
		  <?php $count = count($cycles);  foreach ($cycles as $c) { ?>
                                            <td  style="text-align: center;" colspan="<?php echo $count;?>" ><b><?php echo showDateUpdate($c['cycle_sem_fee']); ?></b></td>
                 <?php break; } ?>
		</tr>
	</tbody>
</table>