import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '@/lib/connectToDatabase';
import { ObjectId } from 'mongodb';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { Session } from 'inspector';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectToDatabase();
  const db = client.db();
  const body = await req.body;

  console.log(req.query);

  try {
    if (req.method === 'GET') {
      const profilePosts = await db
        .collection('posts')
        .find({ id: req.query.profileId })
        .sort({ data_time: -1 })
        .toArray();

      return res.status(200).json(profilePosts);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};

export default handler;
