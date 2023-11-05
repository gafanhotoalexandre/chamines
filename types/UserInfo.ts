import mongoose from 'mongoose'

export type UserInfo = {
  _id: string
  id: string
  username: string
  name: string
  threads: mongoose.Types.ObjectId[]
  onboarded: boolean
  communities: mongoose.Types.ObjectId[]
  image?: string | undefined
  bio?: string | undefined
}
