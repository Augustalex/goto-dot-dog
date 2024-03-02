import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Goto Dog",
  description: "Go eat at a nearby place with your best friend!",
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
        <Analytics />
      </body>
    </html>
  );
}
