"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X, User, LogOut, ShieldCheck, ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import AuthModal from "./AuthModal";

const navLinks = [
  { href: "/house-hunters", label: "Nyumba Yangu" },
  { href: "/schools-nearby", label: "Schools Nearby" },
  { href: "/movers", label: "Movers" },
  { href: "/property", label: "Property" },
  { href: "/school-transport", label: "School Transport", disabled: true },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, profile, isAdmin, logout } = useAuth();

  return (
    <>
      <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-40">
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

            {/* Right actions */}
            <div className="flex items-center space-x-3">
              <Link
                href="/cart"
                className="p-2 text-slate-300 hover:text-white transition-colors relative"
                title="My Shortlist"
              >
                <ShoppingCart className="w-5 h-5" />
              </Link>

              {/* User Account / Auth */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-2 py-1.5 px-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors border border-slate-700"
                  >
                    {profile?.photoURL ? (
                      <img
                        src={profile.photoURL}
                        alt={profile.displayName || "User"}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">
                        {profile?.displayName?.[0]?.toUpperCase() || "U"}
                      </div>
                    )}
                    <span className="hidden sm:inline max-w-[100px] truncate">
                      {profile?.displayName || "Account"}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 text-slate-800 border border-slate-100 z-50 animate-in fade-in zoom-in-95 duration-100">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs font-semibold text-slate-900 truncate">
                          {profile?.displayName}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                        {isAdmin && (
                          <span className="inline-flex items-center text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-semibold mt-1">
                            Admin
                          </span>
                        )}
                      </div>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                        >
                          <ShieldCheck className="w-4 h-4 mr-2 text-blue-600" />
                          Admin Dashboard
                        </Link>
                      )}

                      <Link
                        href="/cart"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2 text-slate-500" />
                        My Saved Listings
                      </Link>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-medium text-left"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={(e) => {
                    e.preventDefault();
                    setAuthModalOpen(true);
                  }}
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
              )}

              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
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

            {user ? (
              <div className="pt-3 border-t border-slate-700">
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="block text-sm text-blue-400 font-semibold py-1.5"
                    onClick={() => setMobileOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    logout();
                  }}
                  className="block text-sm text-red-400 font-medium py-1.5 cursor-pointer"
                >
                  Sign Out ({profile?.displayName || user.email})
                </button>
              </div>
            ) : (
              <div className="pt-3 border-t border-slate-700">
                <Link
                  href="/login"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    setAuthModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
