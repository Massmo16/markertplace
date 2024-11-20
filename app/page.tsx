import { Product } from "@/types"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Home() {
  // Example featured products - replace with your actual data fetching
  const featuredProducts: Product[] = [
    {
      id: "1",
      name: "Classic White T-Shirt",
      price: 499.99,
      category: { id: "1", name: "Clothing" },
      storeName: "Fashion Basics",
      isFeatured: true,
      size: { id: "1", name: "M" },
      color: { id: "1", name: "White" },
      images: [{ id: "1", url: "/images/placeholder.jpg" }]
    },
    // Add more featured products...
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Your One-Stop Marketplace
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover unique products from local sellers or start your own store today
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/subscription">Start Selling</Link>
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">For Buyers</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Wide variety of products</li>
                <li>Secure payments</li>
                <li>Quality assurance</li>
                <li>Support local businesses</li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">For Sellers</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Easy store setup</li>
                <li>Powerful analytics</li>
                <li>Marketing tools</li>
                <li>24/7 support</li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Our Promise</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Secure platform</li>
                <li>Fast delivery</li>
                <li>Customer satisfaction</li>
                <li>Community-driven</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Selling?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of successful sellers on our platform
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/subscription">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}