import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, PackageOpen } from "lucide-react"
import { getProducts, deleteProduct } from "../utils/storage.js"
import SearchBar from "../components/SearchBar.jsx"
import ProductTable from "../components/ProductTable.jsx"
import ProductCard from "../components/ProductCard.jsx"

// Products page shows the full product list with search + an Add button.
function Products() {
  const navigate = useNavigate()

  const [products, setProducts] = useState([])

  const [search, setSearch] = useState("")

  useEffect(() => {
    setProducts(getProducts())
  }, [])

  function handleDelete(id) {
    const confirmed = window.confirm("Are you sure you want to delete this product?")

    if (!confirmed) return

    deleteProduct(id)
    setProducts(getProducts())
  }

  const term = search.trim().toLowerCase()
  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    )
  })

  return (
    <div className="page">

      <div className="page-toolbar">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name or category..." />
        <button type="button" className="btn btn-primary" onClick={() => navigate("/products/add")}>
          <Plus size={18} aria-hidden="true" /> Add Product
        </button>
      </div>


      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <PackageOpen size={40} aria-hidden="true" />
          <p>No products found.</p>
          <button type="button" className="btn btn-primary" onClick={() => navigate("/products/add")}>
            <Plus size={18} aria-hidden="true" /> Add your first product
          </button>
        </div>
      ) : (
        <>
          {/* Desktop: table. Hidden on mobile*/}
          <div className="desktop-only">
            <ProductTable products={filteredProducts} onDelete={handleDelete} />
          </div>

          {/* Mobile: responsive cards*/}
          <div className="mobile-only product-card-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onDelete={handleDelete} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Products
