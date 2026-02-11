import { useId, useState } from 'react'

function BeforeAfter({ externalPosition }) {
  const rangeId = useId()
  const [position, setPosition] = useState(12)

  const displayPosition = externalPosition ?? position

  return (
    <div className="vs-before-after" style={{ '--vs-before-after-pos': `${displayPosition}%` }}>
      <div className="vs-before-after-top">
        <input
          id={rangeId}
          type="range"
          min="0"
          max="100"
          step="1"
          value={displayPosition}
          onChange={(event) => setPosition(Number(event.target.value))}
          disabled={externalPosition != null}
          aria-label="Desliza para comparar antes y después"
        />
      </div>

      <div className="vs-before-after-frame" aria-label="Comparación antes y después">
        <img
          className="vs-before-after-media"
          src="/web_images/before.png"
          alt="Foto base de prenda"
          loading="lazy"
        />
        <video
          className="vs-before-after-media vs-before-after-media--after"
          src="/web_images/campania_108_asset_196.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-label="Resultado generado en video"
        />
        <div className="vs-before-after-handle" aria-hidden="true" />
      </div>
    </div>
  )
}

export default BeforeAfter
