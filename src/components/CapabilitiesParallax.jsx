import { useEffect, useMemo, useRef } from 'react'

const makeRepeats = (count) => Array.from({ length: count }, (_, idx) => idx)

function CapabilitiesParallax() {
  const containerRef = useRef(null)

  const rows = useMemo(
    () => [
      {
        key: 'casting',
        phrase: 'Casting digital — diversidad instantánea sin logística',
        left: '-40%',
        from: '160px',
        to: '-160px',
      },
      {
        key: 'dna',
        phrase: 'Brand DNA — consistencia absoluta en cada campaña',
        left: '-25%',
        from: '-160px',
        to: '160px',
      },
      {
        key: 'fidelity',
        phrase: 'Fidelidad textil — costuras y patrones intactos',
        left: '-75%',
        from: '160px',
        to: '-160px',
      },
      {
        key: 'video',
        phrase: 'Video — clips cinematográficos para Reels y TikTok',
        left: '-35%',
        from: '-140px',
        to: '140px',
      },
      {
        key: 'catalog',
        phrase: 'Catálogos — lanzamientos en tiempo real (~15 min)',
        left: '-60%',
        from: '140px',
        to: '-140px',
      },
    ],
    [],
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (media?.matches) {
      container.style.setProperty('--vs-cap-progress', '0.5')
      return
    }

    let rafId = 0

    const update = () => {
      rafId = 0
      const rect = container.getBoundingClientRect()
      const viewportH = window.innerHeight || 0
      const total = rect.height + viewportH
      const raw = total > 0 ? (viewportH - rect.top) / total : 0
      const progress = Math.min(1, Math.max(0, raw))
      container.style.setProperty('--vs-cap-progress', progress.toFixed(4))

      const rows = container.querySelectorAll('.vs-cap-row')
      rows.forEach((row) => {
        const from = Number.parseFloat(row.dataset.from || '0')
        const to = Number.parseFloat(row.dataset.to || '0')
        const x = from + (to - from) * progress
        row.style.transform = `translate3d(${x}px, 0, 0)`
      })
    }

    const schedule = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="vs-cap-parallax" ref={containerRef} aria-label="Capacidades">
      <div className="vs-cap-rows" aria-hidden="true">
        {rows.map((row) => (
          <div
            key={row.key}
            className="vs-cap-row"
            style={{
              '--vs-cap-left': row.left,
            }}
            data-from={row.from}
            data-to={row.to}
          >
            {makeRepeats(6).map((idx) => (
              <span className="vs-cap-phrase" key={`${row.key}-${idx}`}>
                {row.phrase}
                <span className="vs-cap-sep">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CapabilitiesParallax
