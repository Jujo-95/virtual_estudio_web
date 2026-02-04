const ITEMS = [
  {
    key: 'campaigns',
    title: 'Catálogos',
    subtitle: 'De la prenda al catálogo en minutos',
    variant: 'campaigns',
  },
  {
    key: 'products',
    title: 'Fidelidad textil',
    subtitle: 'Costuras y patrones intactos (lencería y activewear)',
    variant: 'products',
  },
  {
    key: 'models',
    title: 'Casting digital',
    subtitle: 'Diversidad instantánea sin logística',
    variant: 'models',
  },
  {
    key: 'video',
    title: 'Video',
    subtitle: 'Clips cinematográficos para Reels y TikTok',
    variant: 'video',
  },
  {
    key: 'dna',
    title: 'Brand DNA',
    subtitle: 'Consistencia absoluta en cada campaña',
    variant: 'dna',
  },
  {
    key: 'credits',
    title: 'Créditos',
    subtitle: '1 imagen = 1 crédito (sin cargos ocultos)',
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
