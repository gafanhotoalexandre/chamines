'use server'

import { revalidatePath } from 'next/cache'
import User from '../models/user.model'
import { conntectToDB } from '../mongoose'

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
  conntectToDB()

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
