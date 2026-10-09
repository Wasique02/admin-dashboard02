import { getStockStatus } from "../utils/status.js"

function StatusBadge({ stock }) {
  const status = getStockStatus(stock)

  return <span className={`badge badge-${status.type}`}>{status.label}</span>
}

export default StatusBadge
