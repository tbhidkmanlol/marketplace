"use client" // This is a client component
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { useCart } from "@/app/context/CartContext"

type Product = {
    id: number
    name: string
    price: number
    description: string
    stock_qty: number
}

export default function AddToCartButton({ product }: { product: Product }) {
    const { addToCart } = useCart()
    return (
        <button
            onClick={() => {
                addToCart(product)
                toast.success("Added to cart!")
            }}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors"
        >
            Add to cart
        </button>
    )
}
