'use client'

import { useAuthenticate } from '@/lib/hooks/use-authenticate'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'

export default function User() {
  const { user } = useAuthenticate()

  const avatar = user?.user_metadata?.avatar_url
  const noAvatar = user?.email?.slice(0, 2).toUpperCase()

  return user ? (
    <div className="flex items-center gap-4">
      <Avatar className="h-6 w-auto">
        <AvatarImage src={avatar} />
        <AvatarFallback>{noAvatar}</AvatarFallback>
      </Avatar>
      <p>{user.user_metadata.name.split(' ').slice(0, -1).join(' ')}</p>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={'outline'}>
        <Link href="/auth/sign-in">Iniciar sesión</Link>
      </Button>
      <Button asChild size="sm" variant={'default'}>
        <Link href="/auth/sign-up">Registrarse</Link>
      </Button>
    </div>
  )
}
