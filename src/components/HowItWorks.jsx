import { useCallback, useEffect, useRef, useState } from 'react'

const STEPS = [
  {
    title: 'Sube tu prenda',
    subtitle: 'Tu prenda como punto de partida',
    description:
      'Parte de tus fotos de prenda. Sube una imagen de tu prenda y úsala como base para generar campañas y variaciones sin coordinar un photoshoot.',
  },
  {
    title: 'Elige modelo + estilo',
    subtitle: 'UGC o editorial + Brand DNA',
    description:
      'Selecciona un modelo virtual, define el estilo (UGC/editorial) y aplica tu Brand DNA para mantener consistencia de marca.',
  },
  {
    title: 'Genera y exporta',
    subtitle: 'Listo para publicar',
    description:
      'Genera variaciones y exporta formatos 1:1, 4:5 y 9:16. Crea también videos cortos para anuncios y contenido social.',
  },
]

function HowItWorks() {
  const cardsRef = useRef(null)
  const cardRefs = useRef([])
  const wheelAccumulatorX = useRef(0)
  const wheelLocked = useRef(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const maxIndex = Math.max(0, STEPS.length - 1)

  const centerCard = useCallback((index, behavior = 'smooth') => {
    const container = cardsRef.current
    const card = cardRefs.current[index]
    if (!container || !card) return

    const targetLeft =
      index === 0
        ? 0
        : card.offsetLeft + card.offsetWidth / 2 - container.clientWidth / 2
    const clampedLeft = Math.max(0, Math.min(targetLeft, container.scrollWidth - container.clientWidth))
    container.scrollTo({ left: clampedLeft, behavior })
  }, [])

  useEffect(() => {
    // Inicia centrado en el Paso 1.
    centerCard(0, 'auto')
  }, [centerCard])

  useEffect(() => {
    centerCard(activeIndex)
  }, [activeIndex, centerCard])

  const onWheelCards = (event) => {
    if (wheelLocked.current) return

    const deltaX = event.deltaX || (event.shiftKey ? event.deltaY : 0)
    const deltaY = event.deltaY

    // Solo “captura” scroll horizontal; el scroll vertical no debe afectar las cards.
    if (!deltaX || Math.abs(deltaX) <= Math.abs(deltaY)) return

    // Permite que el scroll horizontal pase en los extremos (no bloquea el usuario).
    if ((deltaX < 0 && activeIndex === 0) || (deltaX > 0 && activeIndex === maxIndex)) return

    event.preventDefault()
    wheelAccumulatorX.current += deltaX

    const threshold = 90
    if (Math.abs(wheelAccumulatorX.current) < threshold) return

    const direction = wheelAccumulatorX.current > 0 ? 1 : -1
    wheelAccumulatorX.current = 0

    setActiveIndex((prev) => Math.max(0, Math.min(prev + direction, maxIndex)))
    wheelLocked.current = true
    window.setTimeout(() => {
      wheelLocked.current = false
    }, 480)
  }

  return (
    <section className="vs-section vs-section--how" id="como-funciona">
      <div className="vs-container vs-how-grid">
        <div className="vs-how-copy">
          <p className="vs-kicker">Cómo funciona</p>
          <h2 className="vs-how-title">Un flujo diseñado para producir campañas consistentes</h2>
          <p className="vs-how-subtitle">
            Subir prendas, elegir modelos y variaciones, y exportar formatos listos para anuncios y social en minutos.
          </p>
          <div className="vs-how-cta">
            <button type="button" className="vs-btn vs-btn--primary">
              Ver demo real
            </button>
            <button type="button" className="vs-btn vs-btn--ghost">
              Descubrir créditos
            </button>
          </div>
        </div>

        <div className="vs-how-rail" aria-label="Pasos del flujo">
          <div className="vs-how-cards" role="list" ref={cardsRef} onWheel={onWheelCards}>
            {STEPS.map((item, idx) => (
              <article
                key={item.title}
                className="vs-how-card"
                role="listitem"
                ref={(node) => {
                  if (node) cardRefs.current[idx] = node
                }}
              >
                <p className="vs-how-card-text">{item.description}</p>
                <div className="vs-how-card-meta">
                  <div className="vs-how-card-person">
                    <span className="vs-how-card-name">{item.title}</span>
                    <span className="vs-how-card-role">
                      Paso {idx + 1} · {item.subtitle}
                    </span>
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

export default HowItWorks
