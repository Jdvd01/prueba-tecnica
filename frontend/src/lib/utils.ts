import type { OrderFromApi } from "@/types/order";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString("es-ES", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

export const formatCurrency = (amount: number) => {
	return new Intl.NumberFormat("es-ES", {
		style: "currency",
		currency: "USD",
	}).format(amount);
};

export const calculateTotal = (orders: OrderFromApi[]) => {
	const total = orders.reduce((acc, current) => {
		return acc + current.amount;
	}, 0);
	return formatCurrency(total);
};
