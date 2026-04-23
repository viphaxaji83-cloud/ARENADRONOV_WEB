import Link from "next/link";
import { Logo } from "@/components/brand/logo";

export function PublicFooter() {
  return (
    <footer className="border-t border-border-subtle bg-bg-surface mt-20">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4 flex flex-col gap-4">
            <Logo />
            <p className="text-sm text-fg-secondary max-w-sm">
              Платформа турниров по дрон-рейсингу. Расписание, регистрация, рейтинг и сцена в одном месте.
            </p>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-fg-muted mb-4">
              Платформа
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/tournaments" className="text-fg-secondary hover:text-fg-primary">Турниры</Link></li>
              <li><Link href="/leaderboard" className="text-fg-secondary hover:text-fg-primary">Рейтинг</Link></li>
              <li><Link href="/pilots" className="text-fg-secondary hover:text-fg-primary">Пилоты</Link></li>
              <li><Link href="/news" className="text-fg-secondary hover:text-fg-primary">Новости</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-fg-muted mb-4">
              Аккаунт
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/login" className="text-fg-secondary hover:text-fg-primary">Войти</Link></li>
              <li><Link href="/register" className="text-fg-secondary hover:text-fg-primary">Регистрация</Link></li>
              <li><Link href="/app" className="text-fg-secondary hover:text-fg-primary">Кабинет пилота</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-fg-muted mb-4">
              Документы
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="#" className="text-fg-secondary hover:text-fg-primary">Условия</Link></li>
              <li><Link href="#" className="text-fg-secondary hover:text-fg-primary">Политика</Link></li>
              <li><Link href="#" className="text-fg-secondary hover:text-fg-primary">Контакты</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-fg-muted mb-4">
              Сезон 2026
            </h4>
            <p className="text-sm text-fg-secondary">
              Открытие сезона <span className="text-fg-primary font-medium">9 мая</span>
            </p>
            <p className="text-sm text-fg-muted mt-1">Москва · Spring Cup</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border-subtle flex flex-col sm:flex-row sm:justify-between gap-3 text-xs text-fg-muted">
          <p>© 2026 АРЕНА ДРОНОВ. Все права защищены.</p>
          <p className="font-mono">v0.1.0 · MVP</p>
        </div>
      </div>
    </footer>
  );
}
