import { useId, useState } from 'react'
import { mediaVars } from '../lib/mediaTuning.js'
import useMediaTuningVersion from '../lib/useMediaTuningVersion.js'

function BeforeAfter({ externalPosition }) {
  useMediaTuningVersion()
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
          src="/web_images/garment_top.jpg"
          alt="Foto base de prenda"
          loading="lazy"
          style={mediaVars('/web_images/garment_top.jpg')}
        />
        <video
          className="vs-before-after-media vs-before-after-media--after"
          src="/web_images/campania_106_asset_310.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-label="Resultado generado en video"
          style={mediaVars('/web_images/campania_106_asset_310.mp4')}
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
