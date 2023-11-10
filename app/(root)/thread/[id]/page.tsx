import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs'

import { ThreadCard } from '@/components/cards/ThreadCard'
import { Comment } from '@/components/forms/Comment'

import { fetchUser } from '@/lib/actions/user.actions'
import { UserInfo } from '@/types/UserInfo'
import { fetchThreadById } from '@/lib/actions/thread.actions'

interface Params {
  params: {
    id: string
  }
}
export default async function Page({ params }: Params) {
  if (!params.id) return null

  const user = await currentUser()
  if (!user) return null

  const userInfo: UserInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')

  const thread = await fetchThreadById(params.id)

  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={user?.id || ''}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>

      <div className="mt-7">
        <Comment
          threadId={thread.id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>
    </section>
  )
}