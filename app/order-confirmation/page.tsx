"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "../context/CartContext"
import { insertOrder } from "@/lib/orders"
import toast from "react-hot-toast"

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

export default function OrderConfirmationPage() {
    const router = useRouter()
    const { clearCart } = useCart()
    const [orderData, setOrderData] = useState<OrderData | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)

    useEffect(() => {
        // Get order data from localStorage
        const data = localStorage.getItem("pendingOrder")
        if (!data) {
            router.push("/checkout")
            return
        }
        setOrderData(JSON.parse(data))
    }, [router])

    const handleConfirm = async () => {
        if (!orderData) return

        setIsProcessing(true)
        try {
            // Save order to Supabase
            await insertOrder({
                orderNumber: orderData.orderNumber,
                customerName: orderData.name,
                customerEmail: orderData.email,
                customerPhone: orderData.phone,
                customerAddress: orderData.address,
                paymentMethod: orderData.paymentMethod,
                bankOption: orderData.bankOption,
                ewalletOption: orderData.ewalletOption,
                items: orderData.items.map(item => ({
                    productId: item.id,
                    productName: item.name,
                    unitPrice: item.price,
                    quantity: item.quantity
                })),
                subtotal: orderData.subtotal,
                discountCode: orderData.discount?.code,
                discountPercent: orderData.discount?.percent,
                totalPrice: orderData.total
            })

            // Clear cart now that order is confirmed
            clearCart()

            toast((t) => (
                <div className="flex gap-2">
                    <span>✅ Order saved successfully!</span>
                    <button onClick={() => toast.dismiss(t.id)}>✕</button>
                </div>
            ))

            // Move to receipt page
            router.push("/order-receipt")
        } catch (error) {
            console.error('Order confirmation error:', error)
            toast((t) => (
                <div className="flex gap-2">
                    <span>❌ Failed to save order. Please try again.</span>
                    <button onClick={() => toast.dismiss(t.id)}>✕</button>
                </div>
            ))
        } finally {
            setIsProcessing(false)
        }
    }

    const handleGoBack = () => {
        router.push("/checkout")
    }

    if (!orderData) {
        return <div className="w-full min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
    }

    return (
        <div className="w-full min-h-screen bg-white dark:bg-gray-900">
            <div className="p-8 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Review Your Order</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">Please check your information before confirming</p>

                {/* Order Items */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Order Items</h2>
                    {orderData.items.map(item => (
                        <div key={item.id} className="flex justify-between mb-2 text-gray-800 dark:text-gray-200">
                            <span>{item.name} x {item.quantity}</span>
                            <span>RM{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                {/* Customer Information */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Shipping Information</h2>
                    <div className="space-y-2 text-gray-800 dark:text-gray-200">
                        <div><span className="font-semibold">Name:</span> {orderData.name}</div>
                        <div><span className="font-semibold">Email:</span> {orderData.email}</div>
                        <div><span className="font-semibold">Address:</span> {orderData.address}</div>
                        <div><span className="font-semibold">Phone:</span> {orderData.phone}</div>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Payment Method</h2>
                    <p className="text-gray-800 dark:text-gray-200">{orderData.paymentMethod}</p>
                    {orderData.bankOption && (
                        <p className="text-gray-600 dark:text-gray-400 mt-1">Bank: {orderData.bankOption}</p>
                    )}
                    {orderData.ewalletOption && (
                        <p className="text-gray-600 dark:text-gray-400 mt-1">E-Wallet: {orderData.ewalletOption}</p>
                    )}
                </div>

                {/* Order Total */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-6">
                    <div className="space-y-2">
                        <div className="flex justify-between text-gray-900 dark:text-white">
                            <span>Subtotal:</span>
                            <span>RM{orderData.subtotal.toFixed(2)}</span>
                        </div>
                        {orderData.discount && (
                            <div className="flex justify-between text-green-700 dark:text-green-400">
                                <span>Discount ({orderData.discount.percent}%):</span>
                                <span>-RM{(orderData.subtotal * (orderData.discount.percent / 100)).toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-xl font-bold border-t pt-2 text-gray-900 dark:text-white">
                            <span>Total:</span>
                            <span>RM{orderData.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={handleGoBack}
                        disabled={isProcessing}
                        className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
                    >
                        ← Go Back & Edit
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={isProcessing}
                        className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
                    >
                        {isProcessing ? "Processing..." : "Confirm Order ✓"}
                    </button>
                </div>
            </div>
        </div>
    )
}
