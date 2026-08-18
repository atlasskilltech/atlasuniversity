
<?php
// LOAD DATA USING STATIC ID
$cycles = getAdmissionCyclesCon($conn, 4);
?>

<style>
    .df-card{
        justify-content: space-between;
    }
</style>
<div class="df-container-atlas">
                            <div class="df-card atlas-bg">
                                <div class="df-text-2 atlas">B.Tech<br />‍<br />Applications Start</div>
                                <div class="df-txt-wrap">
                                    <?php foreach ($cycles as $c) { ?>
                                                <div class="df-text-2 f14"><?php echo showDateCon($c['cycle_app_open']); ?></div>
                                    <?php } ?>
                                    
                                </div><img loading="lazy" src="https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/690be9dc6aefd2f71dbadb09_28f64a8806bc74ec57598a9667b504e3_Polygon-atlas.png" alt="" class="image-8" />
                            </div>
                            <div class="df-card">
                                <div class="df-text-2 f14">Application<br />Deadline </div>
                                
                                <?php foreach ($cycles as $c) { ?>
                                                <div class="df-text-1 f18"><?php echo showDateCon($c['cycle_last_day_exam']); ?></div>
                                    <?php } ?>
                            </div>
                            <div class="df-card">
                                <div class="df-text-2 f14">Interview Date</div>
                                 <?php foreach ($cycles as $c) { ?>
                                                <div class="df-text-1 f18"><?php echo showDateCon($c['cycle_interview_date']); ?></div>
                                    <?php } ?>
                            </div>
                            <div class="df-card">
                                <div class="df-text-2 f14">Result<br />Announcement</div>
                                 <?php foreach ($cycles as $c) { ?>
                                                <div class="df-text-1 f18"><?php echo showDateCon($c['cycle_result']); ?></div>
                                    <?php } ?>
                            </div>
                            <div class="df-card">
                                <div class="df-text-2 f14">Acceptance Deadline</div>
                                 <?php foreach ($cycles as $c) { ?>
                                                <div class="df-text-1 f18"><?php echo showDateCon($c['cycle_acceptance_deadline']); ?></div>
                                    <?php } ?>
                            </div>
                            <div class="df-card">
                                <div class="df-text-2 f14">Semester 1 Fee Payment Deadline</div>
                                 <?php foreach ($cycles as $c) { ?>
                                                <div class="df-text-1 f18"><?php echo showDateCon($c['cycle_sem_fee']); ?></div>
                                    <?php } ?>
                            </div>
                        </div>