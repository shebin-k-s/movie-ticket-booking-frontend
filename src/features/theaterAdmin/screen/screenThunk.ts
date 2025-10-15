import { createAsyncThunk } from "@reduxjs/toolkit";
import { ScreenApi } from "../../../api/endpoints/screenApi";
import type { MyScreensResponse } from "./screenType";

export const fetchMyScreens = createAsyncThunk<
    MyScreensResponse,
    void,
    { rejectValue: string }
>(
    "screens/fetchMyScreens",
    async (_, thunkApi) => {
        try {
            return await ScreenApi.fetchMyScreens();
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);
