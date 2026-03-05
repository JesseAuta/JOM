"use client";

import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";
import SearchBar from "./components/SearchBar";
import { use } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
     <body className="flex flex-col min-h-screen" suppressHydrationWarning>
  <Header />
  
  <main className="flex-1">{children}</main>
  <Footer />
</body>
    </html>
  );
}