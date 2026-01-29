const ITEMS = [
  {
    key: 'campaigns',
    title: 'Campañas',
    subtitle: 'UGC + editorial listos para publicar',
    variant: 'campaigns',
  },
  {
    key: 'products',
    title: 'Prendas (SKU)',
    subtitle: 'Tu catálogo como base del flujo',
    variant: 'products',
  },
  {
    key: 'models',
    title: 'Modelos',
    subtitle: 'Variedad y coherencia visual',
    variant: 'models',
  },
  {
    key: 'video',
    title: 'Videos',
    subtitle: 'Clips cortos para ads y social',
    variant: 'video',
  },
  {
    key: 'dna',
    title: 'Brand DNA',
    subtitle: 'Mantén el look & feel de tu marca',
    variant: 'dna',
  },
  {
    key: 'credits',
    title: 'Créditos (COP)',
    subtitle: 'Compra créditos y escala por calendario',
    variant: 'credits',
  },
]

function FeatureRail() {
  return (
    <div className="vs-rail" aria-label="Qué compras">
      <div className="vs-rail-track" role="list">
        {ITEMS.map((item) => (
          <article
            key={item.key}
            className="vs-rail-item"
            role="listitem"
            aria-label={`${item.title}: ${item.subtitle}`}
          >
            <div className="vs-rail-card" data-variant={item.variant} aria-hidden="true">
              <div className="vs-rail-play" aria-hidden="true" />
              <div className="vs-rail-footer" aria-hidden="true">
                <div className="vs-rail-footer-title">{item.title}</div>
                <div className="vs-rail-footer-subtitle">{item.subtitle}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default FeatureRail
