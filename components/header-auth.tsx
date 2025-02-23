import { signOutAction } from '@/app/actions'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { ThemeSwitcher } from './theme-switcher'
import { Button } from './ui/button'

export default async function AuthButton() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user ? (
    <div className="flex items-center gap-4">
      {user.email}
      <form action={signOutAction}>
        <Button type="submit" variant={'outline'}>
          Salir
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={'outline'}>
        <Link href="/sign-in">Iniciar sesión</Link>
      </Button>
      <Button asChild size="sm" variant={'default'}>
        <Link href="/sign-up">Registrarse</Link>
      </Button>
      <ThemeSwitcher />
    </div>
  )
}
