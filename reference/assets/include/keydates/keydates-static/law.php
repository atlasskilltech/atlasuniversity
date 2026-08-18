
<style>
    .table {
    max-width: 100%;
    /*margin-bottom: 1rem;*/
    color: #212529;
}

.header-table{
    width: 100%;
    color: #fff;
    background-color: #d20158;
    font-size: 24px;
    padding: 20px 14px;
}

.table-responsive {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

.table-responsive > .table-bordered {
    border: 2px solid rgba(0,0,0,0.15);;
}

.table-bordered td, .table-bordered th {
    border: 1px solid #dee2e6;
}

.table td, .table th {
    padding: .75rem;
    vertical-align: middle;
    border-top: 1px solid #dee2e6;
      white-space: nowrap; /* Prevents text from wrapping */
  overflow: hidden; /* Hides overflowing text */
  text-overflow: ellipsis; /* Adds an ellipsis for hidden text */
    
}

.br{
    display:none;
}

@media (max-width: 1100px) {
    .br{
    display:block;
}
.header-table{
   
    font-size: 16px;
   
}
    .table-responsive {
        position: relative;
        overflow-x: auto;
    }
    
    .table {
        min-width: 900px;
        width: auto;
    }
    
    .table td, .table th {
        white-space: normal;
        min-width: 150px;
      
    }
    
    
  
    .table tr:nth-child(2) td:first-child,
    .table tr:nth-child(3) td:first-child {
        background-color: white;
        font-weight: bold;
    }

    .table{
         border-collapse: separate !important;
         border-spacing: 0 !important;
    }
}

</style>

<table class="table table-bordered" style="border-collapse: collapse; width: 100.229%;margin: 0;">
	<tbody>
		<tr style="height: 33px" valign="middle">
			<td style="text-align: center;padding: 0" colspan="4">
				<div class="header-table" style="background-color: #CC5500;"><strong>BBA LL.B. Admissions Calendar for July 2026 Intake&nbsp;</strong></div>
			</td>
		</tr>
		<tr style="height: 33px" valign="middle">
			<td style="text-align: left;"><b>Cycle</b></td>
			<td style="text-align:center;"><b>Current Cycle</b></td>
			<!--<td style="text-align:center;"><b>Next Cycle</b></td>-->
		</tr>
		<tr style="height: 33px">
			<td style="text-align: left;"><b>Applications <br class="br"> Opened</b> <b>(11<sup>th</sup> Sep 2026)</b></td>
			<!--<td colspan="2" style="text-align: center;"><b>Applications Open</b></td>-->
			<td  style="text-align: center;"><b>Closed</b></td>
		</tr>
		<tr style="height: 64px">
			<td style="text-align: left;"><b>ATLAS Law Aptitude Test </b></td>
			<!--<td style="text-align: center;"><b>27<sup>th</sup> June 2026</b></td>-->
			<!--<td style="text-align: center;"><b>11<sup>th</sup> July 2026</b></td>-->
				<td  style="text-align: center;"><b>Closed</b></td>
		</tr>
		<tr style="height: 33px">
			<td style="text-align: left;"><b>Personal <br class="br">Interview </b></td>
			<!--	<td style="text-align: center;"><b>27<sup>th</sup> June 2026</b></td>-->
			<!--<td style="text-align: center;"><b>11<sup>th</sup> July 2026</b></td>-->
				<td  style="text-align: center;"><b>Closed</b></td>
		</tr>
		<tr style="height: 33px">
			<td style="text-align: left;"><b>Result <br class="br">Announcement</b></td>
			<!--<td style="text-align: center;"><b>29<sup>th</sup> June 2026</b></td>-->
			<!--<td style="text-align: center;"><b>13<sup>th</sup> July 2026</b></td>-->
			
				<td  style="text-align: center;"><b>Closed</b></td>
		</tr>
		<tr style="height: 33px">
			<td style="text-align: left;"><b>Acceptance <br class="br">Deadline</b></td>
			<!--<td style="text-align: center;"><b>04<sup>th</sup> July 2026</b></td>-->
			<!--<td style="text-align: center;"><b>16<sup>th</sup> July 2026</b></td>-->
				<td  style="text-align: center;"><b>Closed</b></td>
		</tr>
		<tr style="height: 64px">
			<td style="text-align: left;"><b>Semester Fee<br class="br"> Payment Deadline</b></td>
			<!--<td style="text-align: center;"><b>04<sup>th</sup> July 2026</b></td>-->
			<!--<td style="text-align: center;"><b>16<sup>th</sup> July 2026</b></td>-->
				<td  style="text-align: center;"><b>Closed</b></td>
		</tr>
	</tbody>
</table>

<script>
document.querySelectorAll('td b').forEach(el => {
    const text = el.textContent.trim();
    if (text === 'Open') {
        el.style.color = 'green';
    } else if (text === 'Applications Open') {
        el.style.color = 'green';
    } else if (/\d{1,2}(st|nd|rd|th)\s[A-Za-z]+\s\d{4}/.test(text)) {
        el.style.color = 'green';
    }
});
</script>