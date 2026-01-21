import Link from 'next/link'
import Footer from '@/components/Footer'

export default function AccessibilityPage() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="text-slate-400 hover:text-slate-300 text-sm transition">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-white mt-4">Accessibility Statement</h1>
                    <p className="text-slate-400 mt-2">Our commitment to inclusive design</p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg p-8 space-y-8 text-slate-900 dark:text-white">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            TechDepot is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Accessibility Features</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">Our website includes the following accessibility features:</p>
                        <ul className="text-slate-600 dark:text-slate-400 space-y-2">
                            <li>• Keyboard navigation support</li>
                            <li>• Alt text for all images</li>
                            <li>• High contrast dark mode option</li>
                            <li>• Readable font sizes</li>
                            <li>• Semantic HTML structure</li>
                            <li>• Screen reader compatibility</li>
                            <li>• Focus indicators for all interactive elements</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">WCAG Compliance</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. These guidelines explain how to make web content more accessible to people with disabilities and older users.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Known Issues</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            While we work to maintain accessibility standards, some third-party content and external services may not be fully accessible. We are working to address these issues.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Accessibility Support</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            If you experience accessibility barriers while using our website, please let us know:
                        </p>
                        <p className="text-slate-600 dark:text-slate-400">
                            Email: accessibility@techdepot.com
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Continuous Improvement</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            We regularly test our website with accessibility tools and user feedback to identify and fix issues. Your feedback helps us improve our accessibility efforts.
                        </p>
                    </section>
                </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
