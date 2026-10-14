"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Listing, DEFAULT_BUSINESS_PHONE } from "@/lib/types";
import { X, Send, CheckCircle, MessageSquare, Phone, User, Calendar } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing;
}

export default function InquiryModal({ isOpen, onClose, listing }: InquiryModalProps) {
  const { user, profile } = useAuth();

  const [name, setName] = useState(profile?.displayName || "");
  const [phone, setPhone] = useState(profile?.phoneNumber || "");
  const [preferredDate, setPreferredDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Format business WhatsApp URL (strip plus, spaces, dashes)
  const businessPhoneClean = DEFAULT_BUSINESS_PHONE.replace(/[^0-9]/g, "");

  const getWhatsAppMessage = () => {
    const clientGreeting = name.trim() ? ` My name is ${name.trim()}.` : "";
    const dateNotice = preferredDate ? ` I'd like to schedule for ${preferredDate}.` : "";
    const extraNotes = notes.trim() ? ` Note: ${notes.trim()}` : "";
    return encodeURIComponent(
      `Hello Sco-errands! I'm interested in "${listing.title}" located in ${listing.location} (ID: ${listing.id}).${clientGreeting}${dateNotice}${extraNotes}`
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Please provide your name and phone number.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (db) {
        await addDoc(collection(db, "inquiries"), {
          listingId: listing.id,
          listingTitle: listing.title,
          listingCategory: listing.category,
          listingLocation: listing.location,
          clientName: name.trim(),
          clientPhone: phone.trim(),
          preferredDate: preferredDate || null,
          message: notes.trim() || null,
          userId: user?.uid || null,
          createdAt: new Date().toISOString(),
          status: "new",
        });
      }
      setSubmitted(true);
    } catch (err: unknown) {
      console.error("Error submitting inquiry:", err);
      // Even if Firestore is offline, allow user to continue to WhatsApp
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenWhatsApp = () => {
    const url = `https://wa.me/${businessPhoneClean}?text=${getWhatsAppMessage()}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div className="mb-6">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Quick Booking & Inquiry
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                {listing.title}
              </h2>
              <p className="text-sm text-slate-500">{listing.location}</p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Grace Wanjiku"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  WhatsApp / Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0712 345 678"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Preferred Date (Optional)
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Message / Special Request
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us when you want to view, specific questions, or special requests..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm text-sm disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "Sending..." : "Submit Inquiry"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-sm text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Inquiry Sent!
            </h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto mb-6">
              Thank you, <span className="font-semibold">{name}</span>. Our Sco-errands team has received your request for{" "}
              <span className="font-semibold">{listing.title}</span> and will contact you via {phone} shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleOpenWhatsApp}
                className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open in WhatsApp Now</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 border border-slate-300 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
