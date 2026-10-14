import type { Metadata } from "next";
import ListingsPage from "@/components/ListingsPage";

export const metadata: Metadata = {
  title: "Property Hunting - Verified Land & Vehicles for Sale in Kenya",
  description:
    "Explore verified plots of land, title-deed verified parcels, and clean motor vehicles for sale across Nairobi, Kiambu, and all counties in Kenya.",
  keywords: [
    "plots for sale Kenya",
    "land in Juja",
    "affordable plots Kiambu",
    "cars for sale Nairobi",
    "verified property Kenya",
  ],
  alternates: {
    canonical: "/property",
  },
};

export default function PropertyPage() {
  return <ListingsPage category="property" />;
}
