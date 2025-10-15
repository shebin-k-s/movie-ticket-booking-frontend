import { createAsyncThunk } from "@reduxjs/toolkit";
import { ScreenApi } from "../../../api/endpoints/screenApi";
import type { CreateShowPayload, ScreenShowsResponse } from "./showType";
import type { BaseResponse } from "../../../redux/commonTypes/commonTypes";
import { ShowApi } from "../../../api/endpoints/showApi";



export const fetchScreenShows = createAsyncThunk<
    ScreenShowsResponse,
    string,
    { rejectValue: string }
>(
    "shows/fetchMyScreens",
    async (screenId, thunkApi) => {
        try {
            return await ScreenApi.fetchShows(screenId);
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const createShow = createAsyncThunk<
    BaseResponse,
    CreateShowPayload,
    { rejectValue: string }
>(
    "shows/createShow",
    async (payload, thunkApi) => {
        try {
            return await ShowApi.createShow(payload);
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);