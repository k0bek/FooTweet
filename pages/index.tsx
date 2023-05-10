import HomeMainContent from "@/components/homeMainContent/HomeMainContent";
import { GetServerSidePropsContext } from "next";

export default function Home() {
	return <HomeMainContent />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	return {
		props: {},
	};
}
