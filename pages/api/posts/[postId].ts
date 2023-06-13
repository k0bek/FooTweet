import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next/types';

import { connectToDatabase } from '@/lib/connectToDatabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectToDatabase();
  const db = client.db();
  const { postId } = req.query;

  try {
    if (req.method === 'GET') {
      const post = await db
        .collection('posts')
        .findOne({ _id: new ObjectId(postId as string) });

      console.log(post);

      return res.status(200).json(post);
    }
  } catch (error) {
    console.log(error);
    return res.status(401).end();
  }
};

export default handler;
