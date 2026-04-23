import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Field } from "@/components/ui/input";

export const metadata = { title: "Регистрация" };

export default function RegisterPage() {
  return (
    <Card className="p-8 sm:p-10 shadow-glow border-accent/20">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight mb-2 uppercase">
          Создайте аккаунт пилота
        </h1>
        <p className="text-sm text-fg-secondary">
          Заявки на турниры, рейтинг сезона, профиль на платформе
        </p>
      </div>

      <form className="space-y-5">
        <Field label="Email" required>
          <Input type="email" placeholder="pilot@example.com" autoComplete="email" />
        </Field>
        <Field
          label="Никнейм пилота"
          required
          hint="Латиница, цифры, _. Будет использоваться в URL."
        >
          <Input placeholder="vortex" autoComplete="username" />
        </Field>
        <Field label="Отображаемое имя" required>
          <Input placeholder="Артём «Vortex» Кузнецов" />
        </Field>
        <Field label="Пароль" required hint="Минимум 8 символов">
          <Input type="password" placeholder="••••••••" autoComplete="new-password" />
        </Field>

        <label className="flex items-start gap-2.5 text-xs text-fg-secondary cursor-pointer">
          <input type="checkbox" className="mt-0.5 h-4 w-4 rounded accent-[hsl(var(--color-accent))]" />
          <span>
            Я принимаю{" "}
            <Link href="#" className="text-accent hover:underline">условия</Link> и{" "}
            <Link href="#" className="text-accent hover:underline">политику</Link>
          </span>
        </label>

        <Link href="/app" className="block">
          <Button className="w-full" size="lg" type="button">
            Создать аккаунт
          </Button>
        </Link>
      </form>

      <p className="mt-8 text-center text-sm text-fg-secondary">
        Уже есть аккаунт?{" "}
        <Link href="/login" className="text-accent font-medium hover:underline">
          Войти
        </Link>
      </p>
    </Card>
  );
}
