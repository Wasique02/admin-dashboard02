import { NavLink, useNavigate } from "react-router-dom"
import { LayoutDashboard, Package, Boxes, LogOut, Layers } from "lucide-react"

// Props:
//   isOpen  -> on mobile, whether the drawer is currently open
//   onClose -> function to close the drawer (used when a link is clicked)
function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate()


  function handleLogout() {
    localStorage.removeItem("isLoggedIn")
    navigate("/login")
  }

  
  function linkClass({ isActive }) {
    return isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
  }

  return (
    <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Boxes size={22} color="#ffffff" aria-hidden="true" />
        </div>
        <span className="sidebar-title">Inventory Admin</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={linkClass} onClick={onClose}>
          <LayoutDashboard size={18} aria-hidden="true" />
          <span>Dashboard</span>
        </NavLink>

        <p className="sidebar-section-label">
          <Layers size={14} aria-hidden="true" /> Masters
        </p>

        <NavLink to="/products" className={linkClass} onClick={onClose}>
          <Package size={18} aria-hidden="true" />
          <span>Products</span>
        </NavLink>

        <NavLink to="/inventory" className={linkClass} onClick={onClose}>
          <Boxes size={18} aria-hidden="true" />
          <span>Inventory</span>
        </NavLink>
      </nav>

      <button type="button" className="sidebar-logout" onClick={handleLogout}>
        <LogOut size={18} aria-hidden="true" />
        <span>Logout</span>
      </button>
    </aside>
  )
}



export default Sidebar
