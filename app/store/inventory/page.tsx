'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Filter, AlertTriangle } from 'lucide-react'
import { Product } from '@/types'

interface InventoryItem extends Product {
  stockLevel: number
  sku: string
  lowStockThreshold: number
}

export default function InventoryPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [stockFilter, setStockFilter] = useState<string>('all')

  // Example inventory data - replace with your actual data
  const inventory: InventoryItem[] = [
    {
      id: "1",
      name: "Classic White T-Shirt",
      category: { id: "1", name: "Clothing" },
      price: 499.99,
      stockLevel: 50,
      sku: "WT001",
      lowStockThreshold: 10,
      storeName: "Fashion Basics",
      isFeatured: true,
      size: { id: "1", name: "M" },
      color: { id: "1", name: "White" },
      images: [{ id: "1", url: "/images/placeholder.jpg" }]
    },
    // Add more inventory items...
  ]

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || item.category.name === categoryFilter
    const matchesStock = stockFilter === 'all' || 
      (stockFilter === 'low' && item.stockLevel <= item.lowStockThreshold) ||
      (stockFilter === 'out' && item.stockLevel === 0)
    
    return matchesSearch && matchesCategory && matchesStock
  })

  const getStockStatus = (item: InventoryItem) => {
    if (item.stockLevel === 0) {
      return { label: 'Out of Stock', color: 'bg-red-100 text-red-800' }
    }
    if (item.stockLevel <= item.lowStockThreshold) {
      return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' }
    }
    return { label: 'In Stock', color: 'bg-green-100 text-green-800' }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <Button onClick={() => router.push('/store/products/new')}>
          Add Product
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Clothing">Clothing</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Footwear">Footwear</SelectItem>
          </SelectContent>
        </Select>

        <Select value={stockFilter} onValueChange={setStockFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Stock Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stock Levels</SelectItem>
            <SelectItem value="low">Low Stock</SelectItem>
            <SelectItem value="out">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Low Stock Alerts */}
      <div className="mb-6">
        {inventory.filter(item => item.stockLevel <= item.lowStockThreshold).length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Some products are running low on stock. Please review and restock as needed.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock Level</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>{item.category.name}</TableCell>
                <TableCell>R {item.price.toFixed(2)}</TableCell>
                <TableCell>{item.stockLevel}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStockStatus(item).color}`}>
                    {getStockStatus(item).label}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => router.push(`/store/inventory/${item.id}/edit`)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => router.push(`/store/inventory/${item.id}/stock`)}
                    >
                      Update Stock
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 