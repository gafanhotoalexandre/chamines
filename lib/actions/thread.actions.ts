'use server'

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
  try {
    connectToDB()

    const createdThread: ThreadInfo = await Thread.create({
      text,
      author,
      community: communityId,
    })

    // update user model
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    })

    revalidatePath(path)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Erro ao criar uma thread: ${error.message}`)
  }
}

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
  try {
    connectToDB()

    // calcular o número de threads a pular
    const skipAmount = (pageNumber - 1) * pageSize

    // fetch em posts que não possuem "pais" (top-level threads)
    const threadsQuery = Thread.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: 'author', model: User })
      .populate({
        path: 'children',
        populate: {
          path: 'author',
          model: User,
          select: '_id name parentId image',
        },
      })

    const totalThreadsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    })

    const threads = await threadsQuery.exec()

    const isNext = totalThreadsCount > skipAmount + threads.length

    return { threads, isNext }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Impossível recuperar as threads: ${error.message}`)
  }
}
