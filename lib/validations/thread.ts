import { z } from 'zod'

export const ThreadValidation = z.object({
  thread: z
    .string({
      required_error: 'o valor deve ser preenchido.',
    })
    .min(3, 'São necessários no mínimo 3 caracteres.'),
  accountId: z.string(),
})

export const CommentValidation = z.object({
  thread: z
    .string({
      required_error: 'o valor deve ser preenchido.',
    })
    .min(3, 'São necessários no mínimo 3 caracteres.'),
})
