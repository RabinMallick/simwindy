import type { Metadata, Viewport } from "next"; 
 
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
      <body>

        {/* Page Content */}
        <main>{children}</main> 
      </body>
    </html>
  );
}
