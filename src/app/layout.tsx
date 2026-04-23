import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "АРЕНА ДРОНОВ — турниры по дрон-рейсингу",
    template: "%s · АРЕНА ДРОНОВ",
  },
  description:
    "Платформа турниров по дрон-рейсингу: расписание, регистрация и рейтинг пилотов.",
  metadataBase: new URL("https://arenadronov.local"),
  openGraph: {
    title: "АРЕНА ДРОНОВ",
    description: "Турниры, регистрация и рейтинг дрон-рейсинга в одном месте.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" data-theme="dark" data-brand="neon" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Oswald:wght@300;400;500;600;700&family=Russo+One&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
