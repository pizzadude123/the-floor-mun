import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { SiteHeader } from './SiteHeader'

describe('SiteHeader', () => {
  it('opens and closes the navigation with authoritative accessible state', async () => {
    const user = userEvent.setup()
    render(<SiteHeader />)

    const toggle = screen.getByRole('button', { name: /open navigation/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByTestId('site-navigation')).toHaveAttribute('data-open', 'false')

    await user.click(toggle)
    expect(toggle).toHaveAccessibleName(/close navigation/i)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByTestId('site-navigation')).toHaveAttribute('data-open', 'true')

    await user.keyboard('{Escape}')
    expect(toggle).toHaveAccessibleName(/open navigation/i)
    expect(toggle).toHaveFocus()
  })

  it('closes after an anchor is selected', async () => {
    const user = userEvent.setup()
    render(<SiteHeader />)
    const toggle = screen.getByRole('button', { name: /open navigation/i })
    await user.click(toggle)
    await user.click(screen.getByRole('link', { name: 'Committees' }))
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})
