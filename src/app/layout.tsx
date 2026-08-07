import type { Metadata, Viewport } from "next";
import Script from "next/script";

import "./globals.css";

import { siteConfig } from "@/config/site";
import InstallPrompt from "@/components/InstallPrompt";
import RegisterServiceWorker from "@/components/RegisterServiceWorker";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),

  title: `${siteConfig.name} | ${siteConfig.subtitle}`,
  description: siteConfig.heroText,

  manifest: "/manifest.json",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteConfig.shortName,
  },

  icons: {
    icon: [
      {
        url: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: siteConfig.name,
    description: siteConfig.subtitle,
    locale: "ar_EG",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B63CE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}

        <InstallPrompt />
        <RegisterServiceWorker />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DN0VKYNQQ1"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-DN0VKYNQQ1');
          `}
        </Script>
      </body>
    </html>
  );
}