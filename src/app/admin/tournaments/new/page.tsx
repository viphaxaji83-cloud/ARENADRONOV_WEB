import Link from "next/link";
import { ChevronRight, ImagePlus, Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input, Textarea, Field, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Новый турнир" };

export default function AdminNewTournamentPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <nav className="flex items-center gap-1.5 text-xs text-fg-muted">
        <Link href="/admin" className="hover:text-fg-secondary">Сводка</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/admin/tournaments" className="hover:text-fg-secondary">Турниры</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-fg-secondary">Новый</span>
      </nav>

      <header>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Создание турнира</h1>
        <p className="text-fg-secondary mt-1">Заполните основные поля. Черновик сохраняется автоматически.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Обложка</CardTitle>
          <CardDescription>16:9, JPG/PNG/WEBP, до 5MB</CardDescription>
        </CardHeader>
        <CardContent>
          <button className="aspect-[16/7] w-full rounded-lg border-2 border-dashed border-border-strong bg-bg-elevated/50 flex flex-col items-center justify-center gap-2 hover:border-accent transition-colors group">
            <div className="h-12 w-12 rounded-md bg-bg-elevated flex items-center justify-center text-fg-muted group-hover:text-accent">
              <ImagePlus className="h-6 w-6" />
            </div>
            <p className="text-sm text-fg-secondary">Нажмите для загрузки или перетащите</p>
            <p className="text-xs text-fg-muted">Рекомендуем 1600×700</p>
          </button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Основные данные</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <Field label="Название" required>
            <Input placeholder="Например: Spring Cup 2026" />
          </Field>
          <Field label="Подзаголовок">
            <Input placeholder="Краткое описание одной строкой" />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Дисциплина" required>
              <Select>
                <option>Класс 5"</option>
                <option>Cinewhoop</option>
                <option>Tinywhoop</option>
                <option>Multi-class</option>
                <option>Freestyle Race</option>
              </Select>
            </Field>
            <Field label="Формат" required>
              <Select>
                <option>Elimination</option>
                <option>Time Trial</option>
                <option>Round Robin</option>
                <option>Mixed</option>
              </Select>
            </Field>
          </div>
          <Field label="Площадка" required>
            <Input placeholder="Название арены или трека" />
          </Field>
          <Field label="Описание" hint="Markdown поддерживается">
            <Textarea rows={6} placeholder="Расскажите о турнире..." />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Даты и регистрация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Старт турнира" required>
              <Input type="datetime-local" />
            </Field>
            <Field label="Завершение" required>
              <Input type="datetime-local" />
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Регистрация открывается" required>
              <Input type="datetime-local" />
            </Field>
            <Field label="Регистрация закрывается" required>
              <Input type="datetime-local" />
            </Field>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Лимит участников" required>
              <Input type="number" placeholder="32" min="1" />
            </Field>
            <Field label="Призовой фонд">
              <Input placeholder="350 000 ₽" />
            </Field>
            <Field label="Взнос">
              <Input placeholder="3 500 ₽ или 'Бесплатно'" />
            </Field>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Правила</CardTitle>
          <CardDescription>Полный регламент турнира — Markdown</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea rows={8} placeholder="# Регламент..." />
        </CardContent>
      </Card>

      <div className="sticky bottom-0 -mx-4 sm:mx-0 px-4 sm:px-0 py-4 bg-bg-base/80 backdrop-blur border-t border-border-subtle flex items-center justify-between gap-3">
        <p className="text-xs text-fg-muted">
          Черновик сохраняется автоматически
        </p>
        <div className="flex gap-2">
          <Link href="/admin/tournaments">
            <Button variant="ghost">Отмена</Button>
          </Link>
          <Button variant="secondary">
            <Save className="h-4 w-4" />
            Сохранить как черновик
          </Button>
          <Button>Опубликовать</Button>
        </div>
      </div>
    </div>
  );
}
