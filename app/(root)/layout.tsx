import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ClerkProvider } from '@clerk/nextjs'
import { ptBR } from '@clerk/localizations'

import { Topbar } from '@/components/shared/Topbar'
import { LeftSidebar } from '@/components/shared/LeftSidebar'
import { RightSidebar } from '@/components/shared/RightSidebar'
import { Bottombar } from '@/components/shared/Bottombar'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `Chaminé's`,
  description: `A Next.js 13 Meta Chaminé's Application`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-br">
        <body className={inter.className}>
          <Topbar />
          <main className="flex flex-row">
            <LeftSidebar />

            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>

            <RightSidebar />
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  )
}
