import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import ProfileHeader from '@/components/shared/ProfileHeader'

import { fetchUser } from '@/lib/actions/user.actions'
import { UserInfo } from '@/types/UserInfo'

interface Params {
  params: {
    id: string
  }
}
export default async function Page({ params }: Params) {
  const user = await currentUser()

  if (!user) return null

  // pegando usuário do perfil acessado
  const userInfo: UserInfo = await fetchUser(params.id)
  if (!userInfo?.onboarded) redirect('/onboarding')

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image!}
        bio={userInfo.bio!}
      />
    </section>
  )
}
