import { useEffect, useRef } from 'react'
import Button from './Button.jsx'
import { SITE } from '../lib/site.js'

const clamp01 = (value) => Math.min(1, Math.max(0, value))

function HeroPinned() {
  const pinRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (prefersReducedMotion) return

    const container = pinRef.current
    if (!container) return

    let rafId = 0

    const update = () => {
      rafId = 0
      const rect = container.getBoundingClientRect()
      const stickyTopRaw = getComputedStyle(container).getPropertyValue('--vs-hero-sticky-top')
      const stickyTop = Number.parseFloat(stickyTopRaw) || 0
      const viewport = window.innerHeight - stickyTop
      const denom = rect.height - viewport
      const progress = denom > 0 ? clamp01((-rect.top - stickyTop) / denom) : 1
      const strike = clamp01((progress - 0.18) / 0.28)
      container.style.setProperty('--vs-hero-strike', strike.toFixed(3))
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
    <section className="vs-hero vs-hero--ref vs-hero--pinned" id="top">
      <div ref={pinRef} className="vs-hero-pin">
        <div className="vs-hero-sticky">
          <div className="vs-container">
            <div className="vs-hero-center">
              <h1 className="vs-hero-title">
                De la prenda al catálogo en minutos, <span className="vs-hero-strike">no en semanas</span>.
              </h1>
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
        </div>
      </div>
    </section>
  )
}

export default HeroPinned

