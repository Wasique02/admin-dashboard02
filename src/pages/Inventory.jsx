import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PencilLine, PackageOpen } from "lucide-react"
import { getProducts } from "../utils/storage.js"
import StatusBadge from "../components/StatusBadge.jsx"

// Inventory page reads the SAME product list as the Products page.
function Inventory() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(getProducts())
  }, [])

  // Formatting a date string for the "Last Updated" column.
  function formatDate(value) {
    if (!value) return "-"
    return new Date(value).toLocaleDateString()
  }

  if (products.length === 0) {
    return (
      <div className="page">
        <div className="empty-state">
          <PackageOpen size={40} aria-hidden="true" />
          <p>No products in inventory.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      {/* Desktop table */}
      <div className="table-wrapper desktop-only">
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Current Stock</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="table-name">{product.name}</td>
                <td>{product.category}</td>
                <td>{product.stock}</td>
                <td>
                  <StatusBadge stock={product.stock} />
                </td>
                <td>{formatDate(product.updatedAt || product.createdAt)}</td>
                <td>{product.lastUpdateReason || "-"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/inventory/update/${product.id}`)}
                  >
                    <PencilLine size={16} aria-hidden="true" /> Update Stock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="mobile-only inventory-card-grid">
        {products.map((product) => (
          <div key={product.id} className="inventory-card">
            <div className="inventory-card-top">
              <span className="inventory-card-name">{product.name}</span>
              <StatusBadge stock={product.stock} />
            </div>
            <div className="inventory-card-meta">
              <span>{product.category}</span>
              <span>Stock: {product.stock}</span>
              <span>Updated: {formatDate(product.updatedAt || product.createdAt)}</span>
              {product.lastUpdateReason && <span>Reason: {product.lastUpdateReason}</span>}
            </div>
            <button
              type="button"
              className="btn btn-primary btn-sm btn-block"
              onClick={() => navigate(`/inventory/update/${product.id}`)}
            >
              <PencilLine size={16} aria-hidden="true" /> Update Stock
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Inventory
