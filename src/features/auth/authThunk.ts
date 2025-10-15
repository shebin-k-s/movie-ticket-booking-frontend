import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from "./authTypes";
import { AuthApi } from "../../api/endpoints/authApi";

export const loginUser = createAsyncThunk<
    LoginResponse,
    LoginPayload
>(
    "auth/loginUser",
    async (payload, thunkApi) => {
        try {
            return await AuthApi.loginUser(payload)
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message)
        }

    }
);

export const registerUser = createAsyncThunk<
    RegisterResponse,
    RegisterPayload
>(
    "auth/registerUser",
    async (payload, thunkApi) => {
        try {
            return await AuthApi.registerUser(payload)
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message)
        }

    }
)