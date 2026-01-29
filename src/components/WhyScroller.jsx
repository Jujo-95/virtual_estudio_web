import { useMemo, useState } from 'react'

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

function WhyScroller() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState('down')

  const active = useMemo(() => ITEMS[activeIndex] || ITEMS[0], [activeIndex])

  const onSelect = (nextIndex) => {
    setDirection(nextIndex > activeIndex ? 'down' : 'up')
    setActiveIndex(nextIndex)
  }

  return (
    <section className="vs-story" id="diferenciales">
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
