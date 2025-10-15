import type { BaseResponse } from "../../redux/commonTypes/commonTypes";

export interface SeatState {
    seatsData: Seats | null;
    selectedSeats: Seat[];
    loading: boolean;
    success: boolean;
    error: string | null;
    showId: string | null;
};



export interface seatUpdatePayload {
    showId: string,
    seatIds: string[],
    isBooked: boolean,
    isLocked: boolean

}


// ---------- API RESPONSE ----------

export interface SeatsResponse extends BaseResponse {

    seats: Seats;
};

export interface Seats {

    [typeName: string]: SeatType;
};



export interface SeatType {
    price: number;
    seats: Seat[];
};

export interface Seat {
    seatId: string;
    row: string;
    number: number;
    positionX: number;
    positionY: number;
    status: "AVAILABLE" | "BOOKED";
    isLocked: boolean;
    price: number
};