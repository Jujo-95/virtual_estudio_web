import { useEffect, useMemo, useRef } from 'react'

const ITEMS = [
  {
    key: 'campaigns',
    title: 'Catálogos',
    subtitle: 'Lanzamientos en tiempo real (~15 min)',
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
]

function FeatureRail() {
  const trackRef = useRef(null)
  const pauseRef = useRef(false)

  const loopItems = useMemo(() => [...ITEMS, ...ITEMS], [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (media?.matches) return

    const onEnter = () => {
      pauseRef.current = true
    }
    const onLeave = () => {
      pauseRef.current = false
    }
    track.addEventListener('pointerenter', onEnter)
    track.addEventListener('pointerleave', onLeave)
    track.addEventListener('focusin', onEnter)
    track.addEventListener('focusout', onLeave)

    let rafId = 0
    let lastTs = performance.now()
    const speedPxPerSecond = 26

    const tick = (ts) => {
      const dt = Math.min(64, ts - lastTs)
      lastTs = ts

      if (!pauseRef.current) {
        const halfWidth = track.scrollWidth / 2
        track.scrollLeft += (speedPxPerSecond * dt) / 1000
        if (track.scrollLeft >= halfWidth) track.scrollLeft -= halfWidth
      }

      rafId = window.requestAnimationFrame(tick)
    }

    rafId = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(rafId)
      track.removeEventListener('pointerenter', onEnter)
      track.removeEventListener('pointerleave', onLeave)
      track.removeEventListener('focusin', onEnter)
      track.removeEventListener('focusout', onLeave)
    }
  }, [])

  return (
    <div className="vs-rail" aria-label="Qué compras">
      <div className="vs-rail-track" role="list" ref={trackRef}>
        {loopItems.map((item, idx) => {
          const isClone = idx >= ITEMS.length
          return (
          <article
            key={`${item.key}-${isClone ? 'clone' : 'base'}-${idx}`}
            className="vs-rail-item"
            role="listitem"
            aria-label={`${item.title}: ${item.subtitle}`}
            aria-hidden={isClone}
          >
            <div className="vs-rail-card" data-variant={item.variant} aria-hidden="true">
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

export default FeatureRail
