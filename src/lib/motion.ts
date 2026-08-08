export type MotionMode = 'full' | 'reduced' | 'conservative'

interface MotionPreferences {
  reducedMotion: boolean
  saveData: boolean
}

export function resolveMotionMode({ reducedMotion, saveData }: MotionPreferences): MotionMode {
  if (reducedMotion) return 'reduced'
  if (saveData) return 'conservative'
  return 'full'
}
