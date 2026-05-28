import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";

import "./globals.css";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import SplashScreen from "./components/layout/loading/SplashScreen";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--sans",
});

export const metadata: Metadata = {
  title: "S.R. Conservación y Restauración",
  description:
    "Conservación y restauración de bienes culturales en general, con especial atención a la pintura, escultura, cerámica, papel y textiles.",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <SplashScreen />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
