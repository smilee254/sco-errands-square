"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin } from "lucide-react";
import { Listing, ListingCategory, CATEGORY_CONFIG, HOUSE_CATEGORIES } from "@/lib/types";
import { MOCK_LISTINGS } from "@/lib/mock-data";

interface ListingsPageProps {
  category: ListingCategory;
}

export default function ListingsPage({ category }: ListingsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [houseCategoryFilter, setHouseCategoryFilter] = useState<keyof typeof HOUSE_CATEGORIES | "">("");
  const [houseTypeFilter, setHouseTypeFilter] = useState("");

  const config = CATEGORY_CONFIG[category] || {
    label: category,
    subLabel: "",
    searchPlaceholder: "Search...",
    priceLabel: "",
    route: `/${category}`,
  };

  const all = MOCK_LISTINGS.filter((l) => {
    if (l.category !== category) return false;
    if (category === "house") {
      if (houseCategoryFilter && l.houseCategory !== houseCategoryFilter) return false;
      if (houseTypeFilter && l.houseType !== houseTypeFilter) return false;
    }
    return true;
  });

  const prioritized = all.filter((l) => l.isPrioritized);
  const regular = all.filter(
    (l) =>
      !l.isPrioritized &&
      (l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // When searching, also search in prioritized
  const searchResults = searchQuery
    ? all.filter(
        (l) =>
          l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
          {config.label}
        </h1>
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">
          {config.subLabel}
        </p>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Search for available options in your preferred location. We scout them so you don&apos;t have to.
        </p>
      </div>

      {/* Search Bar & Filters */}
      <div className="max-w-3xl mx-auto mb-16 space-y-4">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-slate-400" />
          <input
            type="text"
            className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-300 shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-white text-slate-900 placeholder-slate-400"
            placeholder={config.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {category === "house" && (
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={houseCategoryFilter}
              onChange={(e) => {
                setHouseCategoryFilter(e.target.value as keyof typeof HOUSE_CATEGORIES | "");
                setHouseTypeFilter("");
              }}
              className="flex-1 px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm text-slate-700"
            >
              <option value="">All Categories</option>
              {Object.entries(HOUSE_CATEGORIES).map(([key, data]) => (
                <option key={key} value={key}>
                  {data.label}
                </option>
              ))}
            </select>

            <select
              value={houseTypeFilter}
              onChange={(e) => setHouseTypeFilter(e.target.value)}
              disabled={!houseCategoryFilter}
              className="flex-1 px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm text-slate-700 disabled:bg-slate-100 disabled:text-slate-400"
            >
              <option value="">All Types</option>
              {houseCategoryFilter &&
                HOUSE_CATEGORIES[houseCategoryFilter as keyof typeof HOUSE_CATEGORIES]?.types.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
            </select>
          </div>
        )}
      </div>

      {searchResults ? (
        /* Search results mode */
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Results for &ldquo;{searchQuery}&rdquo;
          </h2>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  route={config.route}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-500 bg-white rounded-xl border border-slate-200">
              No results for &ldquo;{searchQuery}&rdquo;. Try a different location or name.
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Prioritized / Premium */}
          {prioritized.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">
                  Premium
                </span>
                Top Picks For You
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {prioritized.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    route={config.route}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Regular listings */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              All Listings
            </h2>
            {regular.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {regular.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    route={config.route}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                No additional listings at the moment. Check back soon.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function ListingCard({
  listing,
  route,
}: {
  listing: Listing;
  route: string;
}) {
  return (
    <Link href={`${route}/${listing.id}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <img
            src={listing.thumbnail}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="text-base font-bold text-slate-900 mb-1 truncate">
            {listing.title}
          </h3>
          {listing.price ? (
            <p className="text-blue-600 font-semibold text-sm mb-2">
              KES {listing.price.toLocaleString()}{" "}
              <span className="text-slate-400 font-normal">
                {listing.priceLabel}
              </span>
            </p>
          ) : (
            <p className="text-slate-500 text-sm mb-2">Contact for price</p>
          )}
          <p className="text-sm text-slate-500 flex items-center">
            <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 flex-shrink-0" />
            <span className="truncate">{listing.location}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
