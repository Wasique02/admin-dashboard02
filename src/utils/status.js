export function getStockStatus(stock) {
  if (stock === 0) {
    return { label: "Out of Stock", type: "out" }
  }
  if (stock <= 5) {
    return { label: "Low Stock", type: "low" }
  }
  return { label: "In Stock", type: "in" }
}
