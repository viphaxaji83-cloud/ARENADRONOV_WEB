import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Field } from "@/components/ui/input";

export const metadata = { title: "Вход" };

export default function LoginPage() {
  return (
    <Card className="p-8 sm:p-10 shadow-glow border-accent/20">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight mb-2 uppercase">
          С возвращением
        </h1>
        <p className="text-sm text-fg-secondary">
          Войдите, чтобы попасть в кабинет пилота
        </p>
      </div>

      <form className="space-y-5">
        <Field label="Email" required>
          <Input type="email" placeholder="pilot@example.com" autoComplete="email" />
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
          <Input type="password" placeholder="••••••••" autoComplete="current-password" />
        </Field>

        <Link href="/app" className="block">
          <Button className="w-full" size="lg" type="button">
            Войти
          </Button>
        </Link>

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
        <Link href="/register" className="text-accent font-medium hover:underline">
          Зарегистрироваться
        </Link>
      </p>
    </Card>
  );
}
