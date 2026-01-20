import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { qrcode } from 'vite-plugin-qrcode';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        qrcode()
    ],
    resolve: {
        alias: {
            "@": "/src",
        },
    },
    server: {
        host: true,
        allowedHosts: true
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'ui-vendor': ['lucide-react', 'recharts']
                }
            }
        }
    }
})
