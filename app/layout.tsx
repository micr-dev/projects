import type { Metadata } from "next";
import { Cal_Sans, Inter } from "next/font/google";
import SmoothScroll from "./smooth-scroll";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const calSans = Cal_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-calsans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://projects.micr.dev"),
  title: "Projects by Microck",
  description: "A public portfolio of software, tools, and experiments by Microck.",
  alternates: {
    canonical: "https://projects.micr.dev/",
  },
  authors: [{ name: "Microck", url: "https://micr.dev/" }],
  openGraph: {
    title: "Projects by Microck",
    description: "A public portfolio of software, tools, and experiments by Microck.",
    url: "https://projects.micr.dev/",
    siteName: "Projects by Microck",
    type: "website",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Projects showcase portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects",
    description: "Project showcase portfolio",
    images: ["/twitter-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${calSans.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Projects by Microck",
          description: "A public portfolio of software, tools, and experiments by Microck.",
          url: "https://projects.micr.dev/",
          author: { "@type": "Person", name: "Microck", url: "https://micr.dev/" },
        }) }} />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
