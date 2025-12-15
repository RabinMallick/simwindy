import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import { Outfit } from "next/font/google";

import "flag-icons/css/flag-icons.min.css";
import "./globals.css";

import { Navbar } from "@/components/include/Navbar";
import Footer from "@/components/include/Footer";
import { Providers } from "@/store/providers";
import ScrollToTop2 from "@/components/common/scroll/ScrollToTop2";

// Font setup
const outfit = Outfit({
  subsets: ["latin"],
  weight: [
    "100", "200", "300", "400", "500",
    "600", "700", "800", "900",
  ],
  display: "swap",
  variable: "--font-outfit",
});

// ✅ Metadata (Server only)
export const metadata: Metadata = {
  title: {
    default: "SimWindy",
    template: "%s | SimWindy",
  },
  description: "SimWindy — Smart & Modern Web Application",
  keywords: ["SimWindy", "Next.js", "Web App"],
};

// ✅ Viewport
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#075056",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased bg-gray-50`}>
        <Providers>
          <Navbar />


          <main>{children}</main>

          <Footer />

          <Toaster position="top-right" reverseOrder={false} />

          {/* 🔥 Scroll to top on route change */}
          <ScrollToTop2 />
        </Providers>
      </body>
    </html>
  );
}
