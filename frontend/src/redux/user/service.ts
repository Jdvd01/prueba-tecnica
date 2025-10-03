import { env } from "@/envConfig";
import axios from "axios";

const getAllUsers = async (page: number) => {
	const response = await axios.get(
		`${env.VITE_BACKEND_URL}/users?page=${page}`
	);
	const data = response.data;
	return data;
};

const userService = {
	getAllUsers,
};

export default userService;
