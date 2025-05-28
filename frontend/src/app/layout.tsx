import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PEGA: Peer-to-Peer Escrow for Gigs and Autonomy",
  description: "Sistema oficial de escrow laboral de ChileDAO",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/chiledaodots.png', type: 'image/png' }
    ],
    apple: [
      { url: '/chiledaodots.png', type: 'image/png' }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
