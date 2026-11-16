/**
 * ATLAS Hackathon 2026 — the registration rules, shared by the public form
 * (app/atlas-hackathon-2026/register) and the admin edit (/admin/hackathon). Started as a transcription
 * of the old register.php's checks (same limits, same messages), changed 2026-11-16:
 *
 *   - a team is 1 to 3 students: the team lead is required, Team member 2 and Team member 3 are
 *     optional — but a member who is added must be filled in completely, and member 3 needs member 2;
 *   - school / college name and location belong to each member, not to the team, because members may
 *     come from different schools or colleges.
 *
 * Plain functions, no imports, so the tests and the CSV import can use them too.
 */

export const GRADES = Object.freeze({ 11: 'Grade 11', 12: 'Grade 12' });

export const STREAM_SUGGESTIONS = Object.freeze([
  'Science (PCM)', 'Science (PCB)', 'Science (PCMB)', 'Commerce',
  'Commerce with Maths', 'Arts / Humanities', 'Computer Science',
  'IB Diploma', 'IGCSE / A-Levels',
]);

/** The three members: form prefix, database prefix, label, required. */
export const MEMBERS = Object.freeze([
  Object.freeze({ prefix: 'lead', db: 'team_lead', label: 'Team lead', required: true }),
  Object.freeze({ prefix: 'member2', db: 'member2', label: 'Team member 2', required: false }),
  Object.freeze({ prefix: 'member3', db: 'member3', label: 'Team member 3', required: false }),
]);

/** One member's fields, in the order the form shows them. */
export const MEMBER_PARTS = Object.freeze(['name', 'school', 'location', 'stream', 'grade', 'mobile', 'email']);

/** The form's field names, in the order they are shown (and the order errors are listed). */
export const FIELDS = Object.freeze(['team_name', ...MEMBERS.flatMap((m) => MEMBER_PARTS.map((p) => `${m.prefix}_${p}`))]);

/** Form field -> database column. */
export const COLUMN = Object.freeze(
  Object.fromEntries([['team_name', 'team_name'], ...MEMBERS.flatMap((m) => MEMBER_PARTS.map((p) => [`${m.prefix}_${p}`, `${m.db}_${p}`]))]),
);

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
 * Returns { errors: { field: message }, data: { field: cleanValue } }. An optional member left
 * completely blank comes back as '' in every one of its fields; data.members lists the prefixes of the
 * members the team has, lead first.
 */
export function validateRegistration(input) {
  const get = (k) => cleanText(input?.[k]);
  const errors = {};
  const data = { members: [] };

  const ranged = (key, min, max, empty, range) => {
    const v = get(key);
    data[key] = v;
    if (v === '') errors[key] = empty;
    else if (len(v) < min || len(v) > max) errors[key] = range;
  };

  ranged('team_name', 2, 60, 'Please enter your team name.', 'Team name must be between 2 and 60 characters.');

  for (const { prefix, label, required } of MEMBERS) {
    const filled = MEMBER_PARTS.some((p) => get(`${prefix}_${p}`) !== '');
    if (!required && !filled) {
      for (const p of MEMBER_PARTS) data[`${prefix}_${p}`] = '';
      continue;
    }
    data.members.push(prefix);
    ranged(`${prefix}_name`, 2, 80, `${label} name is required.`, 'Name must be between 2 and 80 characters.');
    ranged(`${prefix}_school`, 3, 120, 'Please enter the school or college name.', 'School / college name must be between 3 and 120 characters.');
    ranged(`${prefix}_location`, 2, 100, 'Please enter the city or town of the school / college.', 'Location must be between 2 and 100 characters.');
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

  /* members are added in order: no member 3 without a member 2 */
  if (data.members.includes('member3') && !data.members.includes('member2')) {
    errors.member2_name = 'Fill in Team member 2 before Team member 3.';
  }

  /* every member must be a different person */
  const seen = { email: new Map(), mobile: new Map() };
  for (const prefix of data.members) {
    for (const kind of ['email', 'mobile']) {
      const key = `${prefix}_${kind}`;
      const v = data[key];
      if (!v || errors[key]) continue;
      if (seen[kind].has(v)) errors[key] = kind === 'email' ? 'Each team member needs a different email address.' : 'Each team member needs a different mobile number.';
      else seen[kind].set(v, prefix);
    }
  }

  /* list errors in form order */
  const ordered = {};
  for (const k of FIELDS) if (errors[k]) ordered[k] = errors[k];
  return { errors: ordered, data };
}

/** Does this database row have the member with this database prefix ('team_lead', 'member2', …)? */
export const hasMember = (row, db) => Boolean(row?.[`${db}_name`]);

/**
 * A member's school and location. Rows registered before 2026-11-16 (and the old site's imported rows)
 * have one school for the whole team, in school_college_name / school_college_location.
 */
export function memberSchool(row, db) {
  return {
    school: row?.[`${db}_school`] || row?.school_college_name || '',
    location: row?.[`${db}_location`] || row?.school_college_location || '',
  };
}

/** The members a database row has, lead first: [{ prefix, db, label, name, school, location, … }]. */
export function rowMembers(row) {
  return MEMBERS.filter((m) => hasMember(row, m.db)).map((m) => ({
    ...m,
    name: row[`${m.db}_name`],
    stream: row[`${m.db}_stream`],
    grade: row[`${m.db}_grade`],
    mobile: row[`${m.db}_mobile`],
    email: row[`${m.db}_email`],
    ...memberSchool(row, m.db),
  }));
}

/** Database row -> form-shaped object (the admin edit dialog uses it). */
export function rowToForm(row) {
  const o = {};
  for (const k of FIELDS) o[k] = row?.[COLUMN[k]] == null ? '' : String(row[COLUMN[k]]);
  for (const m of MEMBERS) {
    if (!hasMember(row, m.db)) continue;
    const { school, location } = memberSchool(row, m.db);
    o[`${m.prefix}_school`] = school;
    o[`${m.prefix}_location`] = location;
  }
  return o;
}
