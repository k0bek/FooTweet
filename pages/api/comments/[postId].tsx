import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next/types';

import { connectToDatabase } from '@/lib/connectToDatabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectToDatabase();
  const db = client.db();
  const postId = req.query.postId;
  const data = req.body;

  try {
    if (req.method === 'POST') {
      const result = await db.collection('comments').insertOne({
        commentValue: data.commentValue,
        data_time: data.data_time,
        postId: data.postId,
      });

      return res.status(201).json(result);
    }

    if (req.method === 'GET') {
      const comments = await db
        .collection('comments')
        .find({ postId: postId })
        .sort({ data_time: -1 })
        .toArray();

      const post = await db.collection('posts').findOne({ _id: new ObjectId(postId) });

      await db
        .collection('posts')
        .updateOne({ _id: new ObjectId(postId) }, { $set: { comments: comments } });

      return res.status(200).json(comments);
    }
    return res.status(405).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};

export default handler;
