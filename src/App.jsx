import { useCallback, useMemo, useState } from 'react'
import Button from './components/Button.jsx'
import Footer from './components/Footer.jsx'
import FeatureRail from './components/FeatureRail.jsx'
import NavBar from './components/NavBar.jsx'
import WhyScroller from './components/WhyScroller.jsx'
import HowScroller from './components/HowScroller.jsx'
import { SITE } from './lib/site.js'
import CalculatorRail from './components/CalculatorRail.jsx'
import BeforeAfter from './components/BeforeAfter.jsx'

const WEEKS_PER_MONTH = 4.3

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const buildMailto = (payload) => {
  const subject = encodeURIComponent(`Contacto — ${SITE.name}`)
  const body = encodeURIComponent(
    `Nombre: ${payload.name}\n` +
    `Correo: ${payload.email}\n` +
    `Teléfono: ${payload.phone}\n` +
    `Piezas/semana: ${payload.postsPerWeek}\n` +
    `Piezas/mes (estimado): ${payload.estimatedAssetsPerMonth}\n\n` +
    `Me interesa conocer el plan recomendado y el flujo ideal (Casting digital / Brand DNA / Fidelidad textil / Video cinematográfico).`,
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
              <h1 className="vs-hero-title">De la prenda al catálogo en minutos, no en semanas.</h1>
              <p className="vs-hero-subtitle">
                {SITE.name} es la infraestructura de producción visual con IA diseñada para escalar marcas de moda.
                Produce campañas de alta gama y videos cinematográficos sin los costos ni la logística de un shooting tradicional.
              </p>
              <div className="vs-hero-cta">
                <Button href={SITE.appUrl} variant="primary" className="vs-hero-cta-btn">
                  Comienza ahora — 5 créditos gratis
                </Button>
                <Button href="#demo" variant="secondary" className="vs-hero-cta-btn">
                  Ver demostración funcional
                </Button>
              </div>
              <p className="vs-microcopy">Tu Brand DNA es innegociable. La producción ya no es el límite, es el multiplicador.</p>
            </div>
          </div>
        </section>

        <section className="vs-section vs-section--demo" id="demo">
          <div className="vs-container">
            <div className="vs-demo-split">
              <div className="vs-panel vs-demo-split-left">
                <BeforeAfter />
              </div>

              <div className="vs-demo-split-right">
                <header className="vs-section-header vs-demo-header-right">
                  <h2 className="vs-section-title-xl">Antes y después, en una sola vista</h2>
                  <p className="vs-demo-lead">
                    Una foto base se convierte en un resultado editorial listo para publicar, con consistencia de Brand DNA y fidelidad de prenda.
                  </p>
                </header>

                <div className="vs-actions vs-demo-actions">
                  <Button href={SITE.appUrl} variant="primary">
                    Comienza ahora — 5 créditos gratis
                  </Button>
                  <Button href="#creditos" variant="secondary">
                    Ver créditos
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="vs-section vs-section--rail" id="servicios">
          <div className="vs-container">
            <header className="vs-section-header vs-section-header--center">
              <h2 className="vs-section-title-xl">Capacidades diseñadas para moda</h2>
              <p className="vs-section-lead">
                No es un generador genérico: es un motor vertical que preserva fidelidad de prenda,
                respeta tu Brand DNA y te permite producir a escala.
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
                    Sin cargos ocultos. Pagas solo por capacidad de producción visual con créditos (1 imagen = 1 crédito).
                  </p>
                </header>

                <div className="vs-calc-field vs-calc-slider-outside">
                  <label htmlFor="postsPerWeek">Piezas por semana</label>
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
                  No. {SITE.name} acelera la producción (variaciones, formatos y consistencia) para que tu equipo se enfoque en dirección creativa y performance.
                </p>
              </details>
              <details className="vs-faq-item">
                <summary>¿Puedo controlar el estilo?</summary>
                <p>
                  Sí: eliges modo (UGC/editorial), modelo, escena y tu Brand DNA para mantener el look de marca.
                </p>
              </details>
              <details className="vs-faq-item">
                <summary>¿Cómo funcionan los créditos?</summary>
                <p>
                  Pagas por capacidad de producción. En general, 1 imagen = 1 crédito (y el consumo depende del tipo de output). Tu plan ideal depende de cuántas piezas necesitas por semana.
                </p>
              </details>
              <details className="vs-faq-item">
                <summary>¿Qué necesito para empezar?</summary>
                <p>
                  Una foto base clara de la prenda (plano o maniquí) y un objetivo de campaña. Con eso puedes generar campañas y variaciones rápidamente.
                </p>
              </details>
              <details className="vs-faq-item">
                <summary>¿Cuánto tarda crear mi primera campaña?</summary>
                <p>
                  En minutos. Normalmente puedes pasar de foto base a un set listo para catálogo en ~15 minutos, dependiendo de la complejidad y las variaciones que quieras.
                </p>
              </details>
              <details className="vs-faq-item">
                <summary>¿Los modelos tienen derechos de imagen?</summary>
                <p>
                  No. Usamos modelos 100% sintéticos para reducir riesgo de derechos de imagen y asociaciones reputacionales.
                </p>
              </details>
              <details className="vs-faq-item">
                <summary>¿Qué pasa si la prenda se ve diferente?</summary>
                <p>
                  Nuestra prioridad es la fidelidad textil: preservar costuras, patrones y ajuste. Si algo no se ve bien, iteras variaciones de pose/escena hasta lograr el resultado.
                </p>
              </details>
              <details className="vs-faq-item">
                <summary>¿Tienen garantía o devolución de créditos?</summary>
                <p>
                  Hoy priorizamos iteración rápida y soporte para que llegues al resultado correcto. Si necesitas acuerdos formales (SLA / soporte dedicado), el plan Empresarial/Agencia es el recomendado.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section className="vs-section" id="contacto">
          <div className="vs-container">
            <div className="vs-panel">
              <header className="vs-section-header">
                <h2 className="vs-h2">Hablemos de tu catálogo</h2>
                <p className="vs-subtitle">
                  Cuéntanos tu volumen de piezas por semana y te recomendamos el plan ideal y el flujo (Casting / Brand DNA / Fidelidad / Video).
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
                    <label htmlFor="posts_per_week">Piezas por semana</label>
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
