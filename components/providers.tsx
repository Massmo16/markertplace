'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { CartProvider } from '@/components/cart-provider'
import { CurrencyProvider } from '@/components/currency-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CurrencyProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </CurrencyProvider>
    </ThemeProvider>
  )
}