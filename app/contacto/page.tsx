import type { Metadata } from "next";
import ContactHero from "@/components/sections/ContactHero";
import ContactInfo from "@/components/sections/ContactInfo";

export const metadata: Metadata = {
  title: "Contacto — Solange Rodríguez",
  description:
    "Contacta a Solange Rodríguez para consultas sobre conservación y restauración de bienes culturales en Lima, Perú.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto — Solange Rodríguez",
    url: "/contacto",
    description:
      "Contacta a Solange Rodríguez para servicios profesionales de conservación y restauración.",
    locale: "es_PE",
    type: "website",
  },
};

export default function ContactoPage() {
  return (
    <main id="contenido">
      <ContactHero />
      <ContactInfo />
    </main>
  );
}
