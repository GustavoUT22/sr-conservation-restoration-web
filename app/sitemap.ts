import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Google only honours <lastmod> when it is verifiably accurate, so these dates
 * are maintained by hand and reflect the last real content change per route
 * (sourced from git history). Do NOT swap them for `new Date()` — that would
 * stamp every route as freshly modified on each deploy and Google would start
 * ignoring the signal entirely.
 *
 * <priority> and <changefreq> are intentionally omitted: Google ignores both.
 */
const ROUTES: ReadonlyArray<{ path: string; lastModified: string }> = [
  { path: "/", lastModified: "2026-06-19" },
  { path: "/sobre-mi", lastModified: "2026-06-18" },
  { path: "/servicios", lastModified: "2026-06-18" },
  { path: "/contacto", lastModified: "2026-06-18" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, lastModified }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
  }));
}
