import type { Metadata } from "next";
import ListingsPage from "@/components/ListingsPage";

export const metadata: Metadata = {
  title: "Private School Transport - Safe School Runs in Kenya",
  description:
    "Reliable, vetted door-to-door private school transport for children in Nairobi, Kasarani, Westlands, and Kiambu counties.",
  keywords: [
    "school transport Kenya",
    "private school van Nairobi",
    "school shuttle Westlands",
    "safe school runs Kasarani",
  ],
  alternates: {
    canonical: "/school-transport",
  },
};

export default function SchoolTransportPage() {
  return <ListingsPage category="transport" />;
}
