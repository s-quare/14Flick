export const metadata = {
  title: "FlickMind AI | Personalized Movie Scouting",
  description: "Describe any mood or scenario and let 14Flick's AI find the perfect movie or TV show for you. Your personal AI cinema expert.",
  openGraph: {
    title: "FlickMind AI - 14Flick",
    description: "Discover movies using 14Flick's AI Scout.",
    url: "https://www.14flick.live/flickmind",
    siteName: "14Flick",
    images: [
      {
        url: "/og-image.jpg", // Make sure to add a cool preview image later!
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlickMind AI | 14Flick",
    description: "AI-powered movie recommendations based on your vibes.",
  },
};

export default function FlickMindLayout({ children }) {
  return (
    <>
      {/* The layout serves the Metadata to the browser/bots 
        while the children (your page.js) handles the AI logic.
      */}
      {children}
    </>
  );
}