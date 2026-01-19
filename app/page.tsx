import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 text-center">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
          Welcome to TechDepot
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Discover the latest gadgets and tech accessories at unbeatable prices
        </p>

        {/* Call-to-Action Button */}
        <Link href="/products">
          <button className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg">
            Shop Now →
          </button>
        </Link>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          {/* Feature 1 */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Fast Shipping
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get your orders delivered quickly and safely
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Secure Payment
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Shop with confidence using secure checkout
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Quality Products
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Only the best tech gear, carefully selected
            </p>
          </div>
        </div>
      </div>
      {/* Testimonials Section */}
      <div className="mt-20 max-w-4xl mx-auto pb-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          This is what our customers have to say about us!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Review 1 */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              "bro this thing fucking sucks 0/10"
            </p>
            <p className="font-semibold">- Sarah M.</p>
          </div>
          {/* Review 2 */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              "dont buy products from them it sucks so much man"
            </p>
            <p className="font-semibold">- John D.</p>
          </div>
           {/* Review 3 */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            </p>
            <p className="font-semibold">- Lorem I.</p>
          </div>
           {/* Review 4 */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              "lowkey ignore the other reviews this shop is 11/10 legit"
            </p>
            <p className="font-semibold">- Jason L. - CEO of TechDepot</p>
          </div>
        </div>
      </div>
    </main>
  )
}