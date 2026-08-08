import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { BriefingDialog } from './BriefingDialog'

describe('BriefingDialog', () => {
  it('opens the concept briefing and returns focus after close', async () => {
    const user = userEvent.setup()
    render(<BriefingDialog />)

    const trigger = screen.getByRole('button', { name: /open the role briefing/i })
    await user.click(trigger)

    const dialog = screen.getByRole('dialog', { name: /build briefing/i })
    expect(dialog).toHaveAttribute('open')
    expect(dialog).toHaveTextContent('Not registration')
    expect(dialog).toHaveTextContent('Concept only')
    expect(dialog).toHaveTextContent('No applications are open')
    expect(dialog).toHaveTextContent('Organizer identity')
    expect(screen.getByRole('heading', { name: 'Delegate' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Faculty advisor' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Chair / dais' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /close briefing/i }))
    expect(dialog).not.toHaveAttribute('open')
    expect(trigger).toHaveFocus()
  })

  it('generates unique dialog labels when the briefing appears twice on the page', () => {
    const { container } = render(<><BriefingDialog /><BriefingDialog /></>)
    const ids = [...container.querySelectorAll('[id]')].map((element) => element.id)
    expect(ids.length).toBeGreaterThan(0)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
