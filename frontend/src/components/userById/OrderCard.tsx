import { Calendar, ShoppingBag } from "lucide-react";
import { Card } from "../ui/card";
import { formatDate } from "@/lib/utils";
import type { OrderFromApi } from "@/types/order";

interface OrderCardProps {
	order: OrderFromApi;
}

export function OrderCard({ order }: OrderCardProps) {
	return (
		<Card className="p-6 hover:border-primary/50 transition-colors">
			<div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
				<div className="flex items-start gap-4 flex-1">
					<div className="rounded-lg bg-primary/10 p-3">
						<ShoppingBag className="h-5 w-5 text-primary" />
					</div>
					<div className="flex-1 space-y-1">
						<h4 className="font-semibold">{order.product_name}</h4>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Calendar className="h-4 w-4" />
							<span>{formatDate(order.created_at)}</span>
						</div>
					</div>
				</div>
				<div className="text-right">
					<p className="text-2xl font-bold text-primary">{order.amount}</p>
					<p className="text-xs text-muted-foreground mt-1">unidades</p>
				</div>
			</div>
		</Card>
	);
}
