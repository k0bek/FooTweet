import React, { useState } from "react";
import lewy from "./../../assets/images/lewy.jpg";
import Image from "next/image";
import { BsFillImageFill } from "react-icons/bs";
import axios from "axios";
import { useMutation } from "react-query";
import { useSession } from "next-auth/react";
import { ChangeEvent } from "react";
import getCurrentData from "@/hooks/getCurrentData";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const CreatePostBar = () => {
	const [postValue, setPostValue] = useState("");
	const { data: session, status } = useSession();
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: (newPost) => {
			return axios.post("/api/posts", newPost);
		},
		onSuccess: () => {
			router.replace(router.asPath);
			toast.success("Added tweet correctly!");
		},

		onError: () => {
			toast.error("Error with adding posts. Please try again");
		},
	});

	return (
		<div className="flex items-center flex-col bg-slate-700 rounded-2xl w-full p-7">
			<div className="h-full w-full flex items-center gap-4 flex-col sm:flex-row">
				<Image
					src={lewy}
					width={67}
					height={60}
					alt="User's profile image"
					className="rounded-full"
				/>
				<textarea
					className="h-[6.5rem] min-h-[6.5rem] max-h-[6.5rem] rounded-2xl w-full bg-slate-500 text-xl p-4 text-white outline-none sm:text-4xl "
					placeholder="What's happening?"
					onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
						setPostValue(event.target.value);
					}}
					disabled={mutation.isLoading}
				></textarea>
			</div>
			<div className="mt-5 flex gap-1 sm:gap-5 w-full justify-end">
				<button
					className={`border border-gray-600 text-lg sm:text-xl py-3 px-3 sm:px-6 rounded-3xl text-gray-300 font-medium flex items-center gap-3 ${
						mutation.isLoading
							? "bg-gray-500 cursor-not-allowed"
							: "text-gray-300"
					}`}
					disabled={mutation.isLoading}
				>
					<BsFillImageFill className="text-emerald-400 shadow-xl shadow-emerald-500" />
					Photo
				</button>
				<button
					onClick={async () => {
						mutation.mutate({
							...session?.user,
							postValue,
							data_time: getCurrentData(),
						});
					}}
					className={`border border-gray-600  text-lg sm:text-xl py-3 px-3 sm:px-6 rounded-3xl text-gray-300 font-bold flex items-center gap-3 ${
						mutation.isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-sky-500"
					}`}
					disabled={mutation.isLoading}
				>
					Tweet
				</button>
			</div>
		</div>
	);
};

export default CreatePostBar;
