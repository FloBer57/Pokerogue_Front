import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
    return {
        plugins: [],
        server: {
            host: '0.0.0.0',
            port: 8000,
            // Configuration du proxy pour rediriger les requêtes vers l'API
            proxy: {
                '/api': {
                    target: 'http://localhost:8080', // L'adresse de votre API Go
                    changeOrigin: true, // Pour changer l'origine de la requête
                    rewrite: (path) => path.replace(/^\/api/, ''), // Supprime `/api` du chemin de la requête
                },
            },
        },
        clearScreen: false,
        build: {
            minify: 'esbuild',
            sourcemap: false
        },
        esbuild: {
            pure: mode === 'production' ? ['console.log'] : [],
            keepNames: true,
        },
    }
})
