import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import { connectToDatabase } from '@/lib/connectToDatabase'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectToDatabase()
  const db = client.db()
  const { userId } = req.query
  const data = req.body

  if (req.method === 'POST') {
    const updatedUser = await db.collection('users').updateOne(
      { _id: new ObjectId(userId as string) },
      {
        $set: {
          name: data.name,
          bio: data.bio,
          backgroundImage: data.backgroundImage,
          profileImage: data.profileImage,
        },
      }
    )

    client.close()
    return res.status(201).json(updatedUser)
  }

  try {
    if (req.method === 'GET') {
      const user = await db.collection('users').findOne({ _id: new ObjectId(userId as string) })

      return res.status(200).json(user)
    }
  } catch (error) {
    console.log(error)
    return res.status(401).end()
  }
}

export default handler
