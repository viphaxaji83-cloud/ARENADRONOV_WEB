"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/tournaments", label: "Турниры" },
  { href: "/leaderboard", label: "Рейтинг" },
  { href: "/pilots", label: "Пилоты" },
];

export function PublicNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-bg-base/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-end md:justify-between">
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive(item.href)
                  ? "text-fg-primary bg-bg-elevated"
                  : "text-fg-secondary hover:text-fg-primary",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Войти
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="gap-1.5">
              <User2 className="h-3.5 w-3.5" />
              Регистрация
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md text-fg-secondary hover:text-fg-primary hover:bg-bg-elevated"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border-subtle bg-bg-surface animate-fade-in">
          <nav className="container flex flex-col py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-3 py-3 text-base font-medium rounded-md transition-colors",
                  isActive(item.href)
                    ? "text-fg-primary bg-bg-elevated"
                    : "text-fg-secondary hover:text-fg-primary hover:bg-bg-elevated",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-3 mt-2 border-t border-border-subtle">
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="secondary" className="w-full">
                  Войти
                </Button>
              </Link>
              <Link href="/register" onClick={() => setMobileOpen(false)}>
                <Button className="w-full">Регистрация</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
