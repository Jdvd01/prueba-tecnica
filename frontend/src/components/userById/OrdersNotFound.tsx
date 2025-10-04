import { ShoppingBag } from "lucide-react";
import { Card } from "../ui/card";

export function OrdersNotFound() {
	return (
		<Card className="p-12">
			<div className="flex flex-col items-center justify-center text-center space-y-3">
				<div className="rounded-full bg-muted p-4">
					<ShoppingBag className="h-8 w-8 text-muted-foreground" />
				</div>
				<div className="space-y-1">
					<h3 className="font-semibold text-lg">No hay órdenes</h3>
					<p className="text-sm text-muted-foreground">
						Este usuario aún no ha realizado ninguna compra.
					</p>
				</div>
			</div>
		</Card>
	);
}
