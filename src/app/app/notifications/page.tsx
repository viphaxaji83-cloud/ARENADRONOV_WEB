import Link from "next/link";
import { Bell, Check, CheckCheck, ClipboardCheck, Trophy, Newspaper, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty";
import { notifications } from "@/lib/data/results";
import { formatRelative, cn } from "@/lib/utils";
import type { NotificationType } from "@/lib/types";

export const metadata = { title: "Уведомления" };

const typeIcon: Record<NotificationType, React.ReactNode> = {
  registration_approved: <ClipboardCheck className="h-4 w-4" />,
  registration_rejected: <AlertTriangle className="h-4 w-4" />,
  tournament_upcoming: <Trophy className="h-4 w-4" />,
  result_published: <Trophy className="h-4 w-4" />,
  news_digest: <Newspaper className="h-4 w-4" />,
};

const typeColor: Record<NotificationType, string> = {
  registration_approved: "text-success bg-success-muted",
  registration_rejected: "text-danger bg-danger-muted",
  tournament_upcoming: "text-accent bg-accent-muted",
  result_published: "text-info bg-info-muted",
  news_digest: "text-fg-secondary bg-bg-elevated",
};

export default function AppNotificationsPage() {
  const meId = "p7";
  const myNotifs = notifications.filter((n) => n.userId === meId);
  const unread = myNotifs.filter((n) => !n.readAt);
  const read = myNotifs.filter((n) => n.readAt);

  return (
    <div className="space-y-6 max-w-3xl">
      <header className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Уведомления</h1>
          <p className="text-fg-secondary mt-1">
            {unread.length > 0
              ? `${unread.length} непрочитанных из ${myNotifs.length}`
              : "Все уведомления прочитаны"}
          </p>
        </div>
        {unread.length > 0 && (
          <Button variant="secondary" size="sm">
            <CheckCheck className="h-3.5 w-3.5" />
            Прочитать все
          </Button>
        )}
      </header>

      {myNotifs.length === 0 ? (
        <EmptyState
          icon={<Bell className="h-6 w-6" />}
          title="Уведомлений пока нет"
          description="Здесь появятся ответы по заявкам, обновления турниров и важные события."
        />
      ) : (
        <>
          {unread.length > 0 && (
            <section>
              <h2 className="text-xs uppercase tracking-wider text-fg-muted font-semibold mb-3 px-1">
                Новые
              </h2>
              <Card className="overflow-hidden border-accent/20">
                <ul className="divide-y divide-border-subtle">
                  {unread.map((n) => (
                    <NotificationRow key={n.id} notif={n} unread />
                  ))}
                </ul>
              </Card>
            </section>
          )}

          {read.length > 0 && (
            <section>
              <h2 className="text-xs uppercase tracking-wider text-fg-muted font-semibold mb-3 px-1">
                Прочитанные
              </h2>
              <Card className="overflow-hidden">
                <ul className="divide-y divide-border-subtle">
                  {read.map((n) => (
                    <NotificationRow key={n.id} notif={n} />
                  ))}
                </ul>
              </Card>
            </section>
          )}
        </>
      )}
    </div>
  );
}

function NotificationRow({
  notif,
  unread,
}: {
  notif: (typeof notifications)[number];
  unread?: boolean;
}) {
  const content = (
    <div
      className={cn(
        "flex items-start gap-3 p-4 transition-colors",
        notif.link && "hover:bg-bg-elevated/40",
      )}
    >
      <div
        className={cn(
          "h-9 w-9 rounded-md flex items-center justify-center shrink-0",
          typeColor[notif.type],
        )}
      >
        {typeIcon[notif.type]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <p className={cn("text-sm font-medium text-fg-primary", unread && "font-semibold")}>
            {notif.title}
          </p>
          {unread && <span className="h-2 w-2 rounded-full bg-accent shrink-0 mt-1.5" />}
        </div>
        <p className="text-sm text-fg-secondary mt-0.5">{notif.body}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs text-fg-muted whitespace-nowrap">
          {formatRelative(notif.createdAt)}
        </p>
        {unread && (
          <button className="text-xs text-fg-muted hover:text-accent inline-flex items-center gap-1 mt-2">
            <Check className="h-3 w-3" />
            Прочитать
          </button>
        )}
      </div>
    </div>
  );
  return notif.link ? (
    <li>
      <Link href={notif.link}>{content}</Link>
    </li>
  ) : (
    <li>{content}</li>
  );
}
