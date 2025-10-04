import { Link } from "react-router";
import { Card } from "../ui/card";

export function UserNotFound() {
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
