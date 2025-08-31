# Руководство по доступности

Этот проект соответствует требованиям уровня AA согласно ГОСТ Р 52872-2019 (аналог WCAG 2.1 AA).

## Основные принципы доступности

### 1. Воспринимаемость (Perceivable)
- **Альтернативные тексты**: Все изображения имеют описательные alt-атрибуты
- **Контрастность**: Цветовая схема обеспечивает контрастность не менее 4.5:1 для обычного текста
- **Адаптивность**: Контент адаптируется к различным размерам экрана
- **Мультимедиа**: Видео и аудио имеют субтитры и транскрипции

### 2. Операбельность (Operable)
- **Клавиатурная навигация**: Все интерактивные элементы доступны с клавиатуры
- **Управление фокусом**: Четкая индикация текущего фокуса
- **Время**: Пользователи могут контролировать временные ограничения
- **Навигация**: Множественные способы навигации по сайту

### 3. Понятность (Understandable)
- **Читаемость**: Текст легко читается и понимается
- **Предсказуемость**: Интерфейс работает предсказуемо
- **Помощь в вводе**: Формы содержат инструкции и сообщения об ошибках

### 4. Надежность (Robust)
- **Совместимость**: Работает с различными технологиями помощи
- **Стандарты**: Соответствует веб-стандартам

## Компоненты доступности

### AccessibilityProvider
Главный провайдер для управления доступностью приложения.

```tsx
import { AccessibilityProvider } from './components/AccessibilityProvider/AccessibilityProvider';

<AccessibilityProvider>
  <App />
</AccessibilityProvider>
```

### AccessibleForm
Компонент для создания доступных форм.

```tsx
import { AccessibleForm, AccessibleInput, AccessibleButton } from './components/AccessibleForm/AccessibleForm';

<AccessibleForm onSubmit={handleSubmit}>
  <AccessibleInput
    id="email"
    label="Email"
    type="email"
    required
    error={errors.email}
  />
  <AccessibleButton type="submit" loading={isLoading}>
    Отправить
  </AccessibleButton>
</AccessibleForm>
```

## ARIA-атрибуты

### Основные атрибуты
- `aria-label` - описание элемента
- `aria-labelledby` - связь с элементом-заголовком
- `aria-describedby` - связь с элементом-описанием
- `aria-hidden` - скрытие от скринридеров
- `aria-expanded` - состояние раскрытия
- `aria-pressed` - состояние нажатия
- `aria-invalid` - состояние ошибки

### Роли
- `role="button"` - кнопка
- `role="link"` - ссылка
- `role="navigation"` - навигация
- `role="main"` - основное содержимое
- `role="complementary"` - дополнительная информация
- `role="banner"` - шапка сайта
- `role="contentinfo"` - подвал сайта

## Клавиатурная навигация

### Основные клавиши
- `Tab` - переход между элементами
- `Shift + Tab` - обратный переход
- `Enter` / `Space` - активация элемента
- `Escape` - закрытие модальных окон
- `Arrow keys` - навигация в меню

### Кастомные сочетания
- `Ctrl + M` - открытие главного меню
- `Ctrl + S` - поиск
- `Ctrl + K` - переход в корзину

## Цветовая схема

### Основные цвета
- Основной текст: `#212121` (контраст 15.6:1)
- Вторичный текст: `#424242` (контраст 12.1:1)
- Акцент: `#d32f2f` (контраст 4.5:1)
- Фон: `#fafafa`

### Состояния
- Фокус: `#1976d2`
- Ошибка: `#d32f2f`
- Успех: `#388e3c`
- Предупреждение: `#f57c00`

## Тестирование доступности

### Автоматические тесты
```bash
# Проверка контрастности
npm run test:accessibility

# Проверка ARIA-атрибутов
npm run test:aria
```

### Ручное тестирование
1. **Клавиатурная навигация**: Проверьте все функции с клавиатуры
2. **Скринридеры**: Протестируйте с NVDA, JAWS, VoiceOver
3. **Увеличение**: Проверьте при увеличении до 200%
4. **Цветовая слепота**: Используйте симуляторы

### Инструменты
- **axe-core**: Автоматическое тестирование
- **WAVE**: Визуальная оценка
- **Lighthouse**: Комплексная проверка
- **Color Contrast Analyzer**: Проверка контрастности

## Лучшие практики

### Изображения
```tsx
// ✅ Правильно
<img src="logo.png" alt="Логотип компании" />

// ❌ Неправильно
<img src="logo.png" alt="logo" />
<img src="logo.png" alt="" />
```

### Кнопки
```tsx
// ✅ Правильно
<button aria-label="Добавить в корзину">
  <svg aria-hidden="true">...</svg>
</button>

// ❌ Неправильно
<div onClick={handleClick}>Добавить</div>
```

### Формы
```tsx
// ✅ Правильно
<label htmlFor="email">Email</label>
<input id="email" type="email" aria-describedby="email-error" />
<div id="email-error" role="alert">Неверный формат email</div>

// ❌ Неправильно
<input type="email" placeholder="Email" />
```

## Поддержка технологий помощи

### Скринридеры
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

### Увеличение
- Встроенные средства ОС
- Браузерное увеличение до 200%

### Высокий контраст
- Поддержка режима высокой контрастности
- Автоматическое переключение цветов

### Уменьшение движения
- Отключение анимаций при `prefers-reduced-motion`

## Контакты

При обнаружении проблем с доступностью, пожалуйста, сообщите:
- Email: accessibility@example.com
- GitHub Issues: [Создать issue](https://github.com/example/repo/issues)

## Ресурсы

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ГОСТ Р 52872-2019](https://docs.cntd.ru/document/1200161236)
- [Web Accessibility Initiative](https://www.w3.org/WAI/)
- [A11Y Project](https://www.a11yproject.com/)
