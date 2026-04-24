"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Trophy,
  ClipboardList,
  Award,
  User,
  Bell,
  Settings,
  LogOut,
  Search,
  ArrowLeft,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getPilotById } from "@/lib/data/pilots";
import { notifications } from "@/lib/data/results";
import { logoutAction } from "@/app/(auth)/actions";

const navItems = [
  { href: "/app", label: "Главная", icon: LayoutDashboard, exact: true },
  { href: "/app/tournaments", label: "Турниры", icon: Trophy },
  { href: "/app/registrations", label: "Заявки", icon: ClipboardList },
  { href: "/app/results", label: "Результаты", icon: Award },
  { href: "/app/profile", label: "Профиль", icon: User },
  { href: "/app/notifications", label: "Уведомления", icon: Bell },
  { href: "/app/settings", label: "Настройки", icon: Settings },
];

const mobileNavItems = [
  { href: "/app", label: "Главная", icon: LayoutDashboard, exact: true },
  { href: "/app/tournaments", label: "Турниры", icon: Trophy },
  { href: "/app/results", label: "Результаты", icon: Award },
  { href: "/app/notifications", label: "Уведомл.", icon: Bell },
  { href: "/app/profile", label: "Профиль", icon: User },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const me = getPilotById("p7")!;
  const unread = notifications.filter((n) => n.userId === me.id && !n.readAt).length;

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname?.startsWith(href + "/");

  return (
    <div className="min-h-dvh bg-bg-base">
      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col border-r border-border-subtle bg-bg-surface">
        <div className="h-16 px-6 flex items-center border-b border-border-subtle">
          <Logo />
        </div>

        <nav className="flex-1 px-3 py-5 flex flex-col gap-0.5">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors relative",
                  active
                    ? "bg-bg-elevated text-fg-primary"
                    : "text-fg-secondary hover:text-fg-primary hover:bg-bg-elevated/50",
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.href === "/app/notifications" && unread > 0 && (
                  <span className="h-5 min-w-[20px] px-1.5 rounded-full bg-accent text-accent-fg text-[10px] font-bold flex items-center justify-center">
                    {unread}
                  </span>
                )}
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 bg-accent rounded-r-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border-subtle">
          <Link
            href={`/pilots/${me.handle}`}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-bg-elevated transition-colors"
          >
            <Avatar src={me.avatarUrl} name={me.displayName} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-fg-primary truncate">@{me.handle}</p>
              <p className="text-xs text-fg-muted truncate">Пилот</p>
            </div>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-fg-secondary hover:text-fg-primary hover:bg-bg-elevated transition-colors mt-1"
          >
            <ArrowLeft className="h-4 w-4" />
            На сайт
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-fg-secondary hover:text-fg-primary hover:bg-bg-elevated transition-colors mt-1"
            >
              <LogOut className="h-4 w-4" />
              Выйти
            </button>
          </form>
        </div>
      </aside>

      {/* Topbar */}
      <header className="lg:pl-64 sticky top-0 z-30 border-b border-border-subtle bg-bg-base/80 backdrop-blur-lg">
        <div className="h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 lg:hidden">
            <Logo size="sm" />
          </div>

          <div className="hidden sm:flex items-center gap-3 flex-1 lg:max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-fg-secondary hover:text-fg-primary shrink-0"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              На сайт
            </Link>
            <div className="relative w-full max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-fg-muted" />
              <input
                placeholder="Поиск турниров, пилотов..."
                className="w-full h-9 pl-9 pr-3 rounded-md border border-border-subtle bg-bg-elevated text-sm placeholder:text-fg-muted focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <form action={logoutAction} className="hidden sm:block">
              <button className="inline-flex items-center gap-1.5 text-sm text-fg-secondary hover:text-fg-primary">
                <LogOut className="h-3.5 w-3.5" />
                Выйти
              </button>
            </form>
            <Link
              href="/app/notifications"
              className="relative inline-flex items-center justify-center h-9 w-9 rounded-md text-fg-secondary hover:text-fg-primary hover:bg-bg-elevated"
            >
              <Bell className="h-4 w-4" />
              {unread > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
              )}
            </Link>
            <Avatar src={me.avatarUrl} name={me.displayName} size="sm" />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="lg:pl-64 pb-20 lg:pb-12">
        <div className="container max-w-7xl py-6 sm:py-8">{children}</div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border-subtle bg-bg-surface/95 backdrop-blur-lg safe-pb">
        <div className="grid grid-cols-5">
          {mobileNavItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition-colors relative",
                  active ? "text-accent" : "text-fg-muted hover:text-fg-secondary",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
                {item.href === "/app/notifications" && unread > 0 && (
                  <span className="absolute top-1.5 right-[calc(50%-14px)] h-1.5 w-1.5 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
