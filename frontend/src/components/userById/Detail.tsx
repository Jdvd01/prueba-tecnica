import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWithOrders } from "@/redux/user/slice";
import type { AppDispatch, RootState } from "@/redux/store";
import { DetailSkeleton } from "./DetailSkeleton";
import { Modal } from "./Modal";
import { Header } from "./Header";
import { UserNotFound } from "./UserNotFound";
import { UserStats } from "./UserStats";
import { OrdersNotFound } from "./OrdersNotFound";
import { OrderCard } from "./OrderCard";

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
		return <UserNotFound />;
	}

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8 max-w-6xl">
				<div className="mb-8 flex justify-between items-end">
					<Header />

					<Modal id={id} />
				</div>

				{/* Estadísticas */}
				<UserStats user={user} />

				{/* Lista de órdenes o placeholder de error */}
				<div className="space-y-4">
					<h3 className="text-xl font-semibold">Órdenes de Compra</h3>
					{user.orders && user.orders.length === 0 ? (
						<OrdersNotFound />
					) : (
						<div className="space-y-3">
							{user.orders?.map((order) => (
								<OrderCard order={order} key={order.id} />
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
