import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input, Field } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata = { title: "Настройки" };

export default function AppSettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Настройки</h1>
        <p className="text-fg-secondary mt-1">Аккаунт, безопасность и уведомления</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Email</CardTitle>
          <CardDescription>Используется для входа и уведомлений</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3 items-end">
          <Field className="flex-1" label="Email">
            <Input type="email" defaultValue="blitz@arenadronov.test" />
          </Field>
          <Button variant="secondary">Изменить</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Пароль</CardTitle>
          <CardDescription>Минимум 8 символов, рекомендуем смешанный набор</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field label="Текущий пароль">
            <Input type="password" placeholder="••••••••" />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Новый пароль">
              <Input type="password" placeholder="••••••••" />
            </Field>
            <Field label="Подтверждение">
              <Input type="password" placeholder="••••••••" />
            </Field>
          </div>
          <div>
            <Button>Обновить пароль</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Уведомления по email</CardTitle>
          <CardDescription>Что присылать на почту помимо in-app уведомлений</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { id: "n1", label: "Решения по моим заявкам", default: true },
            { id: "n2", label: "Напоминания о ближайших турнирах", default: true },
            { id: "n3", label: "Публикация результатов", default: true },
            { id: "n4", label: "Еженедельный дайджест новостей", default: false },
          ].map((opt) => (
            <label
              key={opt.id}
              className="flex items-center justify-between gap-3 py-2 cursor-pointer"
            >
              <span className="text-sm text-fg-primary">{opt.label}</span>
              <input
                type="checkbox"
                defaultChecked={opt.default}
                className="h-5 w-9 appearance-none rounded-full bg-bg-elevated border border-border-strong relative cursor-pointer transition-colors checked:bg-accent before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:h-3.5 before:w-3.5 before:rounded-full before:bg-white before:transition-transform checked:before:translate-x-4"
              />
            </label>
          ))}
        </CardContent>
      </Card>

      <Card className="border-danger/30">
        <CardHeader>
          <CardTitle className="text-danger">Опасная зона</CardTitle>
          <CardDescription>Действия, которые нельзя отменить</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Separator />
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-fg-primary">Удалить аккаунт</p>
              <p className="text-xs text-fg-muted mt-0.5">
                Профиль и история выступлений будут удалены безвозвратно
              </p>
            </div>
            <Button variant="danger" size="sm">Удалить</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
