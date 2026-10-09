import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Pencil } from "lucide-react"
import { getProductById } from "../utils/storage.js"
import StatusBadge from "../components/StatusBadge.jsx"

// ProductDetails shows one product's full information.
function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  
  const product = getProductById(id)

  if (!product) {
    return (
      <div className="page">
        <div className="empty-state">
          <p>Product not found.</p>
          <button type="button" className="btn btn-primary" onClick={() => navigate("/products")}>
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  // Formatting the created date so it's easy to read.
  const createdDate = new Date(product.createdAt).toLocaleDateString()

  return (
    <div className="page">
      <button type="button" className="btn btn-ghost back-btn" onClick={() => navigate("/products")}>
        <ArrowLeft size={18} aria-hidden="true" /> Back
      </button>

      <div className="card details-card">
        <img className="details-image" src={product.image || "/placeholder.svg"} alt={product.name} />

        <div className="details-info">
          <div className="details-header">
            <h2 className="details-name">{product.name}</h2>
            <StatusBadge stock={product.stock} />
          </div>

          <p className="details-category">{product.category}</p>
          <p className="details-price">₹{product.price}</p>

          <p className="details-description">{product.description || "No description provided."}</p>

          <div className="details-grid">
            <div>
              <span className="details-label">Current Stock</span>
              <span className="details-value">{product.stock}</span>
            </div>
            <div>
              <span className="details-label">Created Date</span>
              <span className="details-value">{createdDate}</span>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate(`/products/edit/${product.id}`)}
          >
            <Pencil size={16} aria-hidden="true" /> Edit Product
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
