import Link from 'next/link'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="text-slate-400 hover:text-slate-300 text-sm transition">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-white mt-4">Privacy Policy</h1>
                    <p className="text-slate-400 mt-2">Last updated: January 2026</p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg p-8 space-y-8 text-slate-900 dark:text-white">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            TechDepot ("we", "us", "our", or "Company") operates the marketplace website. 
                            This Privacy Policy explains how we collect, use, disclose, and safeguard your information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">We may collect information about you in a variety of ways, including:</p>
                        <ul className="text-slate-600 dark:text-slate-400 space-y-2">
                            <li>• Personal identification information (name, email, phone number, address)</li>
                            <li>• Payment information (credit card, billing address)</li>
                            <li>• Browsing history and preferences</li>
                            <li>• Device information (IP address, browser type)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">We use the information we collect to:</p>
                        <ul className="text-slate-600 dark:text-slate-400 space-y-2">
                            <li>• Process your orders and payments</li>
                            <li>• Send you transactional emails</li>
                            <li>• Improve our website and services</li>
                            <li>• Respond to your inquiries and support requests</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            We implement appropriate technical and organizational measures to protect your personal data 
                            against unauthorized access, alteration, disclosure, or destruction.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">You have the right to:</p>
                        <ul className="text-slate-600 dark:text-slate-400 space-y-2">
                            <li>• Access your personal data</li>
                            <li>• Request correction of inaccurate data</li>
                            <li>• Request deletion of your data</li>
                            <li>• Opt-out of marketing communications</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            If you have questions about this Privacy Policy, please contact us at privacy@techdepot.com
                        </p>
                    </section>
                </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
