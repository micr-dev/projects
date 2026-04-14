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
  title: "Projects",
  description: "Project showcase portfolio",
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
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
