"use client" // This is a client component
import toast from "react-hot-toast"
import { useCart } from "@/app/context/CartContext"
import { Product } from "@/lib/types"

export default function AddToCartButton({ product }: { product: Product }) {
    const { addToCart, cartItems } = useCart()
    
    const handleAddToCart = () => {
        // Check if item already in cart
        const existingItem = cartItems.find(item => item.id === product.id)
        
        // If item exists and would exceed stock
        if (existingItem && existingItem.quantity >= product.stock_qty) {
            toast((t) => (
                <div className="flex gap-2">
                    <span>❌ Cannot add more! Only {product.stock_qty} in stock.</span>
                    <button onClick={() => toast.dismiss(t.id)}>✕</button>
                </div>
            ))
            return
        }
        
        // Otherwise add to cart
        addToCart(product)
        toast((t) => (
            <div className="flex gap-2">
                <span>✅ Added to cart!</span>
                <button onClick={() => toast.dismiss(t.id)}>✕</button>
            </div>
        ))
    }
    
    return (
        <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors"
        >
            Add to cart
        </button>
    )
}

