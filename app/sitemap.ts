import type { MetadataRoute } from "next";
import { SITE_URL } from "./seo";

// Only the pages meant for search. The "earlier version" legal pages are left out on purpose (they are noindex).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { path: "/", priority: 1 },
    { path: "/support", priority: 0.5 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
    { path: "/consumer-health-data-privacy-policy", priority: 0.3 },
  ].map(({ path, priority }) => ({ url: `${SITE_URL}${path === "/" ? "" : path}`, changeFrequency: "monthly", priority }));
}
