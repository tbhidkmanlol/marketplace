import Link from 'next/link'
import Footer from '@/components/Footer'

export default function TermsPage() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="text-slate-400 hover:text-slate-300 text-sm transition">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-white mt-4">Terms of Service</h1>
                    <p className="text-slate-400 mt-2">Last updated: January 2026</p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg p-8 space-y-8 text-slate-900 dark:text-white">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            By accessing and using this website, you accept and agree to be bound by and comply with these terms and conditions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            Permission is granted to temporarily download one copy of the materials (information or software) on TechDepot's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                        </p>
                        <ul className="text-slate-600 dark:text-slate-400 space-y-2">
                            <li>• Modifying or copying the materials</li>
                            <li>• Using the materials for any commercial purpose or for any public display</li>
                            <li>• Attempting to decompile or reverse engineer any software contained on the website</li>
                            <li>• Removing any copyright or other proprietary notations from the materials</li>
                            <li>• Transferring the materials to another person or "mirroring" the materials on any other server</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">3. Disclaimer</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            The materials on TechDepot's website are provided on an 'as is' basis. TechDepot makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">4. Limitations</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            In no event shall TechDepot or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on TechDepot's website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">5. Accuracy of Materials</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            The materials appearing on TechDepot's website could include technical, typographical, or photographic errors. TechDepot does not warrant that any of the materials on the website are accurate, complete, or current.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">6. Links</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            TechDepot has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by TechDepot of the site. Use of any such linked website is at the user's own risk.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">7. Modifications</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            TechDepot may revise these terms of service for the website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                        </p>
                    </section>
                </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
