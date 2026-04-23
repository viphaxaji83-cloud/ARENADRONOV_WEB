import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input, Textarea, Field, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getPilotById } from "@/lib/data/pilots";
import { disciplineLabel } from "@/lib/labels";

export const metadata = { title: "Профиль" };

export default function AppProfilePage() {
  const me = getPilotById("p7")!;

  return (
    <div className="space-y-6 max-w-3xl">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Профиль пилота</h1>
        <p className="text-fg-secondary mt-1">Так вас видят на платформе и в публичных профилях</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Аватар</CardTitle>
          <CardDescription>Квадратное изображение, JPG/PNG, до 2MB</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-5">
          <Avatar src={me.avatarUrl} name={me.displayName} size="xl" />
          <div className="flex flex-col gap-2">
            <Button variant="secondary" size="sm">Загрузить новый</Button>
            <Button variant="ghost" size="sm">Удалить</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Основные данные</CardTitle>
          <CardDescription>Эти поля видны другим пользователям</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Никнейм"
              hint="Сменить можно 1 раз в 30 дней"
            >
              <Input defaultValue={me.handle} />
            </Field>
            <Field label="Отображаемое имя" required>
              <Input defaultValue={me.displayName} />
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Город">
              <Input defaultValue={me.city} />
            </Field>
            <Field label="Команда">
              <Input defaultValue={me.teamName ?? ""} placeholder="Без команды" />
            </Field>
          </div>
          <Field label="О себе" hint="Краткое био — до 280 символов">
            <Textarea defaultValue={me.bio} maxLength={280} />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Классы</CardTitle>
          <CardDescription>Выберите классы, в которых выступаете</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {(["class_5inch", "freestyle_race", "multi_class", "cinewhoop", "tinywhoop"] as const).map(
              (c) => {
                const active = me.classPrefs.includes(c);
                return (
                  <button
                    key={c}
                    className={`h-9 px-4 rounded-md border text-sm font-medium transition-colors ${
                      active
                        ? "bg-accent text-accent-fg border-accent"
                        : "border-border-strong text-fg-secondary hover:text-fg-primary"
                    }`}
                  >
                    {disciplineLabel[c]}
                  </button>
                );
              },
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Социальные сети</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="YouTube">
              <Input placeholder="@nickname" defaultValue={me.socials.youtube ?? ""} />
            </Field>
            <Field label="Instagram">
              <Input placeholder="@nickname" defaultValue={me.socials.instagram ?? ""} />
            </Field>
            <Field label="Telegram">
              <Input placeholder="@nickname" defaultValue={me.socials.telegram ?? ""} />
            </Field>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="ghost">Отменить</Button>
        <Button>Сохранить изменения</Button>
      </div>
    </div>
  );
}
