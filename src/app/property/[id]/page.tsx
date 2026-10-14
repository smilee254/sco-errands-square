import type { Metadata } from "next";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import ListingDetail from "@/components/ListingDetail";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const listing = MOCK_LISTINGS.find((l) => l.id === id);

  if (!listing) {
    return {
      title: "Listing Not Found",
      description: "The requested property listing could not be found.",
    };
  }

  const priceText = listing.price ? ` - KES ${listing.price.toLocaleString()}` : "";
  const title = `${listing.title} in ${listing.location}${priceText}`;

  return {
    title,
    description: listing.description,
    openGraph: {
      title,
      description: listing.description,
      images: listing.images?.[0] ? [{ url: listing.images[0] }] : undefined,
    },
    alternates: {
      canonical: `/property/${id}`,
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;
  return <ListingDetail id={id} />;
}
