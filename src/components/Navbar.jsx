import { Menu } from "lucide-react"

// Props:
//   title        -> the page title text to show
//   onMenuClick  -> opens the mobile sidebar 
function Navbar({ title, onMenuClick }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        
        <button
          type="button"
          className="navbar-menu-btn"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <h1 className="navbar-title">{title}</h1>
      </div>

      <div className="navbar-user">
        <div className="navbar-user-info">
          <span className="navbar-user-name">Admin</span>
          <span className="navbar-user-email">admin@gmail.com</span>
        </div>
        
        <div className="navbar-avatar" aria-hidden="true">
          A
        </div>
      </div>
    </header>
  )
}

export default Navbar
