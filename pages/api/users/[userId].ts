import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession, unstable_getServerSession } from 'next-auth/next';
import { getSession } from 'next-auth/react';

import { connectToDatabase } from '@/lib/connectToDatabase';

import { authOptions } from '../auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectToDatabase();
  const db = client.db();
  const { userId } = req.query;
  const data = req.body;

  const session = await getServerSession(req, res, authOptions);
  const user = session?.user;

  if (req.method === 'POST') {
    console.log(data);
    const updatedUser = await db.collection('users').updateOne(
      { _id: new ObjectId(userId as string) },
      {
        $set: {
          name: data.name !== undefined ? data.name : user?.name,
          bio: data.bio !== undefined ? data.bio : user?.bio,
        },
      },
    );

    console.log(updatedUser);
    client.close();
    return res.status(201).json(updatedUser);
  }

  try {
    if (req.method === 'GET') {
      const user = await db
        .collection('users')
        .findOne({ _id: new ObjectId(userId as string) });

      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    return res.status(401).end();
  }
};

export default handler;
