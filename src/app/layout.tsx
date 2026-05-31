import type { Metadata } from "next";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import CursorGlow from "@/components/animations/CursorGlow";
import MobileStickyCTA from "@/components/mobile/MobileStickyCTA";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://devcraft.agency";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "CraftODev | AI Powered Web Development Agency",
    template: "%s | CraftODev",
  },

  description:
    "CraftODev is an AI powered web development agency building modern websites, SaaS platforms, automation systems, and scalable digital products.",

  keywords: [
    "CraftODev",
    "AI powered website development",
    "web development agency",
    "Next.js development",
    "React developer",
    "full-stack developer",
    "SaaS development",
    "automation systems",
    "UI UX design",
    "modern website design",
  ],

  authors: [{ name: "CraftODev Team", url: siteUrl }],
  creator: "CraftODev",
  publisher: "CraftODev",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "CraftODev | AI Powered Web Development Agency",
    description:
      "Modern websites, SaaS platforms, automation systems, and scalable digital products for growing brands.",
    siteName: "CraftODev",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CraftODev — AI Powered Web Development Agency",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CraftODev | AI Powered Web Development Agency",
    description:
      "Modern websites, SaaS platforms, automation systems, and scalable digital products for growing brands.",
    creator: "@CraftODev",
    images: ["/og-image.png"],
  },

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
      <body className="relative overflow-x-hidden bg-[#F8FBFF] text-slate-900 antialiased">
        <SmoothScrollProvider>
          <MobileStickyCTA />
          {children}
          <CursorGlow />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}