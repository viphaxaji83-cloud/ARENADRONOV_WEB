import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input, Field, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Настройки платформы" };

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Настройки платформы</h1>
        <p className="text-fg-secondary mt-1">Глобальные параметры ArenaDronov</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Общие</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <Field label="Название платформы">
            <Input defaultValue="ArenaDronov" />
          </Field>
          <Field label="Контактный email">
            <Input type="email" defaultValue="hello@arenadronov.test" />
          </Field>
          <Field label="Описание">
            <Textarea
              rows={3}
              defaultValue="Платформа турниров по дрон-рейсингу: расписание, регистрация, рейтинг."
            />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email-уведомления</CardTitle>
          <CardDescription>Шаблоны транзакционных писем</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {[
            "Подтверждение заявки",
            "Отклонение заявки",
            "Напоминание о турнире",
            "Публикация результатов",
            "Еженедельный дайджест",
          ].map((label, i) => (
            <div
              key={label}
              className="flex items-center justify-between py-2 border-b border-border-subtle last:border-0"
            >
              <div>
                <p className="font-medium">{label}</p>
                <p className="text-xs text-fg-muted">Шаблон по умолчанию</p>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  defaultChecked={i !== 4}
                  className="h-5 w-9 appearance-none rounded-full bg-bg-elevated border border-border-strong relative cursor-pointer transition-colors checked:bg-accent before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:h-3.5 before:w-3.5 before:rounded-full before:bg-white before:transition-transform checked:before:translate-x-4"
                />
                <Button variant="ghost" size="sm">Шаблон</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Рейтинговая модель</CardTitle>
          <CardDescription>Очки за места в турнире</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {[100, 80, 65, 50, 40, 32, 26, 21].map((pts, i) => (
              <Field key={i} label={`#${i + 1}`}>
                <Input type="number" defaultValue={pts} />
              </Field>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Хранилище</CardTitle>
          <CardDescription>S3-совместимое</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field label="Bucket">
            <Input defaultValue="arenadronov-prod" />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Region">
              <Input defaultValue="auto" />
            </Field>
            <Field label="CDN URL">
              <Input defaultValue="https://cdn.arenadronov.test" />
            </Field>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3 sticky bottom-0 -mx-4 sm:mx-0 px-4 sm:px-0 py-4 bg-bg-base/80 backdrop-blur border-t border-border-subtle">
        <Button variant="ghost">Отменить</Button>
        <Button>Сохранить</Button>
      </div>
    </div>
  );
}
