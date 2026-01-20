"use client" // Since we use a button click, this must be a client component

import { useTheme } from "next-themes"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { useCart } from "@/app/context/CartContext"
import { getCurrentUser, signOut } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

interface User {
    id: string
    username: string
    email: string
}

export default function Navbar() {
    const { theme, setTheme } = useTheme()
    const { totalItems } = useCart()
    const [mounted, setMounted] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    // This prevents "hydration" errors (ensures browser matches server)
    useEffect(() => setMounted(true), [])

    // Check if user is logged in
    useEffect(() => {
        async function loadUser() {
            const currentUser = await getCurrentUser()
            if (currentUser) {
                setUser({
                    id: currentUser.id,
                    username: currentUser.username,
                    email: currentUser.email,
                })
            }
        }

        // Use auth state listener to properly wait for session
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                loadUser()
            } else {
                setUser(null)
            }
        })

        return () => subscription?.unsubscribe()
    }, [])

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSignOut = async () => {
        try {
            await signOut()
            setUser(null)
            setDropdownOpen(false)
            router.push('/')
        } catch (error) {
            console.error('Sign out failed:', error)
        }
    }

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

                {/* User Profile Section */}
                {user ? (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                        >
                            👤
                            <span className="text-sm font-medium">{user.username}</span>
                            <span className={`text-xs transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Signed in as</p>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user.email}</p>
                                </div>

                                <Link
                                    href="/profile/edit"
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    ⚙️ Profile Settings
                                </Link>

                                <Link
                                    href="/orders"
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    📦 Order History
                                </Link>

                                <button
                                    onClick={handleSignOut}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-t border-gray-200 dark:border-gray-700"
                                >
                                    🚪 Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        href="/auth"
                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
                    >
                        Sign In
                    </Link>
                )}

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