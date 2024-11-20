export interface Product {
  id: string
  category: {
    id: string
    name: string
  }
  name: string
  price: number
  isFeatured: boolean
  size: {
    id: string
    name: string
  }
  color: {
    id: string
    name: string
  }
  images: Array<{
    id: string
    url: string
  }>
  storeName: string
}

export interface Category {
  id: string
  name: string
  description: string
  productCount: number
  imageUrl: string
}

export type Currency = {
  code: string
  symbol: string
  rate: number
}

export interface PricingPlan {
  id: string
  name: string
  price: number
  interval: 'monthly' | 'yearly'
  description: string
  features: string[]
  productLimit: number
  highlighted?: boolean
  storeCustomization: boolean
  analytics: boolean
  priority: boolean
  priceZAR: number
}

export interface Store {
  id: string
  name: string
  description: string
  userId: string
  logo?: string
  bannerImage?: string
  subscriptionPlan: string
  storeUrl: string
  createdAt: Date
  updatedAt: Date
}

export interface StoreSettings {
  id: string
  storeId: string
  primaryColor?: string
  accentColor?: string
  socialLinks?: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
  shippingMethods?: {
    id: string
    name: string
    price: number
  }[]
  paymentMethods?: string[]
} 