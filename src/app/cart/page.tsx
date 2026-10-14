"use client";

import Link from "next/link";
import { Trash2, MapPin, ShoppingCart } from "lucide-react";

// Placeholder data - this will later come from Firebase user's subcollection
const MOCK_CART = [
  { id: "1", location: "Ruiru, Kiambu", price: 15000, thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80" },
];

export default function CartPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Your Shortlist</h1>
      
      {MOCK_CART.length > 0 ? (
        <div className="space-y-6">
          {MOCK_CART.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
              <div className="sm:w-48 h-48 sm:h-auto bg-slate-100 flex-shrink-0">
                <img src={item.thumbnail} alt={item.location} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">KES {item.price.toLocaleString()}</h3>
                  <p className="text-slate-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-slate-400" />
                    {item.location}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <Link href={`/house-hunters/${item.id}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    View Details
                  </Link>
                  <button className="text-slate-400 hover:text-red-600 transition-colors flex items-center text-sm font-medium">
                    <Trash2 className="w-4 h-4 mr-1" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-slate-200">
          <ShoppingCart className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
          <p className="text-slate-500 mb-6">You haven&apos;t saved any houses to your shortlist yet.</p>
          <Link href="/house-hunters" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Browse Houses
          </Link>
        </div>
      )}
    </div>
  );
}
