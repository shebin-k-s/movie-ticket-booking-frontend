import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TicketResponse } from "./ticketsType";
import { TicketApi } from "../../api/endpoints/ticketsApi";


export const fetchMyTickets = createAsyncThunk<
    TicketResponse,
    void,
    { rejectValue: string }
>("tickets/fetchMyTikets",
    async (_, thunkApi) => {

        try {

            return await TicketApi.fetchMyTickets()

        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)