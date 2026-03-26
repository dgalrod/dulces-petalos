import type { Metadata } from "next";
import { Nunito, DM_Sans } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dulces Pétalos",
  description: "Tu floristería online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${nunito.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f9f9f9]">
        <header className="sticky top-0 z-10 flex items-center justify-center bg-white px-1 py-2">
          <Image src="/logo.svg" alt="Dulces Pétalos" width={50} height={50} />
        </header>
        {children}
      </body>
    </html>
  );
}
