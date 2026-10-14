import type { MetadataRoute } from "next";

/**
 * Next.js App Router robots.txt generator.
 * Crawlers will be pointed to your dynamic sitemap and disallowed from admin/cart pages.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sco-errands-square.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/cart"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
