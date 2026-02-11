import Button from './Button.jsx'
import { SITE } from '../lib/site.js'
import { useCallback, useState } from 'react'

function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: '#demo', label: 'Demo' },
    { href: '#como-funciona', label: 'Cómo funciona' },
    { href: '#servicios', label: 'Capacidades' },
    { href: '#creditos', label: 'Créditos' },
    { href: '#contacto', label: 'Contacto' },
  ]

  const close = useCallback(() => setIsOpen(false), [])

  return (
    <header className="vs-nav">
      <div className="vs-container">
        <div className="vs-nav-inner">
          <a className="vs-brand" href="#top">
            <span className="vs-brand-name">{SITE.name}</span>
          </a>

          <div className="vs-nav-right">
            <button
              type="button"
              className="vs-nav-toggle"
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
              aria-controls="vs-nav-drawer"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <span className="vs-nav-toggle-icon" aria-hidden="true" />
            </button>

            <nav className="vs-nav-links" aria-label="Navegación principal">
              {links.map((link) => (
                <a key={link.href} href={link.href} onClick={close}>
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="vs-nav-actions">
              <Button href={SITE.appUrl} variant="primary">
                Comienza ahora
              </Button>
            </div>
          </div>
        </div>

        <div id="vs-nav-drawer" className={`vs-nav-drawer ${isOpen ? 'is-open' : ''}`.trim()}>
          <nav className="vs-nav-drawer-links" aria-label="Navegación móvil">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={close}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="vs-nav-drawer-actions">
            <Button href={SITE.appUrl} variant="primary" className="vs-nav-drawer-cta" onClick={close}>
              Comienza ahora
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavBar
