"use client";
import { useParams } from "next/navigation";
import ListingDetail from "@/components/ListingDetail";

export default function MoverDetailPage() {
  const params = useParams();
  return <ListingDetail id={params.id as string} />;
}
