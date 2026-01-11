import { supabase } from '@/lib/supabase'

export default async function Home() {
  // 1. Fetching the data
  const { data: products } = await supabase
    .from('products')
    .select('*')

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      {/* 2. Page Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">Pocket Gadget Shop</h1>
        <p className="mt-2 text-lg text-gray-600">Innovative tech that fits in your hand.</p>
      </header>

      {/* 3. The Grid Layout */}
      <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products?.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-blue-50 flex items-center justify-center">
              <span className="text-blue-200 text-5xl">📦</span>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
                <span className="bg-green-100 text-green-700 text-sm font-bold px-2 py-1 rounded">
                  RM{product.price}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-6 h-10 line-clamp-2">
                {product.description}
              </p>

              <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors">
                Add to Cart
              </button>
              
              <p className="mt-4 text-center text-xs text-gray-400">
                {product.stock_qty} units in stock
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}