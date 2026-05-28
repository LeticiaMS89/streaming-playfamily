// ESLint é uma ferramenta que valida o código JavaScript/JSX
// Detecta erros e padroniza a escrita do código conforme as regras configuradas

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

// Configuração padrão do ESLint para o projeto PlayFamily
export default defineConfig([
  // Ignora a pasta 'dist' (saída compilada) de erros do linter
  globalIgnores(['dist']),
  {
    // Aplica as regras para arquivos JavaScript e JSX
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      // Define variáveis globais disponíveis no navegador
      globals: globals.browser,
      // Ativa suporte a sintaxe JSX
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
