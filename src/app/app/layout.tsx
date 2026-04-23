import { AppShell } from "@/components/layout/app-shell";

export const metadata = { title: { default: "Кабинет пилота", template: "%s · Кабинет пилота" } };

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
