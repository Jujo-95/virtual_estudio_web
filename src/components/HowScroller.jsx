const STEPS = [
  {
    title: 'Sube tu prenda',
    subtitle: 'Tu prenda como punto de partida',
    description:
      'Parte de tus fotos de prenda. Sube tu prenda y úsalo como base para generar campañas y variaciones sin coordinar un photoshoot.',
    variant: 'sku',
  },
  {
    title: 'Elige modelo + estilo',
    subtitle: 'UGC o editorial + Brand DNA',
    description:
      'Selecciona un modelo virtual, define el estilo (UGC/editorial) y aplica tu Brand DNA para mantener consistencia de marca.',
    variant: 'style',
  },
  {
    title: 'Genera y exporta',
    subtitle: 'Listo para publicar',
    description:
      'Genera variaciones y exporta formatos 1:1, 4:5 y 9:16. Crea también videos cortos para anuncios y contenido social.',
    variant: 'export',
  },
]

function HowScroller() {
  return (
    <section className="vs-how-people" id="como-funciona">
      <div className="vs-container vs-how-people-grid">
        <div className="vs-how-people-copy">
          <p className="vs-how-people-kicker">Cómo funciona</p>
          <h2 className="vs-how-people-title">Un flujo diseñado para producir campañas consistentes.</h2>
          <p className="vs-how-people-subtitle">
            Subir prendas, elegir modelos y variaciones, y exportar formatos listos para anuncios y social en minutos.
          </p>
        </div>

        <div className="vs-how-people-rail" aria-label="Pasos del flujo">
          <div className="vs-how-people-cards" role="list">
            {STEPS.map((step, idx) => (
              <article
                key={step.title}
                className="vs-how-people-card"
                data-variant={step.variant}
                role="listitem"
              >
                {step.variant === 'export' && (
                  <video
                    className="vs-how-people-card-video"
                    src="/web_images/campania_106_asset_310.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                )}
                <p className="vs-how-people-card-text">{step.description}</p>
                <footer className="vs-how-people-card-footer">
                  <div className="vs-how-people-step">{idx + 1}</div>
                  <div className="vs-how-people-card-person">
                    <div className="vs-how-people-card-name">{step.title}</div>
                    <div className="vs-how-people-card-role">Paso {idx + 1} · {step.subtitle}</div>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowScroller
