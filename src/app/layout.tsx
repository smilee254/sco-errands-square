import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { AuthProvider } from "@/lib/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import JsonLd from "@/components/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sco-errands-square.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sco-errands square | Nyumba Yangu House Hunters & Services in Kenya",
    template: "%s | Sco-errands square",
  },
  description:
    "Your trusted partner for house hunting (Nyumba Yangu), professional movers, schools nearby, private school transport, and verified property listings across Kenya.",
  keywords: [
    "house hunting Kenya",
    "Nyumba Yangu",
    "rentals in Ruiru",
    "houses for rent Nairobi",
    "Kiambu house hunters",
    "movers in Nairobi",
    "schools nearby finder",
    "private school transport Kenya",
    "property Kenya",
    "plots for sale Kiambu",
  ],
  authors: [{ name: "Sco-errands square" }],
  creator: "Sco-errands square",
  publisher: "Sco-errands square",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: siteUrl,
    siteName: "Sco-errands square",
    title: "Sco-errands square | Nyumba Yangu House Hunters & Services in Kenya",
    description:
      "We do the legwork so you can make the best choice. Verified rental houses, movers, schools, transport, and property in Kenya.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sco-errands square | House Hunting & Services in Kenya",
    description:
      "Verified rental houses, reliable movers, schools nearby, and property in Kenya.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <JsonLd />
        <AuthProvider>
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-slate-900 text-slate-400 py-6 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Sco-errands square. All rights reserved.</p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
