import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { PreparationDesk } from './PreparationDesk'

beforeEach(() => localStorage.clear())

describe('PreparationDesk', () => {
  it('updates and announces exact progress using native checkboxes', async () => {
    const user = userEvent.setup()
    render(<PreparationDesk />)

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(5)
    expect(screen.getByRole('status')).toHaveTextContent('0 of 5 ready')

    await user.click(checkboxes[0]!)
    expect(screen.getByRole('status')).toHaveTextContent('1 of 5 ready')
    expect(screen.getByRole('status')).toHaveTextContent('Saved on this device')

    for (const checkbox of checkboxes.slice(1)) await user.click(checkbox)
    expect(screen.getByRole('status')).toHaveTextContent('Briefing complete')
    expect(screen.getByTestId('preparation-meter')).toHaveAttribute('aria-valuenow', '100')
  })

  it('restores valid local progress and resets it on request', async () => {
    localStorage.setItem('the-floor:preparation', JSON.stringify([true, false, true, false, false]))
    const user = userEvent.setup()
    render(<PreparationDesk />)

    expect(screen.getAllByRole('checkbox')[0]).toBeChecked()
    expect(screen.getAllByRole('checkbox')[2]).toBeChecked()
    expect(screen.getByRole('status')).toHaveTextContent('2 of 5 ready')

    await user.click(screen.getByRole('button', { name: /reset preparation/i }))
    for (const checkbox of screen.getAllByRole('checkbox')) expect(checkbox).not.toBeChecked()
    expect(screen.getByRole('status')).toHaveTextContent('0 of 5 ready')
  })
})
