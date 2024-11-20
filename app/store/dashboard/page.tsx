'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Package, Settings, BarChart } from 'lucide-react'
import Link from 'next/link'

export default function StoreDashboard() {
  // This would typically be fetched from your backend
  const storeStats = {
    totalProducts: 12,
    totalOrders: 25,
    totalRevenue: 'R 15,234.00',
    viewsToday: 156
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Store Dashboard</h1>
        <Button asChild>
          <Link href="/store/products/new">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Link>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{storeStats.totalProducts}</div>
          </CardContent>
        </Card>
        {/* Add other stat cards similarly */}
      </div>

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          {/* Products management content */}
          <h2 className="text-xl font-semibold mb-4">Your Products</h2>
          {/* Add product list/grid here */}
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          {/* Orders management content */}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {/* Analytics content */}
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          {/* Store settings content */}
        </TabsContent>
      </Tabs>
    </div>
  )
} 