import type { SeatsResponse } from "../../features/seats/seatsTypes";
import { API_ROUTES } from "../core/apiRoutes";
import axiosInstance from "../core/axiosInstance";

export class SeatsApi {

    static fetchSeats = async (showId: string): Promise<SeatsResponse> => {
        try {
            const response = await axiosInstance.get(API_ROUTES.SEATS.FETCH_SEATS(showId));
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Failed to fetch seats');
        }
    };
}
