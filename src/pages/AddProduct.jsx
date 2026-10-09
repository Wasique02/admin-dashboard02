import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { addProduct } from "../utils/storage.js"
import ProductForm from "../components/ProductForm.jsx"

// AddProduct is a SEPARATE PAGE for creating a product.
function AddProduct() {
  const navigate = useNavigate()

  // Called by ProductForm when the form is valid and submitted.
  function handleCreate(values) {
   
    addProduct(values)

    navigate("/products")
  }

  return (
    <div className="page">

      <button type="button" className="btn btn-ghost back-btn" onClick={() => navigate("/products")}>
        <ArrowLeft size={18} aria-hidden="true" /> Back
      </button>

      <div className="card">
        <h2 className="card-title">Add New Product</h2>
        <ProductForm
          initialValues={{}}
          showStock={true}
          submitLabel="Create Product"
          onSubmit={handleCreate}
          onCancel={() => navigate("/products")}
        />
      </div>
    </div>
  )
}

export default AddProduct
