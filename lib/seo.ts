import type { JsonLdGraph } from "./types";
import { CONTACT_EMAIL, SERVICES, SPECIALTIES } from "./constants";

/**
 * Single source of truth for the production origin. Override via
 * NEXT_PUBLIC_SITE_URL in the Vercel dashboard once a custom domain is live —
 * every canonical URL, sitemap entry and schema @id derives from this.
 */
export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://sr-conservation-restoration-web.vercel.app";

export const SITE_NAME = "S.R. Conservación y Restauración";

/** Stable @id anchors so the graph nodes reference each other instead of duplicating. */
const BUSINESS_ID = `${SITE_URL}/#business`;
const PERSON_ID = `${SITE_URL}/#solange`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * ProfessionalService (a LocalBusiness subtype) is the right fit: a Lima-based
 * practice serving museums, collectors and heritage institutions.
 *
 * Still omitted until Solange confirms real values — inventing them would
 * publish false business data and can get the markup flagged as spam:
 *   telephone, sameAs (social profiles), geo, address.streetAddress,
 *   openingHours, foundingDate, aggregateRating.
 */
export const SITE_JSON_LD: JsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": BUSINESS_ID,
      name: SITE_NAME,
      alternateName: "Solange Rodríguez — Conservación y Restauración",
      description:
        "Conservación y restauración de bienes culturales en Lima, Perú: pintura colonial, escultura policromada, murales, cerámica y documentación patrimonial.",
      url: SITE_URL,
      email: CONTACT_EMAIL,
      image: `${SITE_URL}/hero-cyr-solange.webp`,
      logo: `${SITE_URL}/sr-isotipo.webp`,
      inLanguage: "es-PE",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lima",
        addressCountry: "PE",
      },
      areaServed: {
        "@type": "Country",
        name: "Perú",
      },
      founder: { "@id": PERSON_ID },
      knowsAbout: SPECIALTIES.map((specialty) => specialty.title),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios de conservación y restauración",
        itemListElement: SERVICES.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
          },
        })),
      },
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Solange Rodríguez",
      jobTitle: "Conservadora y restauradora de bienes culturales",
      description:
        "Conservadora y restauradora especializada en pintura colonial, escultura policromada y pintura mural.",
      url: `${SITE_URL}/sobre-mi`,
      worksFor: { "@id": BUSINESS_ID },
      knowsLanguage: "es-PE",
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "es-PE",
      publisher: { "@id": BUSINESS_ID },
    },
  ],
};
