import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export function Header() {
	return (
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
	);
}
