import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { news, getNewsBySlug } from "@/lib/data/news";
import { getTournamentById } from "@/lib/data/tournaments";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export default async function NewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) notFound();

  const related = post.relatedTournamentId ? getTournamentById(post.relatedTournamentId) : null;
  const more = news.filter((n) => n.id !== post.id).slice(0, 3);

  return (
    <article>
      <div className="border-b border-border-subtle bg-bg-surface/30">
        <div className="container py-10">
          <nav className="flex items-center gap-1.5 text-xs text-fg-muted mb-6">
            <Link href="/" className="hover:text-fg-secondary">Главная</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/news" className="hover:text-fg-secondary">Новости</Link>
          </nav>

          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="accent" size="sm">{tag}</Badge>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-5">
              {post.title}
            </h1>
            <p className="text-lg text-fg-secondary leading-relaxed">{post.excerpt}</p>
            <div className="flex items-center gap-4 mt-6 text-sm text-fg-muted">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                {post.authorName}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-10">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <div className="aspect-[16/9] rounded-lg overflow-hidden bg-bg-elevated mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.coverUrl} alt={post.title} className="h-full w-full object-cover" />
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-base sm:text-lg text-fg-secondary leading-relaxed mb-5">
                {post.excerpt}
              </p>
              <p className="text-fg-secondary leading-relaxed mb-5">
                Это демо-версия материала. В production здесь будет рендер markdown-контента
                с поддержкой изображений, видео-вложений и цитат.
              </p>
              <p className="text-fg-secondary leading-relaxed">
                Платформа поддерживает связь публикаций с турнирами и пилотами — внизу
                справа можно увидеть связанный турнир, если он есть.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            {related && (
              <Card className="overflow-hidden">
                <div className="aspect-[16/9] overflow-hidden bg-bg-elevated relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={related.coverUrl} alt={related.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-2">
                    Связанный турнир
                  </p>
                  <h3 className="font-bold text-fg-primary mb-2">{related.title}</h3>
                  <p className="text-sm text-fg-secondary mb-3">{formatDate(related.startsAt)}</p>
                  <Link
                    href={`/tournaments/${related.slug}`}
                    className="text-sm font-medium text-accent hover:underline"
                  >
                    Открыть страницу турнира →
                  </Link>
                </div>
              </Card>
            )}

            <div>
              <h3 className="text-sm font-semibold text-fg-muted uppercase tracking-wider mb-4">
                Читайте также
              </h3>
              <div className="space-y-3">
                {more.map((p) => (
                  <Link key={p.id} href={`/news/${p.slug}`} className="group block">
                    <Card className="p-4 hover:border-accent/40 transition-colors">
                      <p className="text-xs text-fg-muted mb-1.5">{formatDate(p.publishedAt)}</p>
                      <h4 className="text-sm font-semibold text-fg-primary line-clamp-2 group-hover:text-accent transition-colors leading-snug">
                        {p.title}
                      </h4>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
