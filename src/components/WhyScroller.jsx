import { useEffect, useRef } from 'react'

const ITEMS = [
  {
    title: 'Produce más creatividades sin inflar el presupuesto.',
    subtitle: 'Menos shooting. Más variaciones listas para publicar.',
    description:
      'En vez de pagar sesiones repetidas, compras capacidad de producción visual para generar más piezas por colección sin costos fijos.',
    variant: 'why-cost',
  },
  {
    title: 'Lanzamientos en tiempo real.',
    subtitle: '~15 min de foto base a campaña editorial.',
    description:
      'Transforma una foto básica (plano o maniquí) en assets consistentes para catálogo y anuncios, con velocidad de performance.',
    variant: 'why-speed',
  },
  {
    title: 'Tu Brand DNA, siempre consistente.',
    subtitle: 'Casting, escenarios y look & feel bajo control.',
    description:
      'Mantén consistencia de marca en cada colección. Controla el estilo sin depender de terceros ni de agendas de producción.',
    variant: 'why-dna',
  },
  {
    title: 'Fidelidad textil para moda real.',
    subtitle: 'Costuras, patrones y caída de tela intactos.',
    description:
      'Resultados pensados para categorías exigentes como lencería y activewear, donde la prenda es el centro de la imagen.',
    variant: 'why-fidelity',
  },
]

function WhyScroller() {
  const parallaxRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (prefersReducedMotion) return

    const container = parallaxRef.current
    if (!container) return

    const items = Array.from(container.querySelectorAll('.vs-why-parallax-item'))
    const cards = items
      .map((item) => item.querySelector('.vs-why-parallax-card'))
      .filter(Boolean)

    let rafId = 0
    const clamp01 = (value) => Math.min(1, Math.max(0, value))
    let stepX = 0

    const measure = () => {
      const cardRect = cards[0]?.getBoundingClientRect()
      const cardWidth = cardRect?.width || 0
      stepX = Math.max(window.innerWidth * 1.06, cardWidth + 96)
    }

    const update = () => {
      rafId = 0
      const rect = container.getBoundingClientRect()
      const stickyTopRaw = items.length ? window.getComputedStyle(items[0]).top : '0px'
      const stickyTop = Number.parseFloat(stickyTopRaw) || 0
      const viewport = window.innerHeight - stickyTop
      const denom = rect.height - viewport
      const containerProgress = denom > 0 ? clamp01((-rect.top - stickyTop) / denom) : 1

      const count = Math.max(1, items.length)
      const segment = 1 / count
      const travel = count - 1
      const progressCards = Math.min(travel, containerProgress * travel * 1.22)

      items.forEach((item, idx) => {
        const card = cards[idx]
        if (!card) return

        const start = Math.min(0.9, idx * segment)
        const localT = clamp01((containerProgress - start) / (1 - start))
        const targetScale = 1 - (count - idx) * 0.05
        const scale = 1 + (targetScale - 1) * localT
        const x = (idx - progressCards) * stepX

        card.style.setProperty('--vs-why-scale', scale.toFixed(4))
        card.style.setProperty('--vs-why-x', `${x.toFixed(2)}px`)
      })
    }

    const onScroll = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(update)
    }

    const onResize = () => {
      measure()
      onScroll()
    }

    measure()
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section className="vs-section vs-section--why-parallax" id="diferenciales">
      <div className="vs-container">
      </div>

      <div className="vs-why-full">
        <div ref={parallaxRef} className="vs-why-parallax" role="list" aria-label="Por qué Virtual Studio">
          {ITEMS.map((item, idx) => (
            <div key={item.title} className="vs-why-parallax-item">
              <article
                className="vs-why-card vs-why-parallax-card"
                data-variant={item.variant}
                role="listitem"
                style={{ top: `calc(-5vh + ${idx * 25}px)`, zIndex: idx + 1 }}
              >
                <div className="vs-how-card-inner">
                  <div className="vs-how-card-media" data-variant={item.variant} aria-hidden="true">
                    <div className="vs-how-card-frame">
                      <div className="vs-how-card-image" />
                    </div>
                  </div>

                  <div className="vs-how-card-content">
                    <p className="vs-how-card-kicker">Diferencial {idx + 1}</p>
                    <h3 className="vs-how-card-title">{item.title}</h3>
                    <p className="vs-how-card-subtitle">{item.subtitle}</p>
                    <p className="vs-how-card-desc">{item.description}</p>
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

export default WhyScroller
