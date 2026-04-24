import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Field } from "@/components/ui/input";
import { loginAction } from "@/app/(auth)/actions";

export const metadata = { title: "Вход" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="space-y-4">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-fg-secondary transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        На главную
      </Link>

      <Card className="border-accent/20 p-8 shadow-glow sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="mb-2 font-display text-3xl font-semibold tracking-tight">
            С возвращением
          </h1>
          <p className="text-sm text-fg-secondary">
            Войдите, чтобы попасть в кабинет пилота или в админку
          </p>
        </div>

        <form action={loginAction} className="space-y-5">
          <Field label="Email" required>
            <Input
              type="email"
              name="email"
              placeholder="blitz@arenadronov.test"
              autoComplete="email"
            />
          </Field>

          <Field
            label="Пароль"
            required
            labelExtra={
              <Link href="#" className="text-accent hover:underline">
                Забыли пароль?
              </Link>
            }
          >
            <Input
              type="password"
              name="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </Field>

          {error === "invalid" && (
            <p className="rounded-md border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
              Неверный email или пароль.
            </p>
          )}

          <Button className="w-full" size="lg" type="submit">
            Войти
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-subtle" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-bg-surface px-3 text-fg-muted">или</span>
            </div>
          </div>

          <Button variant="secondary" className="w-full" size="lg" type="button">
            Продолжить через Google
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-fg-secondary">
          Нет аккаунта?{" "}
          <Link href="/register" className="font-medium text-accent hover:underline">
            Зарегистрироваться
          </Link>
        </p>
      </Card>
    </div>
  );
}
