// ========================================
// CONFIGURAÇÃO DO ESLINT (Flat Config)
// ========================================
// Este arquivo valida o código JavaScript/JSX, detectando 
// erros e padronizando a escrita para o projeto PlayFamily.

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

// No padrão "Flat Config", exportamos diretamente um array de configurações
export default [
  // 1. Ignora a pasta 'dist' (saída compilada do build)
  { ignores: ['dist'] },

  // 2. Aplica as configurações recomendadas globais do JavaScript
  js.configs.recommended,

  // 3. Configurações específicas para arquivos React (JS e JSX)
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020, // Suporte a recursos modernos do JS
      globals: globals.browser, // Reconhece variáveis do navegador (window, document)
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true }, // Ativa suporte à sintaxe JSX (HTML no JS)
        sourceType: 'module',
      },
    },
    // Registra os plugins que importamos lá em cima
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    // Ativa as regras específicas
    rules: {
      // Espalha as regras recomendadas dos Hooks (ex: avisar se esquecer dependência no useEffect)
      ...reactHooks.configs.recommended.rules,
      
      // Regra do Vite para garantir que a atualização ao vivo (Hot Reload) funcione sem bugs
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];
