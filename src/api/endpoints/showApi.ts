import type { FetchShowsResponse } from "../../features/movieDetail/movieDetailTypes";
import type { CreateShowPayload } from "../../features/theaterAdmin/shows/showType";
import type { BaseResponse } from "../../redux/commonTypes/commonTypes";
import { API_ROUTES } from "../core/apiRoutes";
import axiosInstance from "../core/axiosInstance";

export class ShowApi {

    static fetchShowsByMovie = async (movieId: string): Promise<FetchShowsResponse> => {
        try {
            const response = await axiosInstance.get(API_ROUTES.SHOWS.FETCH_BY_MOVIES(movieId));
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Failed to fetch shows');
        }
    };

    static createShow = async (payload: CreateShowPayload): Promise<BaseResponse> => {
        try {
            const response = await axiosInstance.post(API_ROUTES.SHOWS.CREATE_SHOW, payload);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Failed to create show');
        }
    };
}
