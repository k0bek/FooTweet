import HomeMainContent from "@/components/homeMainContent/HomeMainContent";
import axios from "axios";

export default function Home({ posts }) {
	return <HomeMainContent posts={posts} />;
}

export async function getServerSideProps() {
	try {
		const response = await axios.get("http://localhost:3000/api/posts"); // Replace with your internal API endpoint

		const posts = response.data;

		return {
			props: { posts },
		};
	} catch (error) {
		console.error("Error fetching posts:", error);
		return {
			props: { posts: [] },
		};
	}
}
