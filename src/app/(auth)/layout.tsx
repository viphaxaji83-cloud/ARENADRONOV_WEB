import Link from "next/link";
import { Logo } from "@/components/brand/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-bg-base flex flex-col">
      <header className="container py-6">
        <Logo />
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">{children}</div>
      </main>
      <footer className="container py-6 text-center text-xs text-fg-muted">
        © 2026 ArenaDronov ·{" "}
        <Link href="/" className="hover:text-fg-secondary">На главную</Link>
      </footer>
    </div>
  );
}
