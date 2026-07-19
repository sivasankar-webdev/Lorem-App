

import { Outfit, PT_Serif } from "next/font/google";
import Header from "@/components/layout/Header";
import "./globals.css";

// PDF spec: "Outfit — primary sans, used for headings and body."
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

// PDF spec: "PT Serif — serif accent for emphasis/italics."
const ptSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-pt-serif",
  display: "swap",
});


export const metadata = {
  title: "Lorem",
  description:
    "Lorem replaces static documents with cryptographically signed credentials issued directly from the source, with a full audit trail.",
    icons: {
        icon: "/icon.png",         
        shortcut: "/icon.png",       
        apple: "/icon.png", 
  },
    openGraph: {
    title: "Lorem — Verification That Starts At The Source",
    description:
      "Lorem replaces static documents with cryptographically signed credentials issued directly from the source, with a full audit trail.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${ptSerif.variable}`}>
      <body className="bg-background font-sans text-ink antialiased">
       
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to main content
        </a>

        <Header />

        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
