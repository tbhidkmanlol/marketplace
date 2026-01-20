import { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="h-40 bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden text-gray-900 dark:text-white">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 italic">No Image</span>
        )}
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