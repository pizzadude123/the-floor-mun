export const PREPARATION_STORAGE_KEY = 'the-floor:preparation'

export interface StorageAdapter {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

export interface ProgressSummary {
  completed: number
  total: number
  percentage: number
  isComplete: boolean
}

export function calculateProgress(items: readonly boolean[]): ProgressSummary {
  const total = items.length
  const completed = items.filter(Boolean).length
  return {
    completed,
    total,
    percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
    isComplete: total > 0 && completed === total,
  }
}

export function loadPreparation(storage: StorageAdapter, expectedLength: number): boolean[] {
  const fallback = Array.from({ length: expectedLength }, () => false)
  try {
    const raw = storage.getItem(PREPARATION_STORAGE_KEY)
    if (!raw) return fallback
    const value: unknown = JSON.parse(raw)
    if (!Array.isArray(value) || value.length !== expectedLength || !value.every((item) => typeof item === 'boolean')) {
      return fallback
    }
    return value
  } catch {
    return fallback
  }
}

export function savePreparation(storage: StorageAdapter, items: readonly boolean[]): void {
  try {
    storage.setItem(PREPARATION_STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Preparation remains usable in memory when storage is blocked.
  }
}
