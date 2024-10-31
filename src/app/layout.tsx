import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/header";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://lazy-learning.geeekgod.in"),
  title: "Lazy Learning",
  description: "Your Personal Learning Assistant",
  icons: "/logo.png",
  openGraph: {
    title: "Lazy Learning",
    description: "Your Personal Learning Assistant",
    images: [
      {
        url: "/assets/img/banner.png",
        width: 1200,
        height: 630,
        alt: "Lazy Learning",
      },
    ],
    type: "website",
    countryName: "India",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen")}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
