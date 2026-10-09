import { useState } from "react"
import { Upload } from "lucide-react"

const CATEGORIES = ["Leather", "Formal", "Casual", "Sports", "Sandals", "Accessories"]

// ProductForm is shared by the Add Product and Edit Product pages.
// Props:
//   initialValues -> object to pre-fill the form (empty-ish for Add)
//   showStock     -> whether to show the "Initial Stock" field (Add only)
//   submitLabel   -> text on the submit button ("Create Product" / "Update Product")
//   onSubmit      -> called with the cleaned form values when validation passes
//   onCancel      -> called when the Cancel button is clicked
function ProductForm({ initialValues, showStock, submitLabel, onSubmit, onCancel }) {
  
  const [name, setName] = useState(initialValues.name || "")
  const [category, setCategory] = useState(initialValues.category || "")
  const [price, setPrice] = useState(initialValues.price ?? "")
  const [description, setDescription] = useState(initialValues.description || "")
  const [stock, setStock] = useState(initialValues.stock ?? "")
  const [image, setImage] = useState(initialValues.image || "")

  const [errors, setErrors] = useState({})

  function handleImageChange(event) {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setImage(reader.result)
    reader.readAsDataURL(file)
  }

  function validate() {
    const newErrors = {}

    if (!name.trim()) newErrors.name = "Product name is required."
    if (!category) newErrors.category = "Category is required."

    if (price === "" || Number(price) <= 0) {
      newErrors.price = "Price is required and must be greater than 0."
    }

    if (showStock && (stock === "" || Number(stock) < 0)) {
      newErrors.stock = "Initial stock must be 0 or greater."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  //handleSubmit will run once the form is submitted
  function handleSubmit(event) {
    event.preventDefault()

    if (!validate()) return

    const values = {
      name: name.trim(),
      category,
      price: Number(price),
      description: description.trim(),
      image,
    }

    if (showStock) {
      values.stock = Number(stock)
    }

    onSubmit(values)
  }

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate>
      {/* Image upload */}
      <div className="form-group form-group-full">
        <label className="form-label">Product Image</label>
        <div className="image-upload">
          <div className="image-preview">
            {image ? (
              <img src={image || "/placeholder.svg"} alt="Product preview" />
            ) : (
              <span className="image-placeholder">No image</span>
            )}
          </div>
          <label className="btn btn-secondary image-upload-btn">
            <Upload size={16} aria-hidden="true" /> Upload Image
            <input type="file" accept="image/*" onChange={handleImageChange} hidden />
          </label>
        </div>
      </div>

      {/* Product name */}
      <div className="form-group">
        <label className="form-label" htmlFor="name">
          Product Name
        </label>
        <input
          id="name"
          className="form-input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Brown Leather Sandal"
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      {/* Category */}
      <div className="form-group">
        <label className="form-label" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          className="form-input"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">Select Category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <span className="form-error">{errors.category}</span>}
      </div>

      {/* Price */}
      <div className="form-group">
        <label className="form-label" htmlFor="price">
          Price (₹)
        </label>
        <input
          id="price"
          type="number"
          className="form-input"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          placeholder="e.g. 999"
          min="0"
        />
        {errors.price && <span className="form-error">{errors.price}</span>}
      </div>

      {/* Initial stock (only shown when adding a product) */}
      {showStock && (
        <div className="form-group">
          <label className="form-label" htmlFor="stock">
            Initial Stock
          </label>
          <input
            id="stock"
            type="number"
            className="form-input"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
            placeholder="e.g. 20"
            min="0"
          />
          {errors.stock && <span className="form-error">{errors.stock}</span>}
        </div>
      )}

      {/* Description */}
      <div className="form-group form-group-full">
        <label className="form-label" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          className="form-input form-textarea"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Short description of the product"
          rows={4}
        />
      </div>

      {/* Action buttons */}
      <div className="form-actions form-group-full">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

export default ProductForm
