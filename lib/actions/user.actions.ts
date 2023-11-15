'use server'

import { revalidatePath } from 'next/cache'
import { FilterQuery, SortOrder } from 'mongoose'

import User from '../models/user.model'
import { connectToDB } from '../mongoose'
import Thread from '../models/thread.model'

interface Params {
  userId: string
  username: string
  name: string
  bio: string
  image: string
  path: string
}
export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: Params): Promise<void> {
  connectToDB()

  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLocaleLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true },
    )

    if (path === '/profile/edit') {
      revalidatePath(path)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Falha ao criar/atualizar usuário: ${error.message}`)
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB()

    return await User.findOne({ id: userId })
    // .populate({
    //   path: 'communities',
    //   model: Community
    // })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      `Falha ao fazer o fetch de dados do usuário: ${error.message}`,
    )
  }
}

export async function fetchUserThreads(userId: string) {
  try {
    connectToDB()
    // encontrar todas as threads de autoria do usuário através do id fornecido
    // TODO: Popular com comunidades
    const threads = await User.findOne({ id: userId }).populate({
      path: 'threads',
      model: Thread,
      populate: {
        path: 'children',
        model: Thread,
        populate: {
          path: 'author',
          model: User,
          select: 'name image id',
        },
      },
    })

    return threads
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Falha ao buscar threads do usuário: ${error.message}`)
  }
}

interface FetchUserParams {
  userId: string
  searchString?: string
  pageNumber?: number
  pageSize?: number
  sortBy?: SortOrder
}
export async function fetchUsers({
  userId,
  searchString = '',
  pageNumber = 1,
  pageSize = 20,
  sortBy = 'desc',
}: FetchUserParams) {
  try {
    connectToDB()

    const skipAmount = (pageNumber - 1) * pageSize

    const regex = new RegExp(searchString, 'i')

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    }

    if (searchString.trim() !== '') {
      query.$or = [{ username: { $regex: regex } }, { name: { $regex: regex } }]
    }

    const sortOptions = { createdAt: sortBy }

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)

    const totalUsersCount = await User.countDocuments(query)

    const users = await usersQuery.exec()

    const isNext = totalUsersCount > skipAmount + users.length

    return { users, isNext }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Falha ao buscar os usuários: ${error.message}`)
  }
}
