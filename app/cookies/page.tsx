import Link from 'next/link'
import Footer from '@/components/Footer'

export default function CookiesPage() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="text-slate-400 hover:text-slate-300 text-sm transition">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-white mt-4">Cookie Policy</h1>
                    <p className="text-slate-400 mt-2">Last updated: January 2026</p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg p-8 space-y-8 text-slate-900 dark:text-white">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            Cookies are small text files that are placed on your computer by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">How We Use Cookies</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">TechDepot uses cookies for the following purposes:</p>
                        <ul className="text-slate-600 dark:text-slate-400 space-y-2">
                            <li>• <strong>Essential Cookies:</strong> To maintain your session and secure access to your account</li>
                            <li>• <strong>Preference Cookies:</strong> To remember your choices and preferences</li>
                            <li>• <strong>Analytics Cookies:</strong> To understand how you use our website and improve our services</li>
                            <li>• <strong>Marketing Cookies:</strong> To show you relevant advertisements and promotions</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Types of Cookies</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Session Cookies</h3>
                                <p className="text-slate-600 dark:text-slate-400">These cookies expire when you close your browser.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Persistent Cookies</h3>
                                <p className="text-slate-600 dark:text-slate-400">These cookies remain on your device until they expire or you delete them.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">First-Party Cookies</h3>
                                <p className="text-slate-600 dark:text-slate-400">Set by TechDepot directly.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Third-Party Cookies</h3>
                                <p className="text-slate-600 dark:text-slate-400">Set by our partners and service providers.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Managing Your Cookies</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit a website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            If you have questions about our cookie policy, please contact us at cookies@techdepot.com
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    )
}
