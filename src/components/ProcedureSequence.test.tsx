import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ProcedureSequence } from './ProcedureSequence'

describe('ProcedureSequence', () => {
  it('commits the selected procedural state and clause text', async () => {
    const user = userEvent.setup()
    render(<ProcedureSequence />)

    expect(screen.getByRole('tab', { name: /research/i })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByTestId('resolution-clause')).toHaveTextContent('Requests every delegation')

    await user.click(screen.getByRole('tab', { name: /amend/i }))
    expect(screen.getByRole('tab', { name: /amend/i })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByTestId('resolution-clause')).toHaveTextContent('Replaces contested language')
    expect(screen.getByLabelText('Procedure progress')).toHaveAttribute('aria-valuenow', '4')
  })

  it('supports roving arrow-key selection', async () => {
    const user = userEvent.setup()
    render(<ProcedureSequence />)

    const amend = screen.getByRole('tab', { name: /amend/i })
    amend.focus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: /vote/i })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByTestId('resolution-clause')).toHaveTextContent('Records the final agreement')

    await user.keyboard('{Home}')
    expect(screen.getByRole('tab', { name: /research/i })).toHaveAttribute('aria-selected', 'true')
  })
})
