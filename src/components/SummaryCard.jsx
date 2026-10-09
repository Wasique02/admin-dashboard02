import { useNavigate } from "react-router-dom"

function SummaryCard({ title, value, icon: Icon, color, to }) {
  const navigate = useNavigate()

  // Only make the card clickable when its true
  const clickable = Boolean(to)

  function handleClick() {
    if (clickable) {
      navigate(to)
    }
  }

  return (
    <div
      className={`summary-card ${clickable ? "summary-card-clickable" : ""}`}
      onClick={handleClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={(event) => {
        // Allow keyboard users to activate the card with Enter or Space.
        if (clickable && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault()
          navigate(to)
        }
      }}
    >
      <div className="summary-card-icon" style={{ backgroundColor: color }}>
        <Icon size={22} color="#ffffff" aria-hidden="true" />
      </div>
      <div className="summary-card-body">
        <p className="summary-card-title">{title}</p>
        <p className="summary-card-value">{value}</p>
      </div>
    </div>
  )
}

export default SummaryCard
