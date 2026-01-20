"use client" // Since we use a button click, this must be a client component

import { useTheme } from "next-themes"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useCart } from "@/app/context/CartContext"

export default function Navbar() {
    const { theme, setTheme } = useTheme()
    const { totalItems } = useCart()
    const [mounted, setMounted] = useState(false)

    // This prevents "hydration" errors (ensures browser matches server)
    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    return (
        <nav className="flex justify-between items-center p-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors">
            {/* Logo/Brand */}
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                TechDepot
            </Link>

            {/* Navigation Links + Theme Button */}
            <div className="flex items-center gap-6">
                <Link href="/products" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Products
                </Link>
                <Link href="/cart" className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    🛒
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center min-w-5 h-5 text-xs font-bold bg-red-600 text-white rounded-full">
                            {totalItems}
                        </span>
                    )}
                </Link>
                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm font-medium hover:ring-2 ring-blue-500 transition-all"
                >
                    {theme === "dark" ? "🌙" : "☀️"}
                </button>
            </div>
        </nav>
    )
}