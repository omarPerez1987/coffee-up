import { Geist } from 'next/font/google'
import './globals.css'
import { Providers } from '@/lib/providers'
import { Toaster } from 'sonner'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Coffee Up!',
}

const geistSans = Geist({
  display: 'swap',
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
        <Toaster richColors closeButton duration={1500} />
      </body>
    </html>
  )
}
