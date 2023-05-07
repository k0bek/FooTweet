import HomeMainContent from "@/components/homeMainContent/HomeMainContent";
import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";

export default function Home() {
	const { data: session, status } = useSession();

	return <HomeMainContent />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getSession({ req: context.req });

	return {
		props: {},
	};
}
