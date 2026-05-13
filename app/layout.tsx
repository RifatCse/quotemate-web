import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuoteMate — Quotes in 60 seconds. Built for Aussie tradies.",
  description:
    "Speak your job, snap a photo, or describe it — QuoteMate turns it into a GST-compliant quote instantly. Used by electricians, plumbers, painters, and handymen across Australia.",
  openGraph: {
    title: "QuoteMate — Quotes in 60 seconds.",
    description:
      "AI-powered quoting for Australian tradespeople. Voice, photo, and text to itemised quotes in seconds.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuoteMate — Built for Aussie tradies.",
    description: "AI-powered quotes in 60 seconds.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
