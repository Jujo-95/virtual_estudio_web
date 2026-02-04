import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const ITEMS = [
  {
    key: 'fashion',
    kicker: 'Por qué Virtual Studio',
    title: 'Produce 10x más,\ngasta 90% menos.',
    body:
      'Un shooting puede costar de $950K a $5M COP por sesión. Aquí compras capacidad de producción visual para generar más creatividades sin costos fijos.',
    cardTitle: 'Ahorro',
    cardSubtitle: 'Más contenido, menos costo',
    variant: 'fashion',
  },
  {
    key: 'modes',
    kicker: 'Por qué Virtual Studio',
    title: 'Lanzamientos en\ntiempo real.',
    body:
      'Lanzamientos en tiempo real: transforma una foto básica (plano o maniquí) en campañas editoriales listas para publicar en ~15 minutos.',
    cardTitle: 'Velocidad',
    cardSubtitle: 'Minutos, no semanas',
    variant: 'modes',
  },
  {
    key: 'dna',
    kicker: 'Por qué Virtual Studio',
    title: 'Tu Brand DNA es\ninnegociable.',
    body:
      'Mantén modelos, escenarios y look & feel consistentes en cada colección. Control total sin depender de terceros.',
    cardTitle: 'Brand DNA',
    cardSubtitle: 'Consistencia absoluta',
    variant: 'dna',
  },
  {
    key: 'scale',
    kicker: 'Por qué Virtual Studio',
    title: 'Fidelidad textil\npara moda real.',
    body:
      'Preserva costuras, patrones y caída de tela. Resultados pensados para categorías complejas como lencería y activewear.',
    cardTitle: 'Garment Fidelity',
    cardSubtitle: 'Detalles de prenda intactos',
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
