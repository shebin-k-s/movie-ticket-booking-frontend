import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Seat, SeatState, seatUpdatePayload } from "./seatsTypes";
import { fetchSeats } from "./seatsThunk";


const initialState: SeatState = {
    seatsData: null,
    selectedSeats: [],
    loading: false,
    success: false,
    error: null,
    showId: null,
};

const seatSlice = createSlice({
    name: "seats",
    initialState,
    reducers: {
        toggleSeat: (state, action: PayloadAction<Seat>) => {
            const seat = action.payload;
            if (seat.status !== "AVAILABLE") return;
            const existing = state.selectedSeats.find((s) => s.seatId === seat.seatId);
            if (existing)
                state.selectedSeats = state.selectedSeats.filter((s) => s.seatId !== seat.seatId);
            else state.selectedSeats.push(seat);
        },
        updateSeatStatus: (
            state,
            action: PayloadAction<seatUpdatePayload>
        ) => {
            const { seatIds, isBooked, isLocked } = action.payload;

            if (!state.seatsData) return;

            Object.keys(state.seatsData).forEach((typeName) => {
                state.seatsData![typeName].seats = state.seatsData![typeName].seats.map((seat) => {
                    if (seatIds.includes(seat.seatId)) {
                        return {
                            ...seat,
                            status: isBooked ? "BOOKED" : "AVAILABLE",
                            isLocked: isLocked,
                        };
                    }
                    return seat;
                });
            });

            state.selectedSeats = state.selectedSeats.filter((s) => !seatIds.includes(s.seatId))

        },
        clearSelectedSeats: (state) => {
            state.selectedSeats = [];
        },
        clearSeatStates: (state) => {
            state.success = false;
            state.loading = false;
            state.seatsData = null;
            state.selectedSeats = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSeats.pending, (state, action) => {
                state.loading = true;
                state.error = null;

                const showId = action.meta.arg;

                state.showId = showId;
            })
            .addCase(fetchSeats.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true
                state.seatsData = action.payload.seats;

                state.selectedSeats = [];
            })
            .addCase(fetchSeats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to fetch seats";
            });
    },
});

export const { toggleSeat, updateSeatStatus, clearSelectedSeats, clearSeatStates } = seatSlice.actions;
export default seatSlice.reducer;
