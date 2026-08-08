import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { BriefingDialog } from './BriefingDialog'

describe('BriefingDialog', () => {
  it('opens the concept briefing and returns focus after close', async () => {
    const user = userEvent.setup()
    render(<BriefingDialog />)

    const trigger = screen.getByRole('button', { name: /enter the delegate briefing/i })
    await user.click(trigger)

    const dialog = screen.getByRole('dialog', { name: /build briefing/i })
    expect(dialog).toHaveAttribute('open')
    expect(dialog).toHaveTextContent('Not registration')
    expect(dialog).toHaveTextContent('Organizer identity')

    await user.click(screen.getByRole('button', { name: /close briefing/i }))
    expect(dialog).not.toHaveAttribute('open')
    expect(trigger).toHaveFocus()
  })
})
