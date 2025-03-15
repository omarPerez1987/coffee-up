import { ThemeSwitcher } from './theme-switcher'
import { SidebarTrigger } from './ui/sidebar'

export default function Header() {
  return (
    <header className="flex max-h-16 w-full items-center  px-2 py-3 md:px-8 xl:left-60 bg-sidebar text-sidebar-foreground">
      <SidebarTrigger />
      <div className="ml-auto flex space-x-2 items-center">
        <ThemeSwitcher />
      </div>
    </header>
  )
}
