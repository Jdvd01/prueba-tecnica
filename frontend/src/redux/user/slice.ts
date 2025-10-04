import { AxiosError } from "axios";
import type {
	UserData,
	UserInitialState,
	UsersWithPagination,
	UserFromApi,
	GetAllUsersParameters,
} from "@/types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./service";
import { generateErrorToast, generateSuccessToast } from "@/lib/utils";

const paginationDefault = {
	page: 1,
	pages: 1,
	per_page: 9,
	total: 0,
};

const userDefault = {
	id: "",
	created_at: "",
	name: "",
	email: "",
};

const initialState: UserInitialState = {
	user: userDefault,
	users: [],
	pagination: paginationDefault,
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: { error: "" },
};

export const getAllUsers = createAsyncThunk<
	UsersWithPagination,
	GetAllUsersParameters,
	{ rejectValue: string }
>("user/getAllUsers", async (data: GetAllUsersParameters, thunkAPI) => {
	try {
		return await userService.getAllUsers(data);
	} catch (err) {
		let message: string;

		if (err instanceof AxiosError && err.response) {
			message = err.response.data?.error || err.message;
		} else if (err instanceof Error) {
			message = err.message;
		} else {
			message = String(err);
		}

		return thunkAPI.rejectWithValue(message);
	}
});

export const createNewUser = createAsyncThunk(
	"user/createNewUser",
	async (userData: UserData, thunkAPI) => {
		try {
			await userService.createNewUser(userData);
			generateSuccessToast({ title: "Usuario creado", description: "" });
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

export const getUserWithOrders = createAsyncThunk<
	{ user: UserFromApi },
	string,
	{ rejectValue: string }
>("user/getUserWithOrders", async (id: string, thunkAPI) => {
	try {
		return await userService.getUserWithOrders(id);
	} catch (err) {
		let message: string;

		if (err instanceof AxiosError && err.response) {
			message = err.response.data?.message || err.message;
		} else if (err instanceof Error) {
			message = err.message;
		} else {
			message = String(err);
		}

		return thunkAPI.rejectWithValue(message);
	}
});

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		reset: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			// Traer todos los usuarios
			.addCase(getAllUsers.pending, (state) => {
				state.isLoading = true;
				state.isSuccess = false;
				state.isError = false;
			})
			.addCase(getAllUsers.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.users = action.payload.users;
				state.pagination = action.payload.pagination;
			})
			.addCase(getAllUsers.rejected, (state) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
			})

			// Crear nuevo usuario
			.addCase(createNewUser.pending, (state) => {
				state.isLoading = true;
				state.isSuccess = false;
				state.isError = false;
			})
			.addCase(createNewUser.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
			})
			.addCase(createNewUser.rejected, (state) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
			})

			// Traer usuario especifico con ordenes
			.addCase(getUserWithOrders.pending, (state) => {
				state.isLoading = true;
				state.isSuccess = false;
				state.isError = false;
			})
			.addCase(getUserWithOrders.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.user = action.payload.user;
			})
			.addCase(getUserWithOrders.rejected, (state) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
			});
	},
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
