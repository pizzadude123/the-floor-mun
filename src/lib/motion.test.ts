import { describe, expect, it } from 'vitest'
import { resolveMotionMode } from './motion'

describe('resolveMotionMode', () => {
  it('uses the full orchestra when no accessibility or network constraint applies', () => {
    expect(resolveMotionMode({ reducedMotion: false, saveData: false })).toBe('full')
  })

  it('settles every actor when reduced motion is requested', () => {
    expect(resolveMotionMode({ reducedMotion: true, saveData: false })).toBe('reduced')
  })

  it('uses conservative motion and static media when data saving is enabled', () => {
    expect(resolveMotionMode({ reducedMotion: false, saveData: true })).toBe('conservative')
  })
})
