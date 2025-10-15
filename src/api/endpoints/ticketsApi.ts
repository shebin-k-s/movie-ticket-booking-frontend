import type { TicketResponse } from "../../features/tickets/ticketsType";
import { API_ROUTES } from "../core/apiRoutes";
import axiosInstance from "../core/axiosInstance";


export class TicketApi {
    static fetchMyTickets = async (): Promise<TicketResponse> => {
        try {

            const response = await axiosInstance.get(API_ROUTES.TICKETS.MY_TICKETS);

            return response.data
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Failed to fetch tickets")
        }
    }
}