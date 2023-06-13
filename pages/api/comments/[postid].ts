import { NextApiRequest, NextApiResponse } from 'next/types';

import { connectToDatabase } from '@/lib/connectToDatabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectToDatabase();
  const db = client.db();
  const { postid } = req.query;

  try {
    if (req.method === 'GET') {
      const comments = await db
        .collection('comments')
        .find({ postId: postid })
        .sort({ data_time: -1 })
        .toArray();

      client.close();
      return res.status(200).json(comments);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};

export default handler;
