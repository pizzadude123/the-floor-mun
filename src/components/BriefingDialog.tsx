import { useId, useRef } from 'react'

const requiredTruth = [
  'Organizer identity and accountable contact',
  'Verified dates, city, venue, and accessibility details',
  'Committee mandates, chairs, topics, and background guides',
  'Fees, aid, cancellation, safeguarding, and privacy terms',
  'A secure registration system with success and recovery states',
]

const roleBriefs = [
  {
    role: 'Delegate',
    now: 'Rehearse research, coalition-building, clause drafting, and procedure with the concept tools.',
    required: 'A real event must publish eligibility, assignment, current guides, deadlines, fees, and support.',
  },
  {
    role: 'Faculty advisor',
    now: 'Review the preparation model and the conference truths that cannot be replaced by prestige or visual polish.',
    required: 'A real organizer must publish supervision, safeguarding, accessibility, travel, privacy, payment, and escalation terms.',
  },
  {
    role: 'Chair / dais',
    now: 'Inspect how positions become recorded language and how the interface keeps procedure legible.',
    required: 'A real organizer must publish mandate, rules, training, accommodations, document versions, and incident authority.',
  },
] as const

export function BriefingDialog() {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const rolesId = useId()
  const realId = useId()
  const requiredId = useId()

  const open = () => dialogRef.current?.showModal()
  const close = () => dialogRef.current?.close()

  return (
    <>
      <button ref={triggerRef} className="button button--primary" type="button" onClick={open}>
        Open the role briefing
        <span aria-hidden="true">↗</span>
      </button>
      <dialog
        ref={dialogRef}
        className="briefing-dialog"
        aria-labelledby={titleId}
        onClose={() => triggerRef.current?.focus()}
      >
        <div className="dialog-docket" aria-hidden="true">
          <span>BUILD BRIEF / 01</span>
          <span>CONCEPT / NO APPLICATIONS</span>
        </div>
        <p className="eyebrow">Not registration</p>
        <h2 id={titleId}>Build briefing</h2>
        <p className="dialog-lead">
          The experience and interaction system are real. Conference operations remain deliberately unclaimed until an accountable organizer supplies and verifies them.
        </p>
        <p className="dialog-state">
          <strong>Concept only.</strong>
          <span>No applications are open. Choose a role to see what can be explored now and what a real event must still prove.</span>
        </p>
        <section className="dialog-role-section" aria-labelledby={rolesId}>
          <h3 id={rolesId}>Choose the brief</h3>
          <div className="dialog-role-map">
            {roleBriefs.map((brief, index) => (
              <article key={brief.role}>
                <span aria-hidden="true">0{index + 1}</span>
                <h4>{brief.role}</h4>
                <p>{brief.now}</p>
                <p><strong>Before a real event:</strong> {brief.required}</p>
              </article>
            ))}
          </div>
        </section>
        <div className="dialog-grid">
          <section aria-labelledby={realId}>
            <h3 id={realId}>What is real now</h3>
            <ul>
              <li>Original editorial and procedural design system</li>
              <li>Role-aware concept briefing and delegate preparation tool</li>
              <li>Illustrative committee, procedure, and schedule modules</li>
              <li>Accessible concept interactions and reduced-motion path</li>
            </ul>
          </section>
          <section aria-labelledby={requiredId}>
            <h3 id={requiredId}>What must become real</h3>
            <ol>
              {requiredTruth.map((item) => <li key={item}>{item}</li>)}
            </ol>
          </section>
        </div>
        <button className="button button--close" type="button" onClick={close} aria-label="Close briefing">
          <span aria-hidden="true">×</span>
          Close
        </button>
      </dialog>
    </>
  )
}
