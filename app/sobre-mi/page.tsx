import type { Metadata } from "next";
import AboutHero from "@/components/sections/AboutHero";
import Biography from "@/components/sections/Biography";
import Philosophy from "@/components/sections/Philosophy";
import Process from "@/components/sections/Process";
import Timeline from "@/components/sections/Timeline";
import Credentials from "@/components/sections/Credentials";
import AboutCta from "@/components/sections/AboutCta";

export const metadata: Metadata = {
  title: "Sobre mí — Solange Rodríguez",
  description:
    "Conservadora y restauradora de bienes culturales con más de ocho años de experiencia en pintura colonial, escultura, cerámica y murales en Lima, Perú.",
  alternates: { canonical: "/sobre-mi" },
  openGraph: {
    title: "Sobre mí — Solange Rodríguez",
    url: "/sobre-mi",
    description:
      "Conservadora y restauradora de bienes culturales con más de ocho años de experiencia en Lima, Perú.",
    locale: "es_PE",
    type: "website",
  },
};

export default function SobreMiPage() {
  return (
    /* Timeline moved up behind Biography: the career arc continues the life
       story, and it leaves Philosophy — the only full-bleed moment here — as
       the centre hinge instead of stranding three identical sections in a row. */
    <main id="contenido">
      <AboutHero />
      <Biography />
      <Timeline />
      <Philosophy />
      <Process />
      <Credentials />
      <AboutCta />
    </main>
  );
}
