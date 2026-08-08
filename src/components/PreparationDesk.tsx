import { useMemo, useState } from 'react'
import { calculateProgress, loadPreparation, savePreparation, type StorageAdapter } from '../lib/progress'

const preparationItems = [
  'I can explain my assigned position in two sentences.',
  'I have identified one red line and two negotiable points.',
  'I have written one operative clause with an actor and action.',
  'I can name three delegations whose interests may overlap mine.',
  'I know how I will ask for clarification, yield, and propose an amendment.',
]

const unavailableStorage: StorageAdapter = {
  getItem: () => null,
  setItem: () => undefined,
}

function storageAdapter(): StorageAdapter {
  try {
    return window.localStorage
  } catch {
    return unavailableStorage
  }
}

export function PreparationDesk() {
  const storage = useMemo(() => storageAdapter(), [])
  const [checked, setChecked] = useState(() => loadPreparation(storage, preparationItems.length))
  const [hasInteracted, setHasInteracted] = useState(false)
  const progress = calculateProgress(checked)

  const commit = (next: boolean[]) => {
    setChecked(next)
    setHasInteracted(true)
    savePreparation(storage, next)
  }

  const statusText = progress.isComplete
    ? `Briefing complete — ${progress.completed} of ${progress.total} ready. Saved on this device.`
    : `${progress.completed} of ${progress.total} ready${hasInteracted ? '. Saved on this device.' : '.'}`

  return (
    <div className="preparation-desk__workspace">
      <div className="preparation-desk__summary">
        <div
          className="preparation-meter"
          data-testid="preparation-meter"
          role="progressbar"
          aria-label="Delegate preparation progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress.percentage}
        >
          <span style={{ '--progress': `${progress.percentage}%` } as React.CSSProperties} />
        </div>
        <p className="preparation-status" role="status" aria-live="polite">{statusText}</p>
        <button className="text-action" type="button" onClick={() => commit(preparationItems.map(() => false))}>
          Reset preparation
        </button>
      </div>
      <ol className="preparation-list">
        {preparationItems.map((item, index) => (
          <li key={item} data-complete={checked[index]}>
            <label>
              <input
                type="checkbox"
                checked={checked[index] ?? false}
                onChange={(event) => {
                  const next = [...checked]
                  next[index] = event.currentTarget.checked
                  commit(next)
                }}
              />
              <span className="check-index" aria-hidden="true">0{index + 1}</span>
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ol>
    </div>
  )
}
