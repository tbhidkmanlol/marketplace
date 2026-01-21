import Link from 'next/link'
import Footer from '@/components/Footer'

export default function TrackOrderPage() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="text-slate-400 hover:text-slate-300 text-sm transition">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-white mt-4">Track Your Order</h1>
                    <p className="text-slate-400 mt-2">Follow your shipment in real-time</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Tracking Form */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Find Your Order</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Order Number
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., TD-2026-001234"
                                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
                            >
                                Track Order
                            </button>
                        </form>
                    </div>

                    {/* Info Box */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">How to Track</h2>
                        <div className="space-y-4 text-slate-600 dark:text-slate-400">
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white mb-2">📧 Email Confirmation</p>
                                <p className="text-sm">You'll receive a tracking number via email as soon as your order ships</p>
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white mb-2">📦 Real-Time Updates</p>
                                <p className="text-sm">Track your package status from dispatch through delivery</p>
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white mb-2">🚚 Carrier Information</p>
                                <p className="text-sm">See which carrier is handling your shipment and estimated delivery date</p>
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white mb-2">🔔 Notifications</p>
                                <p className="text-sm">Get notified at each step of your delivery</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Help Section */}
                <div className="bg-white dark:bg-slate-800 rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Order Status Guide</h2>
                    <div className="space-y-4">
                        <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Processing</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">Your order is being prepared for shipment</p>
                        </div>
                        <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Shipped</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">Your order is on its way to you</p>
                        </div>
                        <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">In Transit</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">Your package is with the carrier and will be delivered soon</p>
                        </div>
                        <div className="pb-4">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Delivered</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">Your order has been delivered</p>
                        </div>
                    </div>
                </div>

                {/* Support */}
                <div className="bg-blue-50 dark:bg-slate-700 rounded-lg p-8 mt-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Need Help?</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                        If you have trouble tracking your order or have questions about your shipment, contact us:
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">
                        Email: support@techdepot.com | Phone: 1-555-123-4567
                    </p>
                </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
