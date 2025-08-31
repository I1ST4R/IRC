# Инструкции по установке и настройке

## Предварительные требования

- Node.js 18.0.0 или выше
- npm 9.0.0 или выше
- Git

## Установка

1. **Клонируйте репозиторий**
   ```bash
   git clone https://github.com/your-username/irc.git
   cd irc
   ```

2. **Установите зависимости**
   ```bash
   npm install
   ```

3. **Запустите проект в режиме разработки**
   ```bash
   npm run dev
   ```

4. **Откройте браузер**
   ```
   http://localhost:5173
   ```

## Настройка для разработки

### Переменные окружения

Создайте файл `.env.local` в корне проекта:

```env
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=Интернет-магазин косметики
```

### Настройка IDE

#### VS Code

Рекомендуемые расширения:
- ESLint
- Prettier
- TypeScript Importer
- Auto Rename Tag
- Bracket Pair Colorizer

Настройки `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## Тестирование

### Запуск тестов

```bash
# Все тесты
npm run test:all

# Только тесты доступности
npm run test:accessibility

# Только ARIA тесты
npm run test:aria

# Lighthouse аудит
npm run test:lighthouse
```

### Ручное тестирование доступности

1. **Клавиатурная навигация**
   - Используйте `Tab` для навигации
   - Проверьте все интерактивные элементы
   - Убедитесь, что фокус видим

2. **Скринридеры**
   - Установите NVDA (Windows) или VoiceOver (macOS)
   - Протестируйте навигацию
   - Проверьте альтернативные тексты

3. **Контрастность**
   - Используйте инструменты проверки контрастности
   - Проверьте в режиме высокой контрастности

4. **Увеличение**
   - Увеличьте масштаб до 200%
   - Проверьте читаемость

## Сборка для продакшена

```bash
# Сборка
npm run build

# Предварительный просмотр
npm run preview
```

## Структура проекта

```
irc/
├── src/
│   ├── main/
│   │   ├── App/                    # Главные компоненты
│   │   ├── components/             # Переиспользуемые компоненты
│   │   │   ├── AccessibilityProvider/
│   │   │   └── AccessibleForm/
│   │   ├── store/                  # Redux store
│   │   └── styles/                 # Глобальные стили
│   ├── pages/                      # Страницы приложения
│   ├── entity/                     # Бизнес-логика
│   ├── services/                   # API и роутинг
│   └── test/                       # Тесты
├── public/                         # Статические файлы
├── dist/                           # Собранный проект
└── docs/                           # Документация
```

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск в режиме разработки |
| `npm run build` | Сборка для продакшена |
| `npm run preview` | Предварительный просмотр сборки |
| `npm run lint` | Проверка кода |
| `npm run test:all` | Запуск всех тестов |
| `npm run test:accessibility` | Тестирование доступности |

## Отладка

### Проблемы с доступностью

1. **Проверьте консоль браузера** на наличие ошибок
2. **Запустите тесты доступности**: `npm run test:accessibility`
3. **Используйте инструменты разработчика**:
   - Chrome DevTools Accessibility tab
   - Firefox Accessibility Inspector
   - axe DevTools extension

### Проблемы с производительностью

1. **Проверьте размер бандла**: `npm run build`
2. **Запустите Lighthouse**: `npm run test:lighthouse`
3. **Анализируйте с помощью Chrome DevTools**

## Развертывание

### Netlify

1. Подключите репозиторий к Netlify
2. Настройте команды сборки:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Vercel

1. Подключите репозиторий к Vercel
2. Настройки по умолчанию подходят для Vite

### GitHub Pages

1. Добавьте в `package.json`:
   ```json
   {
     "homepage": "https://your-username.github.io/irc",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

2. Установите gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Разверните:
   ```bash
   npm run deploy
   ```

## Поддержка

При возникновении проблем:

1. Проверьте [Issues](https://github.com/your-username/irc/issues)
2. Создайте новый issue с описанием проблемы
3. Обратитесь к [документации по доступности](./ACCESSIBILITY.md)

## Лицензия

MIT License - см. файл [LICENSE](LICENSE) для деталей.
