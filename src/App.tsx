import { BriefingDialog } from './components/BriefingDialog'
import { PreparationDesk } from './components/PreparationDesk'
import { ProcedureSequence } from './components/ProcedureSequence'
import { SiteHeader } from './components/SiteHeader'

const mandateSteps = [
  ['Listen', 'for the interest beneath the position.'],
  ['Contest', 'the language, not the person.'],
  ['Amend', 'until more delegates can live inside the sentence.'],
  ['Vote', 'with a record of what changed.'],
] as const

const committees = [
  {
    code: 'DISEC / 01',
    title: 'Disarmament',
    topic: 'Regulate autonomous weapons without freezing legitimate research.',
    tensionA: 'Security',
    tensionB: 'Enforceability',
    tone: 'vermilion',
  },
  {
    code: 'UNEP / 02',
    title: 'Environment',
    topic: 'Allocate climate-loss financing when responsibility and vulnerability diverge.',
    tensionA: 'Urgency',
    tensionB: 'Burden-sharing',
    tone: 'cobalt',
  },
  {
    code: 'CRISIS / 03',
    title: 'Cabinet',
    topic: 'Stabilize a rapidly changing situation while information remains incomplete.',
    tensionA: 'Speed',
    tensionB: 'Legitimacy',
    tone: 'ink',
  },
] as const

const schedule = [
  ['08:30', 'Credential check', 'Arrive, orient, and verify room support.'],
  ['09:15', 'Opening record', 'Roll call, agenda, and procedural questions.'],
  ['10:00', 'Moderated caucus', 'Positions enter the room and become testable.'],
  ['11:30', 'Working-paper studio', 'Coalitions turn overlap into a first draft.'],
  ['14:00', 'Amendment window', 'The text changes without hiding the disagreement.'],
  ['16:15', 'Vote + reflection', 'The room records what held and what did not.'],
] as const

function ResolutionSeal() {
  return (
    <svg className="resolution-seal" viewBox="0 0 420 420" role="img" aria-labelledby="seal-title seal-description">
      <title id="seal-title">The Floor concept seal</title>
      <desc id="seal-description">Five procedural marks converge around an open central floor.</desc>
      <circle cx="210" cy="210" r="194" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="210" cy="210" r="150" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 9" />
      <path d="M210 38v344M38 210h344" fill="none" stroke="currentColor" strokeWidth="1" opacity=".35" />
      <path className="seal-motion" d="M80 265C135 136 204 98 338 151C306 277 232 325 103 302" fill="none" stroke="currentColor" strokeWidth="10" />
      <path d="M120 170h180M120 205h128M120 240h164" fill="none" stroke="currentColor" strokeWidth="5" />
      <circle cx="120" cy="170" r="8" fill="currentColor" />
      <circle cx="248" cy="205" r="8" fill="currentColor" />
      <circle cx="284" cy="240" r="8" fill="currentColor" />
      <text x="210" y="78" textAnchor="middle">THE FLOOR / CONCEPT 01</text>
      <text x="210" y="366" textAnchor="middle">DRAFT · AMEND · RECORD</text>
    </svg>
  )
}

function SectionIndex({ children }: { children: React.ReactNode }) {
  return <p className="section-index" aria-hidden="true">{children}</p>
}

function App() {
  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow">Model United Nations / Concept 01</p>
            <h1 id="hero-title" aria-label="The world doesn’t arrive at consensus. You draft it.">
              <span>The world doesn’t arrive</span>
              <span>at <s>agreement</s> consensus.</span>
              <em>You draft it.</em>
            </h1>
            <p className="hero-lead">
              Bring a position. Test it in public. Leave with language that can hold more than one truth.
            </p>
            <div className="hero-actions">
              <BriefingDialog />
              <a className="text-link" href="#committees">Explore the committees <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <figure className="hero-seal">
            <ResolutionSeal />
            <figcaption>Five motions. One open floor.</figcaption>
          </figure>
          <div className="hero-status" aria-label="Concept status">
            <span>DRAFT 00</span>
            <span>OPEN FOR AMENDMENT</span>
            <span>BRIEFING AVAILABLE</span>
          </div>
          <aside className="concept-disclosure" aria-label="Concept disclosure">
            <strong>Concept conference experience.</strong>
            <span>Committee, agenda, and schedule content demonstrates the system and is not a live event listing. No UN affiliation is implied.</span>
          </aside>
        </section>

        <section className="mandate section" id="mandate" aria-labelledby="mandate-title">
          <SectionIndex>01 / THE MANDATE</SectionIndex>
          <div className="mandate-heading">
            <p className="eyebrow">The work beneath the speech</p>
            <h2 id="mandate-title">Diplomacy is a writing discipline.</h2>
            <blockquote>
              <p>A speech can move a room.</p>
              <p>A clause can move the record.</p>
            </blockquote>
          </div>
          <ol className="mandate-steps">
            {mandateSteps.map(([action, detail], index) => (
              <li key={action}>
                <span className="step-number" aria-hidden="true">0{index + 1}</span>
                <p><strong>{action}</strong> {detail}</p>
                <span className="step-mark" aria-hidden="true">{index === mandateSteps.length - 1 ? '●' : '→'}</span>
              </li>
            ))}
          </ol>
          <p className="margin-note">The sentence is the smallest unit of coalition.</p>
        </section>

        <section className="committees section section--ink" id="committees" aria-labelledby="committees-title">
          <SectionIndex>02 / THE ROOMS</SectionIndex>
          <header className="section-heading section-heading--split">
            <div>
              <p className="eyebrow">Example committee architecture</p>
              <h2 id="committees-title">Three rooms. Three kinds of pressure.</h2>
            </div>
            <p>Each dossier is illustrative—not an announced committee or live agenda.</p>
          </header>
          <div className="committee-stack">
            {committees.map((committee, index) => (
              <article className="committee-dossier" data-tone={committee.tone} key={committee.code} style={{ '--dossier-offset': `${index * 1.15}rem` } as React.CSSProperties}>
                <header>
                  <span>{committee.code}</span>
                  <span>Illustrative committee</span>
                </header>
                <div className="dossier-title">
                  <span aria-hidden="true">0{index + 1}</span>
                  <h3>{committee.title}</h3>
                </div>
                <p className="dossier-topic">{committee.topic}</p>
                <div className="pressure-pair" aria-label={`Core pressure: ${committee.tensionA} versus ${committee.tensionB}`}>
                  <span>{committee.tensionA}</span>
                  <span aria-hidden="true">↔</span>
                  <span>{committee.tensionB}</span>
                </div>
                <div className="dossier-footer">
                  <span>PRESSURE TEST / 0{index + 1}</span>
                  <a href="#procedure">See the procedure <span aria-hidden="true">↘</span></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="procedure section" id="procedure" aria-labelledby="procedure-title">
          <SectionIndex>03 / THE PROCEDURE</SectionIndex>
          <header className="section-heading">
            <p className="eyebrow">A resolution is a record of changed language</p>
            <h2 id="procedure-title">From position to recorded language.</h2>
            <p>Move through the sequence. The document changes because the coalition does.</p>
          </header>
          <ProcedureSequence />
        </section>

        <section className="preparation-desk section" id="delegate-desk" aria-labelledby="desk-title">
          <SectionIndex>04 / THE DELEGATE DESK</SectionIndex>
          <header className="desk-heading">
            <p className="eyebrow">Preparation that survives the room</p>
            <h2 id="desk-title">Arrive with more than a speech.</h2>
            <p>This checklist is saved only on this device. It sends nothing and creates no registration.</p>
          </header>
          <PreparationDesk />
        </section>

        <section className="schedule section section--cobalt" id="day" aria-labelledby="day-title">
          <SectionIndex>05 / THE DAY</SectionIndex>
          <header className="section-heading section-heading--split">
            <div>
              <p className="eyebrow">Illustrative day</p>
              <h2 id="day-title">A day with a pulse, not a blur.</h2>
            </div>
            <p>Example pacing only. This is not a published event schedule.</p>
          </header>
          <ol className="schedule-list">
            {schedule.map(([time, title, detail], index) => (
              <li key={time}>
                <time>{time}</time>
                <span className="schedule-dot" aria-hidden="true">{index + 1}</span>
                <div><h3>{title}</h3><p>{detail}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="closing section" aria-labelledby="closing-title">
          <SectionIndex>06 / THE FIRST SENTENCE</SectionIndex>
          <div className="closing-copy">
            <p className="eyebrow">The floor is yours</p>
            <h2 id="closing-title">Do not wait for consensus. Write the first sentence it can enter.</h2>
            <p>
              This concept is ready to fit a real conference once the organizer, dates, venue, committees, fees, safeguarding, accessibility, and registration system are verified.
            </p>
            <BriefingDialog />
          </div>
          <div className="closing-mark" aria-hidden="true">
            <span>THE</span><span>FLOOR</span><strong>↗</strong>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div><strong>THE FLOOR</strong><span>Concept 01 / Model United Nations</span></div>
        <p>Original concept build. Illustrative content. No UN affiliation implied.</p>
        <a href="#top">Return to the opening <span aria-hidden="true">↑</span></a>
      </footer>
    </div>
  )
}

export default App
