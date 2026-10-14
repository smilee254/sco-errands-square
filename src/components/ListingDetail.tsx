"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import { CATEGORY_CONFIG } from "@/lib/types";
import { MOCK_LISTINGS } from "@/lib/mock-data";

interface ListingDetailProps {
  id: string;
}

export default function ListingDetail({ id }: ListingDetailProps) {
  const listing = MOCK_LISTINGS.find((l) => l.id === id);
  const [isInterested, setIsInterested] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  if (!listing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">
          Listing not found
        </h1>
        <Link
          href="/"
          className="text-blue-600 hover:underline font-medium"
        >
          Go back home
        </Link>
      </div>
    );
  }

  const config = CATEGORY_CONFIG[listing.category];

  const handleInterested = () => {
    if (!isInterested) {
      // TODO: write to Firestore notifications collection
      alert("Your interest has been noted! Sco will be in touch.");
    }
    setIsInterested(!isInterested);
  };

  const handleAddToCart = () => {
    // TODO: write to Firestore user cart subcollection
    setAddedToCart(!addedToCart);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back link */}
      <Link
        href={config.route}
        className="inline-flex items-center text-sm text-slate-500 hover:text-slate-800 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to {config.label}
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Image Gallery */}
        <div className="bg-slate-100">
          <div className="aspect-video relative overflow-hidden">
            <img
              src={listing.images[activeImage]}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            {listing.isPrioritized && (
              <span className="absolute top-4 left-4 bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                Premium
              </span>
            )}
          </div>
          {listing.images.length > 1 && (
            <div className="flex gap-2 p-3 overflow-x-auto">
              {listing.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`flex-shrink-0 w-20 h-16 rounded overflow-hidden border-2 transition-colors ${
                    activeImage === idx
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            {/* Title & Location */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                {config.subLabel}
              </p>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {listing.title}
              </h1>
              {listing.price ? (
                <p className="text-2xl font-bold text-blue-600 mb-2">
                  KES {listing.price.toLocaleString()}{" "}
                  <span className="text-base font-normal text-slate-500">
                    {listing.priceLabel}
                  </span>
                </p>
              ) : (
                <p className="text-slate-500 mb-2">Contact for price</p>
              )}
              <p className="text-slate-600 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                {listing.location}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 md:w-60 flex-shrink-0">
              <button
                onClick={handleInterested}
                className={`w-full flex items-center justify-center px-4 py-3 rounded-md font-semibold transition-colors text-sm ${
                  isInterested
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <Heart
                  className={`w-4 h-4 mr-2 ${
                    isInterested ? "fill-green-600" : ""
                  }`}
                />
                {isInterested ? "Interest Sent" : "I'm Interested"}
              </button>

              <button
                onClick={handleAddToCart}
                className={`w-full flex items-center justify-center px-4 py-3 border rounded-md font-semibold transition-colors text-sm ${
                  addedToCart
                    ? "bg-slate-100 border-slate-300 text-slate-600"
                    : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {addedToCart ? "Remove from Cart" : "Add to Cart"}
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-slate-100 pt-6 mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Description
            </h2>
            <p className="text-slate-600 leading-relaxed">{listing.description}</p>
          </div>

          {/* Contact */}
          <div className="border-t border-slate-100 pt-6">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Contact Agent
            </h2>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">
                  Sco — {config.subLabel}
                </p>
                <p className="text-lg font-bold text-slate-900">
                  {listing.agentContact}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
