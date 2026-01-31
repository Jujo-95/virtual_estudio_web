import React, { useMemo } from 'react';

function CalculatorRail({ postsPerWeek }) { // estimatedAssetsPerMonth removed
  const currentPlan = useMemo(() => {
    if (postsPerWeek >= 1 && postsPerWeek <= 5) {
      return { name: 'Plan Basic', price: '30 USD / mes' };
    } else if (postsPerWeek > 5 && postsPerWeek <= 10) {
      return { name: 'Plan Pro', price: '50 USD / mes' };
    } else {
      return { name: 'Plan Empresarial/Agencia', price: '' };
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
        <div className="vs-calc-note">
          La estimación usa ~4.3 semanas/mes y sirve solo como referencia.
        </div>
      </div>
    </div>
  );
}

export default CalculatorRail;