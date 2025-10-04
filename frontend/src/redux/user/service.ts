import { env } from "@/envConfig";
import type { GetAllUsersParameters, UserData } from "@/types/user";
import axios from "axios";

const getAllUsers = async ({ page, search }: GetAllUsersParameters) => {
	const response = await axios.get(
		`${env.VITE_BACKEND_URL}/users?page=${page}&search=${search}`
	);
	const data = response.data;
	return data;
};

const createNewUser = async (userData: UserData) => {
	const response = await axios.post(`${env.VITE_BACKEND_URL}/users/`, userData);
	const data = response.data;
	return data;
};

const getUserWithOrders = async (id: string) => {
	const response = await axios.get(
		`${env.VITE_BACKEND_URL}/users/${id}/orders`
	);
	const data = response.data;
	return data;
};

const userService = {
	getAllUsers,
	createNewUser,
	getUserWithOrders,
};

export default userService;
