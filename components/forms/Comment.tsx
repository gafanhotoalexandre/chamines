'use client'

import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createThread } from '@/lib/actions/thread.actions'
import { CommentValidation } from '@/lib/validations/thread'

interface CommentProps {
  threadId: string
  currentUserImg: string
  currentUserId: string
}
export function Comment({
  threadId,
  currentUserImg,
  currentUserId,
}: CommentProps) {
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: '',
    },
  })

  async function onSubmit(values: z.infer<typeof CommentValidation>) {
    // await createThread({
    //   text: values.thread,
    //   author: userId,
    //   communityId: null,
    //   path: pathname,
    // })

    router.push('/')
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 w-full">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="Imagem de perfil"
                  width={48}
                  height={48}
                  quality={50}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="Comentário..."
                  className="no-focus text-light-1 outline-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn">
          Responder
        </Button>
      </form>
    </Form>
  )
}
