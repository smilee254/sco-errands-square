import type { Metadata } from "next";
import ListingsPage from "@/components/ListingsPage";

export const metadata: Metadata = {
  title: "Nyumba Yangu - Verified Rental Houses in Kenya",
  description:
    "Browse verified rental houses scouted and photographed for you across Ruiru, Kiambu, Nairobi, and surrounding areas. Find 1 bedroom, 2 bedroom, bedsitters, and stand-alone houses.",
  keywords: [
    "Nyumba Yangu",
    "rental houses Ruiru",
    "apartments for rent Kiambu",
    "houses for rent Nairobi",
    "bedsitter Ruiru",
    "verified rental houses Kenya",
  ],
  alternates: {
    canonical: "/house-hunters",
  },
};

export default function HouseHuntersPage() {
  return <ListingsPage category="house" />;
}
