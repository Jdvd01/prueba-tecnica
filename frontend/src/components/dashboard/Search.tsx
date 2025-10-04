import type { SetStateAction } from "react";
import { Input } from "../ui/input";

interface SearchProps {
	search: string;
	setSearch: React.Dispatch<SetStateAction<string>>;
	handleSearch: () => void;
}

export function Search({ search, setSearch, handleSearch }: SearchProps) {
	return (
		<div>
			<Input
				id="search"
				name="search"
				placeholder="Nombre - email"
				onChange={(e) => setSearch(e.target.value)}
				value={search}
				onKeyDown={(e) => {
					if (e.key == "Enter") handleSearch();
				}}
			/>
		</div>
	);
}
