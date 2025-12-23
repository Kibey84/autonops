import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AutonOps | Professional Drone Flight Operations",
    template: "%s | AutonOps",
  },
  description:
    "Professional drone flight operations for emergency response, reconnaissance, and mission-critical applications. Pilots, mission controllers, aircraft, and full mission execution.",
  keywords: [
    "drone operations",
    "emergency response drones",
    "search and rescue",
    "aerial reconnaissance",
    "disaster response",
    "drone services",
    "professional drone pilots",
    "mission-critical UAS",
  ],
  authors: [{ name: "AutonOps LLP" }],
  creator: "AutonOps LLP",
  metadataBase: new URL("https://autonops.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://autonops.com",
    siteName: "AutonOps",
    title: "AutonOps | Professional Drone Flight Operations",
    description:
      "Professional drone flight operations for emergency response, reconnaissance, and mission-critical applications.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AutonOps - Professional Drone Flight Operations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AutonOps | Professional Drone Flight Operations",
    description:
      "Professional drone flight operations for emergency response, reconnaissance, and mission-critical applications.",
    images: ["/og-image.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for potential future connections */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300`}
      >
        <ThemeProvider>
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
