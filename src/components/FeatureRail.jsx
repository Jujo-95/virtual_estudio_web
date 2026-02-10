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
  const speedRef = useRef(28)

  const loopItems = useMemo(() => [...ITEMS, ...ITEMS], [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (media?.matches) return

    const NORMAL_SPEED = 28
    const SLOW_SPEED = 10

    const isOverCard = (node) => Boolean(node && node.closest && node.closest('.vs-rail-item'))

    const onPointerOver = (event) => {
      if (isOverCard(event.target)) speedRef.current = SLOW_SPEED
    }

    const onPointerOut = (event) => {
      if (!isOverCard(event.target)) return
      if (isOverCard(event.relatedTarget)) return
      speedRef.current = NORMAL_SPEED
    }

    const onFocusIn = () => {
      speedRef.current = SLOW_SPEED
    }

    const onFocusOut = () => {
      speedRef.current = NORMAL_SPEED
    }

    track.addEventListener('pointerover', onPointerOver)
    track.addEventListener('pointerout', onPointerOut)
    track.addEventListener('focusin', onFocusIn)
    track.addEventListener('focusout', onFocusOut)

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

    rafId = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(rafId)
      track.removeEventListener('pointerover', onPointerOver)
      track.removeEventListener('pointerout', onPointerOut)
      track.removeEventListener('focusin', onFocusIn)
      track.removeEventListener('focusout', onFocusOut)
    }
  }, [])

  return (
    <div className="vs-rail" aria-label="Qué compras">
      <div className="vs-rail-track vs-rail-track--auto" role="list" ref={trackRef}>
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
