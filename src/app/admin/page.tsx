"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { HOUSE_CATEGORIES, Inquiry } from "@/lib/types";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"upload" | "notifications">("upload");

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Admin Dashboard</h1>

        <div className="flex space-x-4 mb-8 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("upload")}
            className={`py-2 px-4 font-medium transition-colors ${
              activeTab === "upload"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Upload Listing
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`py-2 px-4 font-medium transition-colors ${
              activeTab === "notifications"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Notifications
          </button>
        </div>

        {activeTab === "upload" && <UploadForm />}
        {activeTab === "notifications" && <NotificationsView />}
      </div>
    </ProtectedRoute>
  );
}

function UploadForm() {
  const [category, setCategory] = useState("house");
  const [houseCategory, setHouseCategory] = useState<keyof typeof HOUSE_CATEGORIES | "">("");
  const [houseType, setHouseType] = useState("");

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 max-w-2xl">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Add New Listing</h2>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Service Category
          </label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              if (e.target.value !== "house") {
                setHouseCategory("");
                setHouseType("");
              }
            }}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="house">Nyumba Yangu (Houses)</option>
            <option value="school">Schools Nearby</option>
            <option value="mover">Movers Solutions</option>
            <option value="property">Property Hunting (Cars & Land)</option>
            <option value="transport">Private School Transport</option>
          </select>
        </div>

        {category === "house" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border p-4 rounded-md bg-slate-50">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                House Category
              </label>
              <select
                value={houseCategory}
                onChange={(e) => {
                  setHouseCategory(e.target.value as keyof typeof HOUSE_CATEGORIES | "");
                  setHouseType("");
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="">-- Select Category --</option>
                {Object.entries(HOUSE_CATEGORIES).map(([key, data]) => (
                  <option key={key} value={key}>{data.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                House Type
              </label>
              <select
                value={houseType}
                onChange={(e) => setHouseType(e.target.value)}
                disabled={!houseCategory}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-slate-100 disabled:text-slate-400"
              >
                <option value="">-- Select Type --</option>
                {houseCategory && HOUSE_CATEGORIES[houseCategory as keyof typeof HOUSE_CATEGORIES]?.types.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Listing Title (e.g. 2 Bedroom Apartment, Bright Kids Academy)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Location Name (e.g. Ruiru, Kiambu)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter location"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Description
          </label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe the listing..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Price (KES) - Optional
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Leave blank for 'Contact for price'"
          />
        </div>

        <div className="flex items-center">
          <input
            id="prioritized"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
          />
          <label htmlFor="prioritized" className="ml-2 block text-sm text-slate-700">
            Premium/Prioritized Listing (Show first)
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Upload Thumbnail & Pictures
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Upload Videos
          </label>
          <input
            type="file"
            multiple
            accept="video/*"
            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Publish Listing
        </button>
      </form>
    </div>
  );
}

function NotificationsView() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(() => Boolean(db));

  useEffect(() => {
    if (!db) {
      return;
    }

    const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: Inquiry[] = [];
        snapshot.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...(docSnap.data() as Omit<Inquiry, "id">) });
        });
        setInquiries(items);
        setLoading(false);
      },
      (err) => {
        console.warn("Could not load inquiries:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: "new" | "contacted" | "completed") => {
    if (!db) return;
    try {
      await updateDoc(doc(db, "inquiries", id), { status: newStatus });
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Client Inquiries & Bookings</h2>
          <p className="text-sm text-slate-500">Real-time incoming leads from website visitors</p>
        </div>
        <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2.5 py-1 rounded-full">
          {inquiries.length} {inquiries.length === 1 ? "Inquiry" : "Inquiries"}
        </span>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400 text-sm">Loading inquiries...</div>
      ) : inquiries.length === 0 ? (
        <div className="text-slate-500 text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
          No inquiries received yet. When visitors click &quot;Book Viewing&quot; or &quot;I&apos;m Interested&quot;, they will appear here.
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => {
            const cleanPhone = inq.clientPhone.replace(/[^0-9]/g, "");
            const whatsappUrl = `https://wa.me/${cleanPhone.startsWith("0") ? "254" + cleanPhone.slice(1) : cleanPhone}?text=${encodeURIComponent(
              `Hello ${inq.clientName}, regarding your inquiry about "${inq.listingTitle}" on Sco-errands...`
            )}`;

            return (
              <div
                key={inq.id}
                className="p-4 border rounded-xl hover:border-slate-300 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900">{inq.clientName}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        inq.status === "completed"
                          ? "bg-emerald-100 text-emerald-800"
                          : inq.status === "contacted"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700">
                    Interested in: <span className="font-semibold">{inq.listingTitle}</span> ({inq.listingLocation})
                  </p>
                  {inq.message && (
                    <p className="text-xs text-slate-500 italic bg-slate-50 p-2 rounded-md">
                      &quot;{inq.message}&quot;
                    </p>
                  )}
                  <p className="text-[11px] text-slate-400">
                    Received: {new Date(inq.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`tel:${inq.clientPhone}`}
                    className="inline-flex items-center px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                  >
                    Call ({inq.clientPhone})
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold"
                  >
                    WhatsApp
                  </a>
                  <select
                    value={inq.status}
                    onChange={(e) => handleUpdateStatus(inq.id, e.target.value as "new" | "contacted" | "completed")}
                    className="px-2 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-slate-700 font-medium"
                  >
                    <option value="new">Mark New</option>
                    <option value="contacted">Mark Contacted</option>
                    <option value="completed">Mark Completed</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
