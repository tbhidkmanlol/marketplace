"use client"
import { useState } from "react"
import AddToCartButton from "./AddToCart"

type Product = {
    id: number
    name: string
    price: number
    description: string
    stock_qty: number
    image_url?: string
}

export default function SearchBar({ products }: { products: Product[] }) {
    const [searchTerm, setSearchTerm] = useState("")

    // Filter products based on search term
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="mb-8">
            {/* Search input */}
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-full max-w-2xl mx-auto px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            {/* Display filtered products */}
            <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Loop through each product using .map() and create a card for each one */}
                {filteredProducts.map((product) => (
                    /* Each product card - key={product.id} helps React track each item */
                    <div key={product.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md transition-shadow">

                        {/* Product Image/Icon Area */}
                        <div className="h-48 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center overflow-hidden text-gray-900 dark:text-white">
                            {product.image_url ? (
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-5xl">📦</span>
                            )}
                        </div>

                        {/* Product Details Section */}
                        <div className="p-6">
                            {/* Product Name & Price - displayed side by side */}
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {product.name}
                                </h2>
                                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-bold px-2 py-1 rounded">
                                    RM{product.price}
                                </span>
                            </div>

                            {/* Product Description - limited to 2 lines with line-clamp-2 */}
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 h-10 line-clamp-2">
                                {product.description}
                            </p>

                            {/* Add to Cart Button - shows only if in stock */}
                            {product.stock_qty > 0 ? (
                                <AddToCartButton product={product} />
                            ) : (
                                <button disabled className="w-full bg-gray-400 text-white font-semibold py-3 rounded-xl cursor-not-allowed">
                                    Out of Stock
                                </button>
                            )}

                            {/* Stock Information */}
                            <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
                                {product.stock_qty} units in stock
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}