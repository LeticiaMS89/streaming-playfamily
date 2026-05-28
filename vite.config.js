// Importa a função defineConfig do Vite para configuração de projeto
import { defineConfig } from 'vite'

// Importa o plugin do React para o Vite
import react from '@vitejs/plugin-react'

// Arquivo de configuração do Vite para o projeto PlayFamily
// O Vite é um bundler (empacotador) moderno que compila o código e otimiza para produção
// Documentação: https://vite.dev/config/
export default defineConfig({
  // Ativa o plugin do React para suportar JSX
  plugins: [react()],
})
