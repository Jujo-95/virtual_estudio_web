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
      items.forEach((item, idx) => {
        const card = cards[idx]
        if (!card) return

        const rect = item.getBoundingClientRect()
        const rawProgress = rect.height ? -rect.top / rect.height : 0
        const progress = clamp01(rawProgress)

        const remaining = Math.max(0, items.length - idx - 1)
        const maxShrink = remaining * 0.06
        const scale = 1 - progress * maxShrink

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
      <div className="vs-container vs-how-people-grid">
        <div className="vs-how-people-rail" aria-label="Pasos del flujo">
          <div ref={parallaxRef} className="vs-how-parallax" role="list">
            {STEPS.map((step, idx) => (
              <div key={step.title} className="vs-how-parallax-item">
                <article
                  className="vs-how-people-card vs-how-parallax-card"
                  data-variant={step.variant}
                  role="listitem"
                  style={{ top: `calc(88px + ${idx * 25}px)`, zIndex: idx + 1 }}
                >
                  {step.variant === 'export' && (
                    <video
                      className="vs-how-people-card-video"
                      src="/web_images/campania_106_asset_310.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                    />
                  )}
                  <p className="vs-how-people-card-text">{step.description}</p>
                  <footer className="vs-how-people-card-footer">
                    <div className="vs-how-people-step">{idx + 1}</div>
                    <div className="vs-how-people-card-person">
                      <div className="vs-how-people-card-name">{step.title}</div>
                      <div className="vs-how-people-card-role">Paso {idx + 1} · {step.subtitle}</div>
                    </div>
                  </footer>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="vs-how-people-copy">
          <p className="vs-how-people-kicker">Cómo funciona</p>
          <h2 className="vs-how-people-title">Producción visual lista para publicar.</h2>
          <p className="vs-how-people-subtitle">
            Controla casting, consistencia y fidelidad de prenda. Genera campañas y video sin un shooting tradicional.
          </p>
        </div>
      </div>
    </section>
  )
}

export default HowScroller
