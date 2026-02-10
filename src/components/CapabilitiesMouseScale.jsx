import { useEffect, useMemo, useRef } from 'react'

const clamp01 = (value) => Math.min(1, Math.max(0, value))
const lerp = (start, target, amount) => start * (1 - amount) + target * amount

const CAPABILITIES = [
  {
    key: 'campaigns',
    title: 'Catálogos',
    subtitle: 'Lanzamientos en tiempo real (~15 min)',
    image: '/web_images/campania_101_asset_179.jpg',
  },
  {
    key: 'products',
    title: 'Fidelidad textil',
    subtitle: 'Costuras y patrones intactos (lencería y activewear)',
    image: '/web_images/garment_bottom.jpg',
  },
  {
    key: 'models',
    title: 'Casting digital',
    subtitle: 'Diversidad instantánea sin logística',
    image: '/web_images/editorial_campania_96_asset_174.jpg',
  },
  {
    key: 'video',
    title: 'Video',
    subtitle: 'Clips cinematográficos para Reels y TikTok',
    image: '/web_images/campania_85_asset_146.jpg',
  },
  {
    key: 'dna',
    title: 'Brand DNA',
    subtitle: 'Consistencia absoluta en cada campaña',
    image: '/web_images/campania_111_asset_208.jpg',
  },
]

function CapDouble({ left, right, reversed }) {
  const rowRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const rafRef = useRef(0)
  const stateRef = useRef({ current: 0, target: 0, enabled: true })

  const setWidths = (xPercent) => {
    const leftNode = leftRef.current
    const rightNode = rightRef.current
    if (!leftNode || !rightNode) return

    const x = reversed ? 100 - xPercent : xPercent
    const firstWidth = 66.66 - x * 0.3334
    const secondWidth = 33.33 + x * 0.3334

    leftNode.style.width = `${firstWidth}%`
    rightNode.style.width = `${secondWidth}%`
  }

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const finePointer = window.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches
    stateRef.current.enabled = Boolean(finePointer && !media?.matches)

    if (!stateRef.current.enabled) {
      if (leftRef.current) leftRef.current.style.width = '50%'
      if (rightRef.current) rightRef.current.style.width = '50%'
      return
    }

    setWidths(0)
  }, [reversed])

  const animate = () => {
    rafRef.current = 0
    const state = stateRef.current
    state.current = lerp(state.current, state.target, 0.12)
    setWidths(state.current)

    if (Math.abs(state.target - state.current) > 0.05) {
      rafRef.current = window.requestAnimationFrame(animate)
    }
  }

  const onPointerMove = (event) => {
    const state = stateRef.current
    if (!state.enabled) return

    const row = rowRef.current
    if (!row) return

    const rect = row.getBoundingClientRect()
    const localX = rect.width > 0 ? (event.clientX - rect.left) / rect.width : 0
    state.target = clamp01(localX) * 100

    if (rafRef.current) return
    rafRef.current = window.requestAnimationFrame(animate)
  }

  const onPointerLeave = () => {
    const state = stateRef.current
    if (!state.enabled) return
    state.target = 0
    if (rafRef.current) return
    rafRef.current = window.requestAnimationFrame(animate)
  }

  return (
    <div ref={rowRef} className="vs-cap-ms-row" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <article ref={leftRef} className="vs-cap-ms-item">
        <div className="vs-cap-ms-card">
          <img className="vs-cap-ms-media" src={left.image} alt="" loading="lazy" />
          <div className="vs-rail-footer" aria-hidden="true">
            <div className="vs-rail-footer-title">{left.title}</div>
            <div className="vs-rail-footer-subtitle">{left.subtitle}</div>
          </div>
        </div>
      </article>

      <article ref={rightRef} className="vs-cap-ms-item">
        <div className="vs-cap-ms-card">
          <img className="vs-cap-ms-media" src={right.image} alt="" loading="lazy" />
          <div className="vs-rail-footer" aria-hidden="true">
            <div className="vs-rail-footer-title">{right.title}</div>
            <div className="vs-rail-footer-subtitle">{right.subtitle}</div>
          </div>
        </div>
      </article>
    </div>
  )
}

function CapabilitiesMouseScale() {
  const rows = useMemo(
    () => [
      { left: CAPABILITIES[0], right: CAPABILITIES[1], reversed: false },
      { left: CAPABILITIES[2], right: CAPABILITIES[3], reversed: true },
      { left: CAPABILITIES[4], right: CAPABILITIES[0], reversed: false },
    ],
    [],
  )

  return (
    <div className="vs-cap-ms" aria-label="Capacidades interactivas">
      {rows.map((row, idx) => (
        <CapDouble key={`${row.left.key}-${row.right.key}-${idx}`} left={row.left} right={row.right} reversed={row.reversed} />
      ))}
    </div>
  )
}

export default CapabilitiesMouseScale

