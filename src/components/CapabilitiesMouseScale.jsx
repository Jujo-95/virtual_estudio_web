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
  const trackRef = useRef(null)
  const activeRef = useRef(null)
  const speedRef = useRef(26)

  const items = useMemo(() => [...CAPABILITIES, ...CAPABILITIES], [])

  useEffect(() => {
    const gallery = galleryRef.current
    if (!gallery) return
    const track = trackRef.current
    if (!track) return

    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const reducedMotion = Boolean(media?.matches)

    const NORMAL_SPEED = 26
    const SLOW_SPEED = 9

    const isOverCard = (node) => Boolean(node && node.closest && node.closest('.vs-cap-ms-card'))

    const onPointerOver = (event) => {
      if (isOverCard(event.target)) speedRef.current = SLOW_SPEED
    }

    const onPointerOut = (event) => {
      if (!isOverCard(event.target)) return
      if (isOverCard(event.relatedTarget)) return
      speedRef.current = NORMAL_SPEED
    }

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
    gallery.addEventListener('pointerover', onPointerOver)
    gallery.addEventListener('pointerout', onPointerOut)

    let rafId = 0
    let lastTs = performance.now()

    const tick = (ts) => {
      const dt = Math.min(64, ts - lastTs)
      lastTs = ts

      const halfWidth = track.scrollWidth / 2
      if (halfWidth > 0) {
        track.scrollLeft += (speedRef.current * dt) / 1000
        if (track.scrollLeft >= halfWidth) track.scrollLeft -= halfWidth
      }

      rafId = window.requestAnimationFrame(tick)
    }

    if (!reducedMotion) {
      rafId = window.requestAnimationFrame(tick)
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
      gallery.removeEventListener('pointermove', onPointerMove)
      gallery.removeEventListener('pointerleave', onPointerLeave)
      gallery.removeEventListener('pointerover', onPointerOver)
      gallery.removeEventListener('pointerout', onPointerOut)
      onPointerLeave()
    }
  }, [])

  return (
    <div ref={galleryRef} className="vs-cap-ms" aria-label="Capacidades interactivas">
      <div ref={trackRef} className="vs-cap-ms-track" role="list">
        {items.map((item, idx) => {
          const isClone = idx >= CAPABILITIES.length
          return (
            <article
              key={`${item.key}-${isClone ? 'clone' : 'base'}-${idx}`}
              className="vs-cap-ms-item"
              role="listitem"
              aria-label={`${item.title}: ${item.subtitle}`}
              aria-hidden={isClone}
            >
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
          )
        })}
      </div>
    </div>
  )
}

export default CapabilitiesMouseScale
