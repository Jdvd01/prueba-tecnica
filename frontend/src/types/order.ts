import type { UserFromApi } from "./user";

export interface OrderData {
	user_id: string;
	product_name: string;
	amount: number;
}

export interface OrderFromApi extends OrderData {
	id: string;
	created_at: string;
	user?: UserFromApi;
}
