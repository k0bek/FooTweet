import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '@/lib/connectToDatabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectToDatabase();
  const db = client.db();

  const { userId } = req.query;

  if (req.method !== 'GET') {
    return res.status(400).end();
  }

  try {
    if (req.method === 'GET') {
      const posts = await db
        .collection('users')
        .find({ _id: new ObjectId(userId as string) })
        .toArray();

      return res.status(200).json(posts);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};

export default handler;
