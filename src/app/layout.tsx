import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Niva Bupa Claimant Advocacy | Share Your Experience",
  description: "Share your seamless health insurance claim settlement journey with Niva Bupa and empower families to choose trusted healthcare coverage.",
  keywords: ["Niva Bupa", "Health Insurance", "Claim Settlement", "Claimant Advocacy", "Cashless Healthcare"],
  authors: [{ name: "Niva Bupa Health Insurance" }],
  openGraph: {
    title: "Niva Bupa Claimant Advocacy",
    description: "Celebrating seamless health insurance claims with Niva Bupa.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#009FE3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-[#F7FAFC] antialiased">
      <body className="min-h-full flex flex-col font-sans text-gray-900 bg-[#F7FAFC]">
        {children}
      </body>
    </html>
  );
}

