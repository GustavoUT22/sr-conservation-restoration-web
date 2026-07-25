import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Works from "@/components/sections/Works";
import Specialties from "@/components/sections/Specialties";
import About from "@/components/sections/About";
import AboutCta from "@/components/sections/AboutCta";

export const metadata: Metadata = {
  title: "Solange Rodríguez — Conservación y Restauración en Lima",
  description:
    "Conservadora y restauradora de bienes culturales en Lima, Perú. Pintura colonial, escultura policromada, murales y documentación patrimonial para museos, colecciones e instituciones.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Solange Rodríguez — Conservación y Restauración",
    description:
      "Conservación y restauración de bienes culturales en Lima, Perú.",
    url: "/",
    locale: "es_PE",
    type: "website",
  },
};

/**
 * Order is deliberate. The visitor is usually a curator or collections manager
 * deciding, in seconds, whether this person can be trusted with an
 * irreplaceable object — so the evidence comes first and the statement last.
 * Works used to sit fourth, behind an aphorism.
 */
export default function Home() {
  return (
    <main id="contenido">
      <Hero />
      <Works />
      <Specialties />
      <About />
      <AboutCta />
    </main>
  );
}
