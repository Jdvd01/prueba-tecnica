import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { Modal, Search, UsersGrid } from "@/components/dashboard";

import { getAllUsers } from "@/redux/user/slice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";

export function Dashboard() {
	const dispatch = useDispatch<AppDispatch>();

	const { users, pagination, isLoading } = useSelector(
		(state: RootState) => state.user
	);

	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	function handleSearch() {
		dispatch(getAllUsers({ page: currentPage, search }));
	}

	useEffect(() => {
		dispatch(getAllUsers({ page: currentPage, search }));
	}, [currentPage, dispatch]);

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8 max-w-6xl flex flex-col gap-4">
				<div className="flex flex-col gap-8 sm:flex-row md:items-center md:justify-between">
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
					<Modal page={currentPage} />
				</div>

				<Search
					search={search}
					setSearch={setSearch}
					handleSearch={handleSearch}
				/>

				<UsersGrid
					data={{ pagination, users }}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
}
