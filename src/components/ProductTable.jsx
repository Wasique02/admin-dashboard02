import { useNavigate } from "react-router-dom"
import { Eye, Pencil } from "lucide-react"
import StatusBadge from "./StatusBadge.jsx"

function ProductTable({ products, onDelete }) {
  const navigate = useNavigate()

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img className="table-thumb" src={product.image || "/placeholder.svg"} alt={product.name} />
              </td>
              <td className="table-name">{product.name}</td>
              <td>{product.category}</td>
              <td>₹{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <StatusBadge stock={product.stock} />
              </td>
              <td>
                <div className="table-actions">
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
                  >Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable
