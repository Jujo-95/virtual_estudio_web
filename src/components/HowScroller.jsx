import { useEffect, useRef } from 'react'

const STEPS = [
  {
    title: 'Sube tu prenda',
    subtitle: 'Tu prenda como punto de partida',
    description:
      'Parte de una foto básica (plano o maniquí). La prenda es el input: desde ahí construyes campañas sin logística.',
    variant: 'sku',
  },
  {
    title: 'Elige modelo + estilo',
    subtitle: 'UGC o editorial + Brand DNA',
    description:
      'Haz casting digital, define el estilo (UGC/editorial) y aplica tu Brand DNA para mantener consistencia absoluta.',
    variant: 'style',
  },
  {
    title: 'Genera y exporta',
    subtitle: 'Listo para publicar',
    description:
      'Genera variaciones de pose con fidelidad textil, exporta formatos y crea video cinematográfico para Reels/TikTok.',
    variant: 'export',
  },
]

function HowScroller() {
  const parallaxRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (prefersReducedMotion) return

    const container = parallaxRef.current
    if (!container) return

    const items = Array.from(container.querySelectorAll('.vs-how-parallax-item'))
    const cards = items
      .map((item) => item.querySelector('.vs-how-parallax-card'))
      .filter(Boolean)

    let rafId = 0
    const clamp01 = (value) => Math.min(1, Math.max(0, value))

    const update = () => {
      rafId = 0
      const rect = container.getBoundingClientRect()
      const denom = rect.height - window.innerHeight
      const containerProgress = denom > 0 ? clamp01(-rect.top / denom) : 1

      const count = Math.max(1, items.length)
      items.forEach((item, idx) => {
        const card = cards[idx]
        if (!card) return

        const start = idx / count
        const localT = clamp01((containerProgress - start) / (1 - start))
        const targetScale = 1 - (count - idx) * 0.05
        const scale = 1 + (targetScale - 1) * localT

        card.style.setProperty('--vs-how-scale', scale.toFixed(4))
      })
    }

    const onScroll = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section className="vs-how-people" id="como-funciona">
      <div className="vs-container">
        <header className="vs-how-header">
          <p className="vs-how-people-kicker">Cómo funciona</p>
          <h2 className="vs-how-people-title">Producción visual lista para publicar.</h2>
          <p className="vs-how-people-subtitle">
            Controla casting, consistencia y fidelidad de prenda. Genera campañas y video sin un shooting tradicional.
          </p>
        </header>

        <div ref={parallaxRef} className="vs-how-parallax" role="list" aria-label="Pasos del flujo">
          {STEPS.map((step, idx) => (
            <div key={step.title} className="vs-how-parallax-item">
              <article
                className="vs-how-people-card vs-how-parallax-card"
                role="listitem"
                style={{ top: `calc(-5vh + ${idx * 25}px)`, zIndex: idx + 1 }}
              >
                <div className="vs-how-card-inner">
                  <div className="vs-how-card-media" data-variant={step.variant} aria-hidden="true">
                    {step.variant === 'export' ? (
                      <video
                        className="vs-how-card-video"
                        src="/web_images/campania_106_asset_310.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <div className="vs-how-card-image" />
                    )}
                  </div>

                  <div className="vs-how-card-content">
                    <p className="vs-how-card-kicker">Paso {idx + 1}</p>
                    <h3 className="vs-how-card-title">{step.title}</h3>
                    <p className="vs-how-card-subtitle">{step.subtitle}</p>
                    <p className="vs-how-card-desc">{step.description}</p>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowScroller
