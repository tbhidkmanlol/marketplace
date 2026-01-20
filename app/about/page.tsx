import Link from 'next/link'
import Footer from '@/components/Footer'

export default function AboutPage() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="text-slate-400 hover:text-slate-300 text-sm transition">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-white mt-4">About TechDepot</h1>
                    <p className="text-slate-400 mt-2">Your trusted partner for cutting-edge technology</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                    {/* Text Content */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                Who We Are
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Founded in 2024, TechDepot is a leading online marketplace dedicated to bringing you the latest and greatest in technology. We believe in making premium tech accessible to everyone.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                Our Mission
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                We're committed to providing customers with high-quality tech products, exceptional service, and competitive prices. Our goal is to empower individuals with the tools they need to succeed in the digital age.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                Why Choose Us
                            </h3>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                                <li className="flex items-center">
                                    <span className="text-blue-600 font-bold mr-3">✓</span>
                                    Curated selection of premium products
                                </li>
                                <li className="flex items-center">
                                    <span className="text-blue-600 font-bold mr-3">✓</span>
                                    Competitive pricing and regular discounts
                                </li>
                                <li className="flex items-center">
                                    <span className="text-blue-600 font-bold mr-3">✓</span>
                                    Fast and reliable shipping
                                </li>
                                <li className="flex items-center">
                                    <span className="text-blue-600 font-bold mr-3">✓</span>
                                    24/7 customer support
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-blue-50 dark:bg-gray-700 p-8 rounded-xl text-center">
                            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                10K+
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 font-medium">
                                Happy Customers
                            </p>
                        </div>
                        <div className="bg-blue-50 dark:bg-gray-700 p-8 rounded-xl text-center">
                            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                500+
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 font-medium">
                                Products
                            </p>
                        </div>
                        <div className="bg-blue-50 dark:bg-gray-700 p-8 rounded-xl text-center">
                            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                30+
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 font-medium">
                                Brands
                            </p>
                        </div>
                        <div className="bg-blue-50 dark:bg-gray-700 p-8 rounded-xl text-center">
                            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                24/7
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 font-medium">
                                Support
                            </p>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="bg-white dark:bg-slate-800 rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Quality</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                We only stock products from trusted brands that meet our high standards.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Integrity</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Transparent pricing, honest product descriptions, and fair business practices.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Innovation</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Continuously improving our platform and service to better serve you.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
