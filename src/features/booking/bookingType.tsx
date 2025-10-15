import type { BaseResponse } from "../../redux/commonTypes/commonTypes";
import type { Seat } from "../seats/seatsTypes";

export type BookingState = {
    bookingId: string | null;
    totalAmount: number;
    seats: Seat[];
    loading: boolean;
    event: "cancel" | "continue" | null;
    error: string | null;
    successMessage: string | null;
    paymentOrder: any
};



//------ API PAYLOAD -----
export interface InitiateBookingPayload {
    showId: string;
    seatIds: string[]
}

export interface InitiatePaymentPayload {
    bookingId: string;
    amount: number;
}





//-------API RESPONSE -------

export interface InitiateBookingResponse extends BaseResponse {

    bookingId: string;
    seats: Seat[];
    totalAmount: number;
}

export interface InitiatePaymentResponse extends BaseResponse {
    paymentOrder: any
}