// src/components/ProductCard.tsx

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="h-40 bg-gray-100 rounded-md mb-4 flex items-center justify-center">
        {/* We'll add real images later! */}
        <span className="text-gray-400 italic">No Image</span>
      </div>
      <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xl font-semibold text-green-600">${product.price}</span>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
}