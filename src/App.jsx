import { Routes, Route, Navigate } from "react-router-dom"
import AdminLayout from "./components/AdminLayout.jsx"
import Login from "./pages/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Products from "./pages/Products.jsx"
import AddProduct from "./pages/AddProduct.jsx"
import ProductDetails from "./pages/ProductDetails.jsx"
import EditProduct from "./pages/EditProduct.jsx"
import Inventory from "./pages/Inventory.jsx"
import UpdateInventory from "./pages/UpdateInventory.jsx"

// App defines all the routes (URLs) of the application
function App() {
  return (
    <Routes>
      
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
      <Route path="/products" element={<AdminLayout><Products /></AdminLayout>} />
      <Route path="/products/add" element={<AdminLayout><AddProduct /></AdminLayout>} />
      <Route path="/products/edit/:id" element={<AdminLayout><EditProduct /></AdminLayout>} />
      
      <Route path="/products/:id" element={<AdminLayout><ProductDetails /></AdminLayout>} />
      <Route path="/inventory" element={<AdminLayout><Inventory /></AdminLayout>} />
      <Route path="/inventory/update/:id" element={<AdminLayout><UpdateInventory /></AdminLayout>} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
