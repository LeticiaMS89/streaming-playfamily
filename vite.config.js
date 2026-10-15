import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Arquivo de configuração do Vite para o PlayFamily
// Documentação: https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Configuração do servidor de desenvolvimento
  server: {
    port: 3000, // Define a porta padrão do front-end
    open: true, // Abre o navegador automaticamente ao rodar 'npm run dev'
    
    // Proxy para o back-end Express (evita erros de CORS no ambiente de dev)
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Altere para a porta onde seu Express roda
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // Atalho de caminhos (Aliases) para deixar as importações mais limpas
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Otimizações de Build para Produção
  build: {
    outDir: 'dist',
    sourcemap: false, // Desativa source maps no build final por segurança e performance
  },
})
