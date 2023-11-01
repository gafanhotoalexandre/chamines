import { z } from 'zod'

export const UserValidation = z.object({
  profile_photo: z
    .string({
      required_error: 'o valor deve ser preenchido.',
    })
    .url(),
  name: z.string().min(3).max(30),
  username: z.string().min(3).max(30),
  bio: z.string().min(3).max(1000),
})
