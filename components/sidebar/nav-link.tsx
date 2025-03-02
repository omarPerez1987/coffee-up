'use client'

import Link from 'next/link'
import { Button } from '../ui/button'

interface NavLinkProps {
  children: string
  href: string
  includes?: boolean
}

export function NavLink({ children, href }: NavLinkProps) {
  return (
    <Button asChild variant="none">
      <Link href={href}>{children}</Link>
    </Button>
  )
}
