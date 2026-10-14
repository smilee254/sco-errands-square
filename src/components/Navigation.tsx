"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/house-hunters", label: "Nyumba Yangu" },
  { href: "/schools-nearby", label: "Schools Nearby" },
  { href: "/movers", label: "Movers" },
  { href: "/property", label: "Property" },
  { href: "/school-transport", label: "School Transport", disabled: true },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="font-bold text-lg tracking-tight hover:text-slate-300 transition-colors"
            >
              Sco-errands square
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) =>
              link.disabled ? (
                <span
                  key={link.href}
                  className="text-sm text-slate-500 cursor-not-allowed"
                  title="Coming soon"
                >
                  {link.label}
                </span>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Right icons */}
          <div className="flex items-center space-x-3">
            <Link
              href="/cart"
              className="p-2 text-slate-300 hover:text-white transition-colors"
              title="My Shortlist"
            >
              <ShoppingCart className="w-5 h-5" />
            </Link>
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 px-4 py-4 space-y-3">
          {navLinks.map((link) =>
            link.disabled ? (
              <div key={link.href} className="text-sm text-slate-500 py-1">
                {link.label}{" "}
                <span className="text-xs bg-slate-700 text-slate-400 px-1.5 py-0.5 rounded ml-1">
                  soon
                </span>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-slate-300 hover:text-white py-1 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
}
