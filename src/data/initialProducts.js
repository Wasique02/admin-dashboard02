function placeholderImage(label, color) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
      <rect width="400" height="400" fill="${color}" />
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="26"
            fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${label}</text>
    </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const initialProducts = [
  {
    id: 1,
    name: "Brown Leather Sandal",
    category: "Leather",
    price: 999,
    description: "Premium hand-stitched brown leather sandal with a comfortable sole.",
    stock: 20,
    image: placeholderImage("Leather Sandal", "#92400e"),
    createdAt: "2026-01-05T10:00:00.000Z",
    updatedAt: "2026-01-05T10:00:00.000Z",
  },
  {
    id: 2,
    name: "Black Formal Shoe",
    category: "Formal",
    price: 2499,
    description: "Classic black formal shoe, perfect for office and events.",
    stock: 4,
    image: placeholderImage("Formal Shoe", "#1e293b"),
    createdAt: "2026-01-06T11:30:00.000Z",
    updatedAt: "2026-01-06T11:30:00.000Z",
  },
  {
    id: 3,
    name: "Casual Slipper",
    category: "Casual",
    price: 499,
    description: "Lightweight everyday slipper with a soft grip sole.",
    stock: 0,
    image: placeholderImage("Casual Slipper", "#0369a1"),
    createdAt: "2026-01-07T09:15:00.000Z",
    updatedAt: "2026-01-07T09:15:00.000Z",
  },
  {
    id: 4,
    name: "Classic Leather Shoe",
    category: "Leather",
    price: 1899,
    description: "Durable classic leather shoe with a timeless design.",
    stock: 35,
    image: placeholderImage("Leather Shoe", "#7c2d12"),
    createdAt: "2026-01-08T14:45:00.000Z",
    updatedAt: "2026-01-08T14:45:00.000Z",
  },
]

export default initialProducts
