import type { Metadata } from "next";
import ListingsPage from "@/components/ListingsPage";

export const metadata: Metadata = {
  title: "Movers Solutions - Trusted Relocation Services in Kenya",
  description:
    "Planning a move? Connect with vetted, affordable, and professional moving companies in Nairobi and Kiambu for home and office relocations.",
  keywords: [
    "movers Kenya",
    "house movers Nairobi",
    "relocation services Kiambu",
    "cheap movers Nairobi",
    "Sco movers",
  ],
  alternates: {
    canonical: "/movers",
  },
};

export default function MoversPage() {
  return <ListingsPage category="mover" />;
}
