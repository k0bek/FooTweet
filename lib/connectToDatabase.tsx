import { MongoClient } from 'mongodb'

export const connectToDatabase = async () => {
  const URL = process.env.NEXTAUTH_URL_MONGO

  const client = await MongoClient.connect(URL as string)

  return client
}
