import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import InstallPrompt from "@/components/InstallPrompt";
import RegisterServiceWorker from "@/components/RegisterServiceWorker";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: `${siteConfig.name} | ${siteConfig.subtitle}`,
  description: siteConfig.heroText,

  // Points the browser at /public/manifest.json — this is what makes
  // Chrome consider the site installable in the first place, which is
  // the missing piece that was stopping `beforeinstallprompt` from
  // ever firing. Next.js turns this into <link rel="manifest" ...>
  // automatically.
 manifest: "/manifest.json",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteConfig.shortName,
  },

  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
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

// themeColor lives in `viewport`, not `metadata`, as of Next.js 14+
// (Next 16 keeps it there — putting it in `metadata` is deprecated and
// silently ignored). This matches manifest.json's theme_color so the
// browser chrome and the installed app agree.
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
        {children}
        <InstallPrompt />
        <RegisterServiceWorker />
      </body>
    </html>
  );
}
