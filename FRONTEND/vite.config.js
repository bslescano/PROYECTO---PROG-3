import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite detectará y usará automáticamente tu `postcss.config.js`
export default defineConfig({
  plugins: [react()],
})
