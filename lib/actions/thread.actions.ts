import { revalidatePath } from 'next/cache'

import { connectToDB } from '../mongoose'
import Thread from '../models/thread.model'
import User from '../models/user.model'

import { ThreadInfo } from '@/types/ThreadInfo'

interface Params {
  text: string
  author: string
  communityId: string | null
  path: string
}
export async function createThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  connectToDB()

  const createdThread: ThreadInfo = await Thread.create({
    text,
    author,
    community: null,
  })

  // update user model
  await User.findByIdAndUpdate(author, {
    $push: { threads: createdThread._id },
  })

  revalidatePath(path)
}
