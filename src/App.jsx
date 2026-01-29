import './App.css'

function App() {
  return (
    <main className="page">
      <section className="card">
        <h1>virtual_estudio_web</h1>
        <p>
          Puedo ayudarte a recrear una landing similar en React, pero no puedo
          clonar “exactamente igual” (copiar HTML/CSS/JS y assets) de un sitio
          externo como botika.com sin permiso del titular.
        </p>
        <div className="divider" />
        <h2>Opciones</h2>
        <ol>
          <li>
            Si tienes derechos/permisos: pega aquí el HTML/CSS (o comparte el
            repo/archivos exportados) y lo integro a React manteniendo el diseño.
          </li>
          <li>
            Si no: dime qué secciones quieres (hero, logos, features, casos,
            pricing, etc.) y lo reconstruyo con un diseño original muy cercano a
            tu objetivo.
          </li>
        </ol>
        <p className="hint">
          Nota: botika.com envía cabeceras que bloquean embebido en iframe
          (SAMEORIGIN / <code>frame-ancestors 'self'</code>), así que no puedo
          “mostrarlo igual” dentro de tu app sin su configuración.
        </p>
      </section>
    </main>
  )
}

export default App
