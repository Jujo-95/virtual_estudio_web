import Button from './Button.jsx'
import { SITE } from '../lib/site.js'

function NavBar() {
  const links = [
    { href: '#demo', label: 'Demo' },
    { href: '#como-funciona', label: 'Cómo funciona' },
    { href: '#servicios', label: 'Capacidades' },
    { href: '#creditos', label: 'Créditos' },
    { href: '#contacto', label: 'Contacto' },
  ]

  return (
    <header className="vs-nav">
      <div className="vs-container">
        <div className="vs-nav-inner">
          <a className="vs-brand" href="#top">
            <span className="vs-brand-name">{SITE.name}</span>
          </a>

          <div className="vs-nav-right">
            <nav className="vs-nav-links" aria-label="Navegación principal">
              {links.map((link) => (
                <a key={link.href} href={link.href}>
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
      </div>
    </header>
  )
}

export default NavBar
