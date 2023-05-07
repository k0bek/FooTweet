import { useState } from "react";

export const useUsers = async () => {
	const [isLoading, setIsLoading] = useState(false);
	const [users, setUsers] = useState([]);

	setIsLoading(true);
	const response = await fetch("api/users");
	const data = await response.json();
	if (data) {
		setIsLoading(false);
		setUsers(data);
	}

	return { isLoading, users };
};
