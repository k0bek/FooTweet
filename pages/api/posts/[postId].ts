import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next/types'

import { connectToDatabase } from '@/lib/connectToDatabase'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { Session } from '@/types/next-auth'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectToDatabase()
  const db = client.db()
  const { postId } = req.query
  const { usersWhoLiked } = req.body
  const session: Session | null = await getServerSession(req, res, authOptions)

  try {
    if (req.method === 'GET') {
      const post = await db.collection('posts').findOne({ _id: new ObjectId(postId as string) })

      return res.status(200).json(post)
    }

    if (req.method === 'POST') {
      const post = await db.collection('posts').updateOne(
        { _id: new ObjectId(postId as string) },
        {
          $push: {
            usersWhoLiked: usersWhoLiked as string,
          },
        }
      )

      client.close()
      return res.status(201).json(post)
    }

    if (req.method === 'DELETE') {
      const post = await db.collection('posts').findOne({ _id: new ObjectId(postId as string) })

      if (post) {
        post.usersWhoLiked = post.usersWhoLiked.filter((userId: string) => userId !== session?.user?.id)

        await db.collection('posts').updateOne({ _id: new ObjectId(postId as string) }, { $set: post })

        res.status(200).json({ success: true })
      }
    }
  } catch (error) {
    console.log(error)
    return res.status(401).end()
  }
}

export default handler
