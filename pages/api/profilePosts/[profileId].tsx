import { Session } from 'inspector';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';

import { connectToDatabase } from '@/lib/connectToDatabase';

import { authOptions } from '../auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectToDatabase();
  const db = client.db();
  const body = await req.body;

  console.log(req.query);

  try {
    if (req.method === 'GET') {
      const profilePosts = await db
        .collection('posts')
        .find({ userId: req.query.profileId })
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
