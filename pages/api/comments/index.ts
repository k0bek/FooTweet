import { NextApiRequest, NextApiResponse } from 'next/types'

import { connectToDatabase } from '@/lib/connectToDatabase'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectToDatabase()
  const db = client.db()
  const { commentValue, data_time, postId, userId, username, name, profileImage } = req.body

  try {
    if (req.method === 'POST') {
      const result = await db.collection('comments').insertOne({
        commentValue,
        data_time,
        postId,
        userId,
        username,
        name,
        profileImage,
      })

      client.close()
      return res.status(201).json(result)
    }

    if (req.method === 'GET') {
      const comments = db.collection('comments')
      client.close()
      return res.status(200).json(comments)
    }
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}

export default handler
