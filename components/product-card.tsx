'use client'

import Image from "next/image"
import { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { useCurrency } from "@/components/currency-provider"

interface ProductCardProps {
  data: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const { formatPrice } = useCurrency()

  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      {/* Image */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image 
          src={data.images?.[0]?.url} 
          alt="" 
          fill
          className="aspect-square object-cover rounded-md"
        />
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category?.name}</p>
      </div>
      {/* Price & Add to Cart */}
      <div className="flex items-center justify-between">
        <div className="font-semibold">
          {formatPrice(data.price)}
        </div>
        <Button>
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

export default ProductCard 