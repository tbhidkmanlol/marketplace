import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechDepot - Tech and Gadget Shop",
  description: "im still learning this lmao",
};

import Navbar from "@/components/NavBar"
import { ThemeProvider } from "@/components/ThemeProvider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <CartProvider>
          <Toaster position="top-right" />
          <Navbar /> {/* This stays at the top */}
          {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}