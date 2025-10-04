import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "../ui/card";
import { Header } from "./Header";

export function DetailSkeleton() {
	return (
		<div className="container mx-auto px-4 py-8 max-w-6xl">
			<div className="mb-8">
				<Header />
			</div>

			<Card className="p-6 mb-6">
				<div className="flex items-start gap-6">
					<div className="rounded-full bg-primary/10 p-4">
						<Skeleton className="rounded-lg bg-primary/30 p-3" />
					</div>
					<div className="flex-1 space-y-3">
						<div className="flex items-center gap-3">
							<Skeleton className="rounded-lg bg-primary/30 p-3 h-4 w-[40%]" />
						</div>
						<div className="flex items-center gap-2 text-muted-foreground">
							<Skeleton className="rounded-lg bg-primary/30 p-3 h-4 w-[60%]" />
						</div>
					</div>
				</div>
			</Card>

			<div className="grid gap-4 md:grid-cols-2 mb-6">
				<Card className="p-6">
					<div className="flex items-center gap-4">
						<div className="rounded-lg bg-primary/10 p-3">
							<Skeleton className="rounded-lg bg-primary/10 p-3" />
						</div>
						<div>
							<Skeleton className="h-4 w-[250px] bg-primary/30" />
							<Skeleton className="h-4 w-[200px] bg-primary/30 mt-2" />
						</div>
					</div>
				</Card>
				<Card className="p-6">
					<div className="flex items-center gap-4">
						<div className="rounded-lg bg-primary/10 p-3">
							<Skeleton className="rounded-lg bg-primary/10 p-3" />
						</div>
						<div>
							<Skeleton className="h-4 w-[250px] bg-primary/30" />
							<Skeleton className="h-4 w-[200px] bg-primary/30 mt-2" />
						</div>
					</div>
				</Card>
			</div>

			<div className="space-y-4 ">
				<h3 className="text-xl font-semibold">Órdenes de Compra</h3>

				<div className="space-y-3">
					{Array.from({ length: 3 }, () => crypto.randomUUID()).map((item) => (
						<Card
							key={item}
							className="p-6 hover:border-primary/50 transition-colors"
						>
							<div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
								<div className="flex items-start gap-4 flex-1">
									<div className="rounded-lg bg-primary/10 p-3">
										<Skeleton className="rounded-lg bg-primary/10 p-3" />
									</div>
									<div className="flex-1 space-y-1">
										<h4 className="font-semibold">
											<Skeleton className="h-4 w-[250px] bg-primary/30" />
										</h4>
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											<Skeleton className="h-4 w-[200px] bg-primary/30 mt-2" />
										</div>
									</div>
								</div>
							</div>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
