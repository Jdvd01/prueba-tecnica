import { Modal } from "@/components/dashboard";
import { UsersGrid } from "@/components/dashboard/UsersGrid";
import type { UsersWithPagination } from "@/types/user";
import { Users } from "lucide-react";
import { useState } from "react";

export function Dashboard() {
	const [currentPage, setCurrentPage] = useState(1);

	const data: UsersWithPagination = {
		pagination: {
			page: 1,
			pages: 1,
			per_page: 9,
			total: 10,
		},
		users: [],
	};

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8 max-w-6xl">
				<div className="flex items-center justify-between mb-8">
					<div className="space-y-1">
						<div className="flex items-center gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Users className="h-6 w-6 text-primary" />
							</div>
							<h1 className="text-3xl font-bold tracking-tight">
								Dashboard de Usuarios
							</h1>
						</div>
						<p className="text-muted-foreground">
							Gestiona y visualiza todos los usuarios registrados en la
							aplicación
						</p>
					</div>
					<Modal />
				</div>

				<UsersGrid
					data={data}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			</div>
		</div>
	);
}
