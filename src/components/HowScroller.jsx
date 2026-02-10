import { useEffect, useMemo, useRef, useState } from 'react'

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
  const pauseRef = useRef(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const orderedSteps = useMemo(() => STEPS, [])

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (media?.matches) return

    const id = window.setInterval(() => {
      if (pauseRef.current) return
      setActiveIndex((prev) => (prev + 1) % orderedSteps.length)
    }, 3400)

    return () => window.clearInterval(id)
  }, [orderedSteps.length])

  return (
    <section className="vs-how-people" id="como-funciona">
      <div className="vs-container vs-how-people-grid">
        <div
          className="vs-how-people-rail"
          aria-label="Pasos del flujo"
          onPointerEnter={() => {
            pauseRef.current = true
          }}
          onPointerLeave={() => {
            pauseRef.current = false
          }}
        >
          <div className="vs-how-deck" role="list" aria-label="Pasos del flujo">
            {orderedSteps.map((step, idx) => {
              const pos = (idx - activeIndex + orderedSteps.length) % orderedSteps.length
              const isActive = pos === 0
              return (
                <article
                  key={step.title}
                  className="vs-how-people-card vs-how-deck-card"
                  data-variant={step.variant}
                  data-pos={pos}
                  role="listitem"
                  aria-current={isActive}
                >
                  {step.variant === 'export' && isActive && (
                    <video
                      className="vs-how-people-card-video"
                      src="/web_images/campania_106_asset_310.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
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
              )
            })}
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
