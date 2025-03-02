import { signOutAction } from '@/app/actions'
import { LogOut } from 'lucide-react'
import { Button } from './ui/button'

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <Button type="submit" variant={null}>
        <LogOut className="size-6" />
      </Button>
    </form>
  )
}
