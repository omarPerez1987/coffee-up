import { LucideIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { NavLink } from './nav-link'

interface SideBarLinkProps {
  href: string
  children: string
  icon: LucideIcon
  includes?: boolean
}

export function SideBarLink({
  href,
  children,
  icon: Icon,
  includes = true,
}: SideBarLinkProps) {
  const path = usePathname()
  let isActive = path === href

  if (includes) {
    isActive = path.includes(href)
  }

  if (href === '/') {
    isActive = ['dashboard', 'setting', 'tracker'].some(value =>
      path.includes(value)
    )
  }

  return (
    <div
      className={`flex cursor-pointer items-center justify-start py-1.5 pl-6 text-base ${isActive ? 'bg-green-700 text-white' : ''}`}
    >
      <Icon />
      <NavLink href={href}>{children}</NavLink>
    </div>
  )
}
