import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Engineers Hub - Coming Soon",
  description: "Connect. Collaborate. Innovate. The premier social platform for engineers worldwide.",
  openGraph: {
    title: "Engineers Hub - Coming Soon",
    description: "Connect. Collaborate. Innovate. The premier social platform for engineers worldwide.",
    url: "https://engineershub.co", // Placeholder, adjust if needed
    siteName: "Engineers Hub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 1200,
        alt: "Engineers Hub - Social Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineers Hub - Coming Soon",
    description: "Connect. Collaborate. Innovate. The premier social platform for engineers worldwide.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
