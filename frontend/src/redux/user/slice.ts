import { AxiosError } from "axios";
import type { UserInitialState } from "@/types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./service";

const paginationDefault = {
	page: 1,
	pages: 1,
	per_page: 9,
	total: 0,
};

const initialState: UserInitialState = {
	users: [],
	pagination: paginationDefault,
	isLoading: false,
	isSuccess: false,
	isError: false,
};

export const getAllUsers = createAsyncThunk(
	"user/getAllUsers",
	async (page: number, thunkAPI) => {
		try {
			return await userService.getAllUsers(page);
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
			});
	},
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
