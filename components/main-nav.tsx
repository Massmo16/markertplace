import Link from "next/link"
import { usePathname } from "next/navigation"

const MainNav = () => {
  const pathname = usePathname()

  const routes = [
    {
      href: '/',
      label: 'Home',
      active: pathname === '/',
    },
    {
      href: '/products',
      label: 'Products',
      active: pathname === '/products',
    },
    // ... any other routes
  ]

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={`text-sm font-medium transition-colors hover:text-black
            ${route.active ? 'text-black' : 'text-neutral-500'}`}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}

export default MainNav 