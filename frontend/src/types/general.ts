export interface Pagination {
	page: number;
	pages: number;
	per_page: number;
	total: number;
}

export interface ErrorFromApi {
	error: string;
}

export interface ToastParameters {
	title: string;
	description: string;
}
