import { SITE } from '../lib/site.js'

function Footer() {
  return (
    <footer className="vs-footer">
      <div className="vs-container">
        <div className="vs-footer-inner">
          <div className="vs-footer-brand">
            © {new Date().getFullYear()} {SITE.name}
          </div>
          <div className="vs-footer-links">
            <a href={SITE.appUrl}>App</a>
            <a href={SITE.siteUrl}>Sitio</a>
            <a href={`mailto:${SITE.contactEmail}`}>Contacto</a>
            <a href={`${SITE.siteUrl}legal/terms-of-service/`}>Términos</a>
            <a href={`${SITE.siteUrl}legal/privacy-policy/`}>Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
