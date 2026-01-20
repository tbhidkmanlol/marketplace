"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface OrderData {
    orderNumber: string
    orderDate: string
    name: string
    email: string
    address: string
    phone: string
    paymentMethod: string
    bankOption?: string
    ewalletOption?: string
    items: Array<{ id: number; name: string; price: number; quantity: number }>
    subtotal: number
    discount: { code: string; percent: number } | null
    total: number
}

export default function OrderReceiptPage() {
    const router = useRouter()
    const [orderData, setOrderData] = useState<OrderData | null>(null)

    useEffect(() => {
        // Get order data from localStorage
        const data = localStorage.getItem("pendingOrder")
        if (!data) {
            router.push("/products")
            return
        }
        setOrderData(JSON.parse(data))
    }, [])

    const handlePrint = () => {
        window.print()
    }

    const handleContinueShopping = () => {
        // Clear pending order when leaving the receipt
        localStorage.removeItem("pendingOrder")
        router.push("/products")
    }

    if (!orderData) {
        return <div className="w-full min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
    }

    return (
        <div className="w-full min-h-screen bg-white dark:bg-gray-900">
            <div className="p-8 max-w-4xl mx-auto">
                {/* Success Message */}
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">✅</div>
                    <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Order Received!</h1>
                    <p className="text-gray-600 dark:text-gray-400">Thank you for your purchase</p>
                </div>

                {/* Receipt Container */}
                <div className="bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-lg p-8 mb-6 print:border-black">
                    {/* Header */}
                    <div className="text-center mb-6 pb-4 border-b border-gray-300 dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">TechDepot</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Order Receipt</p>
                    </div>

                    {/* Order Info */}
                    <div className="mb-6 pb-4 border-b border-gray-300 dark:border-gray-700">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-600 dark:text-gray-400">Order Number</p>
                                <p className="font-bold text-gray-900 dark:text-white">#{orderData.orderNumber}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-600 dark:text-gray-400">Order Date</p>
                                <p className="font-bold text-gray-900 dark:text-white">
                                    {new Date(orderData.orderDate).toLocaleDateString('en-MY', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="mb-6 pb-4 border-b border-gray-300 dark:border-gray-700">
                        <h3 className="font-bold mb-3 text-gray-900 dark:text-white">Customer Information</h3>
                        <div className="space-y-1 text-sm text-gray-800 dark:text-gray-200">
                            <p><span className="font-semibold">Name:</span> {orderData.name}</p>
                            <p><span className="font-semibold">Email:</span> {orderData.email}</p>
                            <p><span className="font-semibold">Phone:</span> {orderData.phone}</p>
                            <p><span className="font-semibold">Address:</span> {orderData.address}</p>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-6 pb-4 border-b border-gray-300 dark:border-gray-700">
                        <h3 className="font-bold mb-3 text-gray-900 dark:text-white">Items Ordered</h3>
                        <div className="space-y-2">
                            {orderData.items.map(item => (
                                <div key={item.id} className="flex justify-between text-sm text-gray-800 dark:text-gray-200">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>RM{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="mb-6 pb-4 border-b border-gray-300 dark:border-gray-700">
                        <h3 className="font-bold mb-3 text-gray-900 dark:text-white">Payment Method</h3>
                        <p className="text-sm text-gray-800 dark:text-gray-200">{orderData.paymentMethod}</p>
                        {orderData.bankOption && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">Bank: {orderData.bankOption}</p>
                        )}
                        {orderData.ewalletOption && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">E-Wallet: {orderData.ewalletOption}</p>
                        )}
                    </div>

                    {/* Total */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-gray-900 dark:text-white">
                            <span>Subtotal:</span>
                            <span>RM{orderData.subtotal.toFixed(2)}</span>
                        </div>
                        {orderData.discount && (
                            <div className="flex justify-between text-green-700 dark:text-green-400">
                                <span>Discount ({orderData.discount.code} - {orderData.discount.percent}%):</span>
                                <span>-RM{(orderData.subtotal * (orderData.discount.percent / 100)).toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-2xl font-bold pt-2 border-t border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                            <span>Total Paid:</span>
                            <span>RM{orderData.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 print:hidden">
                    <button
                        onClick={handlePrint}
                        className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                    >
                        🖨️ Print Receipt
                    </button>
                    <button
                        onClick={handleContinueShopping}
                        className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
                    >
                        Continue Shopping →
                    </button>
                </div>
            </div>
        </div>
    )
}
