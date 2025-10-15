import type { InitiateBookingPayload, InitiateBookingResponse, InitiatePaymentPayload, InitiatePaymentResponse } from "../../features/booking/bookingType";
import type { BaseResponse } from "../../redux/commonTypes/commonTypes";
import { API_ROUTES } from "../core/apiRoutes";
import axiosInstance from "../core/axiosInstance";

export class BookingApi {

    static initiateBooking = async (payload: InitiateBookingPayload): Promise<InitiateBookingResponse> => {
        try {
            const response = await axiosInstance.post(API_ROUTES.BOOKING.INITIATE_BOOKING, payload);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Failed to initiate booking');
        }
    };

    static cancelBooking = async (bookingId: string): Promise<BaseResponse> => {
        try {
            const response = await axiosInstance.post(API_ROUTES.BOOKING.CANCEL_BOOKING, { bookingId });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Failed to cancel booking');
        }
    };

    static initiatePayment = async (payload: InitiatePaymentPayload): Promise<InitiatePaymentResponse> => {
        try {
            const response = await axiosInstance.post(API_ROUTES.PAYMENT.INITIATE_PAYMENT, payload);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Failed to initiate payment');
        }
    };

    // static confirmBooking = async (bookingId: string): Promise<BaseResponse> => {
    //     try {
    //         const response = await axiosInstance.post(API_ROUTES.BOOKING.CONFIRM_BOOKING, { bookingId });
    //         return response.data;
    //     } catch (error: any) {
    //         throw new Error(error.response?.data?.message || 'Failed to confirm booking');
    //     }
    // };
}
