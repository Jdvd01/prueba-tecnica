import type { Pagination } from "./general";
import type { OrderFromApi } from "./order";

export interface UserData {
	name: string;
	email: string;
}

export interface UserFromApi extends UserData {
	id: string;
	created_at: string;
	orders?: OrderFromApi[];
}

export interface UsersWithPagination {
	pagination: Pagination;
	users: UserFromApi[];
}
