import Link from 'next/link'
import { Category } from '@/types'

interface CategoryCardProps {
  data: Category
}

const CategoryCard: React.FC<CategoryCardProps> = ({ data }) => {
  return (
    <Link
      href={`/products?category=${data.name}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-lg">
        <div className="aspect-[16/9] overflow-hidden">
          {/* You can add an Image component here if you have category images */}
          <div className="h-full w-full bg-muted" />
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-semibold group-hover:text-primary">
            {data.name}
          </h3>
          <p className="mt-2 text-muted-foreground">
            {data.description}
          </p>
          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            <span>{data.productCount} products</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard 