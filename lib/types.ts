export type Product = {
  id: number
  name: string
  price: number
  description: string
  stock_qty: number
  image_url?: string
}

export type CartItem = {
  id: number
  name: string
  price: number
  stock_qty: number
  quantity: number
}

export type CartContextType = {
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

export type CheckoutForm = {
  name: string
  email: string
  address: string
  phone: string
  paymentMethod: string
  bankOption?: string
  ewalletOption?: string
  cartCount: number
}