import type { BaseResponse } from "../../../redux/commonTypes/commonTypes";
import type { Screen } from "../../movieDetail/movieDetailTypes";


export interface ScreensState {
    screens: Screen[];
    loading: boolean;
    error: string | null;
    success: boolean;
    successMessage: string | null;
}






// ------- API RESPONSE -------
export interface MyScreensResponse extends BaseResponse {
    screens: Screen[]
}
