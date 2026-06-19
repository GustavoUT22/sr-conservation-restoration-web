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
  openGraph: {
    title: "Sobre mí — Solange Rodríguez",
    description:
      "Conservadora y restauradora de bienes culturales con más de ocho años de experiencia en Lima, Perú.",
    locale: "es_PE",
    type: "website",
  },
};

export default function SobreMiPage() {
  return (
    <>
      <AboutHero />
      <Biography />
      <Philosophy />
      <Process />
      <Timeline />
      <Credentials />
      <AboutCta />
    </>
  );
}
