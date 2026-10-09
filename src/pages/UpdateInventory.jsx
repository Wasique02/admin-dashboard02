import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { getProductById, updateProduct } from "../utils/storage.js"

// UpdateInventory is a separate page for changing a product's stock.
function UpdateInventory() {
  const { id } = useParams()
  const navigate = useNavigate()

  
  const product = getProductById(id)

  
  const [action, setAction] = useState("add") // "add" or "remove"
  const [quantity, setQuantity] = useState("")
  const [reason, setReason] = useState("")
  const [error, setError] = useState("")

  
  if (!product) {
    return (
      <div className="page">
        <div className="empty-state">
          <p>Product not found.</p>
          <button type="button" className="btn btn-primary" onClick={() => navigate("/inventory")}>
            Back to Inventory
          </button>
        </div>
      </div>
    )
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError("")

    const qty = Number(quantity)

    
    if (quantity === "" || qty <= 0) {
      setError("Please enter a quantity greater than 0.")
      return
    }

    
    let newStock
    if (action === "add") {
      newStock = product.stock + qty
    } else {
      newStock = product.stock - qty

      
      if (newStock < 0) {
        setError(`You cannot remove more than the current stock (${product.stock}).`)
        return
      }
    }

    
    updateProduct(id, {
      stock: newStock,
      lastUpdateReason: reason.trim(),
    })
    navigate("/inventory")
  }

  return (
    <div className="page">
      <button type="button" className="btn btn-ghost back-btn" onClick={() => navigate("/inventory")}>
        <ArrowLeft size={18} aria-hidden="true" /> Back
      </button>

      <div className="card update-card">
        <h2 className="card-title">Update Inventory</h2>

        
        <div className="update-summary">
          <div>
            <span className="details-label">Product</span>
            <span className="details-value">{product.name}</span>
          </div>
          <div>
            <span className="details-label">Category</span>
            <span className="details-value">{product.category}</span>
          </div>
          <div>
            <span className="details-label">Current Stock</span>
            <span className="details-value">{product.stock}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="update-form" noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="action">
              Action
            </label>
            <select
              id="action"
              className="form-input"
              value={action}
              onChange={(event) => setAction(event.target.value)}
            >
              <option value="add">Add Stock</option>
              <option value="remove">Remove Stock</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="quantity">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              className="form-input"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              placeholder="e.g. 10"
              min="1"
            />
          </div>

          <div className="form-group form-group-full">
            <label className="form-label" htmlFor="reason">
              Reason (optional)
            </label>
            <input
              id="reason"
              className="form-input"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="e.g. New shipment received"
            />
          </div>

          {error && <div className="alert alert-error form-group-full">{error}</div>}

          <div className="form-actions form-group-full">
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/inventory")}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Inventory
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateInventory
