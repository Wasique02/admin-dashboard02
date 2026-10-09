import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Boxes, Mail, Lock } from "lucide-react"

// The demo credentials
const DEMO_EMAIL = "admin@gmail.com"
const DEMO_PASSWORD = "admin123"

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(event) {
    event.preventDefault()

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      
      localStorage.setItem("isLoggedIn", "true")
      navigate("/dashboard")

    } else {

      setError("Invalid email or password. Please try again.")
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-logo">
            <Boxes size={26} color="#ffffff" aria-hidden="true" />
          </div>
          <h1 className="login-title">Inventory Admin</h1>
          <p className="login-subtitle">Sign in to manage your products and stock</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="form-group form-group-full">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" aria-hidden="true" />
              <input
                id="email"
                type="email"
                className="form-input"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@gmail.com"
              />
            </div>
          </div>

          <div className="form-group form-group-full">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" aria-hidden="true" />
              <input
                id="password"
                type="password"
                className="form-input"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="admin123"
              />
            </div>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <button type="submit" className="btn btn-primary btn-block">
            Sign In
          </button>
        </form>

        <div className="login-hint">
          <p>
            <strong>Demo credentials</strong>
          </p>
          <p>Email: admin@gmail.com</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  )
}

export default Login
