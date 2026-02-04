const STEPS = [
  {
    title: 'Sube tu prenda',
    subtitle: 'Tu prenda como punto de partida',
    description:
      'Parte de una foto básica (plano o maniquí). La prenda es el input: desde ahí construyes campañas sin logística.',
    variant: 'sku',
  },
  {
    title: 'Elige modelo + estilo',
    subtitle: 'UGC o editorial + Brand DNA',
    description:
      'Haz casting digital, define el estilo (UGC/editorial) y aplica tu Brand DNA para mantener consistencia absoluta.',
    variant: 'style',
  },
  {
    title: 'Genera y exporta',
    subtitle: 'Listo para publicar',
    description:
      'Genera variaciones de pose con fidelidad textil, exporta formatos y crea video cinematográfico para Reels/TikTok.',
    variant: 'export',
  },
]

function HowScroller() {
  return (
    <section className="vs-how-people" id="como-funciona">
      <div className="vs-container vs-how-people-grid">
        <div className="vs-how-people-copy">
          <p className="vs-how-people-kicker">Cómo funciona</p>
          <h2 className="vs-how-people-title">De la prenda al catálogo en minutos.</h2>
          <p className="vs-how-people-subtitle">
            Controla casting, consistencia y fidelidad de prenda. Genera campañas y video sin un shooting tradicional.
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
