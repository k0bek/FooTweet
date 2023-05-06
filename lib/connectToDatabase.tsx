import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
	const URL = "mongodb+srv://kuba:kuba@twitter.io49hsm.mongodb.net/test";

	const client = await MongoClient.connect(URL);

	return client;
};
