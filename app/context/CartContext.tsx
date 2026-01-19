"use client"
import { createContext, useState, useContext, useEffect } from "react"

// Define what a Product looks like (from Supabase)
type Product = {
  id: number
  name: string
  price: number
  description: string
  stock_qty: number
}

// Define what a cart item looks like (Product + quantity in cart)
type CartItem = {
  id: number
  name: string
  price: number
  stock_qty: number
  quantity: number  // How many user added to cart
}

// Define what the context provides to components
type CartContextType = {
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  // Add item to cart (or increase quantity if already exists)
  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      // Check if product already in cart
      const existingItem = prevItems.find(item => item.id === product.id)
      
      if (existingItem) {
        // Product exists - increase quantity (if stock allows)
        return prevItems.map(item =>
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
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  // Update quantity of a specific item
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      // If quantity is 0 or less, remove the item
      removeFromCart(id)
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id && quantity <= item.stock_qty
            ? { ...item, quantity }
            : item
        )
      )
    }
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
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