'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { submitRegistration } from '@/app/atlas-hackathon-2026/register/actions';
import { GRADES, STREAM_SUGGESTIONS } from '@/lib/hackathon/validate';
import { BTN_PRIMARY, CARD_PANEL, FIELD_ERROR, FIELD_HINT, FIELD_INPUT, FIELD_INVALID, FIELD_LABEL } from './ui';

/**
 * The registration form — register.php's markup and field helpers (field_text / field_select /
 * field_messages) as React. Validation happens on the server (the action); the browser's own checks
 * are off (`noValidate`), as upstream. On an error the form comes back with everything typed kept,
 * the summary above it, and each message under its field, linked from the summary.
 *
 * The form is remounted on every answer (`key={state.seq}`) so the kept values are its defaults.
 */
const INITIAL = { seq: 0, values: {}, errors: {}, formError: '' };

function Messages({ id, hint, error }) {
  return (
    <>
      {hint ? (
        <p className={FIELD_HINT} id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className={FIELD_ERROR} id={`${id}-error`}>
          <svg className="size-4 shrink-0 translate-y-px" aria-hidden="true">
            <use href="#i-alert" />
          </svg>
          <span>{error}</span>
        </p>
      ) : null}
    </>
  );
}

function Label({ id, required = true, children }) {
  return (
    <label className={FIELD_LABEL} htmlFor={id}>
      {children}
      {required ? (
        <>
          {' '}
          <span className="text-rose-400" aria-hidden="true">
            *
          </span>
        </>
      ) : null}
    </label>
  );
}

function TextField({ name, label, state, type = 'text', placeholder, hint, autoComplete, inputMode, maxLength, list, required = true }) {
  const id = `f-${name}`;
  const error = state.errors[name];
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
  return (
    <div>
      <Label id={id} required={required}>
        {label}
      </Label>
      <input
        type={type}
        id={id}
        name={name}
        defaultValue={state.values[name] || ''}
        required={required}
        className={`${FIELD_INPUT} ${error ? FIELD_INVALID : ''}`}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        list={list ? `${id}-list` : undefined}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
      />
      {list ? (
        <datalist id={`${id}-list`}>
          {list.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>
      ) : null}
      <Messages id={id} hint={hint} error={error} />
    </div>
  );
}

function GradeField({ name, state, required = true }) {
  const id = `f-${name}`;
  const error = state.errors[name];
  return (
    <div>
      <Label id={id} required={required}>
        Grade
      </Label>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue={state.values[name] || ''}
        className={`${FIELD_INPUT} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%2394a3b8'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%3E%3Cpath%20d='m6%209%206%206%206-6'/%3E%3C/svg%3E")] bg-[length:20px_20px] bg-[position:right_14px_center] bg-no-repeat pr-11 ${error ? FIELD_INVALID : ''}`}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      >
        <option value="" disabled className="bg-hk-panel">
          Select grade
        </option>
        {Object.entries(GRADES).map(([v, label]) => (
          <option key={v} value={v} className="bg-hk-panel">
            {label}
          </option>
        ))}
      </select>
      <Messages id={id} error={error} />
    </div>
  );
}

function Fieldset({ n, tone, title, sub, legend, children }) {
  const TONE = {
    cyan: 'border-cyan-300/40 bg-cyan-300/10 text-cyan-300',
    yellow: 'border-yellow-300/40 bg-yellow-300/10 text-yellow-300',
    fuchsia: 'border-fuchsia-400/40 bg-fuchsia-500/10 text-fuchsia-300',
    violet: 'border-violet-400/40 bg-violet-500/10 text-violet-300',
  };
  return (
    <fieldset className={CARD_PANEL}>
      <legend className="sr-only">{legend}</legend>
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl border font-hk-display text-[20px]/[28px] font-black ${TONE[tone]}`}>{n}</span>
        <div>
          <h2 className="font-hk-display text-[24px] font-extrabold uppercase leading-none text-white n640:text-[30px]">{title}</h2>
          <p className="mt-1 text-[14px]/[20px] text-slate-400">{sub}</p>
        </div>
      </div>
      <div className="mt-6 grid gap-5 n640:grid-cols-2">{children}</div>
    </fieldset>
  );
}

/** One member's fields: name, school / college and its location, stream, grade, mobile, email. Members 2
 *  and 3 are optional — no asterisks, and the browser's own `required` is off for them. */
function MemberFields({ prefix, label, state, required, emailHint, nameAutoComplete = 'off', schoolAutoComplete = 'off' }) {
  const lead = prefix === 'lead';
  return (
    <>
      <div className="n640:col-span-2">
        <TextField name={`${prefix}_name`} label={`${label} Name`} state={state} placeholder="Full name" maxLength={80} autoComplete={nameAutoComplete} required={required} />
      </div>
      <TextField name={`${prefix}_school`} label="School / College Name" state={state} placeholder="e.g. Delhi Public School, Mumbai" maxLength={120} autoComplete={schoolAutoComplete} required={required} />
      <TextField name={`${prefix}_location`} label="School / College Location" state={state} placeholder="e.g. Andheri West, Mumbai" maxLength={100} autoComplete="off" hint="City or town is enough." required={required} />
      <TextField name={`${prefix}_stream`} label="Stream" state={state} placeholder={lead ? 'e.g. Science (PCM)' : 'e.g. Commerce'} maxLength={60} autoComplete="off" list={STREAM_SUGGESTIONS} required={required} />
      <GradeField name={`${prefix}_grade`} state={state} required={required} />
      <TextField
        name={`${prefix}_mobile`}
        label="Mobile No."
        state={state}
        type="tel"
        placeholder="98765 43210"
        inputMode="tel"
        maxLength={20}
        autoComplete={lead ? 'tel' : 'off'}
        hint={lead ? '10-digit Indian mobile number. +91 is optional.' : undefined}
        required={required}
      />
      <TextField name={`${prefix}_email`} label="Email ID" state={state} type="email" placeholder="name@example.com" inputMode="email" maxLength={150} autoComplete={lead ? 'email' : 'off'} hint={emailHint} required={required} />
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`${BTN_PRIMARY} w-full shrink-0 n640:w-auto`}>
      <span>{pending ? 'Submitting...' : 'Register your team'}</span>
      <svg className="size-5 shrink-0" aria-hidden="true">
        <use href="#i-arrow" />
      </svg>
    </button>
  );
}

export default function RegisterForm() {
  const [state, action] = useActionState(submitRegistration, INITIAL);
  const errorList = Object.entries(state.errors);
  const summaryRef = useRef(null);

  /* the old page reloaded at the top after a failed submit, so its summary was in view: bring it into
     view (below the sticky header — scroll-mt) and move focus there for keyboard and screen-reader users */
  useEffect(() => {
    if (state.seq && state.formError && summaryRef.current) {
      summaryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      summaryRef.current.focus({ preventScroll: true });
    }
  }, [state.seq, state.formError]);

  if (state.closed) return <ClosedNotice />;

  return (
    <>
      {state.formError ? (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mb-6 flex scroll-mt-28 items-start gap-3 rounded-2xl border border-rose-400/40 bg-rose-500/[0.08] p-4 outline-none n640:p-5">
          <svg className="size-6 shrink-0 text-rose-300" aria-hidden="true">
            <use href="#i-alert" />
          </svg>
          <div className="min-w-0">
            <p className="font-hk-display text-[18px]/[28px] font-bold uppercase tracking-wide text-rose-200">Registration not submitted</p>
            <p className="mt-1 text-[0.9375rem] leading-relaxed text-slate-200">{state.formError}</p>
            {errorList.length ? (
              <ul className="mt-3 space-y-1 text-[14px]/[20px] text-rose-200">
                {errorList.map(([field, message]) => (
                  <li key={field}>
                    <a className="underline decoration-rose-400/50 underline-offset-2 hover:text-white" href={`#f-${field}`}>
                      {message}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* the form posts to a server action: no action URL, so no redirect can turn the POST into a GET */}
      <form key={state.seq} action={action} noValidate className="space-y-5 n640:space-y-6" id="registration-form">
        {/* spam trap: hidden from people and assistive tech, filled only by bots */}
        <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
          <label htmlFor="f-website">Leave this empty</label>
          <input type="text" id="f-website" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>

        <Fieldset n="1" tone="cyan" title="Team details" sub="How your team appears on the leaderboard. A team is 1 to 3 students." legend="Team details">
          <div className="n640:col-span-2">
            <TextField name="team_name" label="Team Name" state={state} placeholder="e.g. Neural Ninjas" maxLength={60} autoComplete="off" hint="Pick something original." />
          </div>
        </Fieldset>

        <Fieldset n="2" tone="yellow" title="Team lead" sub="Our single point of contact for everything about Round 1." legend="Team lead details">
          <MemberFields prefix="lead" label="Team Lead" state={state} required nameAutoComplete="name" schoolAutoComplete="organization" emailHint="All Round 1 instructions are sent here." />
        </Fieldset>

        <Fieldset
          n="3"
          tone="fuchsia"
          title="Team member 2"
          sub="Optional — leave this blank for a one-student team. If you add a member, fill in all their details. Members can be from a different school or college."
          legend="Team member 2 details (optional)"
        >
          <MemberFields prefix="member2" label="Team Member 2" state={state} required={false} emailHint="Must be different from the other members' emails." />
        </Fieldset>

        <Fieldset
          n="4"
          tone="violet"
          title="Team member 3"
          sub="Optional — add a third member only after Team member 2. If you add a member, fill in all their details."
          legend="Team member 3 details (optional)"
        >
          <MemberFields prefix="member3" label="Team Member 3" state={state} required={false} emailHint="Must be different from the other members' emails." />
        </Fieldset>

        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 n640:flex-row n640:items-center n640:justify-between n640:p-6">
          <p className="text-[14px] leading-relaxed text-slate-400">
            Fields marked <span className="font-semibold text-rose-400">*</span> are required. Team members 2 and 3 are optional.
            <br className="hidden n640:block" /> By registering you confirm every team member is a current Grade 11 or 12 student.
          </p>
          <SubmitButton />
        </div>
      </form>
    </>
  );
}

export function ClosedNotice() {
  return (
    <div role="status" className={`${CARD_PANEL} text-center`}>
      <span className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-yellow-300/40 bg-yellow-300/10 text-yellow-300">
        <svg className="size-8" aria-hidden="true">
          <use href="#i-clock" />
        </svg>
      </span>
      <h2 className="mt-5 font-hk-display text-[30px] font-extrabold uppercase leading-none text-white n640:text-[44px]">Registrations are closed</h2>
      <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-slate-300 n640:text-[18px]">
        Thank you for your interest in ATLAS Hackathon 2026. Registrations are not open right now. For any questions, call{' '}
        <a href="tel:8976870842" className="font-semibold text-cyan-300 hover:underline">
          8976870842
        </a>{' '}
        or write to{' '}
        <a href="mailto:btech@atlasuniversity.edu.in" className="font-semibold text-cyan-300 hover:underline">
          btech@atlasuniversity.edu.in
        </a>
        .
      </p>
      <a href="/atlas-hackathon-2026" className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-6 font-hk-display text-[18px]/[28px] font-bold uppercase tracking-wide text-white transition hover:border-cyan-300/60 hover:text-cyan-200">
        Back to the hackathon page
      </a>
    </div>
  );
}
