import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: `Chaminé's`,
  description: `A Next.js 13 Meta Chaminé's Application`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="pt-br">
        <body className={`${inter.className} bg-dark-1`}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
