import { connectToDatabase } from "@/lib/connectToDatabase";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const client = await connectToDatabase();
	const db = client.db();

	try {
		if (req.method === "POST") {
			const body = await req.body;

			const result = await db.collection("posts").insertOne(body);
			return res.status(200).json(result);
		}

		if (req.method === "GET") {
			const posts = await db
				.collection("posts")
				.find()
				.sort({ data_time: -1 })
				.toArray();

			return res.status(200).json(posts);
		}

		return res.status(405).end();
	} catch (error) {
		console.log(error);
		return res.status(400).end();
	}
};

export default handler;
