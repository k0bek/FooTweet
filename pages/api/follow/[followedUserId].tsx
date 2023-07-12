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
            following: { ...following, id: following._id },
          },
        }
      )

      const followedUser = await db.collection('users').updateOne(
        { _id: new ObjectId(following._id as string) },
        {
          $push: {
            followers: session?.user,
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
      const followedUser = await db.collection('users').findOne({ _id: new ObjectId(followedUserId as string) })

      if (user) {
        user.following = user?.following.filter((item: { _id: string }) => item?._id !== followedUserId)
        const updatedFollowedUser = followedUser?.followers.filter(
          (item: { id: string }) => item?.id !== session?.user.id
        )

        await db.collection('users').updateOne({ _id: new ObjectId(session?.user.id as string) }, { $set: user })
        await db
          .collection('users')
          .updateOne(
            { _id: new ObjectId(followedUser?._id) },
            { $set: { followers: updatedFollowedUser?.followers ? updatedFollowedUser.followers : [] } }
          )
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
