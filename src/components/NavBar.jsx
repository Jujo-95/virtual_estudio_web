import { useState } from 'react'
import Button from './Button.jsx'
import { SITE } from '../lib/site.js'

function NavBar() {
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#como-funciona', label: 'Cómo funciona' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#creditos', label: 'Créditos' },
    { href: '#contacto', label: 'Contacto' },
  ]

  return (
    <header className="vs-nav">
      <div className="vs-container">
        <div className="vs-nav-inner">
          <a className="vs-brand" href="#top" onClick={() => setOpen(false)}>
            <span className="vs-brand-mark" aria-hidden="true">
              <span className="vs-brand-dot" aria-hidden="true" />
            </span>
            <span className="vs-brand-name">{SITE.name}</span>
          </a>

          <button
            className="vs-nav-toggle"
            type="button"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>

          <nav
            className={`vs-nav-links ${open ? 'is-open' : ''}`.trim()}
            aria-label="Navegación principal"
          >
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
            <div className="vs-nav-actions">
              <Button href={SITE.appUrl} variant="ghost" onClick={() => setOpen(false)}>
                Sign In
              </Button>
              <Button href={SITE.appUrl} variant="primary" onClick={() => setOpen(false)}>
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default NavBar
