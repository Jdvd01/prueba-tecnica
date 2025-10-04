import React, { useState } from "react";
import type { UserData } from "@/types/user";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { createNewUser, getAllUsers } from "@/redux/user/slice";

interface ModalProps {
	page: number;
}

const userDataDefault = {
	name: "",
	email: "",
};

export function Modal({ page }: ModalProps) {
	const dispatch = useDispatch<AppDispatch>();

	const [open, setOpen] = useState(false);
	const [userData, setUserData] = useState<UserData>(userDataDefault);

	const handleSubmit = async () => {
		try {
			await dispatch(createNewUser(userData));
			setUserData(userDataDefault);
			setOpen(false);
			await dispatch(getAllUsers({ page, search: "" }));
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="border border-primary/30">
					Agregar usuario
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Registrar usuario</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4">
					<div className="grid gap-3">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							name="name"
							placeholder="Jose Velasquez"
							onChange={handleChange}
							value={userData.name}
						/>
					</div>
					<div className="grid gap-3">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							placeholder="ejemplo@gmail.com"
							onChange={handleChange}
							value={userData.email}
						/>
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit" onClick={handleSubmit}>
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
