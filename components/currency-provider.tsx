'use client'

import { createContext, useContext, useState } from 'react'
import { Currency } from '@/types'
import { CURRENCIES } from '@/lib/constants'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatPrice: (priceZAR: number) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(CURRENCIES.ZAR)

  const formatPrice = (priceZAR: number) => {
    const convertedPrice = priceZAR * currency.rate
    if (currency.code === 'ZAR') {
      return `R ${convertedPrice.toFixed(2)}`
    }
    return `${currency.symbol}${convertedPrice.toFixed(2)}`
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
} 