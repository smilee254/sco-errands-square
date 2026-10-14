/**
 * Structured Data (Schema.org / JSON-LD) component for Google Rich Results.
 * Helps search engines understand business identity, services, and location in Kenya.
 */
export default function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sco-errands-square.vercel.app";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "Sco-errands square",
        url: baseUrl,
        logo: `${baseUrl}/favicon.ico`,
        description:
          "Professional errand services in Kenya: verified house hunting (Nyumba Yangu), school finding, moving solutions, transport, and property scouting.",
        address: {
          "@type": "PostalAddress",
          addressCountry: "KE",
          addressRegion: "Kiambu / Nairobi",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Sco-errands square",
        description: "Your trusted platform for house hunting and professional errands in Kenya.",
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
