import { useEffect, useMemo, useRef } from 'react'

const CAPABILITIES = [
  {
    key: 'campaigns',
    title: 'Catálogos',
    subtitle: 'Lanzamientos en tiempo real (~15 min)',
    image: '/web_images/campania_101_asset_179.jpg',
    ratio: '1536 / 2752',
  },
  {
    key: 'products',
    title: 'Fidelidad textil',
    subtitle: 'Costuras y patrones intactos (lencería y activewear)',
    image: '/web_images/garment_bottom.jpg',
    ratio: '4992 / 3392',
  },
  {
    key: 'models',
    title: 'Casting digital',
    subtitle: 'Diversidad instantánea sin logística',
    image: '/web_images/editorial_campania_96_asset_174.jpg',
    ratio: '1536 / 2752',
  },
  {
    key: 'video',
    title: 'Video',
    subtitle: 'Clips cinematográficos para Reels y TikTok',
    image: '/web_images/campania_85_asset_146.jpg',
    ratio: '1536 / 2752',
  },
  {
    key: 'dna',
    title: 'Brand DNA',
    subtitle: 'Consistencia absoluta en cada campaña',
    image: '/web_images/campania_111_asset_208.jpg',
    ratio: '1536 / 2752',
  },
]

function CapabilitiesMouseScale() {
  const galleryRef = useRef(null)
  const activeRef = useRef(null)

  const rows = useMemo(
    () => [...CAPABILITIES, ...CAPABILITIES.slice(0, 1)],
    [],
  )

  useEffect(() => {
    const gallery = galleryRef.current
    if (!gallery) return

    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const finePointer = window.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches
    const enabled = Boolean(finePointer && !media?.matches)
    if (!enabled) return

    const setActive = (next) => {
      const prev = activeRef.current
      if (prev === next) return
      if (prev) prev.classList.remove('is-active')
      if (next) next.classList.add('is-active')
      activeRef.current = next
    }

    const onPointerMove = (event) => {
      const card = event.target?.closest?.('.vs-cap-ms-card')
      setActive(card || null)
    }

    const onPointerLeave = () => setActive(null)

    gallery.addEventListener('pointermove', onPointerMove, { passive: true })
    gallery.addEventListener('pointerleave', onPointerLeave)

    return () => {
      gallery.removeEventListener('pointermove', onPointerMove)
      gallery.removeEventListener('pointerleave', onPointerLeave)
      onPointerLeave()
    }
  }, [])

  return (
    <div ref={galleryRef} className="vs-cap-ms" aria-label="Capacidades interactivas">
      {rows.map((item, idx) => (
        <article key={`${item.key}-${idx}`} className="vs-cap-ms-item">
          <div className="vs-cap-ms-card" style={{ '--vs-cap-ms-ar': item.ratio }}>
            <img
              className="vs-cap-ms-media"
              src={item.image}
              alt=""
              loading="lazy"
              onLoad={(event) => {
                const img = event.currentTarget
                const card = img.closest?.('.vs-cap-ms-card')
                if (!card) return
                const w = img.naturalWidth
                const h = img.naturalHeight
                if (!w || !h) return
                card.style.setProperty('--vs-cap-ms-ar', `${w} / ${h}`)
              }}
            />
            <div className="vs-rail-footer" aria-hidden="true">
              <div className="vs-rail-footer-title">{item.title}</div>
              <div className="vs-rail-footer-subtitle">{item.subtitle}</div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default CapabilitiesMouseScale
