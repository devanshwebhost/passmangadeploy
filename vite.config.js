import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,        // ✅ Frontend port (Backend port se alag rakhein)
    host: "0.0.0.0"     // 🟢 Render ke liye zaroori hai
  }
});
