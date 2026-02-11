import { useEffect, useRef, useState } from 'react'
import Button from './Button.jsx'
import { SITE } from '../lib/site.js'

const clamp01 = (value) => Math.min(1, Math.max(0, value))
const lerp = (start, target, amount) => start * (1 - amount) + target * amount

function HeroPinned() {
  const pinRef = useRef(null)
  const plane1Ref = useRef(null)
  const plane2Ref = useRef(null)
  const plane3Ref = useRef(null)
  const floatStateRef = useRef({ rafId: 0, xForce: 0, yForce: 0, x: 0, y: 0, enabled: true })
  const [isPinned, setIsPinned] = useState(false)

  const tick = () => {
    const state = floatStateRef.current
    state.rafId = 0

    const plane1 = plane1Ref.current
    const plane2 = plane2Ref.current
    const plane3 = plane3Ref.current
    if (!state.enabled || !plane1 || !plane2 || !plane3) return

    const easing = 0.08
    state.xForce = lerp(state.xForce, 0, easing)
    state.yForce = lerp(state.yForce, 0, easing)

    state.x += state.xForce
    state.y += state.yForce

    plane1.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`
    plane2.style.transform = `translate3d(${state.x * 0.5}px, ${state.y * 0.5}px, 0)`
    plane3.style.transform = `translate3d(${state.x * 0.25}px, ${state.y * 0.25}px, 0)`

    if (Math.abs(state.xForce) > 0.01 || Math.abs(state.yForce) > 0.01) {
      state.rafId = window.requestAnimationFrame(tick)
    }
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const canPin = window.matchMedia?.('(min-width: 980px)')
    if (!canPin) {
      setIsPinned(false)
      return
    }

    const update = () => {
      const allowed = canPin.matches && !(prefersReducedMotion?.matches)
      setIsPinned(allowed)

      const container = pinRef.current
      if (!allowed && container) container.style.setProperty('--vs-hero-strike', '1')
      floatStateRef.current.enabled = allowed
    }

    update()
    canPin.addEventListener?.('change', update)
    prefersReducedMotion?.addEventListener?.('change', update)

    return () => {
      canPin.removeEventListener?.('change', update)
      prefersReducedMotion?.removeEventListener?.('change', update)
    }
  }, [])

  useEffect(() => {
    if (!isPinned) return

    const container = pinRef.current
    if (!container) return

    let rafId = 0

    const update = () => {
      rafId = 0
      const rect = container.getBoundingClientRect()
      const stickyTopRaw = getComputedStyle(container).getPropertyValue('--vs-hero-sticky-top')
      const stickyTop = Number.parseFloat(stickyTopRaw) || 0
      const viewport = window.innerHeight - stickyTop
      const denom = rect.height - viewport
      const progress = denom > 0 ? clamp01((-rect.top - stickyTop) / denom) : 1
      const strike = clamp01((progress - 0.18) / 0.28)
      container.style.setProperty('--vs-hero-strike', strike.toFixed(3))
    }

    const onScroll = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [isPinned])

  const onMouseMove = (event) => {
    const state = floatStateRef.current
    if (!state.enabled) return
    const speed = 0.01
    state.xForce += event.movementX * speed
    state.yForce += event.movementY * speed
    if (!state.rafId) state.rafId = window.requestAnimationFrame(tick)
  }

  return (
    <section className="vs-hero vs-hero--ref vs-hero--pinned" id="top">
      <div ref={pinRef} className="vs-hero-pin">
        <div className="vs-hero-sticky" onMouseMove={onMouseMove}>
          <div className="vs-hero-floating" aria-hidden="true">
            <div ref={plane1Ref} className="vs-hero-plane vs-hero-plane--1">
              <img className="vs-hero-float-img vs-hero-float-img--a" src="/web_images/campania_111_asset_225.jpg" alt="" />
              <img className="vs-hero-float-img vs-hero-float-img--b" src="/web_images/campania_107_asset_192.jpg" alt="" />
              <img className="vs-hero-float-img vs-hero-float-img--c" src="/web_images/garment_top.jpg" alt="" />
            </div>
            <div ref={plane2Ref} className="vs-hero-plane vs-hero-plane--2">
              <img className="vs-hero-float-img vs-hero-float-img--d" src="/web_images/campania_106_asset_302.jpg" alt="" />
              <img className="vs-hero-float-img vs-hero-float-img--e" src="/web_images/editorial_campania_96_asset_174.jpg" alt="" />
              <img className="vs-hero-float-img vs-hero-float-img--f" src="/web_images/detalle_prenda.jpg" alt="" />
            </div>
            <div ref={plane3Ref} className="vs-hero-plane vs-hero-plane--3">
              <img className="vs-hero-float-img vs-hero-float-img--g" src="/web_images/campania_101_asset_179.jpg" alt="" />
              <img className="vs-hero-float-img vs-hero-float-img--h" src="/web_images/garment_bottom.jpg" alt="" />
            </div>
          </div>

          <div className="vs-container">
            <div className="vs-hero-center">
              <h1 className="vs-hero-title">
                De la prenda al catálogo en minutos, <span className="vs-hero-strike">no en semanas</span>.
              </h1>
              <div className="vs-hero-cta">
                <Button href={SITE.appUrl} variant="primary" className="vs-hero-cta-btn">
                  Comienza ahora — 5 créditos gratis
                </Button>
                <Button href="#demo" variant="secondary" className="vs-hero-cta-btn">
                  Ver demostración funcional
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroPinned
