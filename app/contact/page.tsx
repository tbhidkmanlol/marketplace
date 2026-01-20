import Link from 'next/link'
import Footer from '@/components/Footer'

export default function ContactPage() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="text-slate-400 hover:text-slate-300 text-sm transition">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-white mt-4">Contact Us</h1>
                    <p className="text-slate-400 mt-2">We'd love to hear from you. Get in touch with us today.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Email</h3>
                            <p className="text-slate-600 dark:text-slate-400">support@techdepot.com</p>
                        </div>

                        <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Phone</h3>
                            <p className="text-slate-600 dark:text-slate-400">+1 (555) 123-4567</p>
                        </div>

                        <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Hours</h3>
                            <p className="text-slate-600 dark:text-slate-400">Mon - Fri: 9am - 6pm</p>
                            <p className="text-slate-600 dark:text-slate-400">Sat - Sun: 10am - 4pm</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a Message</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    Message
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Your message..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
