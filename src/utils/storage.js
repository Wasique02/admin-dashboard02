import initialProducts from "../data/initialProducts.js"


// The single key under which we store the whole product list.
const STORAGE_KEY = "admin_products"


export function getProducts() {
  const raw = localStorage.getItem(STORAGE_KEY)

  // No data stored yet -> initialize with sample data ONCE.
  if (raw === null) {
    saveProducts(initialProducts)
    return initialProducts
  }

  try {
    // JSON.parse turns the stored text back into a real JS array.
    return JSON.parse(raw)
  } catch (error) {
    console.log("[v0] Failed to parse products from localStorage:", error)
    saveProducts(initialProducts)
    return initialProducts
  }
}


export function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
}


export function getProductById(id) {
  const products = getProducts()
  return products.find((product) => product.id === Number(id))
}


export function addProduct(product) {
  const products = getProducts()

  // Generate a unique id: highest existing id + 1 (or 1 if list is empty).
  const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1

  const now = new Date().toISOString()
  const newProduct = {
    ...product,
    id: newId,
    createdAt: now,
    updatedAt: now,
  }

  // Add the new product to the front "recent" lists.
  const updated = [newProduct, ...products]
  saveProducts(updated)
  return newProduct
}


export function updateProduct(id, updatedFields) {
  const products = getProducts()

  const updated = products.map((product) => {
    if (product.id === Number(id)) {
      return {
        ...product, // keep existing values (like stock, createdAt, id)
        ...updatedFields, // overwrite only the edited fields
        id: product.id, 
        updatedAt: new Date().toISOString(),
      }
    }
    return product
  })

  saveProducts(updated)
}


export function deleteProduct(id) {
  const products = getProducts()
  const updated = products.filter((product) => product.id !== Number(id))
  saveProducts(updated)
}
