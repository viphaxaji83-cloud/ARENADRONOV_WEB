import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { news } from "@/lib/data/news";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Новости" };

export default function NewsPage() {
  const [featured, ...rest] = news;
  return (
    <div className="container py-10 sm:py-14">
      <div className="mb-10 flex flex-col gap-3">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold">Сцена</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Новости</h1>
        <p className="text-fg-secondary max-w-2xl">
          Анонсы турниров, итоги, интервью и обновления платформы.
        </p>
      </div>

      {/* Featured */}
      <Link href={`/news/${featured.slug}`} className="group block mb-10">
        <Card className="overflow-hidden hover:border-accent/40 transition-colors">
          <div className="grid lg:grid-cols-2">
            <div className="aspect-[16/10] lg:aspect-auto overflow-hidden bg-bg-elevated relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.coverUrl}
                alt={featured.title}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center gap-4">
              <Badge variant="accent" dot className="self-start">
                Главное
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight group-hover:text-accent transition-colors">
                {featured.title}
              </h2>
              <p className="text-fg-secondary text-base sm:text-lg leading-relaxed">{featured.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-fg-muted mt-2">
                <span>{formatDate(featured.publishedAt)}</span>
                <span>·</span>
                <span>{featured.authorName}</span>
              </div>
            </div>
          </div>
        </Card>
      </Link>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <Link key={post.id} href={`/news/${post.slug}`} className="group block">
            <Card className="overflow-hidden hover:border-accent/40 transition-colors h-full flex flex-col">
              <div className="aspect-[16/9] overflow-hidden bg-bg-elevated relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.coverUrl}
                  alt={post.title}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-accent font-semibold uppercase tracking-wider">
                    {post.tags[0]}
                  </span>
                  <span className="text-fg-muted">·</span>
                  <span className="text-fg-muted">{formatDate(post.publishedAt)}</span>
                </div>
                <h3 className="font-bold text-fg-primary line-clamp-2 group-hover:text-accent transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-sm text-fg-secondary line-clamp-3">{post.excerpt}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
