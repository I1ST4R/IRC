import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

// Список разрешенных файлов
const ALLOWED_FOR_AUTH = [
  'src/modules/AuthForm/AuthForm.tsx',
]

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
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  
  {
    files: ['**/*.{ts,tsx}'],
    excludedFiles: ALLOWED_FOR_AUTH,
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@/api/userApi',
              importNames: [
                'useLoginMutation',
                'useRegisterMutation',
                'useLogoutMutation'
              ],
              message: 'Эти хуки можно использовать только в: ' + ALLOWED_FOR_AUTH.join(', ')
            }
          ]
        }
      ]
    }
  }
)
