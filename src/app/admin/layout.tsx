import { AdminShell } from "@/components/layout/admin-shell";

export const metadata = { title: { default: "Админка", template: "%s · Админка" } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
