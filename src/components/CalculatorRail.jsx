import { useMemo } from 'react'
import Button from './Button.jsx'
import { SITE } from '../lib/site.js'

const CHECKLIST_ITEMS = {
  basic: [
    'Sin marcas de agua de Virtual Estudio',
    'Selección limitada de fondos',
    'Resolución de imagen HD',
    'Imágenes listas para redes sociales',
  ],
  pro: [
    'Todo en Basic',
    'Acceso a todos los fondos y fondos personalizados',
    'Acceso a todos los modelos y modelos personalizados',
    'Resolución de imagen 2K',
    '2 revisiones de fotos gratuitas por crédito',
    '1 corrección de foto gratuita por campaña',
  ],
  enterprise: [
    'Todo en Pro',
    'Resolución de imagen 4K',
    '3 retoques gratuitos por campaña',
    'Sé el primero en probar nuevas funcionalidades',
  ],
}

function CalculatorRail({ postsPerWeek, estimatedAssetsPerMonth }) {
  const currentPlan = useMemo(() => {
    if (postsPerWeek >= 1 && postsPerWeek <= 5) {
      return {
        name: 'Plan Basic',
        price: 'Créditos en COP (recomendado)',
        features: CHECKLIST_ITEMS.basic,
        ctaLink: SITE.appUrl,
      }
    }
    if (postsPerWeek > 5 && postsPerWeek <= 10) {
      return {
        name: 'Plan Pro',
        price: 'Créditos en COP (recomendado)',
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
    <div className="vs-calc-card vs-how-people-card">
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
            Comienza ahora
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
          La estimación usa ~4.3 semanas/mes y sirve solo como referencia.
        </div>
      </div>
    </div>
  )
}

export default CalculatorRail
