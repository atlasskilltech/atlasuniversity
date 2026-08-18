<?php


$conn = new mysqli("localhost","diceapp_dice","upetch@2017","diceapp_dice");

// STATIC ID — you set manually
//$master_id = 2;   // change to 1, 2, 3 etc. whenever needed



// -------------------------------------------------------
// FUNCTION: GET CYCLES USING STATIC ID
// -------------------------------------------------------
function getAdmissionCyclesCon($conn, $master_id) {

    $sql = "
    SELECT
        isdi_admsn_cycle.cycle_name,
        isdi_admsn_cycle_list.cycle_title,
        isdi_admsn_cycle.cycle_name AS original_cycle_name,
        
        COALESCE(
            NULLIF(isdi_admsn_cycle_list.cycle_title, ''),
            isdi_admsn_cycle.cycle_name,
            'Default Cycle'
        ) AS cycle_name,
        isdi_admsn_cycle_list.cycle_app_open,
        isdi_admsn_cycle_list.cycle_last_day_exam,
        cycle_start_interview_date,
        isdi_admsn_cycle_list.cycle_interview_date,
        isdi_admsn_cycle_list.cycle_result,
        isdi_admsn_cycle_list.cycle_acceptance_deadline,
        isdi_admsn_cycle_list.cycle_sem_fee
    FROM
        isdi_admsn_cycle_list
    JOIN isdi_admsn_cycle_master 
        ON isdi_admsn_cycle_master.isdi_admsn_cycle_master_id = isdi_admsn_cycle_list.cycle_master_pk
    JOIN isdi_admsn_cycle 
        ON isdi_admsn_cycle.cycle_id = cycle_pk
    WHERE
        isdi_admsn_cycle_list.cycle_active = 1
        AND isdi_admsn_cycle_master.isdi_admsn_cycle_master_id = $master_id
    ORDER BY isdi_admsn_cycle.cycle_id ASC
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

function showDateUpdate($date) {

    if ($date == "" || $date == NULL) {
        return "<b>Closed</b>";
    }

    $special_date = "2025-09-11";  

    $date_clean = date("Y-m-d", strtotime($date));
    $today      = date("Y-m-d");

    if ($date_clean < $today && $date_clean != $special_date) {
        return "<b>Closed</b>";
    }

    $timestamp = strtotime($date);
    $day = date("j", $timestamp);

    if (in_array($day, [1, 21, 31])) $suffix = "st";
    elseif (in_array($day, [2, 22])) $suffix = "nd";
    elseif (in_array($day, [3, 23])) $suffix = "rd";
    else $suffix = "th";

    $month = date("M", $timestamp);
    $year  = date("Y", $timestamp);

    return $day . "<sup>$suffix</sup> " . $month . " " . $year;
}

// -------------------------------------------------------
// DATE FORMAT FUNCTION (WITH SUP + CLOSED RULE)
// -------------------------------------------------------
function showDateCon($date) {

    if ($date == "" || $date == NULL) {
        return "<b>Closed</b>";
    }

    $special_date = "2025-09-11";  

    $date_clean = date("Y-m-d", strtotime($date));
    $today      = date("Y-m-d");

    if ($date_clean < $today && $date_clean != $special_date) {
        return "<b>Closed</b>";
    }

    $timestamp = strtotime($date);
    $day = date("j", $timestamp);

    if (in_array($day, [1, 21, 31])) $suffix = "st";
    elseif (in_array($day, [2, 22])) $suffix = "nd";
    elseif (in_array($day, [3, 23])) $suffix = "rd";
    else $suffix = "th";

    $month = date("M", $timestamp);
    $year  = date("Y", $timestamp);

    return $day . "<sup>$suffix</sup> " . $month . " " . $year;
}

function showDateBDES($date) {

    if ($date == "" || $date == NULL) {
        return "<b>Closed</b>";
    }

    $special_date = "2025-09-11";  

    $date_clean = date("Y-m-d", strtotime($date));
    $today      = date("Y-m-d");

    

    $timestamp = strtotime($date);
    $day = date("j", $timestamp);

    if (in_array($day, [1, 21, 31])) $suffix = "st";
    elseif (in_array($day, [2, 22])) $suffix = "nd";
    elseif (in_array($day, [3, 23])) $suffix = "rd";
    else $suffix = "th";

    $month = date("M", $timestamp);
    $year  = date("Y", $timestamp);

    return $day . "<sup>$suffix</sup> " . $month . " " . $year;
}
?>