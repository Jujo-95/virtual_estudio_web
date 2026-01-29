import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const ITEMS = [
  {
    key: 'fashion',
    kicker: 'Por qué Virtual Estudio',
    title: 'Enfoque en moda,\nno genérico.',
    body:
      'Flujo diseñado para prendas (SKU) y campañas: produce contenido constante para anuncios, redes y e‑commerce con menos fricción.',
    cardTitle: 'Moda-first',
    cardSubtitle: 'Campañas por SKU',
    variant: 'fashion',
  },
  {
    key: 'modes',
    kicker: 'Por qué Virtual Estudio',
    title: 'UGC y editorial\nsin cambiar de herramienta.',
    body:
      'Dos modos de producción para objetivos distintos: performance (UGC) y look premium (editorial). Cambia el estilo sin rehacer el proceso.',
    cardTitle: 'UGC + editorial',
    cardSubtitle: 'Mismo flujo, distinto look',
    variant: 'modes',
  },
  {
    key: 'dna',
    kicker: 'Por qué Virtual Estudio',
    title: 'Consistencia con\nBrand DNA.',
    body:
      'Define tu identidad visual para mantener coherencia. Repite el look & feel de marca mientras iteras creatividades y escenas.',
    cardTitle: 'Brand DNA',
    cardSubtitle: 'Look & feel repetible',
    variant: 'dna',
  },
  {
    key: 'scale',
    kicker: 'Por qué Virtual Estudio',
    title: 'Producción escalable,\nlista para publicar.',
    body:
      'Variaciones por prenda para rotación creativa. Formatos listos (1:1, 4:5 y 9:16) y salida pensada para rendimiento.',
    cardTitle: 'Escala creativa',
    cardSubtitle: 'Variaciones + formatos',
    variant: 'scale',
  },
]

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

function WhyScroller() {
  const sectionRef = useRef(null)
  const wheelAccumRef = useRef(0)
  const touchStartYRef = useRef(null)
  const animatingRef = useRef(false)
  const activeIndexRef = useRef(0)

  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState('down')
  const [locked, setLocked] = useState(false)

  const active = useMemo(() => ITEMS[activeIndex] || ITEMS[0], [activeIndex])

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  const isSectionPinned = useCallback(() => {
    const el = sectionRef.current
    if (!el) return false
    const rect = el.getBoundingClientRect()
    const topOffset = 72
    const lowerBound = Math.min(window.innerHeight, window.visualViewport?.height || window.innerHeight) - 40
    return rect.top <= topOffset + 1 && rect.bottom >= lowerBound
  }, [])

  const canLeave = useCallback((dir) => {
    const idx = activeIndexRef.current
    if (dir === 'up') return idx === 0
    return idx === ITEMS.length - 1
  }, [])

  const step = useCallback((dir) => {
    if (animatingRef.current) return
    animatingRef.current = true
    setDirection(dir)
    setActiveIndex((prev) => {
      const next = clamp(prev + (dir === 'down' ? 1 : -1), 0, ITEMS.length - 1)
      activeIndexRef.current = next
      return next
    })
    window.setTimeout(() => {
      animatingRef.current = false
    }, 420)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const pinned = isSectionPinned()
      const idx = activeIndexRef.current
      const shouldLock = pinned && !(idx === 0 || idx === ITEMS.length - 1)
      setLocked(shouldLock)
      wheelAccumRef.current = 0
    }

    const onWheel = (event) => {
      if (!isSectionPinned()) return

      const dir = event.deltaY > 0 ? 'down' : 'up'
      if (canLeave(dir)) return

      event.preventDefault()
      wheelAccumRef.current += event.deltaY

      if (Math.abs(wheelAccumRef.current) >= 40) {
        step(wheelAccumRef.current > 0 ? 'down' : 'up')
        wheelAccumRef.current = 0
      }
    }

    const onKeyDown = (event) => {
      if (!isSectionPinned()) return

      const key = event.key
      const keyDir = key === 'ArrowDown' || key === 'PageDown' ? 'down' : key === 'ArrowUp' || key === 'PageUp' ? 'up' : null
      if (!keyDir) return
      if (canLeave(keyDir)) return

      event.preventDefault()
      step(keyDir)
    }

    const onTouchStart = (event) => {
      if (!isSectionPinned()) return
      if (event.touches && event.touches.length > 0) {
        touchStartYRef.current = event.touches[0].clientY
      }
    }

    const onTouchMove = (event) => {
      if (!isSectionPinned()) return
      const startY = touchStartYRef.current
      if (startY == null) return
      const currentY = event.touches && event.touches.length > 0 ? event.touches[0].clientY : startY
      const delta = startY - currentY
      const dir = delta > 0 ? 'down' : 'up'
      if (canLeave(dir)) return
      event.preventDefault()
    }

    const onTouchEnd = (event) => {
      if (!isSectionPinned()) return
      const startY = touchStartYRef.current
      touchStartYRef.current = null
      if (startY == null) return
      const endY = event.changedTouches && event.changedTouches.length > 0 ? event.changedTouches[0].clientY : startY
      const delta = startY - endY
      if (Math.abs(delta) < 44) return
      const dir = delta > 0 ? 'down' : 'up'
      if (canLeave(dir)) return
      step(dir)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: true })

    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [canLeave, isSectionPinned, step])

  return (
    <section className={`vs-story ${locked ? 'is-locked' : ''}`.trim()} id="diferenciales" ref={sectionRef}>
      <div className="vs-container">
        <div className="vs-story-grid">
          <div className="vs-story-left">
            <div className="vs-story-kicker">{active.kicker}</div>
            <div
              key={`${active.key}-copy-${direction}`}
              className={`vs-swipe vs-swipe--${direction}`}
            >
              <h2 className="vs-story-title">{active.title}</h2>
              <p className="vs-story-body">{active.body}</p>
            </div>

            <div className="vs-story-dots" aria-label="Pasos">
              {ITEMS.map((item, idx) => (
                <button
                  key={item.key}
                  type="button"
                  className={`vs-dot ${idx === activeIndex ? 'is-active' : ''}`.trim()}
                  aria-label={`Ver: ${item.cardTitle}`}
                  aria-current={idx === activeIndex}
                  onClick={() => setActiveIndex(idx)}
                />
              ))}
            </div>
          </div>

          <div className="vs-story-right">
            <div key={`${active.key}-card-${direction}`} className={`vs-swipe vs-swipe--${direction}`}>
              <div className="vs-story-card" data-variant={active.variant} aria-label={active.cardTitle}>
                <div className="vs-story-mosaic" aria-hidden="true">
                  <div className="vs-story-tile vs-story-tile--a" />
                  <div className="vs-story-tile vs-story-tile--b" />
                  <div className="vs-story-tile vs-story-tile--c" />
                  <div className="vs-story-tile vs-story-tile--d" />
                </div>
                <div className="vs-story-footer" aria-hidden="true">
                  <div className="vs-story-footer-title">{active.cardTitle}</div>
                  <div className="vs-story-footer-subtitle">{active.cardSubtitle}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyScroller
