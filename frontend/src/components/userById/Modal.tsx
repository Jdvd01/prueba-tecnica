import React, { useState } from "react";
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
import type { OrderData } from "@/types/order";
import { getUserWithOrders } from "@/redux/user/slice";

interface ModalProps {
	id: string;
}

export function Modal({ id }: ModalProps) {
	const orderDataDefault = {
		user_id: id,
		product_name: "",
		amount: 1,
	};

	const dispatch = useDispatch<AppDispatch>();

	const [open, setOpen] = useState(false);
	const [orderData, setOrderData] = useState<OrderData>(orderDataDefault);

	const handleSubmit = async () => {
		try {
			// await dispatch(createNewOrder(orderData));
			handleClean();
			setOpen(false);
			await dispatch(getUserWithOrders(id));
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setOrderData({ ...orderData, [name]: value });
	};

	const handleClean = () => {
		setOrderData(orderDataDefault);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="border border-primary/30">
					Agregar Orden
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Registrar orden</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4">
					<div className="grid gap-3">
						<Label htmlFor="product_name">Nombre del producto</Label>
						<Input
							id="product_name"
							name="product_name"
							placeholder="iPhone 13"
							onChange={handleChange}
							value={orderData.product_name}
						/>
					</div>
					<div className="grid gap-3">
						<Label htmlFor="amount">Amount</Label>
						<Input
							id="amount"
							name="amount"
							type="number"
							placeholder="123"
							onChange={handleChange}
							value={orderData.amount}
						/>
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline" onClick={handleClean}>
							Cancelar
						</Button>
					</DialogClose>
					<Button type="submit" onClick={handleSubmit}>
						Enviar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
