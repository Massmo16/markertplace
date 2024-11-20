import { Product } from "@/types"
import ProductCard from "@/components/product-card"
import { SearchBar } from "@/components/search-bar"
import Image from "next/image"

interface GroupedProducts {
  [key: string]: {
    products: Product[];
    storeName: string;
  }[];
}

interface SearchParams {
  q?: string;
}

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  // Example products data - replace with your actual data fetching
  const products: Product[] = [
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
    {
      id: "2",
      name: "Running Shoes",
      price: 1499.99,
      category: { id: "2", name: "Footwear" },
      storeName: "Sports Elite",
      isFeatured: true,
      size: { id: "2", name: "42" },
      color: { id: "2", name: "Black" },
      images: [{ id: "2", url: "/images/placeholder.jpg" }]
    },
    {
      id: "3",
      name: "Denim Jeans",
      price: 899.99,
      category: { id: "1", name: "Clothing" },
      storeName: "Fashion Basics",
      isFeatured: false,
      size: { id: "3", name: "L" },
      color: { id: "3", name: "Blue" },
      images: [{ id: "3", url: "/images/placeholder.jpg" }]
    },
    {
      id: "4",
      name: "Smart Watch",
      price: 3499.99,
      category: { id: "3", name: "Electronics" },
      storeName: "Tech Haven",
      isFeatured: true,
      size: { id: "4", name: "One Size" },
      color: { id: "4", name: "Silver" },
      images: [{ id: "4", url: "/images/placeholder.jpg" }]
    },
    {
      id: "5",
      name: "Wireless Earbuds",
      price: 2499.99,
      category: { id: "3", name: "Electronics" },
      storeName: "Tech Haven",
      isFeatured: true,
      size: { id: "5", name: "One Size" },
      color: { id: "5", name: "Black" },
      images: [{ id: "5", url: "/images/placeholder.jpg" }]
    }
  ];

  // Filter products based on search query
  const filteredProducts = products.filter((product) => {
    if (!searchParams.q) return true;
    
    const search = searchParams.q.toLowerCase();
    return (
      product.name.toLowerCase().includes(search) ||
      product.storeName.toLowerCase().includes(search) ||
      product.category.name.toLowerCase().includes(search)
    );
  });

  // Group filtered products by category
  const groupedProducts: GroupedProducts = filteredProducts.reduce((acc, product) => {
    const categoryName = product.category.name;
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }

    const storeGroup = acc[categoryName].find(
      group => group.storeName === product.storeName
    );

    if (storeGroup) {
      storeGroup.products.push(product);
    } else {
      acc[categoryName].push({
        storeName: product.storeName,
        products: [product]
      });
    }

    return acc;
  }, {} as GroupedProducts);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      
      <SearchBar />
      
      {searchParams.q && (
        <p className="text-muted-foreground mb-6">
          Showing results for: &quot;{searchParams.q}&quot;
        </p>
      )}

      {Object.keys(groupedProducts).length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            {searchParams.q 
              ? `No products found for "${searchParams.q}"`
              : "No products found."}
          </p>
        </div>
      )}

      {Object.entries(groupedProducts).map(([category, storeGroups]) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{category}</h2>
          
          {storeGroups.map(({ storeName, products }) => (
            <div key={`${category}-${storeName}`} className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-muted-foreground">
                {storeName}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <div key={product.id}>
                    <Image
                      src={product.images[0].url}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="object-cover"
                    />
                    <ProductCard data={product} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default ProductsPage 