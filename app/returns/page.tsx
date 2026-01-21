import Link from 'next/link'
import Footer from '@/components/Footer'

export default function ReturnsPage() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="text-slate-400 hover:text-slate-300 text-sm transition">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-white mt-4">Returns & Exchanges</h1>
                    <p className="text-slate-400 mt-2">Our flexible return and exchange policy</p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg p-8 space-y-8 text-slate-900 dark:text-white">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Return Policy</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            We want you to be completely satisfied with your purchase. If you're not, we offer a hassle-free 30-day return policy.
                        </p>
                        <div className="bg-blue-50 dark:bg-slate-700 p-4 rounded-lg text-slate-900 dark:text-white">
                            <p className="font-bold mb-2">30-Day Money Back Guarantee</p>
                            <p>Return any item within 30 days of purchase for a full refund, no questions asked.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Return Requirements</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">To be eligible for a return, items must:</p>
                        <ul className="text-slate-600 dark:text-slate-400 space-y-2">
                            <li>• Be in original, unused condition</li>
                            <li>• Have all original packaging and accessories</li>
                            <li>• Include the original invoice or order confirmation</li>
                            <li>• Not show signs of wear or damage</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">How to Return</h2>
                        <div className="space-y-4 text-slate-600 dark:text-slate-400">
                            <p><strong>Step 1:</strong> Contact our customer service at returns@techdepot.com with your order number</p>
                            <p><strong>Step 2:</strong> Receive a prepaid shipping label</p>
                            <p><strong>Step 3:</strong> Pack the item securely and drop it off at any shipping location</p>
                            <p><strong>Step 4:</strong> Receive your refund within 5-7 business days of us receiving the return</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Exchanges</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            If you'd like to exchange an item for a different size, color, or model, we can process an exchange instead of a return. Simply:
                        </p>
                        <ul className="text-slate-600 dark:text-slate-400 space-y-2">
                            <li>1. Contact us with your request</li>
                            <li>2. Return the original item</li>
                            <li>3. We'll ship the replacement item immediately</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Non-Returnable Items</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">The following items cannot be returned:</p>
                        <ul className="text-slate-600 dark:text-slate-400 space-y-2">
                            <li>• Clearance or final sale items</li>
                            <li>• Items used or damaged by the customer</li>
                            <li>• Software products (after download)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Questions?</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            Contact our customer service team at returns@techdepot.com or call 1-555-123-4567
                        </p>
                    </section>
                </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
