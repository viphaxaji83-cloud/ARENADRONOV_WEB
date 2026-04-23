import Link from "next/link";
import { Plus, Pencil, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { news } from "@/lib/data/news";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Новости" };

export default function AdminNewsPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Новости</h1>
          <p className="text-fg-secondary mt-1">Публикации, черновики и анонсы</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Создать новость
        </Button>
      </header>

      <Card className="overflow-hidden">
        <Table>
          <THead>
            <TR>
              <TH>Публикация</TH>
              <TH>Теги</TH>
              <TH>Автор</TH>
              <TH>Дата</TH>
              <TH>Статус</TH>
              <TH className="w-12 pr-5"></TH>
            </TR>
          </THead>
          <TBody>
            {news.map((post) => (
              <TR key={post.id}>
                <TD>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-14 rounded-md bg-bg-elevated overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.coverUrl} alt="" className="h-full w-full object-cover" />
                    </div>
                    <Link href={`/news/${post.slug}`} className="hover:text-accent">
                      <p className="text-sm font-medium line-clamp-1">{post.title}</p>
                      <p className="text-xs text-fg-muted line-clamp-1">{post.excerpt}</p>
                    </Link>
                  </div>
                </TD>
                <TD>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((t) => (
                      <Badge key={t} size="sm">{t}</Badge>
                    ))}
                  </div>
                </TD>
                <TD className="text-xs text-fg-secondary">{post.authorName}</TD>
                <TD className="text-xs text-fg-secondary">{formatDate(post.publishedAt)}</TD>
                <TD>
                  <Badge variant={post.status === "published" ? "success" : "neutral"} dot>
                    {post.status === "published" ? "Опубликовано" : "Черновик"}
                  </Badge>
                </TD>
                <TD className="pr-5 text-right">
                  <button className="h-8 w-8 inline-flex items-center justify-center rounded-md text-fg-muted hover:text-fg-primary hover:bg-bg-elevated">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </Card>
    </div>
  );
}
