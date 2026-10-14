# SEO Guide for Sco-errands Square

This guide explains how Search Engine Optimization (SEO) is implemented in this Next.js project, how search engines crawl it, and how you can manage and expand your SEO independently.

---

## 1. How Next.js App Router SEO Works

In Next.js App Router, SEO metadata is handled via the native `metadata` object and `generateMetadata` function.

### A. Root / Global Defaults (`src/app/layout.tsx`)
The root layout defines the global defaults:
- **`metadataBase`**: Base URL for all canonical tags and social preview images (defaults to your Vercel URL or `NEXT_PUBLIC_SITE_URL`).
- **`title.template`**: Formats all child page titles automatically as `"<Page Title> | Sco-errands square"`.
- **`keywords`**: Target search terms across Kenya (Nairobi, Ruiru, Kiambu, house hunting, movers, schools, transport).
- **`openGraph` & `twitter`**: Controls how links appear when shared on WhatsApp, Facebook, X (Twitter), and LinkedIn.
- **`robots`**: Informs Googlebot and other crawlers that your public pages are indexable.

### B. Static Page Metadata (`src/app/<route>/page.tsx`)
Static pages export a `metadata` object. For example, in [`src/app/house-hunters/page.tsx`](src/app/house-hunters/page.tsx):
```tsx
export const metadata: Metadata = {
  title: "Nyumba Yangu - Verified Rental Houses in Kenya",
  description: "Browse verified rental houses scouted across Ruiru, Kiambu, and Nairobi...",
  keywords: ["Nyumba Yangu", "rental houses Ruiru", "apartments for rent Kiambu"],
  alternates: {
    canonical: "/house-hunters",
  },
};
```

### C. Dynamic Page Metadata (`src/app/<route>/[id]/page.tsx`)
When a visitor or search bot visits an individual listing (e.g. `/house-hunters/h1`), Next.js calls `generateMetadata`:
```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const listing = MOCK_LISTINGS.find((l) => l.id === id); // or Firestore fetch

  return {
    title: `${listing.title} in ${listing.location} - KES ${listing.price}/month`,
    description: listing.description,
    openGraph: {
      title: listing.title,
      description: listing.description,
      images: [{ url: listing.images[0] }],
    },
    alternates: {
      canonical: `/house-hunters/${id}`,
    },
  };
}
```

---

## 2. Dynamic Sitemap & Robots.txt

### Sitemap (`/sitemap.xml`) — [`src/app/sitemap.ts`](src/app/sitemap.ts)
- Automatically generated on-the-fly.
- Lists all core category pages (`/house-hunters`, `/movers`, `/schools-nearby`, etc.).
- Dynamically iterates over listings to generate unique URLs for every listing with priority weighting.
- Search engines read this file to discover all pages on your site.

### Robots.txt (`/robots.txt`) — [`src/app/robots.ts`](src/app/robots.ts)
- Instructs search engines which pages they can crawl.
- Allows all public content (`/`).
- Disallows private paths like `/admin` and `/cart`.
- Points crawlers to `${baseUrl}/sitemap.xml`.

---

## 3. Structured Data / Schema.org (`src/components/JsonLd.tsx`)
Google uses JSON-LD structured data to show Rich Snippets (knowledge graph cards, local business details, and site search boxes).

[`src/components/JsonLd.tsx`](src/components/JsonLd.tsx) injects Schema.org data for:
- `Organization` (Name, logo, country code `KE`, service areas)
- `WebSite`

---

## 4. How to Set Your Production Domain

Once deployed on Vercel or when you attach a custom domain (e.g. `https://scoerrands.co.ke`):

1. Go to your **Vercel Dashboard** -> Select Project -> **Settings** -> **Environment Variables**.
2. Add:
   - **Key**: `NEXT_PUBLIC_SITE_URL`
   - **Value**: `https://your-custom-domain.com` (or your `.vercel.app` URL)
3. Redeploy the project. All sitemaps, robots.txt, canonical URLs, and OpenGraph tags will immediately use your live domain.

---

## 5. Connecting Google Search Console

To start ranking on Google Search:

1. Visit [search.google.com/search-console](https://search.google.com/search-console).
2. Add your property (e.g. `https://sco-errands-square.vercel.app` or your custom domain).
3. Under **HTML tag verification**, copy your verification code (e.g. `google-site-verification=XYZ123`).
4. In [`src/app/layout.tsx`](src/app/layout.tsx), add under `metadata`:
   ```ts
   verification: {
     google: "XYZ123",
   },
   ```
5. Deploy to Vercel and click **Verify** in Search Console.
6. In Google Search Console, go to **Sitemaps** on the left menu, enter `sitemap.xml`, and click **Submit**. Google will automatically crawl and index all your listings!

---

## 6. How to Test Your SEO & Social Cards

- **Google Rich Results Test**: [search.google.com/test/rich-results](https://search.google.com/test/rich-results) (verifies your JSON-LD schema).
- **Facebook Sharing Debugger**: [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug) (previews WhatsApp and Facebook links).
- **Twitter Card Validator**: [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator) (previews X/Twitter cards).
