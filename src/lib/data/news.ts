import type { NewsPost } from "@/lib/types";

export const news: NewsPost[] = [
  {
    id: "n1",
    slug: "season-2026-opens",
    title: "Сезон 2026 официально открыт: что изменилось в регламенте",
    excerpt:
      "С 15 января стартует новый сезон АРЕНА ДРОНОВ. Разбираем главные изменения: новая шкала очков, обновлённые требования к технике и расширенный календарь этапов.",
    coverUrl:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1600&q=70",
    body: "Полный текст публикации...",
    tags: ["сезон", "регламент"],
    status: "published",
    publishedAt: "2026-01-12T10:00:00+03:00",
    authorName: "Редакция АРЕНА ДРОНОВ",
  },
  {
    id: "n2",
    slug: "moscow-spring-cup-announcement",
    title: "Объявлены даты Moscow Spring Cup 2026",
    excerpt:
      "9–10 мая в Москве пройдёт первый этап лиги. Регистрация открывается 15 марта. Призовой фонд — 350 000 рублей.",
    coverUrl:
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1600&q=70",
    body: "Полный текст публикации...",
    tags: ["турнир", "москва"],
    status: "published",
    publishedAt: "2026-02-20T15:30:00+03:00",
    authorName: "Редакция АРЕНА ДРОНОВ",
    relatedTournamentId: "t1",
  },
  {
    id: "n3",
    slug: "winter-indoor-results",
    title: "Winter Indoor Championship: итоги и победители",
    excerpt:
      "Завершился зимний инвестрование. Stormy завоевала первый титул в карьере, обогнав Vortex в финале с разницей 0.18 секунды.",
    coverUrl:
      "https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&w=1600&q=70",
    body: "Полный текст публикации...",
    tags: ["результаты", "tinywhoop"],
    status: "published",
    publishedAt: "2026-02-09T12:00:00+03:00",
    authorName: "Редакция АРЕНА ДРОНОВ",
    relatedTournamentId: "t5",
  },
  {
    id: "n4",
    slug: "new-pilot-registration-flow",
    title: "Новый поток регистрации: 30% быстрее",
    excerpt:
      "Мы переработали процесс подачи заявок: теперь регистрация занимает менее минуты. Что нового и как это работает.",
    coverUrl:
      "https://images.unsplash.com/photo-1581090700227-1e8c0fb9ce5b?auto=format&fit=crop&w=1600&q=70",
    body: "Полный текст публикации...",
    tags: ["платформа"],
    status: "published",
    publishedAt: "2026-03-04T09:15:00+03:00",
    authorName: "Команда платформы",
  },
  {
    id: "n5",
    slug: "interview-vortex",
    title: "Интервью с Vortex: «У сцены сейчас лучшая форма за пять лет»",
    excerpt:
      "Чемпион сезона 2025 рассказал о подготовке к новому сезону, стратегии команды и ожиданиях от Spring Cup.",
    coverUrl:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=70",
    body: "Полный текст публикации...",
    tags: ["интервью", "пилоты"],
    status: "published",
    publishedAt: "2026-03-18T18:00:00+03:00",
    authorName: "Антон Першин",
  },
];

export function getNewsBySlug(slug: string): NewsPost | undefined {
  return news.find((n) => n.slug === slug);
}
