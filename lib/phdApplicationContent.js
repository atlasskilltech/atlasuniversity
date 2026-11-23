/* /centre-for-research/phd-application — content supplied by ATLAS (2026-11-23) from production's
   /phdapplications page. Transcribed as authored, typos included; only the markup was cleaned: inline
   styles, Webflow scripts and the hidden filter buttons / "View More" row are dropped, tables carry an
   explicit <tbody> and a `.tbl` scroller, the document links are `.docs` pills, and the CSS
   `upper-roman` lists are `type="I"`. Styling lives in components/ui/DropdownFaq (`item.html`). */
import { hero as centreHero } from '@/lib/centreForResearchContent';

export const hero = {
  title: 'PhD Applications',
  text: 'PhD applications are open for Year 2027-28',
  buttons: [{ label: 'Apply Now', href: 'https://atlasuniversity.edu.in/phdapplicationform', variant: 'atlas' }],
  after: ['For more details:', 'Contact +91 730446421', 'Email: phd.admissions@atlasuniversity.edu.in'],
  /* production's own photograph (phdapplications/assets/images/hero-banner-img.webp) could not be
     fetched from this environment; the Centre for Research hero stands in until it is added */
  image: centreHero.image,
};

const LOGIN = 'https://www.atlasskilltech.app/admissions/login';
const CLICK = `<a href="${LOGIN}">Click Here</a>`;

export const sections = {
  items: [
    {
      q: 'Introduction',
      html: `
<p>ATLAS SkillTech University was enacted by an Act of the Maharashtra State Legislature, and recognised by the University Grants Commission (UGC) in August 2021 as per Section 2(f) of UGC Act 1956. ATLAS University is India’s first new-age urban private multidisciplinary university situated in the heart of Mumbai, the financial capital of India. Founded to forge a path to the future, ATLAS is where the confluence of design, technology, strategy, and leadership takes place. At ATLAS University, we are constantly defining, shaping, and redefining the future of education in India right here in the heart of an ever-booming, cosmopolitan, and enterprising Mumbai.</p>
<p>With India’s National Education Policy 2020 as the cornerstone, ATLAS endeavors to deliver a multidisciplinary education across 3 new-age streams: Design &amp; Innovation, Management &amp; Entrepreneurship, and Digital Technology. It has adopted a futuristic model co-created with an international community of scholars, academicians, industry experts, and world leaders in education. Our undivided focus on academic excellence, world-class faculty, state-of-the-art infrastructure, global institutional collaborations and unique corporate connect empower students to succeed in Industry 4.0 and become socially-responsible global leaders.</p>
<p>The Ph.D. admissions at ATLAS University occur once a year in July. The Ph.D. programmes are offered in Full-time and Part-time modes but not in a distance learning mode.Company sponsored candidates are also welcome. Doctoral programmes at ATLAS University are designed to develop outstanding educational researchers with a wide range of research skills as well as in-depth practical understanding and expertise in their chosen field of educational research. ATLAS encourages multidisciplinary and interdisciplinary research and exchange of ideas and knowledge in various related fields. The Guide for the scholar during the Ph.D. programme will be from ATLAS University, appointed as per the research topic and availability. Scholars may appoint a Co-Guide from within or outside ATLAS University, as per the university guidelines and regulations. Full-time Ph.D. scholars have the scope to work as research fellows in the various ongoing research projects of the university.</p>
<p>ATLAS University expects its Ph.D. scholars to demonstrate independent research and thought leadership through publications in academic journals and scholarly presentations of their work. The scholars shall also manifest their passion for knowledge and research and for developing new ideas and paradigms. Creativity and the potential to do outstanding research must be a hallmark of their personality and intellectual skillset. The programme recognises high academic achievements, independent research and application of knowledge in the areas of Design &amp; Innovation, Management &amp; Entrepreneurship, and Digital Technology. Interdisciplinary and trans-disciplinary research is highly encouraged.</p>`,
    },
    {
      q: 'Ph.D. Programmes Offered at ATLAS University',
      html: `
<div class="tbl"><table><tbody>
<tr><th>ATLAS ISME (School of Management &amp; Entrepreneurship)</th><th>ATLAS ISDI (School of Design and Innovation)</th><th>ATLAS uGDX (School of Technology)</th></tr>
<tr><td>Finance</td><td>Communication Design</td><td>Big Data</td></tr>
<tr><td>Marketing</td><td>UX / UI</td><td>Mechatronics</td></tr>
<tr><td>Entrepreneurship</td><td>Product Design</td><td>Computer Vision</td></tr>
<tr><td>General Management</td><td>Design Education</td><td>Biomedical Image Processing</td></tr>
<tr><td>Economics</td><td>Fashion Design</td><td>Artificial Intelligence</td></tr>
<tr><td>Supply Chain Management</td><td>Design Management</td><td>Machine Learning</td></tr>
<tr><td></td><td>Service Design</td><td></td></tr>
<tr><td></td><td>Design History</td><td></td></tr>
<tr><td></td><td>Cultural Studies in Design</td><td></td></tr>
<tr><td></td><td>Social Design</td><td></td></tr>
<tr><td></td><td>Universal Design</td><td></td></tr>
<tr><td></td><td>Human Computer Interaction Design</td><td></td></tr>
</tbody></table></div>`,
    },
    {
      q: 'Admission Procedure',
      html: `
<ul>
<li>Applications for admission to a Ph.D. programme at ATLAS University are accepted once a year, for July session</li>
<li>Candidates seeking admission to the Ph.D. programme, whether full-time or part-time must possess requisite percentage of marks / grade point average / subjects / specializations in qualifying examination as indicated under each Ph.D. programme</li>
<li>Candidates who apply for part-time mode must submit their employment verification details and NOC from the company as per the format</li>
<li>The admission Form is to be filled and submitted ONLINE ONLY along with required documents uploaded in the given format and an online payment of Rs 1500/- made via a Credit / Debit Card, Net-banking, UPI, Bank Transfer. <b>No hard copies will be accepted</b></li>
<li>A candidate will be allowed to appear in the selection process only once in a session, irrespective of whether separate forms are filled for full-time and part time modes</li>
<li>One form will be considered for the selection process/ admission to ONE programme only</li>
<li>Candidates may refer to the section ‘Application Form’ for the following:
<ul>
<li>List of essential documents that must be uploaded while applying</li>
<li>Guidelines on how to write a <b>Preliminary Research Idea.</b></li>
</ul></li>
<li>To check / do the following related to your admission, login to your on ${CLICK} by using your Application ID generated at the time of applying online :
<ul>
<li>Check whether your Form has been received or not</li>
<li>Check the Status of your Form</li>
<li>Check whether you have been short-listed for the <b>Selection Procedure</b></li>
<li>Select the date for appearing in the selection Procedure and <b>download Admit Card</b> In case of a message ‘Dates will be released shortly’ on Click Here or contact the admissions office</li>
<li>Check your selection status</li>
<li>Print Admission letter after you have been selected</li>
<li>Check confirmation of fee payment after making payment</li>
</ul></li>
<li><b>Candidates</b> will be communicated about requirements related to their application form, date, time and venue of selection process (written test and / or Interview) on ${CLICK}. It is the responsibility of the candidate to periodically check the for updates and note the date for Ph.D. Entrance Test (PET). <b>No separate communication will be sent in this regard</b></li>
<li><b>Eligible candidates</b> will be required to appear in the Selection Process consisting of PET and an Interview round as per UGC’s PhD Guidelines. PET exempted candidates, exempted as per criteria given in section ’eligibility criteria’ will appear for Interview only</li>
<li><b>Selected candidates</b> will be intimated about their selection on ${CLICK}</li>
<li>A printable online <b>admission letter</b> will be uploaded on ${CLICK} within two days of candidate selection. This will carry details regarding payment of fees at the time of admission, date, time and venue for commencement of the academic session etc.</li>
<li><b>Offer of admission will be provisional &amp; valid only for the specific programme opted by the candidate as well as for the same academic session. The offer of admission will automatically stand cancelled if the conditions are not fulfilled within the specified time</b></li>
<li>Portfolio Manager</li>
<li>Investment Banker etc.</li>
</ul>
<p><b>Note 1.</b> It is mandatory for foreign nationals/ NRI to submit AIU certificate along with other documents at the time of applying (https://aiu.ac.in/) for more information</p>
<p><b>Note 2.</b> It is mandatory for working applicants to submit an NOC (refer below- hyperlink) at the time of registration cum orientation for the programme, i.e within a month of their selection for format.</p>`,
    },
    {
      q: 'Selection Process',
      html: `
<p>The Entrance Test shall be of two hours’ duration (i.e. 120 minutes) and of 100 marks consisting of 50 objective type of questions and 50 subject specific long answer questions. The Entrance Test will have two Sections, as mentioned here under:</p>
<div class="tbl"><table><tbody>
<tr><th>PARTICULAR</th><th>COMPONENT</th><th>QUESTIONS</th><th>MARKS</th></tr>
<tr><td>SECTION 1 – GENERAL</td><td><p><b>Section 1</b> shall be common to all candidates for testing their aptitude in research by covering questions from following areas for research methodology:</p><ul><li>General Knowledge &amp; Research Awareness</li><li>English Language</li><li>Logical Reasoning</li></ul></td><td>50 Questions of 1 mark each</td><td>50 marks</td></tr>
<tr><td>SECTION 2 – SUBJECT SPECIFIC</td><td><p><b>Section 2</b> shall be programme / Subject Specific as per applied Ph.D. programme of the applicant.</p></td><td>5 Questions of Master’s level of 10 mark each</td><td>50 marks</td></tr>
<tr><td colspan="3">Research Proposal Presentation</td><td>50 marks</td></tr>
<tr><td colspan="3">Interview By University Research Committee</td><td>50 marks</td></tr>
</tbody></table></div>
<p>The written test and personal interview will be conducted on subsequent days as notified after the written examination. Candidates who are shortlisted for the written test and interview process will have to appear for both.The written test will attempt to assess the subject knowledge in the respective areas of specialization and written communication skills of the candidates. The candidates must prepare accordingly.</p>
<p>Both the written test and interview will examine the candidates’ communication skills – oral &amp; written, academic disposition, aptitude for research, and research related co-curricular activities.</p>`,
    },
    {
      q: 'Program Structure',
      html: `
<p>The doctoral programme broadly consists of the following stages:</p>
<p>Completion of Coursework Requirement – You are expected to complete a certain number of credits / advanced level courses related to your area of research. A course of one credit means fifteen hours of classes. Normally courses are of three credits.</p>
<p>Presentation of Research Proposal – Presentation shall be done in front of a committee and the institute.</p>
<p>Research work – Undertaking of research work as proposed.</p>
<p>Presentation &amp; Submission of Synopsis -Post research work, you will present the findings / contributions in front of a committee and the institute.</p>
<p>Final Submission of the thesis – Submission of hardcopy of the thesis for internal and external evaluation.</p>
<p>Thesis Defense – Open defense of thesis in front of the external examiner and the institute.</p>
<p>The submission of thesis should be completed within 3 to 4 years from the date of registration for full-time and 3 to 5 years for part-time doctoral students.</p>
<p>The student is allowed to submit his/her thesis when two articles are published in peer-reviewed journals (or accepted for publication in journal). The student is required to do original work and contribute to the body of knowledge in his/her respective area. The thesis submitted will be evaluated by two examiners within India/outside India. Favorable comments and approvals from the examiners are mandatory for the students to defend his/her thesis publicly.</p>
<p>Stipends are available for all full-time eligible Ph.D. Scholars.</p>
<p>Scholarships are available to the deserving candidate at the time of admission. Scholarship form will be available on website (after declaration of merit list).</p>
<p>The form should be submitted at the following address along with the Complete RESUME, Admission Form, and the admission offer letter copy (which is available on ${CLICK}):</p>
<p>ATLAS SKILLTECH UNIVERSITY, Equinox Business Park, Ambedkar Nagar, Kurla West, Kurla, Mumbai, Maharashtra 400070, India.</p>
<ul>
<li>Scholarships are awarded on a yearly basis and will continue throughout the program, subject to the satisfactory progress of the candidate.</li>
<li>The scholarship will stand cancelled immediately if a student is found indulging in any wrong activity.</li>
<li>Application must be received along with the Admission Form and Admission Offer Letter. Scholarship recipients will be notified by email of the scholarship committee’s decision, which will be abiding and final.</li>
<li>A student will not be entitled to avail the scholarship in case of re-admission.</li>
</ul>
<p>Classes: For full time and part time Ph.D. scholars, coursework classes will be held during the weekends. Saturday – 9am to 5pm.</p>`,
    },
    {
      q: 'Ph.D. Online Application Form',
      html: `
<p>Instructions for Submission of Online Application Form:</p>
<ol>
<li>At the start of form filling choose your Ph.D. programme carefully</li>
<li>Fill in the Application Form only if you are satisfied about your eligibility for admission to the programme and will be able to submit all the required documents in time</li>
<li>Kindly refer Eligibility Criteria section to check the eligibility</li>
<li>Documents required during Ph.D. form filling:
<ol type="a">
<li>Scanned passport size photograph: (jpg, gif, png, jpeg, bmp). The dimensions of the photograph should be 3.5 x 4.5cm width.</li>
<li>Scanned Class X, XII &amp; Graduation Certificate &amp; mark sheet. (format: jpg, gif, png, jpeg, bmp)</li>
<li>Scanned Post-Graduation Certificate &amp; marks sheet till final semester / year. (format: jpg, gif, png, jpeg, bmp)</li>
<li>AADHAR card/Passport</li>
<li>Transfer Certificate and /or Leaving Certificate</li>
<li>Migration certificate</li>
<li>Preliminary research idea [create hyperlink – content below] (to be uploaded while filling the online application and not to exceed 1000 words). click here for guidelines on how to write Preliminary research idea.</li>
<li>Employment Verification Certificate [create hyperlink – content below] Applicable to those who are employed and are applying for a Part time Ph.D. programme</li>
</ol></li>
<li>A valid personal e-mail ID</li>
</ol>
<p>Important:</p>
<ul>
<li>Candidate seeking admission to Ph.D. must apply online only. Hard copies will not be accepted</li>
<li>Online Application Form will not get registered until the candidate has submitted all the required documents mentioned above. Applicants in their final semester/ year of post-graduation may apply but their form will be registered and they will be offered a PET date only on receipt of the pending document latest by five days prior to ATLAS University PET for the academic session</li>
<li>Merely submission of an application form, does not constitute a claim for an offer date for the selection procedure or admission to the programme. The form may be rejected due to deficiency in the supporting documents, not following the prescribed procedures or any other valid reason</li>
<li>An Application ID is generated on submission of the application form which will be required for future reference. A mail is sent to the applicant in this regard on the registered email-id</li>
<li>Candidates are advised to keep a printed copy of the online Application Form</li>
<li>Check whether your Form has been received or not</li>
<li>Check the Status of your Form</li>
<li>Select the date for appearing in the selection Procedure and download Admit Card</li>
<li>Check your selection status</li>
<li>Print Admission letter after you have been selected</li>
<li>Check confirmation of fee payment after making payment</li>
<li>No separate communication will be sent in this regard</li>
</ul>`,
    },
    {
      q: 'Important Points',
      html: `
<ul>
<li><b>Date of Registration:</b><p>The date of registration of the candidates shall be the date of provisional registration/admission.</p></li>
<li><b>Programme Duration:</b><p>The minimum duration for Full-Time candidates shall ordinarily be three years / four years for Ph.D. in Technology .</p><p>There is no relaxation for Part-Time Ph.D. scholars, they need to attend Ph.D. course work classes and other academic activities as per schedule.</p></li>
<li><b>Attendance Requirement:</b><p>The Ph.D. scholars (both Full-Time &amp; Part-Time) are expected to have full attendance (i.e. 100%) in each course. However, a minimum of 75% attendance in each course shall be mandatory for becoming eligible to appear in the end of coursework examinations.</p></li>
<li><b>Course Work:</b><p>All candidates admitted to Ph. D. programmes have to compulsorily do the course work assigned and shall be required to take a written examination for the same. Coursework period will ordinarily be of minimum six months duration / one-year for School of Technology. A candidate will earn credits for a Course Unit only if he obtains a minimum of Grade B+ (Points 07 on scale of 10). If a candidate fails to get qualifying Grade B+, he / she will be given second opportunity to improve his/her qualifying Grade to B+, i.e. Point 7 on ten point scale failing which his/her registration is liable to be cancelled.</p><p>Scholars shall be required to undertake coursework for a minimum period of one semester, not exceeding one academic year from the date of the provisional registration.</p><p><b>Class timings during coursework:</b></p><p>All Saturdays, 9.00 am to 5.00 pm</p></li>
<li><b>Comprehensive Examination:</b><p>Each candidate, on completion of course work, shall be required to take a comprehensive examination which will test his/her comprehension or knowledge in his/her broad field of research and his/her academic preparation and potential to carry out the research work. The comprehensive examination shall be combination of both written and oral examinations and shall be conducted by the university. The candidate is required to secure at least Grade B+ (Points 07 on scale of 10) in comprehensive examination.</p></li>
<li><b>Minimum and Maximum Degree Duration:</b><p>Candidate will be given the time duration for submission of his / her Ph.D. thesis (from the date of registration) as per the details given below:</p>
<div class="tbl"><table><tbody>
<tr><th>Category</th><th>Minimum Time Period</th><th>Maximum Time Period</th></tr>
<tr><td>Full Time Scholars</td><td>3-4 Years</td><td>6 Years</td></tr>
<tr><td>Part Time Scholars</td><td>3-5 Years*</td><td>6 Years</td></tr>
</tbody></table></div></li>
</ul>
<p>* The minimum period of 3-5 years for Part-time Research Scholars having rich experience while working with reputed organizations in India may, on the recommendations of Research Advisory Committee (RAC), be reduced to 3.5 years. Such Part time Ph.D. scholar is allowed to submit thesis after completing 3.5 years but he/she has to pay the due fees until the submission of thesis.</p>
<p><b>For any further clarification, please contact –</b><br>ATLAS Admission Office,<br>Address: Equinox Business Park, Ambedkar Nagar, Kurla West, Kurla, Mumbai, Maharashtra 400070</p>
<p>Email : phd@atlasuniversity.edu.in</p>`,
    },
    {
      q: 'Fee Structure',
      html: `
<p>The Prescribed<br>Fees* for an Indian National/International candidate is as under:</p>
<div class="tbl"><table><tbody>
<tr><th colspan="3">Admission Fee Structure</th></tr>
<tr><td>Particulars</td><td><b>Amount (Full / Part Time)</b></td><td><b>Amount (International)</b></td></tr>
<tr><td>Application fees (non-refundable)</td><td>1500</td><td>10000</td></tr>
</tbody></table></div>
<div class="tbl"><table><tbody>
<tr><th colspan="2">Ph.D. Fees (Annual) – non-refundable</th></tr>
<tr><td><b>Amount (Full / Part Time)</b></td><td><b>Amount (International)</b></td></tr>
<tr><td>200000/-<br>Tuition Fees – 185000/-<br>Library Fees – 10000/-<br>Examination Fees– 5000/-</td><td>600000/-<br>Tuition Fees – 585000/-<br>Library Fees – 10000/-<br>Examination Fees– 5000/-</td></tr>
</tbody></table></div>
<div class="tbl"><table><tbody>
<tr><th colspan="2">Synopsis &amp; Ph.D. Thesis Submission Fees</th></tr>
<tr><td><b>Particulars</b></td><td><b>Amount</b></td></tr>
<tr><td>Approval of Synopsis of Ph.D. Thesis Topic</td><td>5000</td></tr>
<tr><td>Ph.D. Thesis Submission</td><td>10000</td></tr>
<tr><td>Ph.D. Thesis Evaluation (2 adjudicators)</td><td>20000</td></tr>
<tr><td><b>Total</b></td><td><b>35,000/-</b></td></tr>
<tr><td colspan="2">Note: Synopsis &amp;<br>Ph.D. Thesis Submission fees to be paid by the Ph.D. scholars before submission of synopsis</td></tr>
</tbody></table></div>
<p><b>Note:</b></p>
<ul>
<li>Fee will be paid semester wise for the two semesters in a year. Enrolled scholar will pay fee for the minimum period (minimum 3/4 years for Ph.D. full time and 3/5 years for Ph.D. part time) and for the period they stay enrolled until thesis submission, upper limit being 6 years</li>
<li>Fee concession to ATLAS Academic/ Non-academic Staff, JRF/SRF/RA/ARF/SARF employed in the University, national level examination scholarship holders or scholars from all such labs where ATLAS University has Memorandum of Understanding (MoU), if applicable, is allowed by the University on case-to-case basis and as per the system</li>
</ul>
<p><b>Fee is subject to revision from time to time as decided by the University.</b></p>
<p>The ATLAS SkillTech University Fee Refund Policy is in conformance with the norms set by the University Grants Commission (UGC) and is in accordance with the UGC notification on “Refund of Fees and Non-Retention of Original Certificates”, which was published on the UGC website on 1st November 2022. To refer to this, please <a href="https://atlasuniversity.edu.in/wp-content/uploads/2023/06/UGC_Refund_of_Fees_Letter_Nov-2022.pdf">click here.</a></p>`,
    },
    {
      q: 'Eligibility Criteria',
      html: `
<p>Candidates seeking admission to the Ph.D. programme, whether full time or part time, shall have to possess requisite percentage of marks / grade point average in qualifying examination as indicated below:</p>
<ul>
<li>The required minimum qualification for admission to a Ph.D. programme shall normally be a two years Master’s Degree from any accredited Indian or Foreign University in the relevant field. She/he must have obtained 55% marks (50% for SC/ST/PwD candidates) or grade point average of 6.0 on a 10-point scale (5.5 for SC/ST/PwD candidates) or equivalent. or Equivalent Grade in the Master’s Degree (applicable for all Ph.D. programmes except in Engineering and Technology)</li>
<li>For Ph.D. programmes under the Engineering &amp; Technology domain and Fashion and Fine Arts domain, eligibility criteria shall normally be as per eligibility mentioned against each programme. However, exceptional candidates who have a min CGPA of 8.0 out of 10 in the desired four years bachelor’s degree of the respective programme in these domains are also eligible to apply, but for a full time Ph.D. only</li>
<li>Foreign/ NRI applicants / Applicants with a Masters’ degree from a foreign university must apply with an equivalence certificate of AIU along with the Online Application Form</li>
</ul>
<p><b>Exemption from Ph.D. Entrance Test/ Written Test:</b></p>
<p>Only those candidates who have successfully cleared an All India National Level Competitive Examination like NET of UGC / CSIR / CEED / ICAR (ASRB) / GPAT / ICMR / GATE / DST – INSPIRE within the last 3 years* of the Ph.D. session (July) they are applying in, at ATLAS, shall be exempted from the written test of the Ph.D. Selection Process and they will be required to appear for the Interview round only. For consideration of exemption they must timely submit scanned copy of the issued certificate (and not score card) along with the application form or later via mail but not later than two days prior to the PET date. Exempted Candidates will receive a message of exemption on their admission microsite/ admit card prior to PET and those who do not receive such a message will be required to appear for PET (Ph.D. Entrance Test).</p>
<div class="tbl"><table><tbody>
<tr><th rowspan="2">Ph.D. Domain</th><th rowspan="2">Qualifying Degree</th><th colspan="2">Minimum performance in the Qualifying degree</th><th colspan="2">Qualification through national level exam requirements</th></tr>
<tr><td><b>General/ OBC (Non-creamy)</b></td><td><b>SC/ST/PH category</b></td><td><b>SC/ST/PH category</b></td><td><b>SC/ST/PH category</b></td></tr>
<tr><td><b>Ph.D. in Management</b></td><td>MA/M.Com/M.Tech/Masters from Recognised Universities with over 55% overall marks or corresponding grades, are eligible.</td><td>55% marks or 6.00 CGPA on a 10-point scale</td><td>50% marks or 5.50 CGPA on a 10-point scale</td><td>Nil</td><td>Nil</td></tr>
<tr><td><b>Ph.D. in Design</b></td><td>Master’s degree in the relevant area of Design, Management or Technology (or) equivalent qualification from an institute/ university of national/ international repute</td><td>55% marks or 6.00 CGPA on a 10-point scale</td><td>50% marks or 5.50 CGPA on a 10-point scale</td><td colspan="2">Qualified GATE/CSIR/UGC NET/ICAR/CEED/ICMR/DST-INSPIRE Fellowship</td></tr>
<tr><td><b>Ph.D. in Artificial Intelligence and Machine Learning</b></td><td>Any branch of B.Tech/M.Sc (Mathematics / Statistics / Physics / Chemistry / Computer Science) with 55% marks (50% for SC/ST/PwD candidates)</td><td>60% marks or 7.00 CGPA on a 10-point scale.</td><td>55% marks or 6.0 CGPA on a 10-point scale</td><td colspan="2">Qualified GATE/CSIR/UGC NET/ICAR/ICMR/DST INSPIRE Fellowship</td></tr>
</tbody></table></div>
<p>Sponsored (full-time) candidates seeking admission to a Ph.D. programme on the basis of study leave, must submit a “Sponsorship Certificate” on a proper letterhead from the appropriate authority in the organization clearly stating the following: For the period of his/her studies in the programme, the candidate would be treated as on duty with usual salary and allowances, and that he/she will be fully relieved and granted study leave for a minimum period of 3 years (2 years for M.Tech. and equivalent degree holders). You are required to submit a “No Objection Certificate” on a proper letterhead from the appropriate authority in the organization clearly stating the following: The candidate is permitted to pursue studies on a part-time basis; That his/her official duties permit him/her to devote sufficient time for research; Facilities for research in the candidate’s field of research are available at the candidate’s place of work; and he/she will be fully relieved from duty and permitted for the duration required.</p>
<p><strong>Short listing Criteria:</strong>After receipt of the applications, the university shall apply additional criteria, also called as short listing criteria to select candidates to be called for a written test and personal interview at the department. These criteria are likely to change in every cycle and shall be published in the university website. The short listing criteria shall be published in the university website, at least two weeks before the interview date. Please see the shortlisting criteria used below.</p>
<p>General &amp; OBC Categories:</p>
<p>For all candidates (Full Time and Part Time Ph.D.): 55% marks or equivalent grade score (GPA) on a 10 point scale, in master degree</p>
<p>For candidates having only B.Tech/B.E. degree: 60% marks or equivalent grade score (GPA) on a 10 point scale</p>
<p>For Part-Time and Full-Time sponsored candidates: A mandatory minimum experience of 8 years as on date of registration.</p>
<p>For Full Time Ph.D. with assistantship: A GATE score &gt;= 200 or Fellowship from any one of the following national exams:</p>
<p>UGC (Lectureship or Research Fellowship), CSIR, ICAR, ICMR, DST, and INSPIRE. This is not required for those having:</p>
<ol type="I">
<li>M.Tech / ME or equivalent degrees, or</li>
<li>M.A./ M.Sc. from IITs graduating with a CGPA of 8.0 or above or</li>
<li>B.E./B. Tech./Integrated M.Sc. from IITs/CFTIs graduating with a CGPA of 8.0 or above, or</li>
<li>MBA degree from IITs or IISc where admission was through JMET.</li>
</ol>
<p>Requirement of qualification in GATE / National Exam is waived for the following categories of applicants:</p>
<ol type="I">
<li>Currently registered students in Centrally Funded Technical Institutes (CFTIs) pursuing B. Tech./B.E./ Integrated M. Tech/<br>Integrated M. Sc. programmes, who have completed 6 semesters or more, and have CGPA of 8.00 or above (on a 10 point scale). Such students must obtain a CGPA of 8.00 or above at the time of graduation, and before they formally register for the<br>Ph.D. programme (80% aggregate marks, if marks is the primary mode of evaluation)</li>
<li>Graduates of CFTIs (in the programmes marked under (i)) with a final graduation CGPA of more than 8.000 (80%<br>aggregate marks, if marks is the primary mode of evaluation)</li>
<li>M.A or M.Sc. graduates from IITs with CGPA 8.000 or above.</li>
</ol>`,
    },
    {
      q: 'Ph.D. Scholar Category',
      html: `
<ol>
<li>An Indian candidate applying for admission to the Ph.D. programme shall apply under one of the categories given below. The Ph.D mode option (Full time/Part time/Company Sponsored) permitted against each category is also mentioned.</li>
<li>Sponsored Candidate: Sponsored candidates getting Government / Semi Govt. / Private or other Scholarships/ Fellowships /stipends, who apply for admission through the sponsoring organizations. (Ph.D. Full/ Part time based on employment status).</li>
<li>Regular Self – Financed Candidate: students, self- employed or other working / non-working candidates. (Ph.D. Full/ Part time based on employment status).</li>
<li>Corporate Research Scholar: Candidates working with reputed organizations in India and having at least 8 years of experience and possessing minimum prescribed academic qualifications. (Ph.D. part time only).</li>
<li>Working Faculty outside ATLAS: Faculty members of other Universities /schools and recognized/ approved institutions/schools in India, possessing minimum prescribed academic qualifications (Ph.D. part time only).</li>
<li>Regular Academic Staff of ATLAS: Regular academic staff of School / Department / Constituent Units of ATLAS University (Ph.D. part time only).</li>
<li>Regular Non-Academic Staff of ATLAS: Regular member of non-academic staff of the University and its Departments / Constituent Units who satisfies eligibility qualifications allowed to be registered for a part-time Ph.D. programme. (Ph.D. part time only).</li>
<li>Scholars who are awarded National Fellowships through National Competitive Examinations. (Ph.D. full time only).</li>
<li>A foreign national will apply under the foreign candidate category. (Ph.D. full time based on employment status).</li>
</ol>`,
    },
    {
      q: 'FAQs',
      html: [
        ['1. What is the minimum qualification for admission to a Ph.D. programme?', 'Minimum qualification for admission to a Ph.D. programme is normally a Master’s Degree in the relevant field. Kindly refer to the concerned Ph.D. programme on Ph.D. Programmes Offered at ATLAS University Section for exact details on eligibility criteria, percentage requirement and relevant subject areas.'],
        ['2. To apply for a Ph.D. programme at ATLAS, is it mandatory that I have with me all mark sheets of the required degree/master’s programme, till the final semester?', 'Yes, it is mandatory to have all required mark sheets. A candidate’s form will be registered and he /she will be offered a PET date only on submission of all required documents including last semester marksheet in case of final year appearing candidates.'],
        ['3. Can I apply to the Ph.D. programme by personally visiting the campus and submitting a hard copy?', 'No, Ph.D. application forms can only be filled and submitted online through the website <a href="https://atlasuniversity.edu.in/phdapplicationform">Click Here</a>'],
        ['4. When can I apply to a Ph.D. programme at ATLAS?', 'The Ph.D. application forms are accepted once a year i.e.<br>For July Session – Between June to Jully'],
        ['5. Who all are expected to submit an NOC (No Objection Certificate)?', 'If you are in a job, then it is mandatory for you to produce an NOC from your employer at the time of joining'],
        ['6. What is the admission procedure?', 'After your online form is found complete in all respects and is accepted, you will be asked to appear for an Entrance Test (unless you are exempted) followed by an Interview at our Mumbai campus on the date given to you. The written examination selection process will take place on the same day. Interviews will be scheduled subsequently and the selected candidates will be informed. You will be allowed to appear in the selection process of a particular Ph.D. programme (irrespective of whether it is full time or part time), only once in one session. Further, Form fee is non- refundable.'],
        ['7. In the Ph.D. entrance test, what subject will I be tested in and what is the difficulty level?', 'In addition to the General Section, you will be tested in the subject of the Ph.D. programme you have applied to and the subject you have done your Master’s degree in, if the two subjects are different but allied. Difficulty level is UGC-CSIR-NET, GATE etc.'],
        ['8. On what basis is a candidate selected for a Ph.D. programme at ATLAS University?', 'Following parameters are considered for selection to a Ph.D. programme at ATLAS:<br>– Score in the ATLAS Entrance Test<br>– Performance in the Interview rounds<br>– Proposed research idea – its relevance and brilliance<br>– Academic record'],
        ['9. I have a rich teaching /corporate work experience, Am I exempted from the Entrance Test?', 'No, you have to go through the entire selection procedure.'],
        ['10. Is Ph.D. available on distance mode?', 'No, ATLAS does not offer Ph.D. programmes on distance mode.'],
        ['11. How is a research topic/ preliminary research idea decided?', 'Research topic is conceptualized by the candidate. It can be modified with the help of the appointed Guide and Co-Guide after selection. It is finally approved by the Competent Authority of the University.'],
        ['12. Is the preliminary research idea uploaded at the time of applying, final?', 'You are allowed to change/modify/ improve upon your research idea with the help of your appointed Guide after registering for the Ph.D. programme.'],
        ['13. How do I write the preliminary research idea?', 'Refer to the guidelines available on <a href="https://atlasuniversity.edu.in/wp-content/uploads/2023/06/Guidelines-for-Research-Proposal.docx" target="_blank" rel="noopener">Click here</a>, under Admission Procedure.'],
        ['14. Does University provide any Hostel facility to a Ph.D. scholar?', 'Hostel facility may be offered to full time research scholars subject to availability. Preference is given to undergraduate and graduate students.'],
        ['15. What is the pattern of classes for full time and part time candidates during the first year coursework?', 'For full time and part time Ph.D. scholars, coursework classes<br>will be held during the weekends. Saturday – 8am to 4pm and Sunday – 9.00 am to 1.00<br>pm.'],
        ['16. How is a Guide and Co-Guide decided?', 'The Guide and Co-Guide are decided by the Research Advisory Committee (RAC) and University Research Committee (URC). The Guide will have to be from ATLAS University and the Co-Guide, if required, is expected to be from within/outside ATLAS. A Co-Guide will be appointed only after his/her profile is approved by the university authorities'],
        ['17. Am I assigned a Guide by the university or I select one on my own and when?', 'A candidate is assigned a Guide by the University after admission to the Ph.D. programme. Preference of a Guide may be provided by the candidate. Appointment of a Guide is based on availability of an eligible guide , candidate’s area of research and candidate’s preference as given by him/her in a form after having met all the eligible guides of the university after enrolling for the programme.'],
        ['18. How many Guides am I allowed to work with?', 'One Guide from the concerned School/Department at ATLAS and one Co-Guide who must be from within/outside ATLAS.'],
        ['19. Am I allowed to change my appointed Guide during the course of the Ph.D. programme?', 'Yes, however, due &amp; valid reasons should be provided. Approval from the FRC will be sought for the change in Guide. A change in Guide is also possible if s/he becomes unavailable for certain reasons.'],
        ['20. If I want to withdraw from the programme, then what is the procedure and refund policy?', 'Application for withdrawal from the programme is to be submitted through <a href="/centre-for-research/phd-application">Click Here</a> No other mode of request will be considered. Tuition fees are non-refundable. Withdrawal of application will be processed as per University refund guidelines given on the university website <a href="https://atlasuniversity.edu.in/phdapplicationform">Click Here</a>'],
        ['21. Can I complete course work at my work place?', 'Coursework classes are held on campus and there will be no arrangement/relaxations in the rules.'],
        ['22. Is it mandatory to publish a research paper before submitting the thesis for award of Ph.D. degree from ATLAS University?', 'Yes, minimum two papers in reputed journals along with paper presentation in at least one National Conference.<br>For School of Technology, minimum one paper in peer-reviewed reputed journals along with paper presentation in at least one approved National Conference.<br>.'],
        ['23.Is the Ph.D. degree conferred by ATLAS University recognized in India and abroad? And, is it valid for Indian Government jobs?', 'ATLAS University is UGC approved and AIU recognized.'],
        ['24. Do all Ph.D. scholars get stipend/financial assistance for pursuing a Ph.D. programme at ATLAS?', 'Full time scholars who are JRF/SRF holders of NET of UGC/CSIR/ICMR/CEED/ICAR/INSPIRE or any other fellowship and have joined the programme within the validity period, get fellowship/grants from their respective funding organizations to pursue Ph.D. at ATLAS. Additionally, ATLAS University offers opportunities to full time scholars to work in the ongoing projects on campus. For this the candidate can directly approach the faculty of the school or apply at career@atlas.xxx before or at the time of applying for a Ph.D. programme. Beside this, teaching assistantships may be offered to full time Ph.D. scholars.'],
        ['25. As a full time Ph.D. student, can I work after classes to support myself financially?', 'Yes, as long as you attend coursework classes regularly and maintain an attendance of 75 % which is mandatory, you may engage in part time work inside or outside the campus with the knowledge of your Guide'],
        ['26. Duration of the programme: As per University Grants Commission (Minimum Standards and Procedures for Award of Ph.D. Degree) Regulations, 2022', 'a) Ph.D. programme shall be for a minimum duration of three (3) years, including course work, and a maximum duration of six (6) years from the date of admission to the Ph.D. programme.</p><p>b) A maximum of an additional two (2) years can be given through a process of re-registration as per the Statute/Ordinance of the Higher Educational Institution concerned; provided, however, that the total period for completion of a Ph.D. programme should not exceed eight (8) years from the date of admission in the Ph.D. programme. Provided further that, female Ph.D. scholars and Persons with Disabilities (having more than 40% disability) may be allowed an additional relaxation of two (2) years; however, the total period for completion of a Ph.D. programme in such cases should not exceed ten (10) years from the date of admission in the Ph.D. programme</p><p>c) Female Ph.D. Scholars may be provided Maternity Leave/Child Care Leave for up to 240 days in the entire duration of the Ph.D. programme'],
      ].map(([q, a]) => `<p><b>${q}</b></p><p>${a}</p>`).join('\n'),
    },
    {
      q: 'Downloads',
      html: `
<div class="docs">
<a href="https://atlasuniversity.edu.in/wp-content/uploads/2023/06/Consent-letter-of-ATLAS-University-PhD-Supervisor.docx">Supervisor Consent</a>
<a href="https://atlasuniversity.edu.in/wp-content/uploads/2023/06/Employer_s-Consent-to-Grant-Study-leave-if-Candidate-is-selected-for-ATLAS-University-PhD.docx">Employers Consent</a>
<a href="https://atlasuniversity.edu.in/wp-content/uploads/2023/06/Request-letter-for-exemption-from-written-test.docx">PET Exemption</a>
<a href="https://atlasuniversity.edu.in/wp-content/uploads/2023/06/No-Objection-Certificate.docx">NOC</a>
<a href="https://atlasuniversity.edu.in/wp-content/uploads/2024/12/Ph.D-Proposal-Template.pdf">Research Proposal Template</a>
<a href="https://atlasuniversity.edu.in/wp-content/uploads/2023/06/Undertaking-to-be-given-at-the-time-of-applying-for-Provisional-Admission-for-Ph.D.-Programme.docx">Undertaking Provisional Admission</a>
<a href="https://atlasuniversity.edu.in/wp-content/uploads/2023/06/Sponsorship-letter-for-Full-Time-PhD-Candidates.docx">Sponsorship Letter</a>
<a href="https://atlasuniversity.edu.in/phdapplicationform">Scholarship Form</a>
<a href="https://atlasuniversity.edu.in/wp-content/uploads/2026/01/PhD-Thesis-printing-Guidelines-ASU.pdf">PhD Thesis Printing Guidelines</a>
<a href="https://atlasuniversity.edu.in/wp-content/uploads/2026/01/PhD_Presentation_Template.pptx">Ph.D. Presentation Template</a>
<a href="https://atlasuniversity.edu.in/wp-content/uploads/2026/01/list-of-ph-d-scholars.pdf">List of Ph.d Scholars</a>
</div>`,
    },
    {
      q: 'PET Sample Paper',
      html: `
<div class="docs">
<a href="https://atlasuniversity.edu.in/wp-content/uploads/2025/01/PET-Sample-Paper-ATLAS-ISDI.pdf">PET sample paper ATLAS ISDI | School of Design &amp; Innovation</a>
<a href="https://atlasuniversity.edu.in/wp-content/uploads/2025/01/PET-Sample-Paper-ATLAS-ISME.pdf">PET sample paper ATLAS ISME | School of Management &amp; Entrepreneurship</a>
<a href="https://atlasuniversity.edu.in/wp-content/uploads/2025/01/PET-Sample-Paper-ATLAS-uGDX.pdf">PET sample paper ATLAS uGDX | School of Technology</a>
</div>`,
    },
  ],
};
