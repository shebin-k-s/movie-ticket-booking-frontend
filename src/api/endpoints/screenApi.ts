import type { MyScreensResponse } from "../../features/theaterAdmin/screen/screenType";
import type { ScreenShowsResponse } from "../../features/theaterAdmin/shows/showType";
import type { BaseResponse } from "../../redux/commonTypes/commonTypes";
import { API_ROUTES } from "../core/apiRoutes";
import axiosInstance from "../core/axiosInstance";

export class ScreenApi {

    static createScreen = async (payload: any): Promise<BaseResponse> => {
        try {
            const response = await axiosInstance.post(API_ROUTES.SCREENS.CREATE_SCREEN, payload);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Failed to create screens');
        }
    };

    static fetchMyScreens = async (): Promise<MyScreensResponse> => {
        try {
            const response = await axiosInstance.get(API_ROUTES.SCREENS.MY_SCREENS);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Failed to fetch screens');
        }
    };

    static fetchShows = async (screenId: string): Promise<ScreenShowsResponse> => {
        try {
            const response = await axiosInstance.get(API_ROUTES.SCREENS.SHOWS(screenId));
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Failed to fetch shows');
        }
    };
}
