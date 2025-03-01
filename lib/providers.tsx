'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navigate from '../components/navigate'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen flex flex-col items-center">
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
          <Navigate />
          <section className="flex flex-col gap-20 max-w-5xl p-5 border w-full">
            {children}
          </section>
        </div>
      </main>
    </QueryClientProvider>
  )
}
