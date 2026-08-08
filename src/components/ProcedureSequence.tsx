import { useRef, useState, type KeyboardEvent } from 'react'

const procedure = [
  {
    name: 'Research',
    kicker: 'Know the mandate',
    summary: 'Know the assigned position, the red line, and the negotiable ground before the room adds pressure.',
    clause: 'Requests every delegation to arrive with a position, its evidence, and the interests beneath it;',
    annotation: 'SOURCE THE CLAIM',
  },
  {
    name: 'Caucus',
    kicker: 'Find the overlap',
    summary: 'Listen for coalitions that do not yet share language but already share an interest.',
    clause: 'Invites delegations to identify overlapping interests before defending final wording;',
    annotation: 'LISTEN / GROUP / TEST',
  },
  {
    name: 'Draft',
    kicker: 'Make it operative',
    summary: 'Turn a shared interest into a clause with an actor, an action, and a standard others can inspect.',
    clause: 'Directs the working group to draft an operative clause naming an actor, action, and review standard;',
    annotation: 'WHO DOES WHAT?',
  },
  {
    name: 'Amend',
    kicker: 'Keep the coalition',
    summary: 'Change the sentence without erasing the people who made agreement possible.',
    clause: 'Replaces contested language with a bounded commitment that preserves both urgency and consent;',
    annotation: 'AMENDMENT / ACCEPTED',
  },
  {
    name: 'Vote',
    kicker: 'Make it legible',
    summary: 'Record the agreement, the remaining disagreement, and the procedure that made both visible.',
    clause: 'Records the final agreement, the unresolved objection, and the standard for reviewing implementation.',
    annotation: 'THE FLOOR / CLOSED',
  },
] as const

export function ProcedureSequence() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const step = procedure[active] ?? procedure[0]

  const select = (index: number) => {
    const bounded = (index + procedure.length) % procedure.length
    setActive(bounded)
    requestAnimationFrame(() => tabRefs.current[bounded]?.focus())
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      select(index + 1)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      select(index - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      select(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      select(procedure.length - 1)
    }
  }

  return (
    <div className="procedure-sequence">
      <div className="procedure-tabs" role="tablist" aria-label="Resolution procedure">
        {procedure.map((item, index) => (
          <button
            key={item.name}
            ref={(node) => { tabRefs.current[index] = node }}
            id={`procedure-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls="procedure-panel"
            tabIndex={active === index ? 0 : -1}
            data-active={active === index}
            onClick={() => select(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            <span className="procedure-number" aria-hidden="true">0{index + 1}</span>
            <span>{item.name}</span>
            <small>{item.kicker}</small>
          </button>
        ))}
      </div>

      <div className="procedure-progress" role="progressbar" aria-label="Procedure progress" aria-valuemin={1} aria-valuemax={procedure.length} aria-valuenow={active + 1}>
        <span style={{ '--procedure-progress': `${((active + 1) / procedure.length) * 100}%` } as React.CSSProperties} />
      </div>

      <div id="procedure-panel" className="procedure-panel" role="tabpanel" aria-labelledby={`procedure-tab-${active}`} tabIndex={0}>
        <div className="procedure-copy">
          <p className="eyebrow">Step 0{active + 1} / {step.kicker}</p>
          <h3>{step.name}</h3>
          <p>{step.summary}</p>
        </div>
        <article className="resolution-sheet" aria-label={`Resolution draft at ${step.name} stage`}>
          <header>
            <span>DRAFT RESOLUTION</span>
            <span>STATUS / {active === procedure.length - 1 ? 'RECORDED' : 'OPEN'}</span>
          </header>
          <div className="resolution-body">
            <span className="clause-number" aria-hidden="true">1.</span>
            <p data-testid="resolution-clause">{step.clause}</p>
            <span className="margin-annotation" aria-hidden="true">{step.annotation}</span>
          </div>
          <div className="resolution-footer">
            <span>SPONSOR / COALITION</span>
            <span>{active + 1} / {procedure.length}</span>
          </div>
        </article>
      </div>
    </div>
  )
}
