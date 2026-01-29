import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Footer from '../components/Footer.jsx'
import NavBar from '../components/NavBar.jsx'
import { SITE } from '../lib/site.js'

function PricingPage() {
  return (
    <>
      <NavBar />

      <main className="vs-section">
        <div className="vs-container">
          <div className="vs-card">
            <div className="vs-kicker">COP · créditos</div>
            <h1 className="vs-h1" style={{ marginTop: 12 }}>
              Créditos y planes
            </h1>
            <p className="vs-lead">
              Virtual Estudio funciona con créditos. Compras paquetes en COP
              dentro de la app y los usas para generar campañas y videos.
            </p>
            <div className="vs-actions">
              <Button as="a" href={SITE.appUrl} variant="buy">
                Comprar créditos en la app
              </Button>
              <Link className="vs-btn vs-btn--secondary" to="/#contacto">
                Quiero recomendación
              </Link>
            </div>
          </div>

          <section className="vs-section">
            <h2 className="vs-section-title">¿Cómo se consumen créditos?</h2>
            <p className="vs-section-subtitle">
              Los costos exactos pueden variar según el tipo de generación y el
              modo seleccionado, pero estas son reglas prácticas basadas en el
              flujo de la app.
            </p>

            <div className="vs-grid">
              <article className="vs-card">
                <h3>Tomas estándar</h3>
                <p>≈ 1 crédito por toma.</p>
              </article>
              <article className="vs-card">
                <h3>Tomas Pro</h3>
                <p>≈ 2 créditos por toma.</p>
              </article>
              <article className="vs-card">
                <h3>Video</h3>
                <p>≈ 1 crédito por segundo (clips de 5 o 10s).</p>
              </article>
            </div>
          </section>

          <section className="vs-section">
            <h2 className="vs-section-title">Qué incluye Virtual Estudio</h2>
            <p className="vs-section-subtitle">
              El foco es ayudarte a publicar más, con consistencia y sin
              depender de sesiones de foto.
            </p>

            <div className="vs-grid">
              <article className="vs-card">
                <h3>Campañas</h3>
                <p>
                  Genera nuevas tomas con control creativo (escenario, estilo,
                  iluminación y salida).
                </p>
              </article>
              <article className="vs-card">
                <h3>UGC vs Editorial</h3>
                <p>
                  Dos estilos para distintos objetivos: realista para social o
                  premium para campañas.
                </p>
              </article>
              <article className="vs-card">
                <h3>Formatos</h3>
                <p>1:1, 4:5 y 9:16 listos para publicar.</p>
              </article>
              <article className="vs-card">
                <h3>Videos</h3>
                <p>
                  Anima una imagen semilla con presets de cámara y sujeto, e
                  instrucciones opcionales.
                </p>
              </article>
              <article className="vs-card">
                <h3>Prendas y modelos</h3>
                <p>
                  Administra tus insumos: prendas y modelos personalizados para
                  consistencia visual.
                </p>
              </article>
              <article className="vs-card">
                <h3>Brand DNA</h3>
                <p>
                  Define el ADN de tu marca: qué vendes, audiencia, vibe y
                  ubicación.
                </p>
              </article>
            </div>
          </section>

          <section className="vs-section">
            <h2 className="vs-section-title">Preguntas frecuentes</h2>
            <div className="vs-grid">
              <article className="vs-card">
                <h3>¿Necesito cuenta?</h3>
                <p>
                  Para guardar campañas, prendas y modelos, sí. Puedes entrar a
                  la app y registrarte cuando quieras.
                </p>
              </article>
              <article className="vs-card">
                <h3>¿Cuánto tarda una generación?</h3>
                <p>
                  Depende del tipo de generación. En general, los resultados se
                  obtienen en minutos. Los videos pueden tardar un poco más por
                  el procesamiento.
                </p>
              </article>
              <article className="vs-card">
                <h3>¿Puedo generar para Instagram/TikTok?</h3>
                <p>
                  Sí. Puedes escoger formatos 9:16 (Stories/Reels), 4:5 (feed) y
                  1:1.
                </p>
              </article>
              <article className="vs-card">
                <h3>¿Cómo pago los créditos?</h3>
                <p>
                  Dentro de la app puedes comprar paquetes en COP (integración
                  de pago).
                </p>
              </article>
              <article className="vs-card">
                <h3>¿Qué es Brand DNA?</h3>
                <p>
                  Es el perfil de marca: tu producto, cliente ideal, vibe y
                  ubicación para mejorar consistencia en campañas.
                </p>
              </article>
              <article className="vs-card">
                <h3>¿Cómo estimo mis créditos?</h3>
                <p>
                  Dinos cuántas publicaciones haces por semana y si quieres UGC
                  o editorial. Te recomendamos un plan.
                </p>
              </article>
            </div>
          </section>

          <section className="vs-section">
            <div className="vs-card">
              <h2 className="vs-section-title">¿Listo para empezar?</h2>
              <p className="vs-section-subtitle">
                Entra a la app, compra tu paquete de créditos y genera tu
                primera campaña.
              </p>
              <div className="vs-actions">
                <Button as="a" href={SITE.appUrl} variant="primary">
                  Ir a la app
                </Button>
                <Link className="vs-btn vs-btn--secondary" to="/#contacto">
                  Hablar con ventas
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default PricingPage

