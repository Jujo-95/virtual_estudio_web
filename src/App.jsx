import { useEffect, useMemo, useRef, useState } from 'react'
import Button from './components/Button.jsx'
import Footer from './components/Footer.jsx'
import FeatureRail from './components/FeatureRail.jsx'
import NavBar from './components/NavBar.jsx'
import WhyScroller from './components/WhyScroller.jsx'
import { SITE } from './lib/site.js'

function App() {
  const snapAnimatingRef = useRef(false)
  const snapWheelAccumRef = useRef(0)

  const [postsPerWeek, setPostsPerWeek] = useState(6)
  const [assetsPerPost, setAssetsPerPost] = useState(6)

  useEffect(() => {
    const isEnabled = () => {
      if (typeof window === 'undefined') return false
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return false
      if (window.matchMedia?.('(max-width: 980px)')?.matches) return false
      return true
    }

    const getSnapSections = () => {
      const ids = ['top', 'servicios', 'diferenciales']
      return ids.map((id) => document.getElementById(id)).filter(Boolean)
    }

    const getActiveSnapIndex = (sections) => {
      const y = window.scrollY + 120
      let idx = 0
      for (let i = 0; i < sections.length; i += 1) {
        const el = sections[i]
        if (el && y >= el.offsetTop) idx = i
      }
      return idx
    }

    const scrollToElement = (el) => {
      if (!el || snapAnimatingRef.current) return
      snapAnimatingRef.current = true
      const topOffset = 72
      const top = Math.max(0, el.offsetTop - topOffset)
      window.scrollTo({ top, behavior: 'smooth' })
      window.setTimeout(() => {
        snapAnimatingRef.current = false
      }, 560)
    }

    const onScroll = () => {
      snapWheelAccumRef.current = 0
    }

    const onWheel = (event) => {
      if (!isEnabled()) return
      if (snapAnimatingRef.current) return

      const sections = getSnapSections()
      if (sections.length < 2) return

      const dir = event.deltaY > 0 ? 'down' : 'up'
      const activeIdx = getActiveSnapIndex(sections)
      const activeEl = sections[activeIdx]

      if (!activeEl) return

      // Only snap for the first 3 sections.
      if (activeIdx > 2) return

      if (activeEl.id === 'diferenciales') {
        const whyIndex = Number(activeEl.dataset.whyIndex || '0')
        const whyCount = Number(activeEl.dataset.whyCount || '4')
        const atTop = whyIndex <= 0
        const atEnd = whyIndex >= whyCount - 1

        if (dir === 'up' && atTop) {
          event.preventDefault()
          scrollToElement(sections[1])
          return
        }

        if (dir === 'down' && atEnd) {
          const next = document.getElementById('como-funciona')
          if (next) {
            event.preventDefault()
            scrollToElement(next)
          }
          return
        }

        // Let WhyScroller consume scroll between steps.
        return
      }

      snapWheelAccumRef.current += event.deltaY
      if (Math.abs(snapWheelAccumRef.current) < 40) return
      snapWheelAccumRef.current = 0

      if (activeEl.id === 'top' && dir === 'down') {
        event.preventDefault()
        scrollToElement(sections[1])
        return
      }

      if (activeEl.id === 'servicios') {
        event.preventDefault()
        scrollToElement(dir === 'down' ? sections[2] : sections[0])
      }
    }

    const onKeyDown = (event) => {
      if (!isEnabled()) return
      if (snapAnimatingRef.current) return

      const key = event.key
      const dir = key === 'ArrowDown' || key === 'PageDown' ? 'down' : key === 'ArrowUp' || key === 'PageUp' ? 'up' : null
      if (!dir) return

      const sections = getSnapSections()
      if (sections.length < 2) return

      const activeIdx = getActiveSnapIndex(sections)
      const activeEl = sections[activeIdx]
      if (!activeEl) return
      if (activeIdx > 2) return

      if (activeEl.id === 'diferenciales') {
        const whyIndex = Number(activeEl.dataset.whyIndex || '0')
        const whyCount = Number(activeEl.dataset.whyCount || '4')
        const atTop = whyIndex <= 0
        const atEnd = whyIndex >= whyCount - 1

        if (dir === 'up' && atTop) {
          event.preventDefault()
          scrollToElement(sections[1])
          return
        }
        if (dir === 'down' && atEnd) {
          const next = document.getElementById('como-funciona')
          if (next) {
            event.preventDefault()
            scrollToElement(next)
          }
          return
        }

        // Let WhyScroller handle intermediate steps.
        return
      }

      if (activeEl.id === 'top' && dir === 'down') {
        event.preventDefault()
        scrollToElement(sections[1])
        return
      }

      if (activeEl.id === 'servicios') {
        event.preventDefault()
        scrollToElement(dir === 'down' ? sections[2] : sections[0])
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown, { passive: false })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const estimatedAssetsPerMonth = useMemo(() => {
    const safePosts = Number.isFinite(postsPerWeek) ? postsPerWeek : 0
    const safeAssets = Number.isFinite(assetsPerPost) ? assetsPerPost : 0
    return Math.max(0, Math.round(safePosts * 4.3 * safeAssets))
  }, [assetsPerPost, postsPerWeek])

  const buildMailto = (payload) => {
    const subject = encodeURIComponent('Contacto — Virtual Estudio')
    const body = encodeURIComponent(
      `Nombre: ${payload.name}\n` +
        `Correo: ${payload.email}\n` +
        `Teléfono: ${payload.phone}\n` +
        `Publicaciones/semana: ${payload.postsPerWeek}\n` +
        `Piezas por publicación (estimado): ${payload.assetsPerPost}\n` +
        `Piezas/mes (estimado): ${payload.estimatedAssetsPerMonth}\n\n` +
        `Me interesa conocer el plan recomendado de créditos y el flujo ideal (Campañas / Videos / Prendas / Modelos / Brand DNA).`,
    )
    return `mailto:${SITE.contactEmail}?subject=${subject}&body=${body}`
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const phone = String(formData.get('phone') || '').trim()
    const postsPerWeekStr = String(formData.get('posts_per_week') || '').trim()
    const assetsPerPostStr = String(formData.get('assets_per_post') || '').trim()

    if (!name || !email || !phone || postsPerWeekStr === '' || assetsPerPostStr === '') {
      alert('Completa todos los campos.')
      return
    }

    const parsedPosts = Number(postsPerWeekStr)
    const parsedAssets = Number(assetsPerPostStr)

    const estimated = Math.max(0, Math.round(parsedPosts * 4.3 * parsedAssets))
    window.location.href = buildMailto({
      name,
      email,
      phone,
      postsPerWeek: parsedPosts,
      assetsPerPost: parsedAssets,
      estimatedAssetsPerMonth: estimated,
    })
  }

  return (
    <div className="vs-app">
      <NavBar />

      <main>
        <section className="vs-hero vs-hero--ref" id="top">
          <div className="vs-hero-ambient" aria-hidden="true">
            <div className="vs-hero-side vs-hero-side--left">
              <div className="vs-hero-side-inner">
                <div className="vs-hero-side-meta">
                  <div className="vs-hero-side-title">UGC</div>
                  <div className="vs-hero-side-sub">Variaciones rápidas</div>
                </div>
              </div>
            </div>
            <div className="vs-hero-side vs-hero-side--right">
              <div className="vs-hero-side-inner">
                <div className="vs-hero-side-meta">
                  <div className="vs-hero-side-title">Editorial</div>
                  <div className="vs-hero-side-sub">Look premium</div>
                </div>
              </div>
            </div>
          </div>

          <div className="vs-container">
            <div className="vs-hero-center">
              <h1 className="vs-hero-title">
                Campañas de moda con IA
                <span className="vs-hero-caret" aria-hidden="true" />
              </h1>
              <p className="vs-hero-subtitle">
                De foto de prenda a campaña completa (UGC, editorial y video), con Brand DNA y
                créditos en COP.
              </p>

              <div className="vs-hero-cta">
                <Button href={SITE.appUrl} variant="primary" className="vs-hero-cta-btn">
                  Get Started
                </Button>
              </div>

              <div className="vs-hero-trust" aria-label="Módulos principales">
                <span className="vs-hero-trust-item">Campañas</span>
                <span className="vs-hero-trust-item">Prendas (SKU)</span>
                <span className="vs-hero-trust-item">Modelos</span>
                <span className="vs-hero-trust-item">Videos</span>
                <span className="vs-hero-trust-item">Brand DNA</span>
              </div>
            </div>
          </div>
        </section>

        <section className="vs-section vs-section--rail" id="servicios">
          <div className="vs-container">
            <header className="vs-section-header vs-section-header--center">
              <h2 className="vs-section-title-xl">
                Qué compras
                <span className="vs-hero-caret" aria-hidden="true" />
              </h2>
              <p className="vs-section-lead">
                Un flujo completo pensado para moda: de prenda (SKU) a piezas listas para anuncios,
                redes y e‑commerce.
              </p>
            </header>

            <FeatureRail />
          </div>
        </section>

        <WhyScroller />

        <section className="vs-section" id="como-funciona">
          <div className="vs-container">
            <header className="vs-section-header">
              <h2 className="vs-h2">Cómo funciona</h2>
              <p className="vs-subtitle">Un flujo simple para producir con consistencia.</p>
            </header>

            <div className="vs-steps">
              <article className="vs-step">
                <div className="vs-step-num">1</div>
                <div>
                  <h3>Sube tu prenda</h3>
                  <p>Parte de tu SKU: una buena foto de prenda es suficiente.</p>
                </div>
              </article>
              <article className="vs-step">
                <div className="vs-step-num">2</div>
                <div>
                  <h3>Elige modelo + estilo</h3>
                  <p>UGC o editorial, y tu Brand DNA para mantener el look.</p>
                </div>
              </article>
              <article className="vs-step">
                <div className="vs-step-num">3</div>
                <div>
                  <h3>Genera y exporta</h3>
                  <p>Variaciones y formatos listos para anuncios y redes.</p>
                </div>
              </article>
            </div>

            <div className="vs-cta-row">
              <Button href={SITE.appUrl} variant="primary">
                Crear mi primera campaña
              </Button>
              <Button href="#contacto" variant="ghost">
                Quiero una recomendación
              </Button>
            </div>
          </div>
        </section>

        <section className="vs-section" id="para-quien">
          <div className="vs-container">
            <header className="vs-section-header">
              <h2 className="vs-h2">Para quién es</h2>
              <p className="vs-subtitle">
                Marcas de moda (DTC, retail, emprendimientos) que necesitan contenido
                constante para publicidad, social y catálogo.
              </p>
            </header>

            <div className="vs-grid vs-grid--2">
              <article className="vs-card">
                <h3>Fundador/a</h3>
                <p>Más contenido con menos costo y más velocidad.</p>
              </article>
              <article className="vs-card">
                <h3>Marketing / Performance</h3>
                <p>Variaciones rápidas para pruebas creativas y rotación de anuncios.</p>
              </article>
              <article className="vs-card">
                <h3>Dirección creativa</h3>
                <p>Control de estilo y consistencia visual con Brand DNA.</p>
              </article>
              <article className="vs-card">
                <h3>E‑commerce</h3>
                <p>Imágenes consistentes por SKU, listas para publicar.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="vs-section" id="creditos">
          <div className="vs-container">
            <div className="vs-panel">
              <header className="vs-section-header">
                <h2 className="vs-h2">Calculadora rápida</h2>
                <p className="vs-subtitle">
                  Estima cuántas piezas podrías producir al mes. Luego te recomendamos
                  un plan de créditos en COP.
                </p>
              </header>

              <div className="vs-calc">
                <div className="vs-calc-field">
                  <label htmlFor="postsPerWeek">Publicaciones por semana</label>
                  <input
                    id="postsPerWeek"
                    type="range"
                    min="0"
                    max="30"
                    step="1"
                    value={postsPerWeek}
                    onChange={(e) => setPostsPerWeek(Number(e.target.value))}
                  />
                  <div className="vs-calc-meta">
                    <span>{postsPerWeek}</span>
                    <span>0–30</span>
                  </div>
                </div>

                <div className="vs-calc-field">
                  <label htmlFor="assetsPerPost">Piezas por publicación</label>
                  <input
                    id="assetsPerPost"
                    type="range"
                    min="1"
                    max="12"
                    step="1"
                    value={assetsPerPost}
                    onChange={(e) => setAssetsPerPost(Number(e.target.value))}
                  />
                  <div className="vs-calc-meta">
                    <span>{assetsPerPost}</span>
                    <span>1–12</span>
                  </div>
                </div>

                <div className="vs-calc-result">
                  <div className="vs-calc-kpi">
                    <div className="vs-calc-kpi-label">Estimación</div>
                    <div className="vs-calc-kpi-value">{estimatedAssetsPerMonth}</div>
                    <div className="vs-calc-kpi-sub">piezas/mes</div>
                  </div>
                  <div className="vs-calc-note">
                    La estimación usa ~4.3 semanas/mes y sirve solo como referencia.
                  </div>
                </div>
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
                      min="0"
                      step="1"
                      defaultValue={postsPerWeek}
                      required
                    />
                  </div>
                  <div className="vs-field">
                    <label htmlFor="assets_per_post">Piezas por publicación</label>
                    <input
                      id="assets_per_post"
                      name="assets_per_post"
                      type="number"
                      min="1"
                      step="1"
                      defaultValue={assetsPerPost}
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
