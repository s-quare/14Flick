import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://www.14flick.live"),
  title: {
    default: "14flick | Discover Movies, Series & Collections",
    template: "%s | 14flick",
  },
  description:
    "The ultimate discovery hub for global cinema. Explore Hollywood, K-Drama, Nollywood, and more with trailers, cast info, and curated moods.",
  verification: {
    google: "nMmrkOluUwQP-WhVY2q5QMBydWY-HCz18DP6ECDerT4",
  },
  keywords: [
    "14flick",
    "movie discovery",
    "Nollywood movies",
    "watch trailers",
    "movie cast info",
    "K-drama discovery",
    "trending TV series",
    "film database",
    "cinema moods",
    "African cinema",
    "Hollywood blockbusters",
    "movie genres",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.14flick.live",
    siteName: "14flick",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "14flick",
    description: "Discover your next favorite movie.",
  },
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="max-w-300 mx-auto">
          <Header />
          {children}
          <Footer />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}
