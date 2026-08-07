import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import InstallPrompt from "@/components/InstallPrompt";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: `${siteConfig.name} | ${siteConfig.subtitle}`,
  description: siteConfig.heroText,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.subtitle,
    locale: "ar_EG",
    type: "website",
  },
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
      </body>
    </html>
  );
}