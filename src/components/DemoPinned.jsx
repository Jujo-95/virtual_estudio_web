import { useEffect, useRef, useState } from 'react'
import Button from './Button.jsx'
import BeforeAfter from './BeforeAfter.jsx'
import { SITE } from '../lib/site.js'

const clamp01 = (value) => Math.min(1, Math.max(0, value))

function DemoPinned() {
  const pinRef = useRef(null)
  const rafRef = useRef(0)
  const [position, setPosition] = useState(12)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (prefersReducedMotion) return

    const container = pinRef.current
    if (!container) return

    const update = () => {
      rafRef.current = 0
      const rect = container.getBoundingClientRect()
      const stickyTopRaw = getComputedStyle(container).getPropertyValue('--vs-demo-sticky-top')
      const stickyTop = Number.parseFloat(stickyTopRaw) || 0
      const scrollY = window.scrollY || window.pageYOffset || 0
      const elementTop = rect.top + scrollY
      const startScroll = elementTop - stickyTop
      const endScroll = elementTop + rect.height - window.innerHeight
      const denom = endScroll - startScroll
      const progress = denom > 0 ? clamp01((scrollY - startScroll) / denom) : 1

      const eased = 1 - (1 - progress) ** 3
      setPosition(Math.round(eased * 100))
    }

    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section className="vs-section vs-section--demo vs-section--demo-pinned" id="demo">
      <div ref={pinRef} className="vs-demo-pin">
        <div className="vs-demo-sticky">
          <div className="vs-container">
            <div className="vs-demo-split">
              <div className="vs-panel vs-demo-split-left">
                <BeforeAfter externalPosition={position} />
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
        </div>
      </div>
    </section>
  )
}

export default DemoPinned
