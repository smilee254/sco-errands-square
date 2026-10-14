"use client";
import { useParams } from "next/navigation";
import ListingDetail from "@/components/ListingDetail";

export default function SchoolDetailPage() {
  const params = useParams();
  return <ListingDetail id={params.id as string} />;
}
