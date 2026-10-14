"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  ShoppingCart,
  ArrowLeft,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { CATEGORY_CONFIG, DEFAULT_BUSINESS_PHONE } from "@/lib/types";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import InquiryModal from "./InquiryModal";

interface ListingDetailProps {
  id: string;
}

export default function ListingDetail({ id }: ListingDetailProps) {
  const listing = MOCK_LISTINGS.find((l) => l.id === id);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
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
  const businessPhoneClean = DEFAULT_BUSINESS_PHONE.replace(/[^0-9]/g, "");

  const handleAddToCart = () => {
    setAddedToCart(!addedToCart);
  };

  const getDirectWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello Sco-errands! I'm interested in viewing "${listing.title}" located in ${listing.location} (ID: ${listing.id}).`
    );
    return `https://wa.me/${businessPhoneClean}?text=${text}`;
  };

  return (
    <>
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
                <span className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Verified / Priority
                </span>
              )}
            </div>

            {/* Thumbnail row if multiple images */}
            {listing.images.length > 1 && (
              <div className="flex gap-2 p-3 overflow-x-auto bg-slate-900/10">
                {listing.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`flex-shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 transition-all ${
                      activeImage === idx
                        ? "border-blue-600 scale-105"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Photo ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  {config.label}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 mb-2">
                  {listing.title}
                </h1>
                {listing.price && (
                  <p className="text-2xl font-bold text-slate-900 mb-2">
                    KES {listing.price.toLocaleString()}
                    <span className="text-sm font-normal text-slate-500 ml-1">
                      {listing.priceLabel}
                    </span>
                  </p>
                )}
                <p className="text-slate-600 flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                  {listing.location}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5 sm:w-64 flex-shrink-0">
                <button
                  onClick={() => setInquiryModalOpen(true)}
                  className="w-full flex items-center justify-center px-4 py-3 rounded-xl font-semibold transition-colors text-sm bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Viewing / Inquire
                </button>

                <a
                  href={getDirectWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center px-4 py-3 rounded-xl font-semibold transition-colors text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  WhatsApp Directly
                </a>

                <button
                  onClick={handleAddToCart}
                  className={`w-full flex items-center justify-center px-4 py-2.5 border rounded-xl font-medium transition-colors text-xs ${
                    addedToCart
                      ? "bg-slate-100 border-slate-300 text-slate-600"
                      : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {addedToCart ? "Saved in Shortlist" : "Save to Shortlist"}
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
                Agent / Support Contact
              </h2>
              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">
                      Sco — {config.subLabel}
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      {listing.agentContact || DEFAULT_BUSINESS_PHONE}
                    </p>
                  </div>
                </div>
                <a
                  href={`tel:${listing.agentContact || DEFAULT_BUSINESS_PHONE}`}
                  className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking / Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        listing={listing}
      />
    </>
  );
}
