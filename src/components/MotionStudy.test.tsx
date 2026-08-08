import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { MotionStudy } from './MotionStudy'

describe('MotionStudy', () => {
  it('publishes verified video formats with truthful procedural provenance', () => {
    render(<MotionStudy />)

    const video = screen.getByLabelText('A procedural amendment aligns fragmented clauses into one working text')
    const sources = video.querySelectorAll('source')
    expect(sources).toHaveLength(2)
    expect(sources[0]).toHaveAttribute('src', '/media/drafting-loop.webm')
    expect(sources[0]).toHaveAttribute('type', 'video/webm')
    expect(sources[1]).toHaveAttribute('src', '/media/drafting-loop.mp4')
    expect(sources[1]).toHaveAttribute('type', 'video/mp4')
    expect(video).toHaveAttribute('poster', '/media/drafting-loop-poster.webp')
    expect(screen.getByText(/not conference footage or a Higgsfield render/i)).toBeVisible()
  })

  it('presents three authored procedural image plates with meaningful alternatives', () => {
    render(<MotionStudy />)

    const plates = screen.getAllByRole('img', { name: /procedural plate/i })
    expect(plates).toHaveLength(3)
    expect(plates[0]).toHaveAttribute('src', '/media/source-field.svg')
    expect(plates[1]).toHaveAttribute('src', '/media/amendment-field.svg')
    expect(plates[2]).toHaveAttribute('src', '/media/adoption-field.svg')
  })

  it('synchronizes the control label with native playback events', () => {
    render(<MotionStudy />)
    const video = screen.getByLabelText('A procedural amendment aligns fragmented clauses into one working text')

    fireEvent.pause(video)
    expect(screen.getByRole('button', { name: /play motion study/i })).toBeVisible()
    fireEvent.play(video)
    expect(screen.getByRole('button', { name: /pause motion study/i })).toBeVisible()
  })

  it('lets the visitor pause and resume the loop', async () => {
    const user = userEvent.setup()
    const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined)
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined)
    render(<MotionStudy />)

    await user.click(screen.getByRole('button', { name: /pause motion study/i }))
    expect(pause).toHaveBeenCalled()
    await user.click(screen.getByRole('button', { name: /play motion study/i }))
    expect(play).toHaveBeenCalled()
  })
})
