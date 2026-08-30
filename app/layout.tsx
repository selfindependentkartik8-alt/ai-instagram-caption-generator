import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://aiinstagramcaptiongenerator.krishaiworks.com"
  ),

  title: {
    default: "AI Instagram Caption Generator | KrishAIWorks",
    template: "%s | KrishAIWorks",
  },

  description:
    "Generate engaging Instagram captions instantly with our free AI Instagram Caption Generator. Create creative, catchy and personalized captions for your posts.",

  keywords: [
    "AI Instagram Caption Generator",
    "Instagram Caption Generator",
    "AI caption generator",
    "Instagram captions",
    "free Instagram caption generator",
    "caption generator AI",
    "Instagram post captions",
    "AI social media tools",
    "KrishAIWorks",
  ],

  authors: [
    {
      name: "KrishAIWorks",
      url: "https://krishaiworks.com",
    },
  ],

  creator: "KrishAIWorks",
  publisher: "KrishAIWorks",

  applicationName: "AI Instagram Caption Generator",

  category: "technology",

  alternates: {
    canonical:
      "https://aiinstagramcaptiongenerator.krishaiworks.com",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aiinstagramcaptiongenerator.krishaiworks.com",
    siteName: "KrishAIWorks",
    title: "AI Instagram Caption Generator | KrishAIWorks",
    description:
      "Create engaging, creative and personalized Instagram captions instantly with AI.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "AI Instagram Caption Generator - KrishAIWorks",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Instagram Caption Generator | KrishAIWorks",
    description:
      "Generate creative and engaging Instagram captions instantly with AI.",
    images: ["/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}