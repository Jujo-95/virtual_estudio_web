import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const ITEMS = [
  {
    key: 'fashion',
    kicker: 'Por qué Virtual Estudio',
    title: 'Enfoque en moda,\nno genérico.',
    body:
      'Flujo diseñado para prendas y campañas: produce contenido constante para anuncios, redes y e‑commerce con menos fricción.',
    cardTitle: 'Moda-first',
    cardSubtitle: 'Campañas por prenda',
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

const WHEEL_STEP_THRESHOLD = 80
const TOUCH_STEP_THRESHOLD = 88

function WhyScroller() {
  const sectionRef = useRef(null)
  const wheelAccumRef = useRef(0)
  const touchStartRef = useRef(null)
  const animatingRef = useRef(false)

  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState('down')

  const active = useMemo(() => ITEMS[activeIndex] || ITEMS[0], [activeIndex])

  const clampIndex = useCallback(
    (dir) => clamp(activeIndex + (dir === 'down' ? 1 : -1), 0, ITEMS.length - 1),
    [activeIndex],
  )

  const step = useCallback(
    (dir) => {
      if (animatingRef.current) return
      const nextIdx = clampIndex(dir)
      if (nextIdx === activeIndex) return
      animatingRef.current = true
      setDirection(dir)
      setActiveIndex(nextIdx)
      window.setTimeout(() => {
        animatingRef.current = false
      }, 320)
    },
    [activeIndex, clampIndex],
  )

  const isSectionPinned = useCallback(() => {
    const el = sectionRef.current
    if (!el) return false
    const rect = el.getBoundingClientRect()
    if (rect.height === 0) return false
    const windowHeight = Math.min(window.innerHeight, window.visualViewport?.height || window.innerHeight)
    return rect.top <= 72 && rect.bottom >= windowHeight - 40
  }, [])

  useEffect(() => {
    const handleWheel = (event) => {
      if (!isSectionPinned()) return
      const dir = event.deltaY > 0 ? 'down' : 'up'
      if (dir === 'down' && activeIndex === ITEMS.length - 1) return
      if (dir === 'up' && activeIndex === 0) return
      event.preventDefault()
      wheelAccumRef.current += event.deltaY
      if (Math.abs(wheelAccumRef.current) >= WHEEL_STEP_THRESHOLD) {
        step(dir)
        wheelAccumRef.current = 0
      }
    }

    const handleKey = (event) => {
      if (!isSectionPinned()) return
      const keyDir =
        event.key === 'ArrowDown' || event.key === 'PageDown'
          ? 'down'
          : event.key === 'ArrowUp' || event.key === 'PageUp'
            ? 'up'
            : null
      if (!keyDir) return
      if (keyDir === 'down' && activeIndex === ITEMS.length - 1) return
      if (keyDir === 'up' && activeIndex === 0) return
      event.preventDefault()
      step(keyDir)
    }

    const handleTouchStart = (event) => {
      if (!isSectionPinned()) return
      if (event.touches && event.touches.length) {
        touchStartRef.current = event.touches[0].clientY
      }
    }

    const handleTouchEnd = (event) => {
      if (!isSectionPinned()) return
      const startY = touchStartRef.current
      touchStartRef.current = null
      if (startY == null) return
      const endY = event.changedTouches && event.changedTouches.length ? event.changedTouches[0].clientY : startY
      const delta = startY - endY
      if (Math.abs(delta) < TOUCH_STEP_THRESHOLD) return
      const dir = delta > 0 ? 'down' : 'up'
      if (dir === 'down' && activeIndex === ITEMS.length - 1) return
      if (dir === 'up' && activeIndex === 0) return
      step(dir)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKey, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [activeIndex, isSectionPinned, step])

  const onSelect = (nextIndex) => {
    if (nextIndex === activeIndex) return
    setDirection(nextIndex > activeIndex ? 'down' : 'up')
    setActiveIndex(nextIndex)
  }

  return (
    <section className="vs-story" id="diferenciales" ref={sectionRef}>
      <div className="vs-container">
        <div className="vs-story-grid">
          <div className="vs-story-left">
            <div className="vs-story-kicker">{active.kicker}</div>
            <div key={`${active.key}-copy-${direction}`} className={`vs-swipe vs-swipe--${direction}`}>
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
                  onClick={() => onSelect(idx)}
                />
              ))}
            </div>
          </div>

          <div className="vs-story-right">
            <div key={`${active.key}-card-${direction}`} className={`vs-swipe vs-swipe--${direction}`}>
              <div
                className="vs-story-card vs-story-card--howto"
                data-variant={active.variant}
                aria-label={active.cardTitle}
              >
                <div className="vs-story-footer vs-story-footer--howto" aria-hidden="true">
                  <div className="vs-story-step">{activeIndex + 1}</div>
                  <div className="vs-story-footer-person">
                    <div className="vs-story-footer-title">{active.cardTitle}</div>
                    <div className="vs-story-footer-subtitle">{active.cardSubtitle}</div>
                  </div>
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
