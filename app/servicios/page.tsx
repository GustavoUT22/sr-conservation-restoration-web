import type { Metadata } from "next";
import ServicesHero from "@/components/sections/ServicesHero";
import ServicesList from "@/components/sections/ServicesList";
import Diagnosis from "@/components/sections/Diagnosis";
import AboutCta from "@/components/sections/AboutCta";

export const metadata: Metadata = {
  title: "Servicios — Solange Rodríguez",
  description:
    "Servicios de conservación preventiva, restauración de pintura y escultura, y documentación patrimonial en Lima, Perú.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios — Solange Rodríguez",
    url: "/servicios",
    description:
      "Servicios profesionales de conservación y restauración de bienes culturales en Lima, Perú.",
    locale: "es_PE",
    type: "website",
  },
};

export default function ServiciosPage() {
  return (
    <main id="contenido">
      <ServicesHero />
      <ServicesList />
      <Diagnosis />
      <AboutCta />
    </main>
  );
}
