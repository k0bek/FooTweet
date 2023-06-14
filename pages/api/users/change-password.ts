import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession, Session } from 'next-auth'

import { connectToDatabase } from '@/lib/connectToDatabase'
import { hashPassword } from '@/lib/hashPassword'
import { verifyPassword } from '@/lib/verifyPassword'

import { authOptions } from '../auth/[...nextauth]'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await connectToDatabase()
  const session: Session | null = await getServerSession(req, res, authOptions)

  try {
    if (!session) {
      res.status(401).json({ message: 'User is not authenticated' })
      client.close()
      return
    }

    const userEmail = session.user?.email
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword

    const userCollection = client.db().collection('users')
    const user = await client.db().collection('users').findOne({ email: userEmail })

    const isPasswordValid = await verifyPassword(oldPassword, user?.password)

    if (isPasswordValid) {
      const hashedPassword = await hashPassword(newPassword)
      const result = await userCollection.updateOne({ email: userEmail }, { $set: { password: hashedPassword } })

      client.close()
      res.status(201).json(result)
    } else {
      client.close()
      res.status(400).json({ message: 'Invalid password' })
    }
  } catch (error) {
    console.error('An error occurred:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
export default handler
