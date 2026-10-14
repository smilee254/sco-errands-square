// Shared types for all listing categories across Sco-errands Square
export type ListingCategory = "house" | "school" | "mover" | "property" | "transport";

export interface Listing {
  id: string;
  category: ListingCategory;
  title: string;       // e.g. "2 Bedroom House" or "Bright Kids Academy" or "ABC Movers"
  location: string;    // manually entered e.g. "Ruiru, Kiambu"
  price?: number;      // optional — some listings may be "contact for price"
  priceLabel?: string; // e.g. "per month", "per move", "asking price"
  description: string;
  thumbnail: string;
  images: string[];
  videos?: string[];
  isPrioritized: boolean;
  agentContact: string;
  createdAt?: string;
  // Property-specific
  propertyType?: "car" | "land";
  // House-specific
  houseCategory?: "detached" | "apartment" | "shared";
  houseType?: string;
}

export const HOUSE_CATEGORIES = {
  detached: {
    label: "Detached / Stand alones",
    types: [
      { value: "bungalow", label: "Bungalow" },
      { value: "villa", label: "Villa" },
      { value: "mansion", label: "Mansion" },
      { value: "townhouse", label: "Townhouse" },
      { value: "other", label: "Other" },
    ]
  },
  apartment: {
    label: "Apartments & Flats",
    types: [
      { value: "studio", label: "Studio" },
      { value: "bedsitter", label: "Bedsitter" },
      { value: "single_room", label: "Single Room" },
      { value: "1_bedroom", label: "1 Bedroom" },
      { value: "2_bedroom", label: "2 Bedroom" },
      { value: "3_bedroom", label: "3 Bedroom" },
      { value: "other", label: "Other" },
    ]
  },
  shared: {
    label: "Shared & Institutional",
    types: [
      { value: "hostel", label: "Hostels" },
      { value: "staff_quarters", label: "Staff Quarters" },
      { value: "coliving", label: "Co-living Spaces" },
      { value: "other", label: "Other" },
    ]
  }
};

export type UserRole = "admin" | "client";

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  phoneNumber?: string | null;
  role: UserRole;
  createdAt: string;
  savedListingIds?: string[];
}

export interface Inquiry {
  id: string;
  listingId: string;
  listingTitle: string;
  listingCategory: ListingCategory;
  listingLocation: string;
  clientName: string;
  clientPhone: string;
  message?: string;
  userId?: string;
  createdAt: string;
  status: "new" | "contacted" | "completed";
}

export const DEFAULT_BUSINESS_PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+254700000000";

export interface CartItem {
  listingId: string;
  category: ListingCategory;
  title: string;
  location: string;
  thumbnail: string;
  price?: number;
  priceLabel?: string;
}

// Per-category display config
export const CATEGORY_CONFIG: Record<
  ListingCategory,
  {
    label: string;
    subLabel: string;
    searchPlaceholder: string;
    priceLabel: string;
    route: string;
  }
> = {
  house: {
    label: "Nyumba Yangu",
    subLabel: "Sco House Hunters",
    searchPlaceholder: "Search by location (e.g. Ruiru, Kiambu)...",
    priceLabel: "/ month",
    route: "/house-hunters",
  },
  school: {
    label: "Schools Nearby Hunter",
    subLabel: "Sco School Finder",
    searchPlaceholder: "Search by area (e.g. Thika, Kiambu)...",
    priceLabel: "/ term",
    route: "/schools-nearby",
  },
  mover: {
    label: "Movers Solutions",
    subLabel: "Sco Movers",
    searchPlaceholder: "Search movers by area (e.g. Nairobi, Mombasa)...",
    priceLabel: "/ move",
    route: "/movers",
  },
  property: {
    label: "Property Hunting",
    subLabel: "Sco Property — Cars & Land",
    searchPlaceholder: "Search by type or area (e.g. Land, Kiambu)...",
    priceLabel: "asking price",
    route: "/property",
  },
  transport: {
    label: "Private School Transport",
    subLabel: "Sco School Runs",
    searchPlaceholder: "Search transport by area (e.g. Kasarani, Westlands)...",
    priceLabel: "/ month",
    route: "/school-transport",
  },
};

