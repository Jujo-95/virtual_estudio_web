import { useCallback, useMemo, useState } from 'react'
import Button from './components/Button.jsx'
import Footer from './components/Footer.jsx'
import FeatureRail from './components/FeatureRail.jsx'
import NavBar from './components/NavBar.jsx'
import WhyScroller from './components/WhyScroller.jsx'
import HowScroller from './components/HowScroller.jsx'
import { SITE } from './lib/site.js'
import CalculatorRail from './components/CalculatorRail.jsx'

const WEEKS_PER_MONTH = 4.3

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const buildMailto = (payload) => {
  const subject = encodeURIComponent('Contacto — Virtual Estudio')
  const body = encodeURIComponent(
    `Nombre: ${payload.name}\n` +
      `Correo: ${payload.email}\n` +
      `Teléfono: ${payload.phone}\n` +
      `Campañas/semana: ${payload.postsPerWeek}\n` +
      `Piezas/mes (estimado): ${payload.estimatedAssetsPerMonth}\n\n` +
      `Me interesa conocer el plan recomendado de créditos y el flujo ideal (Campañas / Videos / Prendas / Modelos / Brand DNA).`,
  )
  return `mailto:${SITE.contactEmail}?subject=${subject}&body=${body}`
}

function App() {
  const [postsPerWeek, setPostsPerWeek] = useState(6)

  const estimatedAssetsPerMonth = useMemo(() => {
    const safePosts = Number.isFinite(postsPerWeek) ? postsPerWeek : 0
    return Math.round(Math.max(0, safePosts) * WEEKS_PER_MONTH)
  }, [postsPerWeek])

  const onPostsPerWeekChange = useCallback((event) => {
    const raw = Number(event.target.value)
    const safe = Number.isFinite(raw) ? raw : 0
    setPostsPerWeek(clamp(safe, 1, 20))
  }, [])

  const onSubmit = useCallback((event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const formData = new FormData(form)
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const phone = String(formData.get('phone') || '').trim()
    const parsedPosts = Number(formData.get('posts_per_week'))
    if (!name || !email || !phone || !Number.isFinite(parsedPosts)) return

    const weekly = clamp(parsedPosts, 1, 20)
    const estimated = Math.round(weekly * WEEKS_PER_MONTH)
    window.location.href = buildMailto({
      name,
      email,
      phone,
      postsPerWeek: weekly,
      estimatedAssetsPerMonth: estimated,
    })
  }, [])

  return (
    <div className="vs-app">
      <NavBar />

      <main>
        <section className="vs-hero vs-hero--ref" id="top">
          <div className="vs-container">
            <div className="vs-hero-center">
              <h1 className="vs-hero-title">
                Campañas de moda con IA
              </h1>
              <p className="vs-hero-subtitle">
                De foto de prenda a campaña completa (UGC, editorial y video), con Brand DNA y
                créditos en COP.
              </p>
              <div className="vs-hero-cta">
                <Button href={SITE.appUrl} variant="primary" className="vs-hero-cta-btn">
                  Comienza ahora
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="vs-section vs-section--rail" id="servicios">
          <div className="vs-container">
            <header className="vs-section-header vs-section-header--center">
              <h2 className="vs-section-title-xl">
                Qué compras
              </h2>
              <p className="vs-section-lead">
                Un flujo completo pensado para moda: de prenda a piezas listas para anuncios,
                redes y e‑commerce.
              </p>
            </header>

            <FeatureRail />
          </div>
        </section>

        <WhyScroller />

        <HowScroller />

        <section className="vs-section" id="creditos">
          <div className="vs-container">
            <div className="vs-calc-grid-container">
              <div className="vs-calc-column-left">
                <header className="vs-section-header">
                  <h2 className="vs-section-title-xl">
                    Calcula el plan ideal para tu marca
                  </h2>
                  <p className="vs-subtitle" id="vs-calc-help">
                    Ajusta tu cadencia semanal para estimar un plan recomendado.
                  </p>
                </header>

                <div className="vs-calc-field vs-calc-slider-outside">
                  <label htmlFor="postsPerWeek">Campañas por semana</label>
                  <input
                    id="postsPerWeek"
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={postsPerWeek}
                    onChange={onPostsPerWeekChange}
                    aria-describedby="vs-calc-help"
                  />
                  <div className="vs-calc-meta">
                    <span>{postsPerWeek}</span>
                    <span>1–20</span>
                  </div>
                </div>
              </div>

              <div className="vs-calc-column-right">
                <CalculatorRail postsPerWeek={postsPerWeek} estimatedAssetsPerMonth={estimatedAssetsPerMonth} />
              </div>
            </div>
          </div>
        </section>

        <section className="vs-section" id="faq">
          <div className="vs-container">
            <header className="vs-section-header">
              <h2 className="vs-h2">FAQ</h2>
              <p className="vs-subtitle">Respuestas cortas a objeciones comunes.</p>
            </header>

            <div className="vs-faq">
              <details className="vs-faq-item">
                <summary>¿Esto reemplaza mi equipo creativo?</summary>
                <p>
                  No. Virtual Estudio acelera la producción (variaciones, formatos y
                  consistencia) para que tu equipo se enfoque en dirección creativa y
                  performance.
                </p>
              </details>
              <details className="vs-faq-item">
                <summary>¿Puedo controlar el estilo?</summary>
                <p>
                  Sí: eliges modo (UGC/editorial), modelo, escena y tu Brand DNA para
                  mantener el look de marca.
                </p>
              </details>
              <details className="vs-faq-item">
                <summary>¿Cómo funcionan los créditos?</summary>
                <p>
                  Compras créditos en COP y los consumes al generar contenido (imágenes
                  y videos). El plan ideal depende de tu cadencia de publicaciones.
                </p>
              </details>
              <details className="vs-faq-item">
                <summary>¿Qué necesito para empezar?</summary>
                <p>
                  Fotos claras de tus prendas. Con eso puedes crear campañas y
                  variaciones rápidamente.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section className="vs-section" id="contacto">
          <div className="vs-container">
            <div className="vs-panel">
              <header className="vs-section-header">
                <h2 className="vs-h2">Hablemos de tu marca</h2>
                <p className="vs-subtitle">
                  Cuéntanos tu cadencia de publicaciones y te recomendamos un plan de
                  créditos y un flujo (Campañas / Videos / Brand DNA).
                </p>
              </header>

              <form onSubmit={onSubmit} className="vs-form">
                <div className="vs-form-grid">
                  <div className="vs-field">
                    <label htmlFor="name">Nombre</label>
                    <input id="name" name="name" type="text" required />
                  </div>
                  <div className="vs-field">
                    <label htmlFor="email">Correo</label>
                    <input id="email" name="email" type="email" required />
                  </div>
                  <div className="vs-field">
                    <label htmlFor="phone">Teléfono</label>
                    <input id="phone" name="phone" type="tel" required />
                  </div>
                  <div className="vs-field">
                    <label htmlFor="posts_per_week">Publicaciones por semana</label>
                    <input
                      id="posts_per_week"
                      name="posts_per_week"
                      type="number"
                      min="1"
                      max="20"
                      step="1"
                      value={postsPerWeek}
                      onChange={onPostsPerWeekChange}
                      required
                    />
                  </div>
                </div>

                <div className="vs-form-actions">
                  <Button type="submit" variant="primary">
                    Enviar (correo)
                  </Button>
                  <Button href={SITE.appUrl} variant="secondary">
                    Entrar a la app
                  </Button>
                </div>

                <p className="vs-microcopy">
                  Esto abre tu cliente de correo con el mensaje listo.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
