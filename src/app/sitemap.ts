import type { MetadataRoute } from "next";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import { CATEGORY_CONFIG } from "@/lib/types";

/**
 * Next.js App Router dynamic sitemap generator (/sitemap.xml).
 * Automatically lists all core category routes and individual listing pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sco-errands-square.vercel.app";
  const lastModified = new Date();

  // Core static marketing and category pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/house-hunters`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/schools-nearby`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/movers`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/property`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/school-transport`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Dynamic listing pages for search engine indexing
  const listingPages: MetadataRoute.Sitemap = MOCK_LISTINGS.map((listing) => {
    const route = CATEGORY_CONFIG[listing.category]?.route || `/${listing.category}`;
    return {
      url: `${baseUrl}${route}/${listing.id}`,
      lastModified,
      changeFrequency: "weekly",
      priority: listing.isPrioritized ? 0.8 : 0.6,
    };
  });

  return [...staticPages, ...listingPages];
}
