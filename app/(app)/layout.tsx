import { cookies } from 'next/headers'

import { AppSideBar } from '@/components/app-sidebar'
import Header from '@/components/header'
import { SidebarProvider } from '@/components/ui/sidebar'

export default async function AppLayout({
  children,
}: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSideBar />
      <main className="w-full">
        <Header />
        <section className="p-6">{children}</section>
      </main>
    </SidebarProvider>
  )
}
