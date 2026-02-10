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
  const activeCardRef = useRef(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)

  const loopItems = useMemo(() => [...ITEMS, ...ITEMS], [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (media?.matches) return

    const finePointer = window.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches

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

    const resetCard = (card) => {
      if (!card) return
      card.style.removeProperty('--vs-rail-img-x')
      card.style.removeProperty('--vs-rail-img-y')
      card.style.removeProperty('--vs-rail-img-scale')
    }

    const applyMouseScale = () => {
      rafRef.current = 0
      const card = activeCardRef.current
      if (!card) return

      const rect = card.getBoundingClientRect()
      const px = rect.width > 0 ? (pointerRef.current.x - rect.left) / rect.width : 0.5
      const py = rect.height > 0 ? (pointerRef.current.y - rect.top) / rect.height : 0.3

      const x = Math.min(1, Math.max(0, px)) * 100
      const y = Math.min(1, Math.max(0, py)) * 100

      card.style.setProperty('--vs-rail-img-x', x.toFixed(2))
      card.style.setProperty('--vs-rail-img-y', y.toFixed(2))
      card.style.setProperty('--vs-rail-img-scale', '1.16')
    }

    const onPointerMove = (event) => {
      if (!finePointer) return

      const card = event.target?.closest?.('.vs-rail-card')
      if (!card) {
        if (activeCardRef.current) {
          resetCard(activeCardRef.current)
          activeCardRef.current = null
        }
        return
      }

      if (activeCardRef.current && activeCardRef.current !== card) {
        resetCard(activeCardRef.current)
      }

      activeCardRef.current = card
      pointerRef.current.x = event.clientX
      pointerRef.current.y = event.clientY

      if (rafRef.current) return
      rafRef.current = window.requestAnimationFrame(applyMouseScale)
    }

    const onPointerLeave = () => {
      if (activeCardRef.current) resetCard(activeCardRef.current)
      activeCardRef.current = null
    }

    track.addEventListener('pointermove', onPointerMove, { passive: true })
    track.addEventListener('pointerleave', onPointerLeave)

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
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
      track.removeEventListener('pointerover', onPointerOver)
      track.removeEventListener('pointerout', onPointerOut)
      track.removeEventListener('focusin', onFocusIn)
      track.removeEventListener('focusout', onFocusOut)
      track.removeEventListener('pointermove', onPointerMove)
      track.removeEventListener('pointerleave', onPointerLeave)
      onPointerLeave()
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
