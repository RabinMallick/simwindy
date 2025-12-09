import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import { Outfit } from "next/font/google";
import { ScrollTop } from "@/components/common/scroll/ScrollTop";

import "flag-icons/css/flag-icons.min.css";
import "./globals.css";
import { Navbar } from "@/components/include/Navbar";
import Footer from "@/components/include/Footer";
import { Providers } from "@/store/providers";

// Font setup
const outfit = Outfit({
  subsets: ["latin"],
  weight: [
    "100", "200", "300", "400", "500",
    "600", "700", "800", "900",
  ],
  style: ["normal"],
  display: "swap",
  variable: "--font-outfit",
});

// ✅ Branding Metadata
export const metadata: Metadata = {
  title: {
    default: "SimWindy",
    template: "%s | SimWindy",
  },
  description: "SimWindy — Smart & Modern Web Application",
  keywords: ["SimWindy", "Next.js", "Web App"],
};

// ✅ Mobile optimization
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#075056",
};

// Layout UI
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased bg-gray-50`}>

        <Providers>

          <Navbar />
          {/* Page Content */}
          <main>{children}</main>

          <Footer />

          {/* Toast + Scroll */}
          <Toaster position="top-right" reverseOrder={false} />
          
          <div className="hidden md:block">
            <ScrollTop />
          </div>

        </Providers>
      </body>
    </html>
  );
}
