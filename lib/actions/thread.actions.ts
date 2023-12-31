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

export async function fetchThreadById(id: string) {
  try {
    connectToDB()

    // TODO: populate community
    const thread = await Thread.findById(id)
      .populate({
        path: 'author',
        model: User,
        select: '_id id name image',
      })
      .populate({
        path: 'children',
        populate: [
          {
            path: 'author',
            model: User,
            select: '_id id name parentId image',
          },
          {
            path: 'children',
            model: Thread,
            populate: {
              path: 'author',
              model: User,
              select: '_id id name parentId image',
            },
          },
        ],
      })
      .exec()

    return thread
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Impossível recuperar a thread: ${error.message}`)
  }
}

interface AddCommentToThreadParams {
  threadId: string
  commentText: string
  userId: string
  path: string
}

export async function addCommentToThread({
  threadId,
  commentText,
  userId,
  path,
}: AddCommentToThreadParams) {
  connectToDB()

  try {
    const originalThread = await Thread.findById(threadId)

    if (!originalThread) {
      throw new Error('Thread não encontrada')
    }

    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    })

    // saving the new thread
    const savedCommentThread = await commentThread.save()
    // updating the original thread to include the new comment
    originalThread.children.push(savedCommentThread._id)
    // saving the original thread
    await originalThread.save()

    revalidatePath(path)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Erro ao adicionar comentário à thread: ${error.message}`)
  }
}
