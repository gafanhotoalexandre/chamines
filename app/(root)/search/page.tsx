import Image from 'next/image'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs'

import { ProfileHeader } from '@/components/shared/ProfileHeader'
import { ThreadsTab } from '@/components/shared/ThreadsTab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { fetchUser } from '@/lib/actions/user.actions'
import { UserInfo } from '@/types/UserInfo'
import { profileTabs } from '@/constants'

export default async function Page() {
  const user = await currentUser()

  if (!user) return null

  // pegando usuário do perfil acessado
  const userInfo: UserInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')

  // fetch users
  return (
    <section>
      <h1 className="head-text mb-10">Busca</h1>
    </section>
  )
}
