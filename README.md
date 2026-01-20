# Marketplace

A full-stack e-commerce marketplace built with Next.js, React, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Product Listing**: Browse products with search functionality and product images
- **Shopping Cart**: Add/remove items, adjust quantities, persistent storage with localStorage
- **Checkout Flow**: Multi-step checkout with discount codes and payment method selection
- **Order Management**: Order confirmation, printable receipts, and order history
- **Database Integration**: Supabase PostgreSQL for orders, order items, and products
- **Stock Management**: Automatic stock updates after purchase
- **Dark Mode**: Full dark/light theme support with Tailwind CSS
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS grid system

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **State Management**: React Context API
- **Notifications**: react-hot-toast
- **Theme**: next-themes

## Getting Started

### Prerequisites
- Node.js 16+
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd marketplace
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
marketplace/
├── app/
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout form
│   ├── order-confirmation/# Order review before submission
│   ├── order-receipt/     # Order confirmation & printable receipt
│   ├── products/          # Product listing page
│   ├── context/           # Cart context provider
│   └── layout.tsx         # Root layout with theme provider
├── components/
│   ├── ProductCard.tsx    # Product card component
│   ├── SearchBar.tsx      # Search & product grid
│   ├── AddToCart.tsx      # Add to cart button
│   ├── NavBar.tsx         # Navigation & theme toggle
│   └── ThemeProvider.tsx  # Next-themes wrapper
├── lib/
│   ├── supabase.ts        # Supabase client
│   ├── orders.ts          # Order database functions
│   └── types.ts           # TypeScript interfaces
└── public/                # Static assets
```

## Database Schema

### Products Table
- `id` (integer, primary key)
- `name` (text)
- `description` (text)
- `price` (numeric)
- `stock_qty` (integer)
- `image_url` (text, optional)

### Orders Table
- `id` (uuid, primary key)
- `order_number` (text, unique)
- `customer_name` (text)
- `customer_email` (text)
- `customer_phone` (text)
- `customer_address` (text)
- `payment_method` (text)
- `total_price` (numeric)
- `status` (text)
- `created_at` (timestamp)

### Order Items Table
- `id` (uuid, primary key)
- `order_id` (uuid, foreign key)
- `product_id` (integer)
- `product_name` (text)
- `quantity` (integer)
- `unit_price` (numeric)
- `subtotal` (numeric)

## Usage

1. **Browse Products**: Visit `/products` to see all available items
2. **Add to Cart**: Click "Add to Cart" on any product (respects stock limits)
3. **View Cart**: Click the cart icon in the navbar to review items
4. **Checkout**: Fill in customer info, select payment method, apply discount codes
5. **Confirm Order**: Review order details before final submission
6. **View Receipt**: See order confirmation with printable receipt

## Development

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm start`: Start production server

## Future Enhancements

- User authentication & accounts
- Order history per user
- Product reviews & ratings
- Admin dashboard for product management
- Inventory analytics