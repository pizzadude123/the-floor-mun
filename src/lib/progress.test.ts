import { describe, expect, it } from 'vitest'
import { calculateProgress, loadPreparation, savePreparation } from './progress'

describe('delegate preparation progress', () => {
  it('reports an exact completed count and bounded percentage', () => {
    expect(calculateProgress([true, false, true, false, false])).toEqual({
      completed: 2,
      total: 5,
      percentage: 40,
      isComplete: false,
    })
    expect(calculateProgress([true, true])).toMatchObject({ percentage: 100, isComplete: true })
    expect(calculateProgress([])).toMatchObject({ percentage: 0, isComplete: false })
  })

  it('persists only the expected boolean checklist shape', () => {
    const storage = new Map<string, string>()
    const adapter = {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => { storage.set(key, value) },
    }

    savePreparation(adapter, [true, false, true])
    expect(loadPreparation(adapter, 3)).toEqual([true, false, true])

    storage.set('the-floor:preparation', JSON.stringify(['yes', true, false, 'no']))
    expect(loadPreparation(adapter, 3)).toEqual([false, false, false])
  })

  it('fails closed when storage access or JSON parsing fails', () => {
    const blocked = {
      getItem: () => { throw new Error('blocked') },
      setItem: () => { throw new Error('blocked') },
    }

    expect(loadPreparation(blocked, 2)).toEqual([false, false])
    expect(() => savePreparation(blocked, [true])).not.toThrow()
  })
})
