<table class="table table-bordered" style="border-collapse: collapse; width: 100.229%; height: 461px">
	<tbody>
		<tr style="height: 33px" valign="middle">
			<td style="text-align: center;padding: 0" colspan="3">
				<div class="header-table"><strong>Applications Open for B.Des Admissions July 2026 Intake&nbsp;</strong></div>
			</td>
		</tr>
		<tr style="height: 64px" valign="middle">
			<td style="text-align: left;"><b>Cycle</b></td>
			<td style="text-align:center;"><b>Current Cycle</b></td>
			<!--<td style="text-align:center;"><b>Next Cycle</b></td>-->
		</tr>
			<tr style="height: 33px">
			<td style="text-align: left;"><b>Applications <br class="br"> Opened</b> <b>(11<sup>th</sup> Sep 2025)</b></td>
			<td    style="text-align: center;"><b>Applications Open</b></td>
		
		</tr>
		<tr style="height: 64px">
			<td style="text-align: left;"><b>Design Aptitude Test & Portfolio</b></td>
			<td style="text-align: center;"><b>14<sup>th</sup> July 2026</b></td>
			<!--<td style="text-align: center;"><b>11<sup>th</sup> July 2026</b></td>-->
		</tr>
		<!--<tr style="height: 64px">-->
		<!--	<td style="text-align: left;"><b><br class="br">Personal Interview</b></td>-->
		<!--	<td style="text-align: center;"><b>14<sup>th</sup> July 2026</b></td>-->
			<!--<td style="text-align: center;"><b>14<sup>th</sup> July 2026</b></td>-->
		<!--</tr>-->
		<tr style="height: 64px">
			<td style="text-align: left;"><b> <br class="br">Result Announcement</b></td>
			<!--<td style="text-align: center;"><b>07<sup>th</sup> July 2026</b></td>-->
			<td style="text-align: center;"><b>15<sup>th</sup> July 2026</b></td>
		</tr>
		<tr style="height: 64px">
			<td style="text-align: left;"><b> <br class="br">Acceptance Deadline</b></td>
			<!--<td style="text-align: center;"><b>13<sup>th</sup> July 2026</b></td>-->
			<td style="text-align: center;"><b>16<sup>th</sup> July 2026</b></td>
		</tr>
		<tr style="height: 64px">
			<td style="text-align: left;"><b> <br class="br">Semester Fee</b></td>
			<!--<td style="text-align: center;"><b>13<sup>th</sup> July 2026</b></td>-->
			<td style="text-align: center;"><b>16<sup>th</sup> July 2026</b></td>
		</tr>
	</tbody>
</table>

<script>
document.querySelectorAll('td b').forEach(el => {
    const text = el.textContent.trim();
    if (text === 'CLosed') {
        el.style.color = 'grey';
    } else if (text === 'Applications Open') {
        el.style.color = 'green';
    } else if (/\d{1,2}(st|nd|rd|th)\s[A-Za-z]+\s\d{4}/.test(text)) {
        el.style.color = 'green';
    }
});
</script>