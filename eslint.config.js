import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import boundaries from 'eslint-plugin-boundaries'

export default tseslint.config(
  { ignores: ['dist'] },
  
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      boundaries, // добавляем boundaries плагин
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      "boundaries/elements": [
        {
          type: "app",
          pattern: "./src/app",
        },
        {
          type: "pages",
          pattern: [
            "./src/pages/*.@(ts|tsx)",
            "./src/pages/*/index.@(ts|tsx)"
          ]
        },
        {
          type: "modules",
          pattern: "./src/modules/*",
        },
        {
          type: "shared",
          pattern: "./src/shared",
        },
      ],
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prefer-const': 'error',
      // Boundaries rules
      "boundaries/element-types": [
        2,
        {
          default: "allow",
          rules: [
            {
              from: "shared",
              disallow: ["app", "pages", "modules"],
              message: "Модуль нижележащего слоя (${file.type}) не может импортировать модуль вышележащего слоя (${dependency.type})",
            },
            {
              from: "modules",
              disallow: ["app", "pages"],
              message: "Модуль нижележащего слоя (${file.type}) не может импортировать модуль вышележащего слоя (${dependency.type})",
            },
            {
              from: "pages",
              disallow: ["app"],
              message: "Модуль нижележащего слоя (${file.type}) не может импортировать модуль вышележащего слоя (${dependency.type})",
            },
          ],
        },
      ],
      "boundaries/entry-point": [
        2,
        {
          default: "disallow",
          message: "Модуль (${file.type}) должен импортироваться через public API. Прямой импорт из ${dependency.source} запрещен",
          rules: [
            {
              target: ["shared", "app"],
              allow: "**",
            },
            {
              target: ["modules"],
              allow: ["index.ts", "index.tsx", "*.page.tsx"],
            },
            {
              target: ["pages"],
              allow: ["index.ts", "index.tsx", "*.ts", "*.tsx"],
            },
          ],
        },
      ],
    },
  },
)