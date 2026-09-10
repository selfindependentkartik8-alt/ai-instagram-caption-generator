import type { Metadata } from "next";
import Script from "next/script";
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://krishaiworks.com/#organization",
      name: "KrishAIWorks",
      url: "https://krishaiworks.com",
      logo: {
        "@type": "ImageObject",
        url: "https://krishaiworks.com/logo.png",
        width: 512,
        height: 512,
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://krishaiworks.com/#website",
      url: "https://krishaiworks.com",
      name: "KrishAIWorks",
      description:
        "AI-powered tools, productivity utilities, automation, chatbots, websites and custom digital solutions.",
      publisher: {
        "@id": "https://krishaiworks.com/#organization",
      },
      inLanguage: "en",
    },
    {
      "@type": "WebApplication",
      "@id":
        "https://aiinstagramcaptiongenerator.krishaiworks.com/#webapplication",
      name: "AI Instagram Caption Generator",
      url: "https://aiinstagramcaptiongenerator.krishaiworks.com/",
      description:
        "Generate engaging Instagram captions instantly with our free AI Instagram Caption Generator. Create creative, catchy and personalized captions for your posts.",
      applicationCategory: "SocialNetworkingApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires a modern web browser.",
      isPartOf: {
        "@id": "https://krishaiworks.com/#website",
      },
      publisher: {
        "@id": "https://krishaiworks.com/#organization",
      },
    },
    {
      "@type": "WebPage",
      "@id":
        "https://aiinstagramcaptiongenerator.krishaiworks.com/#webpage",
      url: "https://aiinstagramcaptiongenerator.krishaiworks.com/",
      name: "AI Instagram Caption Generator | KrishAIWorks",
      description:
        "Generate engaging Instagram captions instantly with our free AI Instagram Caption Generator. Create creative, catchy and personalized captions for your posts.",
      isPartOf: {
        "@id": "https://krishaiworks.com/#website",
      },
      about: {
        "@id":
          "https://aiinstagramcaptiongenerator.krishaiworks.com/#webapplication",
      },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BS6TSMM1ZR"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BS6TSMM1ZR');
          `}
        </Script>
      </body>
    </html>
  );
}