const ITEMS = [
  {
    key: 'campaigns',
    title: 'Campañas',
    subtitle: 'UGC + editorial listos para publicar',
    tags: ['Variaciones', 'Formatos 1:1 / 4:5 / 9:16'],
    variant: 'campaigns',
  },
  {
    key: 'products',
    title: 'Prendas (SKU)',
    subtitle: 'Tu catálogo como base del flujo',
    tags: ['Colecciones', 'Reutilizable'],
    variant: 'products',
  },
  {
    key: 'models',
    title: 'Modelos',
    subtitle: 'Variedad y coherencia visual',
    tags: ['Modelos virtuales', 'Consistencia'],
    variant: 'models',
  },
  {
    key: 'video',
    title: 'Videos',
    subtitle: 'Clips cortos para ads y social',
    tags: ['5–10s', 'Iteración rápida'],
    variant: 'video',
  },
  {
    key: 'dna',
    title: 'Brand DNA',
    subtitle: 'Mantén el look & feel de tu marca',
    tags: ['Estilo', 'Audiencia'],
    variant: 'dna',
  },
  {
    key: 'credits',
    title: 'Créditos (COP)',
    subtitle: 'Compra créditos y escala por calendario',
    tags: ['Recargas', 'Control de uso'],
    variant: 'credits',
  },
]

function FeatureRail() {
  return (
    <div className="vs-rail" aria-label="Qué compras">
      <div className="vs-rail-track" role="list">
        {ITEMS.map((item) => (
          <article key={item.key} className="vs-rail-item" role="listitem">
            <div className="vs-rail-card" data-variant={item.variant} aria-hidden="true">
              <div className="vs-rail-play" aria-hidden="true" />
              <div className="vs-rail-stats" aria-hidden="true">
                <span className="vs-rail-pill">{item.tags[0]}</span>
                <span className="vs-rail-pill">{item.tags[1]}</span>
              </div>
            </div>
            <div className="vs-rail-meta">
              <div className="vs-rail-title">{item.title}</div>
              <div className="vs-rail-subtitle">{item.subtitle}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default FeatureRail

