import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '@/lib/connectToDatabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectToDatabase();
  const db = client.db();
  const retweetedPost = req?.body;

  if (req.method === 'POST') {
    const result = await db.collection('retweet').insertOne(retweetedPost);
    const user = db
      .collection('users')
      .findOne({ _id: new ObjectId(retweetedPost.userId) });

    if (user) {
      await db
        .collection('users')
        .updateOne({ _id: new ObjectId(user._id) }, { $push: { retweetedPosts: user } });
    }
    return res.status(200).json(user);
  }
};

export default handler;
