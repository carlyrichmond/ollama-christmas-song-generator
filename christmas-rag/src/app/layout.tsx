import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Nav from "./components/Nav";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ollama Christmas Song Generator",
  description: "Example RAG application with a festive twist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex flex-col">
          <Nav/>
          <main className="flex flex-col">
            {children}
          </main>
          <footer className="row-start-3 flex gap-2 flex-wrap items-center justify-center">
          Made by Carly Richmond with 💜 and excessive amounts of 🍵 
          </footer>
        </div>
      </body>
    </html>
  );
}
