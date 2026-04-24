import { AppShell } from "@/components/layout/app-shell";
import { requireRole } from "@/lib/auth";

export const metadata = { title: { default: "Кабинет пилота", template: "%s · Кабинет пилота" } };

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  await requireRole("participant");
  return <AppShell>{children}</AppShell>;
}
