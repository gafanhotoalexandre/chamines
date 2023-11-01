import { z } from 'zod'

export const UserValidation = z.object({
  profile_photo: z
    .string({
      required_error: 'o valor deve ser preenchido.',
    })
    .url('URL inválida'),
  name: z
    .string()
    .min(3, 'Deve conter, no mínimo, 3 caracteres')
    .max(30, 'Deve conter, no máximo, 30 caracteres'),
  username: z
    .string()
    .min(3, 'Deve conter, no mínimo, 3 caracteres')
    .max(30, 'Deve conter, no máximo, 30 caracteres'),
  bio: z
    .string()
    .min(3, 'Deve conter, no mínimo 3, caracteres')
    .max(1000, 'Deve conter, no máximo, 1000 caracteres'),
})
