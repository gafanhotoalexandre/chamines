import mongoose from 'mongoose'

export type ThreadInfo = {
  _id: string
  id: string
  text: string
  author: mongoose.Types.ObjectId
  createdAt: Date
  children: mongoose.Types.ObjectId[]
  community?: mongoose.Types.ObjectId | undefined
  parentId?: string | undefined
}
