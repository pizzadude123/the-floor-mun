import { useEffect, useRef, useState } from 'react'

const navigation = [
  { href: '#mandate', label: 'Mandate' },
  { href: '#motion-study', label: 'Motion study' },
  { href: '#committees', label: 'Committees' },
  { href: '#procedure', label: 'Procedure' },
  { href: '#delegate-desk', label: 'Delegate desk' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      requestAnimationFrame(() => toggleRef.current?.focus())
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return (
    <header className="site-header" data-menu-open={open}>
      <a className="brand" href="#top" aria-label="The Floor, home">
        <span className="brand-mark" aria-hidden="true">TF</span>
        <span className="brand-word">THE FLOOR</span>
      </a>
      <button
        ref={toggleRef}
        className="menu-toggle"
        type="button"
        aria-controls="site-navigation"
        aria-expanded={open}
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        onClick={() => setOpen((current) => !current)}
      >
        <span aria-hidden="true">{open ? 'Close' : 'Menu'}</span>
      </button>
      <nav
        id="site-navigation"
        className="site-navigation"
        aria-label="Primary navigation"
        data-testid="site-navigation"
        data-open={open}
      >
        <span className="nav-docket" aria-hidden="true">DRAFT / 00</span>
        {navigation.map((item, index) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            <span aria-hidden="true">0{index + 1}</span>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
