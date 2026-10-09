import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// Vite is the build tool / dev server that runs our React app.
// The React plugin enables JSX and Fast Refresh (hot reloading).
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
})
