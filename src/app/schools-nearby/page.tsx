import type { Metadata } from "next";
import ListingsPage from "@/components/ListingsPage";

export const metadata: Metadata = {
  title: "Schools Nearby Hunter - Find Top Schools Near You",
  description:
    "Moving to a new area in Kenya? Scout and compare kindergarten, primary, junior, and secondary schools near your new home.",
  keywords: [
    "schools in Kenya",
    "primary schools Ruiru",
    "junior secondary schools Kiambu",
    "CBC schools Nairobi",
    "schools finder Kenya",
  ],
  alternates: {
    canonical: "/schools-nearby",
  },
};

export default function SchoolsNearbyPage() {
  return <ListingsPage category="school" />;
}
