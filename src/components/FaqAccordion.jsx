import { useId, useMemo, useState } from 'react'

function FaqAccordion({ items }) {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState(0)

  const normalized = useMemo(() => items.filter(Boolean), [items])

  return (
    <div className="vs-faq-cards">
      {normalized.map((item, idx) => {
        const isOpen = idx === openIndex
        const panelId = `${baseId}-panel-${idx}`
        return (
          <div key={item.q} className={`vs-faq-card ${isOpen ? 'is-open' : ''}`.trim()}>
            <button
              type="button"
              className="vs-faq-btn"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex((prev) => (prev === idx ? -1 : idx))}
            >
              <span className="vs-faq-title">{item.q}</span>
              <span className="vs-faq-plus" aria-hidden="true" />
            </button>
            <div id={panelId} className="vs-faq-panel" hidden={!isOpen}>
              <p className="vs-faq-body">{item.a}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FaqAccordion
