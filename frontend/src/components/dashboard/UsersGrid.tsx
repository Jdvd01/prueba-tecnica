import type { SetStateAction } from "react";
import { Link } from "react-router";
import type { UserFromApi, UsersWithPagination } from "@/types/user";
import {
	Mail,
	ShoppingBag,
	ChevronLeft,
	ChevronRight,
	User,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CardSkeleton } from "./CardSkeleton";

interface UsersGridProps {
	data: UsersWithPagination;
	currentPage: number;
	setCurrentPage: React.Dispatch<SetStateAction<number>>;
	isLoading: boolean;
}

export function UsersGrid({
	data,
	currentPage,
	setCurrentPage,
	isLoading,
}: UsersGridProps) {
	const { pagination, users } = data;
	const { pages } = pagination;

	if (isLoading) {
		const arrayPlaceholder = Array.from({ length: 9 }, () =>
			crypto.randomUUID()
		);
		return (
			<div className="space-y-6">
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{arrayPlaceholder.map((item) => (
						<CardSkeleton key={item} />
					))}
				</div>
			</div>
		);
	}

	if (users.length === 0) {
		return (
			<Card className="p-12">
				<div className="flex flex-col items-center justify-center text-center space-y-3">
					<div className="rounded-full bg-muted p-4">
						<Mail className="h-8 w-8 text-muted-foreground" />
					</div>
					<div className="space-y-1">
						<h3 className="font-semibold text-lg">
							No hay usuarios registrados
						</h3>
						<p className="text-sm text-muted-foreground">
							Comienza agregando tu primer usuario usando el botón de arriba.
						</p>
					</div>
				</div>
			</Card>
		);
	}

	return (
		<div className="space-y-6">
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{users.map((user: UserFromApi) => (
					<Card
						key={user.id}
						className="p-6 hover:border-primary/50 transition-colors"
					>
						<div className="space-y-4">
							{/* Avatar y Badge */}
							<div className="flex items-start justify-between">
								<div className="rounded-full bg-primary/10 p-3">
									<User className="h-6 w-6 text-primary" />
								</div>
								<Badge
									variant="secondary"
									className="bg-primary/10 text-primary hover:bg-primary/20"
								>
									Activo
								</Badge>
							</div>

							<div className="flex flex-col justify-between gap-2">
								<h3 className="font-semibold text-lg leading-none">
									{user.name}
								</h3>
								<div className="flex items-center gap-2 text-sm text-muted-foreground">
									<Mail className="h-4 w-4" />
									<span className="truncate">{user.email}</span>
								</div>
							</div>

							<Link
								to={`/user/${user.id}`}
								className="flex items-center w-fit p-1 px-2 border border-primary/30 rounded"
							>
								<ShoppingBag className="h-4 w-4 mr-2" />
								Ver ordenes
							</Link>
						</div>
					</Card>
				))}
			</div>

			{pages > 1 && (
				<div className="flex items-center justify-center">
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => setCurrentPage(currentPage - 1)}
							disabled={currentPage === 1}
						>
							<ChevronLeft className="h-4 w-4 mr-1" />
							Anterior
						</Button>
						<div className="flex items-center gap-1">
							{Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
								<Button
									key={page}
									variant={currentPage === page ? "default" : "outline"}
									size="sm"
									onClick={() => setCurrentPage(page)}
									className="w-9"
								>
									{page}
								</Button>
							))}
						</div>
						<Button
							variant="outline"
							size="sm"
							onClick={() => setCurrentPage(currentPage + 1)}
							disabled={currentPage === pages}
						>
							Siguiente
							<ChevronRight className="h-4 w-4 ml-1" />
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
