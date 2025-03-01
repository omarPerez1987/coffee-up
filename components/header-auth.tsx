'use client'

import { signOutAction } from '@/app/actions'
import { useAuthenticate } from '@/lib/hooks/use-authenticate'
import { DoorOpen } from 'lucide-react'
import Link from 'next/link'
import { ThemeSwitcher } from './theme-switcher'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'

export default function AuthButton() {
  const { user } = useAuthenticate()

  const avatar = user?.user_metadata?.avatar_url
  const noAvatar = user?.email?.slice(0, 2).toUpperCase()

  return user ? (
    <div className="flex items-center gap-4">
      <Avatar className="h-6 w-auto">
        <AvatarImage src={avatar} />
        <AvatarFallback>{noAvatar}</AvatarFallback>
      </Avatar>
      <form action={signOutAction}>
        <Button type="submit" variant={null}>
          <DoorOpen strokeWidth={1} />
        </Button>
      </form>
      <ThemeSwitcher />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={'outline'}>
        <Link href="/auth/sign-in">Iniciar sesión</Link>
      </Button>
      <Button asChild size="sm" variant={'default'}>
        <Link href="/auth/sign-up">Registrarse</Link>
      </Button>
      <ThemeSwitcher />
    </div>
  )
}
