import mongoose from 'mongoose'

let isConnected = false

export async function connectToDB() {
  mongoose.set('strictQuery', true)

  if (!process.env.MONGODB_URL)
    return console.log('MONGODB_URL não encontrada.')
  if (isConnected) return console.log('Já conectado ao MongoDB')

  try {
    await mongoose.connect(process.env.MONGODB_URL)
    isConnected = true

    console.log('Conectado ao MongoDB')
  } catch (error) {
    console.log(error)
  }
}
