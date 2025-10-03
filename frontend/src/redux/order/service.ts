import { env } from "@/envConfig";
import type { OrderData } from "@/types/order";
import axios from "axios";

const createNewOrder = async (orderData: OrderData) => {
	const response = await axios.post(
		`${env.VITE_BACKEND_URL}/orders/`,
		orderData
	);
	const data = response.data;
	return data;
};

const orderService = {
	createNewOrder,
};

export default orderService;
