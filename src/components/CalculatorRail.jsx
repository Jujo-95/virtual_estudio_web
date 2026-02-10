import { useMemo } from 'react'
import Button from './Button.jsx'
import { SITE } from '../lib/site.js'

const CHECKLIST_ITEMS = {
  basic: [
    'Campañas HD listas para publicar',
    'Casting digital básico',
    'Fondos curados para moda',
    'Consistencia con Brand DNA',
  ],
  pro: [
    'Todo en Basic',
    'Resolución 2K',
    'Fondos personalizados',
    'Modelos personalizados',
    'Variaciones de pose con consistencia',
  ],
  enterprise: [
    'Todo en Pro',
    'Resolución 4K',
    'Catálogos masivos y agencias',
    'Onboarding y soporte dedicado',
    'Controles avanzados y seguridad jurídica',
  ],
}

function CalculatorRail({ postsPerWeek, estimatedAssetsPerMonth }) {
  const currentPlan = useMemo(() => {
    if (postsPerWeek >= 1 && postsPerWeek <= 5) {
      return {
        name: 'Plan Basic',
        price: '$30 USD / mes',
        features: CHECKLIST_ITEMS.basic,
        ctaLink: SITE.appUrl,
      }
    }
    if (postsPerWeek > 5 && postsPerWeek <= 10) {
      return {
        name: 'Plan Pro',
        price: '$50 USD / mes',
        features: CHECKLIST_ITEMS.pro,
        ctaLink: SITE.appUrl,
      }
    }
    return {
      name: 'Plan Empresarial / Agencia',
      price: 'Personalizado',
      features: CHECKLIST_ITEMS.enterprise,
      ctaLink: '#contacto',
    }
  }, [postsPerWeek])

  return (
    <div className="vs-calc-card vs-calc-card--dark">
      <div className="vs-calc-result">
        <div className="vs-calc-kpi" aria-live="polite">
          <div className="vs-calc-kpi-label">Plan sugerido</div>
          <div className="vs-calc-kpi-value vs-plan-transition">{currentPlan.name}</div>
          <div className="vs-calc-kpi-sub vs-plan-transition">{currentPlan.price}</div>
          <div className="vs-calc-kpi-sub vs-plan-transition">
            ≈ {estimatedAssetsPerMonth} piezas/mes
          </div>
        </div>
        <div className="vs-calc-cta">
          <Button href={currentPlan.ctaLink} variant="primary" className="vs-calc-cta__btn">
            Comienza ahora — 5 créditos gratis
          </Button>
        </div>
        <ul className="vs-plan-features">
          {currentPlan.features.map((feature) => (
            <li key={`${currentPlan.name}:${feature}`} className="vs-plan-feature-item">
              {feature}
            </li>
          ))}
        </ul>
        <div className="vs-calc-note">
          1 imagen = 1 crédito. La estimación usa ~4.3 semanas/mes y sirve solo como referencia.
        </div>
      </div>
    </div>
  )
}

export default CalculatorRail
