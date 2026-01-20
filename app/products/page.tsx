import { supabase } from '@/lib/supabase'
import AddToCartButton from '@/components/AddToCart'
import SearchBar from '@/components/SearchBar'

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  stock_qty: number;
  image_url?: string;
}
export default async function Home() {
  // 1. Fetching the data from Supabase
  const { data: products }: { data: Product[] | null } = await supabase
    .from('products')
    .select('*')

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 transition-colors">
      {/* 2. Page Header - Added dark:text classes here */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Product Listing
        </h1>
      </header>

      {/* SearchBar handles everything: search input, count, grid, empty state */}
      <SearchBar products={products || []} />
    </main>
  )
}