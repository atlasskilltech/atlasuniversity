/**
 * ATLAS Hackathon 2026 — the registration rules, shared by the public form
 * (app/atlas-hackathon-2026/register) and the admin edit (/admin/hackathon). A transcription of the old
 * register.php's checks: same fields, same limits, same messages. Plain functions, no imports, so the
 * tests and the CSV import can use them too.
 */

export const GRADES = Object.freeze({ 11: 'Grade 11', 12: 'Grade 12' });

export const STREAM_SUGGESTIONS = Object.freeze([
  'Science (PCM)', 'Science (PCB)', 'Science (PCMB)', 'Commerce',
  'Commerce with Maths', 'Arts / Humanities', 'Computer Science',
  'IB Diploma', 'IGCSE / A-Levels',
]);

/** The form's field names, in the order they are shown (and the order errors are listed). */
export const FIELDS = Object.freeze([
  'team_name', 'school_name', 'school_location',
  'lead_name', 'lead_stream', 'lead_grade', 'lead_mobile', 'lead_email',
  'member2_name', 'member2_stream', 'member2_grade', 'member2_mobile', 'member2_email',
]);

/** Form field -> database column. */
export const COLUMN = Object.freeze({
  team_name: 'team_name',
  school_name: 'school_college_name',
  school_location: 'school_college_location',
  lead_name: 'team_lead_name',
  lead_stream: 'team_lead_stream',
  lead_mobile: 'team_lead_mobile',
  lead_email: 'team_lead_email',
  lead_grade: 'team_lead_grade',
  member2_name: 'member2_name',
  member2_stream: 'member2_stream',
  member2_mobile: 'member2_mobile',
  member2_email: 'member2_email',
  member2_grade: 'member2_grade',
});

/** Trim, turn control characters into spaces and collapse repeated whitespace (register.php's clean_input). */
export function cleanText(v) {
  if (typeof v !== 'string') return '';
  return v.replace(/[\x00-\x1F\x7F]+/g, ' ').replace(/\s+/g, ' ').trim();
}

const len = (s) => [...s].length;

/**
 * The ways people type an Indian mobile number (+91 98765 43210, 098765-43210, 9876543210) -> the bare
 * 10 digits, or '' when it is not usable.
 */
export function normaliseMobile(raw) {
  let d = String(raw ?? '').replace(/\D+/g, '');
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
  else if (d.length === 13 && d.startsWith('091')) d = d.slice(3);
  else if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return /^[6-9][0-9]{9}$/.test(d) ? d : '';
}

/* PHP's FILTER_VALIDATE_EMAIL is stricter than "has an @"; this matches its everyday behaviour:
   a dot-atom local part and a dotted domain of letters, digits and hyphens. */
const EMAIL_RE = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/;
export const isEmail = (e) => EMAIL_RE.test(e) && e.length <= 254;

/**
 * Validate a submission. `input` is a plain object keyed by FIELDS (strings).
 * Returns { errors: { field: message }, data: { field: cleanValue } }.
 */
export function validateRegistration(input) {
  const get = (k) => cleanText(input?.[k]);
  const errors = {};
  const data = {};

  const ranged = (key, min, max, empty, range) => {
    const v = get(key);
    data[key] = v;
    if (v === '') errors[key] = empty;
    else if (len(v) < min || len(v) > max) errors[key] = range;
  };

  ranged('team_name', 2, 60, 'Please enter your team name.', 'Team name must be between 2 and 60 characters.');
  ranged('school_name', 3, 120, 'Please enter your school or college name.', 'School / college name must be between 3 and 120 characters.');
  ranged('school_location', 2, 100, 'Please enter the city or town of your school / college.', 'Location must be between 2 and 100 characters.');

  for (const [prefix, label] of [['lead', 'Team lead'], ['member2', 'Team member 2']]) {
    ranged(`${prefix}_name`, 2, 80, `${label} name is required.`, 'Name must be between 2 and 80 characters.');
    ranged(`${prefix}_stream`, 2, 60, 'Stream is required.', 'Stream must be between 2 and 60 characters.');

    const mobile = normaliseMobile(get(`${prefix}_mobile`));
    data[`${prefix}_mobile`] = mobile;
    if (!mobile) errors[`${prefix}_mobile`] = 'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9.';

    const email = get(`${prefix}_email`).toLowerCase();
    data[`${prefix}_email`] = email;
    if (email === '') errors[`${prefix}_email`] = 'Email address is required.';
    else if (len(email) > 150) errors[`${prefix}_email`] = 'Email address is too long.';
    else if (!isEmail(email)) errors[`${prefix}_email`] = 'Enter a valid email address, for example name@school.edu.in';

    const grade = get(`${prefix}_grade`);
    data[`${prefix}_grade`] = grade;
    if (grade === '') errors[`${prefix}_grade`] = 'Please select a grade.';
    else if (!GRADES[grade]) errors[`${prefix}_grade`] = 'The hackathon is open to Grade 11 and Grade 12 students only.';
  }

  /* the two members must be two different people */
  if (data.lead_email && data.lead_email === data.member2_email) errors.member2_email = 'Both team members need different email addresses.';
  if (data.lead_mobile && data.lead_mobile === data.member2_mobile) errors.member2_mobile = 'Both team members need different mobile numbers.';

  /* list errors in form order */
  const ordered = {};
  for (const k of FIELDS) if (errors[k]) ordered[k] = errors[k];
  return { errors: ordered, data };
}

/** Database row -> form-shaped object (the admin edit dialog and the success page use it). */
export function rowToForm(row) {
  const o = {};
  for (const k of FIELDS) o[k] = row?.[COLUMN[k]] == null ? '' : String(row[COLUMN[k]]);
  return o;
}
