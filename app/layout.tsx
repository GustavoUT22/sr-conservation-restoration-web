import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";

import "./globals.css";
import IntroOverlay from "@/components/ui/IntroOverlay";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_JSON_LD, SITE_NAME, SITE_URL } from "@/lib/seo";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // No title.template: page titles already carry the "— Solange Rodríguez" suffix.
  title: SITE_NAME,
  description:
    "Conservación y restauración de bienes culturales en general, con especial atención a la pintura, escultura, cerámica, papel y textiles.",
  alternates: { canonical: "/" },
  openGraph: {
    siteName: SITE_NAME,
    locale: "es_PE",
    type: "website",
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        {/* Server-rendered so crawlers get the graph in the initial HTML. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_JSON_LD) }}
        />
        {/* Bypass block (WCAG 2.4.1, level A). Visible only on keyboard focus. */}
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <IntroOverlay />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
