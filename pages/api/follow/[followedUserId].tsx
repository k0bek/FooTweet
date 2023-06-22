import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import { connectToDatabase } from '@/lib/connectToDatabase'
import { Session, getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectToDatabase()
  const db = client.db()
  const { userId, following } = req.body
  const { followedUserId } = req.query
  const session: Session | null = await getServerSession(req, res, authOptions)

  try {
    if (req.method === 'POST') {
      const followingUser = await db.collection('users').updateOne(
        { _id: new ObjectId(userId as string) },
        {
          $push: {
            following: following,
          },
        }
      )

      const followedUser = await db.collection('users').updateOne(
        { _id: new ObjectId(following as string) },
        {
          $push: {
            followers: userId,
          },
        }
      )

      client.close()
      return res.status(201).json({ followingUser, followedUser })
    }

    if (req.method === 'GET') {
      const user = await db.collection('users').findOne({ _id: new ObjectId(userId as string) })

      client.close()
      return res.status(200).json(user)
    }

    if (req.method === 'DELETE') {
      const user = await db.collection('users').findOne({ _id: new ObjectId(session?.user.id as string) })

      if (user) {
        console.log(user.following)
        user.following = user.following.filter((id: string) => id !== followedUserId)
        console.log(user.following)

        await db.collection('users').updateOne({ _id: new ObjectId(session?.user.id as string) }, { $set: user })

        client.close()
        return res.status(200).json({ success: true })
      } else {
        client.close()
        return res.status(404).json({ message: 'User not found' })
      }
    }
  } catch (error) {
    console.log(error)
    return res.status(401).end()
  }
}

export default handler
