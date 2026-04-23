"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Trophy,
  ClipboardCheck,
  Newspaper,
  BarChart3,
  Users,
  Settings,
  Search,
  ArrowLeft,
  Plus,
  Award,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Сводка", icon: LayoutDashboard, exact: true },
  { href: "/admin/tournaments", label: "Турниры", icon: Trophy },
  { href: "/admin/registrations", label: "Заявки", icon: ClipboardCheck },
  { href: "/admin/news", label: "Новости", icon: Newspaper },
  { href: "/admin/leaderboard", label: "Рейтинг", icon: Award },
  { href: "/admin/results", label: "Результаты", icon: BarChart3 },
  { href: "/admin/users", label: "Пользователи", icon: Users },
  { href: "/admin/settings", label: "Настройки", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname?.startsWith(href + "/");

  return (
    <div className="min-h-dvh bg-bg-base">
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-60 flex-col border-r border-border-subtle bg-bg-surface">
        <div className="h-16 px-5 flex items-center border-b border-border-subtle">
          <Logo />
        </div>
        <div className="px-3 pt-4 pb-3">
          <p className="px-3 text-[10px] uppercase tracking-widest text-fg-muted font-bold">
            Admin
          </p>
        </div>

        <nav className="flex-1 px-3 flex flex-col gap-0.5">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors relative",
                  active
                    ? "bg-bg-elevated text-fg-primary"
                    : "text-fg-secondary hover:text-fg-primary hover:bg-bg-elevated/50",
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 bg-accent rounded-r-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border-subtle">
          <Link
            href="/admin/tournaments/new"
            className="flex items-center justify-center gap-2 h-10 rounded-md bg-accent text-accent-fg text-sm font-medium hover:bg-accent-hover transition-colors"
          >
            <Plus className="h-4 w-4" />
            Новый турнир
          </Link>
        </div>
      </aside>

      <header className="lg:pl-60 sticky top-0 z-30 border-b border-border-subtle bg-bg-base/80 backdrop-blur-lg">
        <div className="h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="lg:hidden">
            <Logo size="sm" />
          </div>
          <div className="hidden sm:flex items-center gap-2 max-w-md flex-1 lg:max-w-lg">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-fg-muted" />
              <input
                placeholder="Поиск..."
                className="w-full h-9 pl-9 pr-3 rounded-md border border-border-subtle bg-bg-elevated text-sm placeholder:text-fg-muted focus:outline-none focus:border-accent"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-fg-secondary hover:text-fg-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              На сайт
            </Link>
            <Avatar name="Администратор" size="sm" />
          </div>
        </div>
      </header>

      {/* Mobile horizontal nav */}
      <div className="lg:hidden border-b border-border-subtle bg-bg-surface overflow-x-auto">
        <div className="flex gap-1 px-4 py-2 min-w-max">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors",
                  active
                    ? "bg-bg-elevated text-fg-primary"
                    : "text-fg-secondary hover:text-fg-primary",
                )}
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      <main className="lg:pl-60">
        <div className="container max-w-7xl py-6 sm:py-8">{children}</div>
      </main>
    </div>
  );
}
