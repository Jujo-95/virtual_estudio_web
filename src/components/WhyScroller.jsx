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
    const canAnimate = window.matchMedia?.('(min-width: 980px)')?.matches
    if (prefersReducedMotion || !canAnimate) return

    const container = parallaxRef.current
    if (!container) return

    const cards = Array.from(container.querySelectorAll('.vs-why-parallax-card'))

    let rafId = 0
    const clamp01 = (value) => Math.min(1, Math.max(0, value))
    let stepX = Math.max(360, window.innerWidth + 200)

    const update = () => {
      rafId = 0
      const rect = container.getBoundingClientRect()
      const stickyTop = Number.parseFloat(getComputedStyle(container).getPropertyValue('--vs-why-sticky-top')) || 0
      const viewport = window.innerHeight - stickyTop
      const denom = rect.height - viewport
      const containerProgress = denom > 0 ? clamp01((-rect.top - stickyTop) / denom) : 1

      const count = Math.max(1, cards.length)
      const travel = Math.max(1, count - 1)
      const holdAt = travel / (travel + 1)
      const t = clamp01(containerProgress / holdAt)
      const progressCards = Math.min(travel, t * travel)

      cards.forEach((card, idx) => {
        const x = (idx - progressCards) * stepX
        card.style.setProperty('--vs-why-x', `${x.toFixed(2)}px`)
      })
    }

    const onScroll = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(update)
    }

    const onResize = () => {
      stepX = Math.max(360, window.innerWidth + 80)
      onScroll()
    }

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
        <div
          ref={parallaxRef}
          className="vs-why-parallax"
          style={{ '--vs-why-count': ITEMS.length + 1 }}
          aria-label="Por qué Virtual Studio"
        >
          <div className="vs-why-sticky" role="list">
            {ITEMS.map((item, idx) => (
              <article
                key={item.title}
                className="vs-why-card vs-why-parallax-card"
                data-variant={item.variant}
                role="listitem"
                style={{ zIndex: ITEMS.length - idx }}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyScroller
