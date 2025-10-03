import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
	return (
		<div className="flex flex-col space-y-3 border p-4 rounded-lg">
			<div className="flex items-center space-x-4">
				<Skeleton className="h-12 w-12 rounded-full bg-primary/30" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-[250px] bg-primary/30" />
					<Skeleton className="h-4 w-[200px] bg-primary/30" />
				</div>
			</div>
			<div className="space-y-2">
				<Skeleton className="h-[125px] w-full rounded-xl bg-primary/30" />
			</div>
		</div>
	);
}
