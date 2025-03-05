import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.openweathermap.org', // The actual API endpoint
        changeOrigin: true,  // Changes the origin of the host header to the target URL
        rewrite: (path) => path.replace(/^\/api/, ''), // Removes /api prefix
      },
    },
  },
});
