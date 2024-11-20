'use client'

import { useState } from 'react'
import { PricingPlan } from '@/types'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { useCurrency } from '@/components/currency-provider'
import { CURRENCIES } from '@/lib/constants'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation'

const SubscriptionPage = () => {
  const router = useRouter()
  const [interval, setInterval] = useState<'monthly' | 'yearly'>('monthly')
  const { currency, setCurrency, formatPrice } = useCurrency()

  const plans: PricingPlan[] = [
    {
      id: "1",
      name: "Starter",
      priceZAR: interval === 'monthly' ? 199.99 : 1999.99, // R199.99/month or R1999.99/year
      price: 0,
      interval: interval,
      description: "Perfect for new sellers testing the waters",
      productLimit: 10,
      storeCustomization: false,
      analytics: false,
      priority: false,
      features: [
        "Up to 10 products",
        "Basic store profile",
        "Standard support",
        "Basic analytics",
      ]
    },
    {
      id: "2",
      name: "Professional",
      priceZAR: interval === 'monthly' ? 499.99 : 4999.99, // R499.99/month or R4999.99/year
      price: 0,
      interval: interval,
      description: "For growing businesses ready to scale",
      productLimit: 100,
      highlighted: true,
      storeCustomization: true,
      analytics: true,
      priority: false,
      features: [
        "Up to 100 products",
        "Custom store design",
        "Priority support",
        "Advanced analytics",
        "Marketing tools",
        "Inventory management"
      ]
    },
    {
      id: "3",
      name: "Enterprise",
      priceZAR: interval === 'monthly' ? 1999.99 : 19999.99, // R1999.99/month or R19999.99/year
      price: 0,
      interval: interval,
      description: "For large scale operations",
      productLimit: 1000,
      storeCustomization: true,
      analytics: true,
      priority: true,
      features: [
        "Up to 1000 products",
        "Custom store design",
        "24/7 Priority support",
        "Advanced analytics",
        "Marketing tools",
        "Inventory management",
        "API access",
        "Dedicated account manager"
      ]
    }
  ]

  const handleGetStarted = (plan: PricingPlan) => {
    localStorage.setItem('selectedPlan', JSON.stringify({
      planId: plan.id,
      interval: interval,
      price: plan.priceZAR
    }))
    
    router.push('/store/register')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Start Selling Today</h1>
          <p className="text-muted-foreground mb-8">
            Choose the perfect plan for your business
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Select
              value={currency.code}
              onValueChange={(value) => setCurrency(CURRENCIES[value as keyof typeof CURRENCIES])}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CURRENCIES).map(([code, curr]) => (
                  <SelectItem key={code} value={code}>
                    {curr.symbol} {curr.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-4">
              <Button
                variant={interval === 'monthly' ? 'default' : 'outline'}
                onClick={() => setInterval('monthly')}
              >
                Monthly
              </Button>
              <Button
                variant={interval === 'yearly' ? 'default' : 'outline'}
                onClick={() => setInterval('yearly')}
              >
                Yearly
                <span className="ml-2 text-xs bg-primary-foreground text-primary px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-lg border p-8 bg-background ${
                plan.highlighted
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-border'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </div>

              <div className="text-center mb-6">
                <span className="text-4xl font-bold">
                  {formatPrice(plan.priceZAR)}
                </span>
                <span className="text-muted-foreground">/{plan.interval}</span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className="w-full" 
                variant={plan.highlighted ? 'default' : 'outline'}
                onClick={() => handleGetStarted(plan)}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">All plans include</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4">
              <h3 className="font-medium mb-2">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">
                Integrated payment processing
              </p>
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-2">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">
                Help when you need it
              </p>
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-2">Store Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Insights about your sales
              </p>
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-2">Mobile App</h3>
              <p className="text-sm text-muted-foreground">
                Manage on the go
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPage 