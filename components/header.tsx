import Link from 'next/link'
import SignOutButton from './sign-out-button'
import { ThemeSwitcher } from './theme-switcher'
import User from './user'

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-10 flex max-h-16 items-center border-b border-zinc-900/10 px-2 py-3 md:px-8 xl:left-60  print:hidden">
      <div className="ml-auto flex space-x-2 items-center">
        <User />
        <SignOutButton />
        <ThemeSwitcher />
      </div>
    </header>
  )
}
