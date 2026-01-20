import Link from 'next/link'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">TechDepot</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Your trusted destination for premium tech gadgets and accessories.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-blue-400 transition">
                                Twitter
                            </a>
                            <a href="#" className="hover:text-blue-400 transition">
                                Facebook
                            </a>
                            <a href="#" className="hover:text-blue-400 transition">
                                Instagram
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/products" className="hover:text-blue-400 transition">
                                    Shop All Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-blue-400 transition">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-blue-400 transition">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-blue-400 transition">
                                    FAQs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Customer Service</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/shipping" className="hover:text-blue-400 transition">
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="hover:text-blue-400 transition">
                                    Returns & Exchanges
                                </Link>
                            </li>
                            <li>
                                <Link href="/warranty" className="hover:text-blue-400 transition">
                                    Warranty
                                </Link>
                            </li>
                            <li>
                                <Link href="/track-order" className="hover:text-blue-400 transition">
                                    Track Order
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/privacy" className="hover:text-blue-400 transition">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-blue-400 transition">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookies" className="hover:text-blue-400 transition">
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/accessibility" className="hover:text-blue-400 transition">
                                    Accessibility
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                        <p>&copy; {currentYear} TechDepot. All rights reserved.</p>
                        <p>Made with ❤️ for tech enthusiasts</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
