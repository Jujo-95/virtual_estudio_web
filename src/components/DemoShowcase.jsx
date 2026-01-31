import { useMemo, useState } from 'react'

const MODES = [
  {
    id: 'ugc',
    label: 'UGC',
    title: 'Look realista, rápido.',
    bullets: ['Casual y “de celular”.', 'Ideal para Reels/TikTok.', 'Itera escenas en minutos.'],
  },
  {
    id: 'editorial',
    label: 'Editorial',
    title: 'Look premium de campaña.',
    bullets: ['Hero shots para colección.', 'Consistencia por prenda.', 'Visual más “brand”.'],
  },
  {
    id: 'video',
    label: 'Video',
    title: 'Clips cortos para ads.',
    bullets: ['Piezas listas para social.', 'Variaciones para test A/B.', 'Útil para retargeting.'],
  },
]

function DemoShowcase() {
  const [mode, setMode] = useState('ugc')

  const active = useMemo(() => MODES.find((m) => m.id === mode) || MODES[0], [mode])

  return (
    <div className="vs-demo">
      <div className="vs-demo-tabs" role="tablist" aria-label="Modo de campaña">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`vs-demo-tab ${m.id === mode ? 'is-active' : ''}`.trim()}
            onClick={() => setMode(m.id)}
            role="tab"
            aria-selected={m.id === mode}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="vs-demo-body">
        <div className="vs-demo-copy">
          <div className="vs-demo-title">{active.title}</div>
          <ul className="vs-demo-bullets">
            {active.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>

        <div className="vs-demo-preview" aria-hidden="true">
          <div className={`vs-preview-grid is-${mode}`}>
            <div className="vs-preview-tile">
              <div className="vs-preview-caption">Escena</div>
            </div>
            <div className="vs-preview-tile">
              <div className="vs-preview-caption">Modelo</div>
            </div>
            <div className="vs-preview-tile">
              <div className="vs-preview-caption">Variación</div>
            </div>
            <div className="vs-preview-tile">
              <div className="vs-preview-caption">Formato</div>
            </div>
          </div>
          <div className="vs-preview-footer">
            <span className="vs-chip">Brand DNA</span>
            <span className="vs-chip">Variaciones</span>
            <span className="vs-chip">Export</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DemoShowcase

