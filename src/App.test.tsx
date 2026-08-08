import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('THE FLOOR semantic experience', () => {
  it('renders the complete narrative with truthful concept disclosure', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveAccessibleName("The world doesn’t arrive at consensus. You draft it.")
    expect(screen.getByText(/concept conference experience/i)).toBeVisible()
    expect(screen.getByText(/no UN affiliation is implied/i)).toBeVisible()

    expect(screen.getByRole('heading', { name: /diplomacy is a writing discipline/i })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Language has momentum.' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /three rooms. three kinds of pressure/i })).toBeVisible()
    expect(screen.getByRole('heading', { name: /from position to recorded language/i })).toBeVisible()
    expect(screen.getByRole('heading', { name: /arrive with more than a speech/i })).toBeVisible()

    expect(screen.getAllByText('Illustrative committee')).toHaveLength(3)
    expect(screen.getByText('Illustrative day')).toBeVisible()
    expect(screen.queryByRole('link', { name: /register/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /register/i })).not.toBeInTheDocument()
  })

  it('provides semantic landmarks and direct task anchors', () => {
    render(<App />)
    const main = screen.getByRole('main')
    const primaryNav: HTMLElement = screen.getByRole('navigation', { name: /primary navigation/i })
    expect(within(main).getByRole('heading', { name: /the world doesn’t arrive/i })).toBeVisible()
    expect(primaryNav).toBeVisible()
    expect(screen.getByRole('contentinfo')).toHaveTextContent('Concept 01')
    expect(screen.getByRole('link', { name: /skip to content/i })).toHaveAttribute('href', '#main-content')
    expect(screen.getByRole('link', { name: /explore the committees/i })).toHaveAttribute('href', '#committees')
    expect(within(primaryNav).getByRole('link', { name: 'Mandate' })).toHaveAttribute('href', '#mandate')
    expect(within(primaryNav).getByRole('link', { name: 'Motion study' })).toHaveAttribute('href', '#motion-study')
    expect(within(primaryNav).getByRole('link', { name: 'Committees' })).toHaveAttribute('href', '#committees')
  })
})
