import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '@/lib/connectToDatabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectToDatabase();
  const db = client.db();
  const retweetedPost = req?.body;

  if (req.method === 'POST') {
    const post = db
      .collection('posts')
      .findOne({ _id: new ObjectId(retweetedPost.postId) });

    await db
      .collection('posts')
      .updateOne(
        { _id: new ObjectId(retweetedPost.postId) },
        { $set: { retweeted: !retweetedPost.isRetweeted } },
      );
    return res.status(200).json(post);
  }
};

export default handler;
