import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '~': resolve(__dirname, 'node_modules')
        }
    },
    build: {
        assetsInlineLimit: 102400,
        rollupOptions: {
            output: {
                assetFileNames: 'src/assets/[name].[ext]',
                manualChunks: id => {
                    if (id.includes('node_modules')) {
                        if (id.includes('@nitro-rp/renderer')) return 'nitro-renderer';
                        return 'vendor';
                    }
                }
            }
        }
    },
    define: {
        'process.env': process.env,
    }
});