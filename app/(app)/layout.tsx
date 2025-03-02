import Header from '@/components/header'
import { SideBar } from '@/components/sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex" suppressHydrationWarning>
      <SideBar />

      <div className="flex-1">
        <Header />
        <main className="pl-60 pt-16">
          <section className="p-8">{children}</section>
        </main>
      </div>
    </div>
  )
}
