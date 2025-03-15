'use client'

import { Box, LayoutDashboard, Users } from 'lucide-react'
import { SidebarContainer } from './sibebar-container'
import { SideBarLink } from './sidebar-link'

export function SideBar() {
  return (
    <SidebarContainer>
      <nav className="mt-10 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <SideBarLink href="/dashboard" icon={LayoutDashboard}>
            Dashboard
          </SideBarLink>
        </div>
      </nav>
    </SidebarContainer>
  )
}
