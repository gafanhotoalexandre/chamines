'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { ThreadValidation } from '@/lib/validations/thread'
// import { updateUser } from '@/lib/actions/user.actions'

interface PostThreadProps {
  userId: string
}
export function PostThread({ userId }: PostThreadProps) {
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: '',
      accountId: userId,
    },
  })
  return <h1 className="text-light-1">Post Thread Form</h1>
}
