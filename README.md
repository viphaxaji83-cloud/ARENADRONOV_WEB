# ArenaDronov

Платформа турниров по дрон-рейсингу. MVP — Next.js 15 + TypeScript + Tailwind + дизайн-система на CSS-переменных.

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Структура

```
src/
├── app/
│   ├── (public)/        — публичный сайт (главная, турниры, рейтинг, пилоты, новости)
│   ├── (auth)/          — вход/регистрация
│   ├── app/             — кабинет пилота
│   └── admin/           — админка
├── components/
│   ├── brand/           — логотип
│   ├── layout/          — public-nav, public-footer, app-shell, admin-shell
│   ├── tournament/      — карточка турнира
│   └── ui/              — primitives: Button, Card, Badge, Avatar, Table, Input, Stat, ...
└── lib/
    ├── data/            — mock-данные (pilots, tournaments, news, results)
    ├── types.ts         — доменные типы
    ├── labels.ts        — человекочитаемые лейблы для enum-ов
    └── utils.ts         — cn, форматирование дат и времени
```

## Дизайн-система

Три уровня токенов в `src/app/globals.css`:
- **Level 1** — primitive (radius, font-stack)
- **Level 2** — semantic (`--color-bg-base`, `--color-accent`, ...) — *brand override layer*
- **Level 3** — component (через Tailwind config)

Чтобы применить новый брендбук — переопределите Level 2 в `globals.css` или добавьте отдельный preset через `data-brand="..."` на `<html>`. Компоненты не трогаются.

## Демо-маршруты

- `/` — главная
- `/tournaments` · `/tournaments/moscow-spring-cup-2026` — список и страница турнира
- `/leaderboard` — рейтинг сезона
- `/pilots` · `/pilots/vortex` — список и профиль пилота
- `/news` · `/news/season-2026-opens` — новости
- `/login` · `/register` — авторизация (UI, без backend)
- `/app` — кабинет пилота (моковый user = `@blitz`)
- `/admin` — админка
