import { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderService from "./service";
import type { OrderData, OrderInitialState } from "@/types/order";
import { generateErrorToast, generateSuccessToast } from "@/lib/utils";

// const paginationDefault = {
// 	page: 1,
// 	pages: 1,
// 	per_page: 9,
// 	total: 0,
// };

const orderDefault = {
	id: "",
	user_id: "",
	product_name: "",
	amount: 0,
	created_at: "",
};

const initialState: OrderInitialState = {
	order: orderDefault,
	orders: [],
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: { error: "" },
};

export const createNewOrder = createAsyncThunk(
	"order/createNewOrder",
	async (orderData: OrderData, thunkAPI) => {
		try {
			await orderService.createNewOrder(orderData);
			generateSuccessToast({
				title: "Orden creada",
				description: "Gracias por su compra!",
			});
		} catch (err) {
			let message: string;

			if (err instanceof AxiosError && err.response) {
				message = err.response.data?.message || err.message;
				generateErrorToast({
					title: "Ocurrio un error",
					description: err?.response.data.error,
				});
			} else if (err instanceof Error) {
				message = err.message;
			} else {
				message = String(err);
			}

			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			// Crear nueva orden
			.addCase(createNewOrder.pending, (state) => {
				state.isLoading = true;
				state.isSuccess = false;
				state.isError = false;
			})
			.addCase(createNewOrder.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
			})
			.addCase(createNewOrder.rejected, (state) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
			});
	},
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
