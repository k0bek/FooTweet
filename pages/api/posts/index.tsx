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
  const session: Session | null = await getServerSession(req, res, authOptions);
  const body = await req.body;

  try {
    console.log(session);
    if (req.method === 'POST') {
      const result = await db.collection('posts').insertOne(body);
      return res.status(201).json(result);
    }

    if (req.method === 'GET') {
      const posts = await db.collection('posts').find().sort({ data_time: -1 }).toArray();

      const userPosts = await db
        .collection('posts')
        .find({ id: new ObjectId(session?.user.id) })
        .toArray();

      return res.status(200).json({ posts });
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};

export default handler;
