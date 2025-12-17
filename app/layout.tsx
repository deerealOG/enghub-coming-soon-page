import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Engineers Hub - Coming Soon",
  description: "Online Social Platform For Engineers",
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
