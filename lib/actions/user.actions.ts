'use server'

import { revalidatePath } from 'next/cache'
import User from '../models/user.model'
import { conntectToDB } from '../mongoose'

export async function updateUser(
  userId: string,
  username: string,
  name: string,
  bio: string,
  image: string,
  path: string,
): Promise<void> {
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
