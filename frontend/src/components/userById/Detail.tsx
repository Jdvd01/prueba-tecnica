import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	ArrowLeft,
	Mail,
	ShoppingBag,
	Calendar,
	DollarSign,
} from "lucide-react";
import { Link, useParams } from "react-router";
import { useEffect } from "react";
import { calculateTotal, formatCurrency, formatDate } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { getUserWithOrders } from "@/redux/user/slice";
import type { AppDispatch, RootState } from "@/redux/store";
import { DetailSkeleton } from "./DetailSkeleton";
import { Modal } from "./Modal";

export default function UserDetailPage() {
	const dispatch = useDispatch<AppDispatch>();
	const { id } = useParams();

	const { user, isLoading } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (id) {
			dispatch(getUserWithOrders(id));
		}
	}, [id, dispatch]);

	if (isLoading) {
		return <DetailSkeleton />;
	}

	if (!user || !id) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<Card className="p-8 text-center">
					<h2 className="text-xl font-semibold mb-2">Usuario no encontrado</h2>
					<p className="text-muted-foreground mb-4">
						El usuario que buscas no existe
					</p>
					<Link to={"/"}>Volver al Dashboard</Link>
				</Card>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8 max-w-6xl">
				<div className="mb-8 flex justify-between items-end">
					<span>
						<Link to={"/"} className="mb-4 -ml-2 flex items-center">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Volver al Dashboard
						</Link>

						<div className="flex items-start justify-between">
							<div className="space-y-1">
								<h1 className="text-3xl font-bold tracking-tight">
									Detalles del Usuario
								</h1>
								<p className="text-muted-foreground">
									Información completa y órdenes de compra
								</p>
							</div>
						</div>
					</span>

					<Modal id={id} />
				</div>

				<Card className="p-6 mb-6">
					<div className="flex items-start gap-6">
						<div className="rounded-full bg-primary/10 p-4">
							<Mail className="h-8 w-8 text-primary" />
						</div>
						<div className="flex-1 space-y-3">
							<div className="flex items-center gap-3">
								<h2 className="text-2xl font-semibold">{user.name}</h2>
								<Badge
									variant="secondary"
									className="bg-primary/10 text-primary"
								>
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

				{/* Estadísticas */}
				<div className="grid gap-4 md:grid-cols-2 mb-6">
					<Card className="p-6">
						<div className="flex items-center gap-4">
							<div className="rounded-lg bg-primary/10 p-3">
								<ShoppingBag className="h-6 w-6 text-primary" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">
									Total de Órdenes
								</p>
								<p className="text-2xl font-bold">{user.orders?.length}</p>
							</div>
						</div>
					</Card>
					<Card className="p-6">
						<div className="flex items-center gap-4">
							<div className="rounded-lg bg-primary/10 p-3">
								<DollarSign className="h-6 w-6 text-primary" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Total Gastado</p>
								<p className="text-2xl font-bold">
									{calculateTotal(user.orders ?? [])}
								</p>
							</div>
						</div>
					</Card>
				</div>

				{/* Lista de órdenes */}
				<div className="space-y-4">
					<h3 className="text-xl font-semibold">Órdenes de Compra</h3>

					{user.orders && user.orders.length === 0 ? (
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
					) : (
						<div className="space-y-3">
							{user.orders?.map((order) => (
								<Card
									key={order.id}
									className="p-6 hover:border-primary/50 transition-colors"
								>
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
											<p className="text-2xl font-bold text-primary">
												{formatCurrency(order.amount)}
											</p>
										</div>
									</div>
								</Card>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
