"use client"
import { createContext, useState, useContext, useEffect } from "react"
import { Product } from "@/lib/types";
import { CartItem } from "@/lib/types";
import { CartContextType } from "@/lib/types";


export const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load cart from localStorage when component mounts
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        const parsed = JSON.parse(savedCart)
        if (Array.isArray(parsed)) {
          setCartItems(parsed)
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved cart, resetting.', e)
      setCartItems([])
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  // Derived totals
  const totalItems = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)

  // Add item to cart (or increase quantity if already exists)
  const addToCart = (product: Product) => {
    setCartItems((prevItems: CartItem[]) => {
      // Check if product already in cart
      const existingItem = prevItems.find((item: CartItem) => item.id === product.id)
      
      if (existingItem) {
        // Product exists - increase quantity (if stock allows)
        return prevItems.map((item: CartItem) =>
          item.id === product.id && item.quantity < item.stock_qty
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // Product doesn't exist - add new item with quantity 1
        return [...prevItems, {
          id: product.id,
          name: product.name,
          price: product.price,
          stock_qty: product.stock_qty,
          quantity: 1
        }]
      }
    })
  }

  // Remove item from cart completely
  const removeFromCart = (id: number) => {
    setCartItems((prevItems: CartItem[]) => prevItems.filter((item: CartItem) => item.id !== id))
  }

  // Update quantity of a specific item
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      // If quantity is 0 or less, remove the item
      removeFromCart(id)
    } else {
      setCartItems((prevItems: CartItem[]) =>
        prevItems.map((item: CartItem) =>
          item.id === id && quantity <= item.stock_qty
            ? { ...item, quantity }
            : item
        )
      )
    }
  }

  const clearCart = () => setCartItems([])

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to use cart context easily
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}