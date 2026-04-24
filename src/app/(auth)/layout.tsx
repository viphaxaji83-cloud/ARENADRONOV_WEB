import { redirectIfAuthenticated } from "@/lib/auth";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  await redirectIfAuthenticated();

  return (
    <div className="min-h-dvh bg-bg-base">
      <main className="min-h-dvh flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
