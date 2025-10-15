import type { CreateTheaterPayload } from "../../pages/CreateTheater";
import type { BaseResponse } from "../../redux/commonTypes/commonTypes";
import { API_ROUTES } from "../core/apiRoutes";
import axiosInstance from "../core/axiosInstance";

export class TheaterApi {

    static createTheater = async (payload: CreateTheaterPayload): Promise<BaseResponse> => {
        try {
            const response = await axiosInstance.post(API_ROUTES.THEATER.CREATE, payload);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Failed to create theater');
        }
    };

    
}
