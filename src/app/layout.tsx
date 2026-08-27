import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://squarefeetdesignspace.com"),
  title: {
    default: "SquareFeet Design Space — Architecture & Construction",
    template: "%s | SquareFeet Design Space",
  },
  description:
    "SquareFeet Design Space is an architecture and construction company delivering precision-built spaces across India.",
  keywords: [
    "architecture",
    "construction",
    "interior design",
    "India",
    "SquareFeet Design Space",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "SquareFeet Design Space",
    title: "SquareFeet Design Space — Architecture & Construction",
    description:
      "Architecture, engineering, and construction delivered with precision.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SquareFeet Design Space",
    description:
      "Architecture, engineering, and construction delivered with precision.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex min-h-dvh flex-col bg-canvas text-ink antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
