import type { BaseResponse } from "../../redux/commonTypes/commonTypes";
import type { Show } from "../movieDetail/movieDetailTypes";
import type { Seat } from "../seats/seatsTypes";

export interface ticketsState {
    tickets: Ticket[];
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}


export interface Ticket {
    bookingId: string;
    paymentStatus: PaymentStatus;
    confirmedAt: string;
    seats: Seat[]
    totalAmount: number;
    show: Show
}

export const PaymentStatus = {
    PENDING: 'pending',
    FAILED: 'failed',
    SUCCESS: 'success',
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];


//---------API RESPONSE --------

export interface TicketResponse extends BaseResponse {
    bookings: Ticket[]
}