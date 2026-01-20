"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "../context/CartContext"
import { CheckoutForm } from "@/lib/types"
import toast from "react-hot-toast"

export default function CheckoutPage() {
    const router = useRouter()
    const { cartItems, totalPrice, clearCart } = useCart()

    // Form state
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")

    // Discount state
    const [discountCode, setDiscountCode] = useState("")
    const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null)

    // Valid codes (hardcoded for now)
    const validCodes = {
        "SAVE10": 10,
        "WELCOME20": 20,
        "SPECIAL15": 15,
    }

    // Payment Methods
    const [paymentMethod, setPaymentMethod] = useState("")
    const paymentMethods = ["COD (Cash on Delivery)", "Online Banking", "E-Wallet"]
    const [bankOption, setBankOption] = useState("")
    const [ewalletOption, setEwalletOption] = useState("")

    const banks = ["Maybank", "CIMB", "Public Bank", "RHB", "AmBank", "Hong Leong"]
    const ewallets = ["Touch n' Go", "Alipay", "WeChat Pay"]

    // Handle discount application
    const applyDiscount = () => {
        if (!discountCode) {
            // Show toast: "Please enter a code"
            toast((t) => (
                <div className="flex gap-2">
                    <span>Please enter a promo code</span>
                    <button onClick={() => toast.dismiss(t.id)}>✕</button>
                </div>
            ))
            return
        }

        const code = discountCode.trim().toUpperCase()
        if (appliedDiscount && appliedDiscount.code === code) {
            toast((t) => (
                <div className="flex gap-2">
                    <span>⚠️ This promo code is already applied</span>
                    <button onClick={() => toast.dismiss(t.id)}>✕</button>
                </div>
            ))
            return
        }

        // Check if code is valid
        if (validCodes[code as keyof typeof validCodes]) {
            // Get the discount percent
            const percent = validCodes[code as keyof typeof validCodes]
            // Store applied discount
            setAppliedDiscount({ code, percent })
            // Show success toast
            toast((t) => (
                <div className="flex gap-2">
                    <span>✅ Promo code applied! {percent}% off</span>
                    <button onClick={() => toast.dismiss(t.id)}>✕</button>
                </div>
            ))
        } else {
            // Show error toast: "Invalid promo code"
            toast((t) => (
                <div className="flex gap-2">
                    <span>❌ Invalid promo code. Please use a valid promo code.</span>
                    <button onClick={() => toast.dismiss(t.id)}>✕</button>
                </div>
            ))
        }
    }

    const removeDiscount = () => {
        setAppliedDiscount(null)
        setDiscountCode("")
        toast((t) => (
            <div className="flex gap-2">
                <span>✅ Promo code removed</span>
                <button onClick={() => toast.dismiss(t.id)}>✕</button>
            </div>
        ))
    }

    // Handle order placement
    function validateForm(f: CheckoutForm) {
        const errors: string[] = []
        if (f.cartCount === 0) errors.push("Your cart is empty")

        if (!f.name || !f.email || !f.address || !f.phone) errors.push("Please fill in all fields")

        const emailOk = /^\S+@\S+\.\S+$/.test(f.email)
        if (!emailOk) errors.push("Please enter a valid email address")

        const phoneDigits = f.phone.replace(/\D/g, "")
        if (phoneDigits.length < 7) errors.push("Please enter a valid phone number")

        if (!f.paymentMethod) errors.push("Please select a payment method")
        if (f.paymentMethod === "Online Banking" && !f.bankOption) errors.push("Please select a bank")
        if (f.paymentMethod === "E-Wallet" && !f.ewalletOption) errors.push("Please select an e-wallet")

        return { ok: errors.length === 0, errors }

    }
    const handlePlaceOrder = () => {
        // Validate cart not empty
        if (cartItems.length === 0) {
            toast((t) => (
                <div className="flex gap-2">
                    <span>❌ Your cart is empty</span>
                    <button onClick={() => toast.dismiss(t.id)}>✕</button>
                </div>
            ))
            return
        }

        // Validate form fields
        if (!name || !email || !address || !phone) {
            toast((t) => (
                <div className="flex gap-2">
                    <span>❌ Please fill in all fields</span>
                    <button onClick={() => toast.dismiss(t.id)}>✕</button>
                </div>
            ))
            return
        }

        // Basic email format check
        const emailRegex = /^\S+@\S+\.\S+$/
        if (!emailRegex.test(email)) {
            toast((t) => (
                <div className="flex gap-2">
                    <span>❌ Please enter a valid email address</span>
                    <button onClick={() => toast.dismiss(t.id)}>✕</button>
                </div>
            ))
            return
        }

        // Basic phone check (at least 7 digits)
        const phoneDigits = phone.replace(/\D/g, '')
        if (phoneDigits.length < 7) {
            toast((t) => (
                <div className="flex gap-2">
                    <span>❌ Please enter a valid phone number</span>
                    <button onClick={() => toast.dismiss(t.id)}>✕</button>
                </div>
            ))
            return
        }

        // Validate payment method
        if (!paymentMethod) {
            toast((t) => (
                <div className="flex gap-2">
                    <span>❌ Please select a payment method</span>
                    <button onClick={() => toast.dismiss(t.id)}>✕</button>
                </div>
            ))
            return
        }

        // If Online Banking/E-Wallet, ensure option selected
        if (paymentMethod === "Online Banking" && !bankOption) {
            toast((t) => (
                <div className="flex gap-2">
                    <span>❌ Please select a bank</span>
                    <button onClick={() => toast.dismiss(t.id)}>✕</button>
                </div>
            ))
            return
        }
        if (paymentMethod === "E-Wallet" && !ewalletOption) {
            toast((t) => (
                <div className="flex gap-2">
                    <span>❌ Please select an e-wallet</span>
                    <button onClick={() => toast.dismiss(t.id)}>✕</button>
                </div>
            ))
            return
        }
        // All validation passed - save order data and go to confirmation
        const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
        const orderDate = new Date().toISOString()
        
        const orderData = {
            orderNumber,
            orderDate,
            name,
            email,
            address,
            phone,
            paymentMethod,
            bankOption: paymentMethod === "Online Banking" ? bankOption : undefined,
            ewalletOption: paymentMethod === "E-Wallet" ? ewalletOption : undefined,
            items: cartItems.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            subtotal: totalPrice,
            discount: appliedDiscount,
            total: calculateFinalPrice()
        }

        // Save to localStorage for confirmation page
        localStorage.setItem("pendingOrder", JSON.stringify(orderData))

        // Navigate to confirmation page
        router.push("/order-confirmation")
        // TODO: Later - redirect to order confirmation page or home
    }

    // Calculate final price with discount
    const calculateFinalPrice = () => {
        if (appliedDiscount) {
            const discountAmount = totalPrice * (appliedDiscount.percent / 100)
            return totalPrice - discountAmount
        }
        return totalPrice
    }

    return (
        <div className="w-full min-h-screen bg-white dark:bg-gray-900">
            <div className="p-8 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Checkout</h1>

            {/* SECTION 1: Order Summary */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Order Summary</h2>
                {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between mb-2">
                        <span className="text-gray-800 dark:text-gray-200">{item.name} x {item.quantity}</span>
                        <span className="text-gray-900 dark:text-white">RM{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                <div className="border-t mt-4 pt-4 font-semibold">
                    <div className="flex justify-between text-gray-900 dark:text-white">
                        <span>Subtotal:</span>
                        <span>RM{totalPrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* SECTION 2: Discount Code */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Promo Code</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter promo code"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                        onClick={applyDiscount}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                        Apply
                    </button>
                </div>
                {appliedDiscount && (
                    <div className="mt-3 flex items-center justify-between border border-green-200 dark:border-green-700 rounded-lg px-4 py-2 bg-green-50 dark:bg-green-900/30">
                        <div className="text-green-700 dark:text-green-300 font-medium flex items-center gap-2">
                            <span>✅ Applied:</span>
                            <span>{appliedDiscount.code} ({appliedDiscount.percent}%)</span>
                        </div>
                        <button
                            onClick={removeDiscount}
                            className="text-sm font-semibold text-green-700 dark:text-green-300 hover:underline"
                        >
                            Remove
                        </button>
                    </div>
                )}
            </div>

            {/* SECTION 3: Customer Form */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Shipping Information</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
            </div>

            {/* SECTION 4: Payment Method */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Payment Method</h2>
                <div className="space-y-2">
                    {paymentMethods.map(method => (
                        <label key={method} className="flex items-center gap-2 cursor-pointer text-gray-800 dark:text-gray-200">
                            <input
                                type="radio"
                                name="payment"
                                value={method}
                                checked={paymentMethod === method}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="w-4 h-4"
                            />
                            <span>{method}</span>
                        </label>
                    ))}
                    {paymentMethod === "Online Banking" && (
                        <div className="mt-3">
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Select Bank</label>
                            <select
                                value={bankOption}
                                onChange={(e) => setBankOption(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">Choose a bank</option>
                                {banks.map(bank => (
                                    <option key={bank} value={bank}>{bank}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    {paymentMethod === "E-Wallet" && (
                        <div className="mt-3">
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Select E-Wallet</label>
                            <select
                                value={ewalletOption}
                                onChange={(e) => setEwalletOption(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">Choose an e-wallet</option>
                                {ewallets.map(wallet => (
                                    <option key={wallet} value={wallet}>{wallet}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </div>

            {/* SECTION 5: Total & Place Order */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-gray-900 dark:text-white">
                        <span>Subtotal:</span>
                        <span>RM{totalPrice.toFixed(2)}</span>
                    </div>
                    {appliedDiscount && (
                        <div className="flex justify-between text-green-700 dark:text-green-400">
                            <span>Discount ({appliedDiscount.percent}%):</span>
                            <span>-RM{(totalPrice * (appliedDiscount.percent / 100)).toFixed(2)}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-xl font-bold border-t pt-2 text-gray-900 dark:text-white">
                        <span>Total:</span>
                        <span>RM{calculateFinalPrice().toFixed(2)}</span>
                    </div>
                </div>
                <button
                    onClick={handlePlaceOrder}
                    className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
                >
                    Place Order
                </button>
            </div>
                </div>
            </div>
    )
}

