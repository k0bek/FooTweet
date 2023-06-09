import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '@/lib/connectToDatabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const client = await connectToDatabase();
  const db = client.db();

  try {
    const users = await db.collection('users').find().sort({ created_at: 1 }).toArray();

    client.close();
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error with users:', error);
    return res.status(401).json({ message: 'Internal Server Error' });
  }
};

export default handler;
