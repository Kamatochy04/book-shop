# Bookly — книжный интернет-магазин

React + TypeScript + Tailwind storefront и Strapi backend для книжного интернет-магазина.

## Что есть

- Главная страница с рекомендованными товарами.
- Каталог книг с поиском и фильтром по жанру.
- Страница одного товара.
- Корзина с сохранением в `localStorage`.
- Оформление заказа.
- Регистрация, вход и личный кабинет через Strapi Users & Permissions.
- Strapi content types `Book` и `Order`.
- Seed-данные из 10 моковых книг при первом запуске backend.
- Админка Strapi для добавления и редактирования книг.

## Запуск

Установить зависимости:

```bash
npm install
```

Запустить backend:

```bash
npm run dev:backend
```

Backend будет доступен на `http://localhost:1340`, админка Strapi — `http://localhost:1340/admin`.

Запустить frontend:

```bash
npm run dev:frontend
```

Frontend будет доступен на `http://localhost:5173`.

## Настройка Strapi

При первом запуске Strapi попросит создать администратора. После входа в админку можно управлять книгами в разделе `Content Manager -> Book`.

Bootstrap backend автоматически:

- создает моковые книги, если каталог пуст;
- включает публичное чтение `find` и `findOne` для `Book`;
- включает создание `Order` для публичной и авторизованной витрины.

## Переменные окружения

Frontend по умолчанию обращается к `http://localhost:1340`. Можно переопределить:

```bash
VITE_STRAPI_URL=http://localhost:1340 npm run dev:frontend
```

Backend использует SQLite-файл `.tmp/data.db`.
# book-shop
