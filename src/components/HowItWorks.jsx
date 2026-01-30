const STEPS = [
  {
    title: 'Sube tu prenda',
    subtitle: 'SKU como punto de partida',
    description:
      'Parte de tus fotos de prenda. Sube tu SKU y úsalo como base para generar campañas y variaciones sin coordinar un photoshoot.',
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
          <div className="vs-how-cards" role="list">
            {STEPS.map((item, idx) => (
              <article key={item.title} className="vs-how-card" role="listitem">
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
