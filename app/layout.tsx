import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CraftCV - Professional Resume Builder",
  description:
    "Build ATS-friendly resumes in minutes with our AI-powered builder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Script
          src="https://pl28625416.effectivegatecpm.com/6f/27/be/6f27becea790f60ceac6dcbd729e4d05.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
