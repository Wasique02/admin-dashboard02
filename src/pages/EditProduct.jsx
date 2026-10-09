import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { getProductById, updateProduct } from "../utils/storage.js"
import ProductForm from "../components/ProductForm.jsx"

// EditProduct is a separate page that loads an existing product by id and
// lets the user change its basic information.
function EditProduct() {
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

  function handleUpdate(values) {
    
    updateProduct(id, values)
    navigate("/products")
  }

  return (
    <div className="page">
      <button type="button" className="btn btn-ghost back-btn" onClick={() => navigate("/products")}>
        <ArrowLeft size={18} aria-hidden="true" /> Back
      </button>

      <div className="card">
        <h2 className="card-title">Edit Product</h2>
      
        <ProductForm
          initialValues={product}
          showStock={false}
          submitLabel="Update Product"
          onSubmit={handleUpdate}
          onCancel={() => navigate("/products")}
        />
      </div>
    </div>
  )
}

export default EditProduct
