import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="vs-footer">
      <div className="vs-container">
        <div>
          © {new Date().getFullYear()} Virtual Estudio. Todos los derechos
          reservados.{' '}
          <Link to="/legal/terms-of-service/">Términos del servicio</Link> ·{' '}
          <Link to="/legal/privacy-policy/">Política de privacidad</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer

