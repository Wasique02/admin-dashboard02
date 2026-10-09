import { useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import Sidebar from "./Sidebar.jsx"
import Navbar from "./Navbar.jsx"

// Each page Title
const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/products": "Products",
  "/products/add": "Add Product",
  "/inventory": "Inventory",
}

//Method to get each page title
function getTitle(pathname) {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]
  if (pathname.startsWith("/products/edit")) return "Edit Product"
  if (pathname.startsWith("/products/")) return "Product Details"
  if (pathname.startsWith("/inventory/update")) return "Update Inventory"
  return "Dashboard"
}

//AdminLayout Component starts here
function AdminLayout({ children }) {
  const location = useLocation()

  // Controls the mobile sidebar drawer is open.
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Frontend-only auth check
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  const title = getTitle(location.pathname)

  return (
    <div className="admin-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* sidebar overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="admin-main">
        <Navbar title={title} onMenuClick={() => setSidebarOpen(true)} />
        <main className="admin-content">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
