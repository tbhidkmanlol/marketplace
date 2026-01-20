"use client"
import { useCart } from "../context/CartContext"
import Link from "next/link"

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart()

    if (cartItems.length === 0) {
        return <div className="w-full min-h-screen bg-white dark:bg-gray-900">
            <div className="p-8 text-center max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">Your cart is empty</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Add some products to get started!</p>
            </div>
        </div>
    }

    return (
        <div className="w-full min-h-screen bg-white dark:bg-gray-900">
            <div className="p-8 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Shopping Cart</h1>

                {/* Table/Grid Header */}
                <div className="grid grid-cols-5 gap-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 font-semibold text-gray-700 dark:text-gray-300">
                    <div>Product</div>
                    <div>Price</div>
                    <div>Quantity</div>
                    <div>Subtotal</div>
                    <div>Action</div>
                </div>

                {/* Items */}
                {cartItems.map(item => (
                    <div key={item.id} className="grid grid-cols-5 gap-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 items-center shadow-sm hover:shadow-md transition-shadow">
                        <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                        <div className="text-gray-700 dark:text-gray-300">RM{item.price}</div>

                        {/* Quantity controls */}
                        <div className="flex gap-2 items-center">
                            <button
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md font-bold text-gray-700 dark:text-gray-300 transition-colors"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                min={1}
                                max={item.stock_qty}
                                value={item.quantity}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value, 10)
                                    const clamped = Number.isNaN(val)
                                        ? 1
                                        : Math.min(Math.max(val, 1), item.stock_qty)
                                    updateQuantity(item.id, clamped)
                                }}
                                className="w-16 text-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            <button
                                onClick={() => updateQuantity(item.id, Math.min(item.stock_qty, item.quantity + 1))}
                                disabled={item.quantity >= item.stock_qty}
                                className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md font-bold text-gray-700 dark:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                +
                            </button>
                        </div>

                        <div className="font-semibold text-gray-900 dark:text-white">RM{(item.price * item.quantity).toFixed(2)}</div>
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                {/* Total & Checkout */}
                <div className="mt-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Total:</h2>
                        <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">RM{totalPrice.toFixed(2)}</span>
                    </div>
                    <Link href="/checkout">
                        <button className="mt-4 w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg">
                            Checkout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}