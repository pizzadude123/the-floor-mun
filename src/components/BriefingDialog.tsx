import { useRef } from 'react'

const requiredTruth = [
  'Organizer identity and accountable contact',
  'Verified dates, city, venue, and accessibility details',
  'Committee mandates, chairs, topics, and background guides',
  'Fees, aid, cancellation, safeguarding, and privacy terms',
  'A secure registration system with success and recovery states',
]

export function BriefingDialog() {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const open = () => dialogRef.current?.showModal()
  const close = () => dialogRef.current?.close()

  return (
    <>
      <button ref={triggerRef} className="button button--primary" type="button" onClick={open}>
        Enter the delegate briefing
        <span aria-hidden="true">↗</span>
      </button>
      <dialog
        ref={dialogRef}
        className="briefing-dialog"
        aria-labelledby="briefing-title"
        onClose={() => triggerRef.current?.focus()}
      >
        <div className="dialog-docket" aria-hidden="true">
          <span>BUILD BRIEF / 01</span>
          <span>CONCEPT STATE</span>
        </div>
        <p className="eyebrow">Not registration</p>
        <h2 id="briefing-title">Build briefing</h2>
        <p className="dialog-lead">
          The experience and interaction system are real. Conference operations remain deliberately unclaimed until an accountable organizer supplies and verifies them.
        </p>
        <div className="dialog-grid">
          <section aria-labelledby="briefing-real">
            <h3 id="briefing-real">What is real now</h3>
            <ul>
              <li>Original editorial and procedural design system</li>
              <li>Responsive delegate journey and preparation tool</li>
              <li>Illustrative committee, procedure, and schedule modules</li>
              <li>Accessible concept interactions and reduced-motion path</li>
            </ul>
          </section>
          <section aria-labelledby="briefing-required">
            <h3 id="briefing-required">What must become real</h3>
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
