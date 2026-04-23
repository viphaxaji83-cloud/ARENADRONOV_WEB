import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ArenaDronov — турниры по дрон-рейсингу",
    template: "%s · ArenaDronov",
  },
  description:
    "Платформа турниров по дрон-рейсингу: расписание, регистрация, рейтинг пилотов, новости сцены.",
  metadataBase: new URL("https://arenadronov.local"),
  openGraph: {
    title: "ArenaDronov",
    description: "Турниры, рейтинг и сцена дрон-рейсинга в одном месте.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0f14",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" data-theme="dark" data-brand="default" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
