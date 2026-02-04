import { useId, useState } from 'react'

function BeforeAfter() {
  const rangeId = useId()
  const [position, setPosition] = useState(12)

  return (
    <div className="vs-before-after" style={{ '--vs-before-after-pos': `${position}%` }}>
      <div className="vs-before-after-top">
        <input
          id={rangeId}
          type="range"
          min="0"
          max="100"
          step="1"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label="Desliza para comparar antes y después"
        />
      </div>

      <div className="vs-before-after-frame" aria-label="Comparación antes y después">
        <img
          className="vs-before-after-img"
          src="/web_images/garment_top.jpg"
          alt="Foto base de prenda"
          loading="lazy"
        />
        <img
          className="vs-before-after-img vs-before-after-img--after"
          src="/web_images/campania_106_asset_302.jpg"
          alt="Resultado generado listo para catálogo"
          loading="lazy"
        />
        <div className="vs-before-after-handle" aria-hidden="true" />

        <div className="vs-before-after-hint" aria-hidden="true">
          Desliza para ver el resultado
        </div>
      </div>
    </div>
  )
}

export default BeforeAfter
