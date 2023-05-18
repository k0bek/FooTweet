import { connectToDatabase } from '@/lib/connectToDatabase';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectToDatabase();
  const db = client.db();

  const retweetedPost = req.body;
  if (req.method === 'POST') {
    const result = await db.collection('retweet').insertOne(retweetedPost);
    return res.status(201).json(result);
  }
};

export default handler;
