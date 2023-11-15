import { redirect } from 'next/navigation'

import { ThreadCard } from '../cards/ThreadCard'

import { fetchUserThreads } from '@/lib/actions/user.actions'

interface ThreadsTabProps {
  currentUserId: string
  accountId: string
  accountType: string
}
export async function ThreadsTab({
  accountId,
  currentUserId,
  accountType,
}: ThreadsTabProps) {
  // TODO: fetch profile threads
  const result = await fetchUserThreads(accountId)
  if (!result) redirect('/')

  return (
    <section className="mt-9 flex flex-col gap-10">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {result.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === 'User'
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          } // todo
          community={thread.community} // todo
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  )
}
