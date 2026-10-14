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
      description: "The requested house listing could not be found.",
    };
  }

  const priceText = listing.price ? ` - KES ${listing.price.toLocaleString()}${listing.priceLabel || ""}` : "";
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
      canonical: `/house-hunters/${id}`,
    },
  };
}

export default async function HouseDetailPage({ params }: Props) {
  const { id } = await params;
  return <ListingDetail id={id} />;
}
