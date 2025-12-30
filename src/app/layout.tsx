import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";
import Header from "@/components/header";
import PageTransition from "@/components/page-transition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discuss",
  description: "A minimal forum with a premium UI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground`}
      >
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 opacity-100 dark:opacity-0 bg-[radial-gradient(circle_at_15%_10%,rgba(59,130,246,0.14),transparent_40%),radial-gradient(circle_at_85%_20%,rgba(168,85,247,0.14),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.10),transparent_45%)]" />
          <div className="absolute inset-0 opacity-100 dark:opacity-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.75),rgba(255,255,255,1))]" />

          <div className="absolute inset-0 opacity-0 dark:opacity-100 bg-[radial-gradient(circle_at_15%_10%,rgba(59,130,246,0.22),transparent_40%),radial-gradient(circle_at_85%_20%,rgba(168,85,247,0.22),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.16),transparent_45%)]" />
          <div className="absolute inset-0 opacity-0 dark:opacity-100 bg-[linear-gradient(to_bottom,rgba(9,9,11,0.50),rgba(9,9,11,1))]" />
        </div>

        <Providers>
          <div className="app-container">
            <Header />
          </div>
          <main className="app-container pb-12 pt-6">
            <PageTransition>{children}</PageTransition>
          </main>
        </Providers>
      </body>
    </html>
  );
}
