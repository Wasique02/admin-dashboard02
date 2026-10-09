import { useNavigate } from "react-router-dom"
import { Eye, Pencil } from "lucide-react"
import StatusBadge from "./StatusBadge.jsx"

function ProductCard({ product, onDelete }) {
  const navigate = useNavigate()

  return (
    <div className="product-card">
      <img className="product-card-image" src={product.image || "/placeholder.svg"} alt={product.name} />

      <div className="product-card-body">
        <div className="product-card-top">
          <h3 className="product-card-name">{product.name}</h3>
          <StatusBadge stock={product.stock} />
        </div>

        <p className="product-card-category">{product.category}</p>

        <div className="product-card-meta">
          <span className="product-card-price">₹{product.price}</span>
          <span className="product-card-stock">Stock: {product.stock}</span>
        </div>

        <div className="product-card-actions">

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <Eye size={16} aria-hidden="true" /> View
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => navigate(`/products/edit/${product.id}`)}
          >
            <Pencil size={16} aria-hidden="true" /> Edit
          </button>

          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(product.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
