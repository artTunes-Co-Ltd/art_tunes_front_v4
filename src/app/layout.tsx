import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const faviconFile = process.env.NEXT_PUBLIC_FAVICON_PATH || "favicon.ico";
const isStaging = process.env.NEXT_PUBLIC_APP_ENV === "staging";

export const metadata: Metadata = {
  icons: {
    icon: `/${faviconFile}`,
    shortcut: `/${faviconFile}`,
  },
  ...(isStaging && {
    robots: {
      index: false, // STG環境のみ適用
    },
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
