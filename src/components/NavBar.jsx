import { Link } from 'react-router-dom'
import { SITE } from '../lib/site.js'

function NavBar() {
  return (
    <header className="vs-nav">
      <div className="vs-container">
        <div className="vs-nav-inner">
          <Link className="vs-brand" to="/">
            <span className="vs-brand-mark" aria-hidden="true" />
            <span className="vs-brand-name">{SITE.name}</span>
          </Link>

          <nav className="vs-nav-links" aria-label="Navegación principal">
            <a href="/#servicios">Servicios</a>
            <a href="/#ugc-editorial">UGC vs Editorial</a>
            <a href="/#formatos">Formatos</a>
            <Link to="/pricing/">Créditos</Link>
            <a href="/#contacto">Contacto</a>
            <a className="vs-btn vs-btn--primary" href={SITE.appUrl}>
              Ir a la app
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default NavBar

