import Link from 'next/link'
import Footer from '@/components/Footer'

export default function FAQPage() {
    const faqs = [
        {
            question: 'What is your return policy?',
            answer: 'We offer a 30-day return policy on all products. Items must be in original condition with all packaging and accessories included.'
        },
        {
            question: 'How long does shipping take?',
            answer: 'Standard shipping takes 5-7 business days. Express shipping options are available for 2-3 business day delivery.'
        },
        {
            question: 'Do you ship internationally?',
            answer: 'Currently, we only ship within the United States. International shipping options are coming soon!'
        },
        {
            question: 'Is my payment information secure?',
            answer: 'Yes, we use industry-standard SSL encryption to protect all payment information. Your data is safe with us.'
        },
        {
            question: 'Can I cancel my order?',
            answer: 'If your order hasn\'t shipped yet, you can cancel it for a full refund. Contact us immediately after placing your order.'
        },
        {
            question: 'Do you offer warranty on products?',
            answer: 'Most products come with manufacturer warranty. Check product details for specific warranty information.'
        },
        {
            question: 'How can I track my order?',
            answer: 'You\'ll receive a tracking number via email once your order ships. Use it to track your package in real-time.'
        },
        {
            question: 'What if I receive a damaged item?',
            answer: 'Contact us immediately with photos of the damage. We\'ll send a replacement or issue a refund right away.'
        }
    ]

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="text-slate-400 hover:text-slate-300 text-sm transition">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-white mt-4">Frequently Asked Questions</h1>
                    <p className="text-slate-400 mt-2">Find answers to common questions about our store and policies.</p>
                </div>

                {/* FAQs */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <details key={index} className="group bg-white dark:bg-slate-800 rounded-lg p-6 cursor-pointer">
                            <summary className="flex items-center justify-between font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">
                                {faq.question}
                                <span className="transition group-open:rotate-180">
                                    ▼
                                </span>
                            </summary>
                            <p className="text-slate-600 dark:text-slate-400 mt-4">
                                {faq.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}
