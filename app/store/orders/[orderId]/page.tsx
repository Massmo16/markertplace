'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, Package, Truck, CheckCircle } from 'lucide-react'

interface OrderItem {
  id: string
  productName: string
  quantity: number
  price: number
  image: string
}

interface OrderDetails {
  id: string
  customerName: string
  email: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: OrderItem[]
  shippingAddress: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
}

export default function OrderDetailsPage({ params }: { params: { orderId: string } }) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  // Example order data - replace with your actual data fetching
  const order: OrderDetails = {
    id: params.orderId,
    customerName: "John Doe",
    email: "john@example.com",
    date: "2024-03-20",
    status: "processing",
    total: 2999.99,
    items: [
      {
        id: "1",
        productName: "Classic White T-Shirt",
        quantity: 2,
        price: 499.99,
        image: "/images/placeholder.jpg"
      },
      // Add more items...
    ],
    shippingAddress: {
      street: "123 Main St",
      city: "Cape Town",
      state: "Western Cape",
      postalCode: "8001",
      country: "South Africa"
    }
  }

  const updateOrderStatus = async (newStatus: string) => {
    try {
      setIsUpdating(true)
      // Make API call to update order status
      console.log(`Updating order ${order.id} status to ${newStatus}`)
    } catch (error) {
      console.error('Error updating order status:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusIcon = (status: OrderDetails['status']) => {
    const icons = {
      pending: Package,
      processing: Package,
      shipped: Truck,
      delivered: CheckCircle,
      cancelled: Package
    }
    const Icon = icons[status]
    return <Icon className="h-5 w-5" />
  }

  return (
    <div className="container mx-auto py-8">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Orders
      </Button>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>Order #{order.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status</span>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <Select
                      defaultValue={order.status}
                      onValueChange={updateOrderStatus}
                      disabled={isUpdating}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span>{new Date(order.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-semibold">R {order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Contact Details</h4>
                  <p>{order.customerName}</p>
                  <p>{order.email}</p>
                </div>
                <div>
                  <h4 className="font-medium">Shipping Address</h4>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}
                  </p>
                  <p>{order.shippingAddress.postalCode}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-4 last:border-0"
                >
                  <div className="h-16 w-16 bg-muted rounded-md" />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.productName}</h4>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      R {(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      R {item.price.toFixed(2)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 