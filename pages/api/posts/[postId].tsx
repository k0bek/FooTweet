import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '@/lib/connectToDatabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectToDatabase();
  const db = client.db();

  const { postId } = req.query;

  if (req.method !== 'GET') {
    return res.status(400).end();
  }
  console.log(req.query);

  try {
    if (req.method === 'GET') {
      const post = await db
        .collection('posts')
        .findOne({ _id: new ObjectId(postId as string) });

      return res.status(200).json(post);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};

export default handler;
