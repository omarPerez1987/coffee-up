'use client'
import { cn } from '@/lib/utils'

export function SidebarContainer({ children }: { children: React.ReactNode }) {
  return (
    <aside
      className={cn(
        'border-r border-zinc-900/10 w-60 fixed left-0 top-0 bottom-0 z-40 flex-shrink-0'
      )}
    >
      <div className="flex h-4 justify-between p-6 text-2xl font-bold ">
        Coffee Up!
      </div>
      {children}
    </aside>
  )
}
