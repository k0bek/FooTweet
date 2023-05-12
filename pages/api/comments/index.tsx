import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next/types';

import { connectToDatabase } from '@/lib/connectToDatabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectToDatabase();
  const db = client.db();
  const { postId } = req.query;
  if (req.method !== 'POST') {
    const { username, email, password } = req.body;

    const client = await connectToDatabase();
    const db = client.db();

    const result = await db.collection('comments').insertOne({
      username,
      email,
    });

    res.status(201).json({ message: 'Comment added correctly!' });
    client.close();
  }

  if (req.method === 'GET') {
    const comments = await db
      .collection('comments')
      .find({ _id: new ObjectId(postId as string) });

    const post = await db
      .collection('posts')
      .findOne({ _id: new ObjectId(postId as string) });

    return res.status(200).json(postComments);
  }
};

export default handler;
