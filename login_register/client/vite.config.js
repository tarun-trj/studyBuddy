import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.eot', '**/*.ttf', '**/*.svg'],
  server: {
    fs: {
      allow: ['.'], // Ensure you adjust this according to your directory structure
    }
  }
})
