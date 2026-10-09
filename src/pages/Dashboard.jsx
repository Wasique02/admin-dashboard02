import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Package, Boxes, AlertTriangle, Layers } from "lucide-react"
import { getProducts } from "../utils/storage.js"
import { getStockStatus } from "../utils/status.js"
import SummaryCard from "../components/SummaryCard.jsx"
import StatusBadge from "../components/StatusBadge.jsx"


function Dashboard() {
  const navigate = useNavigate()

  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(getProducts())
  }, [])

  const totalProducts = products.length

  const totalStock = products.reduce((sum, product) => sum + product.stock, 0)

  const lowStock = products.filter((product) => product.stock <= 5).length

  const categories = new Set(products.map((product) => product.category)).size

  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  return (
    <div className="page">
      
      <div className="summary-grid">
        <SummaryCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="#4f46e5"
          to="/products"
        />
        <SummaryCard title="Total Stock" value={totalStock} icon={Boxes} color="#0ea5e9" to="/inventory" />
        <SummaryCard
          title="Low Stock"
          value={lowStock}
          icon={AlertTriangle}
          color="#f59e0b"
          to="/inventory"
        />
      
        <SummaryCard title="Categories" value={categories} icon={Layers} color="#10b981" />
      </div>

     
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Recent Products</h2>
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => navigate("/products")}>
            View all
          </button>
        </div>

        {recentProducts.length === 0 ? (
          <div className="empty-state">
            <p>No products yet.</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="table-wrapper desktop-only">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="table-name">{product.name}</td>
                      <td>{product.category}</td>
                      <td>₹{product.price}</td>
                      <td>{product.stock}</td>
                      <td>
                        <StatusBadge stock={product.stock} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="mobile-only recent-cards">
              {recentProducts.map((product) => (
                <div key={product.id} className="mini-card">
                  <div className="mini-card-top">
                    <span className="mini-card-name">{product.name}</span>
                    <StatusBadge stock={product.stock} />
                  </div>
                  <div className="mini-card-meta">
                    <span>{product.category}</span>
                    <span>₹{product.price}</span>
                    <span>Stock: {product.stock}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default Dashboard
