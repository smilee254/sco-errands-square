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

export const metadata: Metadata = {
  title: "Sco-errands square",
  description: "Your trusted platform for professional services in Kenya. Home of Nyumba Yangu — Sco House Hunters.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
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
