import Link from 'next/link'
import Footer from '@/components/Footer'

export default function WarrantyPage() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="text-slate-400 hover:text-slate-300 text-sm transition">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-white mt-4">Warranty Information</h1>
                    <p className="text-slate-400 mt-2">Product protection and warranty coverage</p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg p-8 space-y-8 text-slate-900 dark:text-white">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Manufacturer Warranties</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            Most products sold on TechDepot come with a manufacturer's warranty. The length and terms of the warranty depend on the specific product and manufacturer. Check your product documentation for details.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Common Warranty Periods</h2>
                        <div className="space-y-4 text-slate-600 dark:text-slate-400">
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Electronics</h3>
                                <p>Typically 1-2 years from date of purchase</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Batteries</h3>
                                <p>Usually 6 months to 1 year</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Chargers & Cables</h3>
                                <p>Typically 1 year</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Accessories</h3>
                                <p>Varies by product, usually 6 months to 1 year</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">What's Covered</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            Manufacturer warranties typically cover defects in materials and workmanship under normal use. This includes:
                        </p>
                        <ul className="text-slate-600 dark:text-slate-400 space-y-2">
                            <li>• Manufacturing defects</li>
                            <li>• Component failures</li>
                            <li>• Malfunction due to design flaws</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">What's Not Covered</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            Warranties typically do NOT cover:
                        </p>
                        <ul className="text-slate-600 dark:text-slate-400 space-y-2">
                            <li>• Accidental damage or misuse</li>
                            <li>• Normal wear and tear</li>
                            <li>• Water or liquid damage</li>
                            <li>• Unauthorized repairs or modifications</li>
                            <li>• Damage from power surges</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Extended Warranty</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            For select products, we offer extended warranty coverage options. These can protect your device beyond the manufacturer's standard warranty period. Ask our sales team about availability.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Warranty Claims</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            If your product fails within the warranty period:
                        </p>
                        <ul className="text-slate-600 dark:text-slate-400 space-y-2">
                            <li>1. Contact the manufacturer's customer service</li>
                            <li>2. Have your proof of purchase and order number ready</li>
                            <li>3. Follow their instructions for repair or replacement</li>
                            <li>4. Or contact us for assistance at warranty@techdepot.com</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Questions?</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            For warranty questions, contact us at warranty@techdepot.com
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    )
}
