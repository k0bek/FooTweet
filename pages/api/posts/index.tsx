import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '@/lib/connectToDatabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const { body: data } = req;

    if (req.method === 'POST') {
      const result = await db.collection('posts').insertOne(data);
      client.close();
      return res.status(201).json(result);
    }

    if (req.method === 'GET') {
      const posts = await db.collection('posts').find().sort({ data_time: -1 }).toArray();
      client.close();
      return res.status(200).json({ posts });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).end();
  }
};

export default handler;
