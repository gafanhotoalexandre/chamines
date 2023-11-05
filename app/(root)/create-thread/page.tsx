import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { fetchUser } from '@/lib/actions/user.actions'
import { UserInfo } from '@/types/UserInfo'
import { PostThread } from '@/components/forms/PostThread'

export default async function Page() {
  const user = await currentUser()

  if (!user) return null

  const userInfo: UserInfo = await fetchUser(user.id)

  if (!userInfo?.onboarded) redirect('/onboarding')

  return (
    <>
      <h1 className="head-text">Criar Tópico</h1>

      <PostThread userId={userInfo._id} />
    </>
  )
}
