import type { Metadata } from "next";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import CursorGlow from "@/components/animations/CursorGlow";
import "./globals.css";
import MobileStickyCTA from "@/components/mobile/MobileStickyCTA";

// 1. Define the absolute production URL for your agency site
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://devcraft.agency";

// 2. Premium Production-Grade SEO Setup
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  
  title: {
    default: "DevCraft Agency | Premium Full-Stack Web Development",
    template: "%s | DevCraft Agency", // Automatically maps sub-pages like "Projects | DevCraft Agency"
  },
  
  description: "Premium full-stack web development agency building modern futuristic digital experiences with Next.js, React, and high-end engineering.",
  
  keywords: [
    "web development",
    "Next.js",
    "full-stack developer",
    "React developer",
    "agency website",
    "SaaS development",
    "UI/UX design",
    "creative agency",
    "Framer Motion animations",
    "premium frontend engineering"
  ],
  
  authors: [{ name: "DevCraft Team", url: siteUrl }],
  creator: "DevCraft Agency",
  publisher: "DevCraft Agency",
  
  // Open Graph for pristine look on social shares (LinkedIn, Discord, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "DevCraft Agency | Premium Full-Stack Web Development",
    description: "Premium full-stack web development agency building modern futuristic digital experiences.",
    siteName: "DevCraft Agency",
    images: [
      {
        url: "/og-image.png", // Ensure this image is placed in your public folder later
        width: 1200,
        height: 630,
        alt: "DevCraft Agency — Next-Gen Digital Products & Engineering",
      },
    ],
  },
  
  // Twitter Layout configuration
  twitter: {
    card: "summary_large_image",
    title: "DevCraft Agency | Premium Full-Stack Web Development",
    description: "Premium full-stack web development agency building modern futuristic digital experiences.",
    creator: "@DevCraftAgency",
    images: ["/og-image.png"],
  },
  
  // App Favicons tracking
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],

    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#050816] antialiased">
        {/* Preserved your smooth scroll wrapper and cursor glow hooks */}
        <SmoothScrollProvider>
          <CursorGlow />
          <MobileStickyCTA />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}