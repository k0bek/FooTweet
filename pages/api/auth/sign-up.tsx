import { NextApiRequest, NextApiResponse } from "next/types";
import { connectToDatabase } from "@/lib/connectToDatabase";
import hashPassword from "@/lib/hashPassword";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") {
		return;
	}

	const { email, password } = req.body;

	const client = await connectToDatabase();
	const db = client.db();

	const existingUser = await db.collection("users").findOne({ email: email });

	if (existingUser) {
		res.status(422).json({ message: "User exists already", field: "email" });
		client.close();
		return;
	}

	const hashedPasword = await hashPassword(password);

	const result = await db.collection("users").insertOne({
		email,
		password: hashedPasword,
	});

	res.status(201).json({ message: "User created correctly!" });
	client.close();
};

export default handler;
