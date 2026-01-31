import React, { useMemo } from 'react';
import Button from './Button.jsx'; // Import Button component
import { SITE } from '../lib/site.js'; // Import SITE object

const CHECKLIST_ITEMS = {
  basic: [
    'Sin marcas de agua de Virtual Estudio',
    'Selección limitada de fondos',
    'Resolución de imagen HD',
    'Imágenes listas para redes sociales',
  ],
  pro: [
    'Todo en basic',
    'Acceso a todos los fondos y fondos personalizados',
    'Acceso a todos los modelos y modelos personalizados',
    'Resolución de imagen 2K',
    '2 revisiones de fotos gratuitas por crédito',
    '1 Correccion de foto gratuita por campaña',
  ],
  enterprise: [
    'Todo en pro',
    'Resolucion de imagen 4K',
    '3 retoques graruitos por campaña',
    'Se el primero en probar nuevas funcionalidades'
  ]
};

function CalculatorRail({ postsPerWeek }) {
  const currentPlan = useMemo(() => {
    if (postsPerWeek >= 1 && postsPerWeek <= 5) {
      return { name: 'Plan Basic', price: '30 USD / mes', features: CHECKLIST_ITEMS.basic, ctaLink: SITE.appUrl };
    } else if (postsPerWeek > 5 && postsPerWeek <= 10) {
      return { name: 'Plan Pro', price: '50 USD / mes', features: CHECKLIST_ITEMS.pro, ctaLink: SITE.appUrl };
    } else {
      return { name: 'Plan Empresarial/Agencia', price: '*personalizado', features: CHECKLIST_ITEMS.enterprise, ctaLink: '#contacto' };
    }
  }, [postsPerWeek]);

  return (
    <div className="vs-calc-card vs-how-people-card"> {/* Apply vs-how-people-card styles */}
      <div className="vs-calc-result">
        <div className="vs-calc-kpi">
          <div className="vs-calc-kpi-label">Plan Sugerido</div>
          <div className="vs-calc-kpi-value vs-plan-transition">
            {currentPlan.name}
          </div>
          <div className="vs-calc-kpi-sub vs-plan-transition">
            {currentPlan.price}
          </div>
        </div>
        <ul className="vs-plan-features"> {/* New ul for features */}
          {currentPlan.features.map((feature, index) => (
            <li key={index} className="vs-plan-feature-item">
              {feature}
            </li>
          ))}
        </ul>
        <div className="vs-calc-note">
          La estimación usa ~4.3 semanas/mes y sirve solo como referencia.
        </div>
        <div className="vs-calc-cta"> {/* New div for the button */}
          <Button href={currentPlan.ctaLink} variant="primary">
            Comienza ahora
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CalculatorRail;