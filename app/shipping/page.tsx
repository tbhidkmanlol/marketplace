import Link from 'next/link'
import Footer from '@/components/Footer'

export default function ShippingPage() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="text-slate-400 hover:text-slate-300 text-sm transition">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-white mt-4">Shipping Information</h1>
                    <p className="text-slate-400 mt-2">Learn about our shipping options and delivery times.</p>
                </div>

                <div className="space-y-8">
                    {/* Shipping Methods */}
                    <section className="bg-white dark:bg-slate-800 rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Shipping Methods</h2>

                        <div className="space-y-6">
                            <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Standard Shipping</h3>
                                <p className="text-slate-600 dark:text-slate-400">5-7 business days | FREE on orders over $50</p>
                            </div>

                            <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Express Shipping</h3>
                                <p className="text-slate-600 dark:text-slate-400">2-3 business days | $9.99</p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Overnight Shipping</h3>
                                <p className="text-slate-600 dark:text-slate-400">Next business day | $24.99</p>
                            </div>
                        </div>
                    </section>

                    {/* Processing Time */}
                    <section className="bg-white dark:bg-slate-800 rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Processing Time</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            Orders are processed within 1-2 business days (Monday-Friday, excluding holidays). 
                            You'll receive a tracking number via email once your order ships.
                        </p>
                    </section>

                    {/* Delivery Area */}
                    <section className="bg-white dark:bg-slate-800 rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Delivery Area</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            We currently deliver to all 50 United States and US territories. 
                            International shipping options coming soon!
                        </p>
                    </section>

                    {/* Tracking */}
                    <section className="bg-white dark:bg-slate-800 rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Track Your Order</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            Once your order ships, you'll receive an email with a tracking number. 
                            Use it to monitor your package in real-time on the carrier's website.
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    )
}
