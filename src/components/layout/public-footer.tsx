import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="border-t border-border-subtle bg-bg-surface mt-20">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-8 lg:grid-cols-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-fg-muted mb-4">
              Платформа
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/tournaments" className="text-fg-secondary hover:text-fg-primary">Турниры</Link></li>
              <li><Link href="/leaderboard" className="text-fg-secondary hover:text-fg-primary">Рейтинг</Link></li>
              <li><Link href="/pilots" className="text-fg-secondary hover:text-fg-primary">Пилоты</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-fg-muted mb-4">
              Аккаунт
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/login" className="text-fg-secondary hover:text-fg-primary">Войти</Link></li>
              <li><Link href="/register" className="text-fg-secondary hover:text-fg-primary">Регистрация</Link></li>
              <li><Link href="/app" className="text-fg-secondary hover:text-fg-primary">Кабинет пилота</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-fg-muted mb-4">
              Документы
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="#" className="text-fg-secondary hover:text-fg-primary">Условия</Link></li>
              <li><Link href="#" className="text-fg-secondary hover:text-fg-primary">Политика</Link></li>
              <li><Link href="#" className="text-fg-secondary hover:text-fg-primary">Контакты</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-fg-muted mb-4">
              Сезон 2026
            </h4>
            <p className="text-sm text-fg-secondary">
              Открытие сезона <span className="text-fg-primary font-medium">9 мая</span>
            </p>
            <p className="text-sm text-fg-muted mt-1">Spring Cup 2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
