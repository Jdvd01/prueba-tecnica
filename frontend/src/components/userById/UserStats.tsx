import { Mail, Package, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "../ui/card";
import type { UserFromApi } from "@/types/user";
import { calculateTotal } from "@/lib/utils";

interface UserStatsProps {
	user: UserFromApi;
}

export function UserStats({ user }: UserStatsProps) {
	return (
		<>
			<Card className="p-6 mb-6">
				<div className="flex items-start gap-6">
					<div className="rounded-full bg-primary/10 p-4">
						<Mail className="h-8 w-8 text-primary" />
					</div>
					<div className="flex-1 space-y-3">
						<div className="flex items-center gap-3">
							<h2 className="text-2xl font-semibold">{user.name}</h2>
							<Badge variant="secondary" className="bg-primary/10 text-primary">
								Activo
							</Badge>
						</div>
						<div className="flex items-center gap-2 text-muted-foreground">
							<Mail className="h-4 w-4" />
							<span>{user.email}</span>
						</div>
					</div>
				</div>
			</Card>
			<div className="grid gap-4 md:grid-cols-2 mb-6">
				<Card className="p-6">
					<div className="flex items-center gap-4">
						<div className="rounded-lg bg-primary/10 p-3">
							<ShoppingBag className="h-6 w-6 text-primary" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Total de Órdenes</p>
							<p className="text-2xl font-bold">{user.orders?.length}</p>
						</div>
					</div>
				</Card>
				<Card className="p-6">
					<div className="flex items-center gap-4">
						<div className="rounded-lg bg-primary/10 p-3">
							<Package className="h-6 w-6 text-primary" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">
								Total de Productos
							</p>
							<p className="text-2xl font-bold">
								{calculateTotal(user.orders)}
							</p>
						</div>
					</div>
				</Card>
			</div>
		</>
	);
}
