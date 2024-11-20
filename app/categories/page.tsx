'use client'

import { useState } from 'react'
import { Category } from '@/types'
import CategoryCard from '@/components/category-card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const CategoriesPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  
  // Example categories - replace with your actual data fetching
  const categories: Category[] = [
    {
      id: "1",
      name: "Clothing",
      description: "Find the latest fashion trends and apparel",
      productCount: 150,
      imageUrl: "/images/categories/clothing.jpg"
    },
    {
      id: "2",
      name: "Electronics",
      description: "Discover cutting-edge technology and gadgets",
      productCount: 89,
      imageUrl: "/images/categories/electronics.jpg"
    },
    {
      id: "3",
      name: "Footwear",
      description: "Shop comfortable and stylish shoes",
      productCount: 64,
      imageUrl: "/images/categories/footwear.jpg"
    },
    {
      id: "4",
      name: "Home & Living",
      description: "Decorate your space with beautiful home items",
      productCount: 120,
      imageUrl: "/images/categories/home.jpg"
    }
  ]

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) => {
    if (!searchQuery) return true
    
    const search = searchQuery.toLowerCase()
    return (
      category.name.toLowerCase().includes(search) ||
      category.description.toLowerCase().includes(search)
    )
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold mb-6">Categories</h1>
        
        {/* Search Bar */}
        <div className="w-full max-w-2xl relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>
      
      {/* No Results Message */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            No categories found for &quot;{searchQuery}&quot;
          </p>
        </div>
      )}
      
      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <CategoryCard key={category.id} data={category} />
        ))}
      </div>
    </div>
  )
}

export default CategoriesPage 