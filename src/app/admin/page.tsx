"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";
import { HOUSE_CATEGORIES } from "@/lib/types";

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
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Interested Clients</h2>
      <div className="text-slate-500 text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
        No new notifications at the moment.
      </div>
    </div>
  );
}
