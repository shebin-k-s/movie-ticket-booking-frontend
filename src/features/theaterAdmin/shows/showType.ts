import type { BaseResponse } from "../../../redux/commonTypes/commonTypes";
import type { Show } from "../../movieDetail/movieDetailTypes";


export interface ShowsState {
    showsByDate: ShowsByDate | null;
    loading: boolean;
    error: string | null;
    success: boolean;
    successMessage: string | null;
    screenId: string | null;
    event: 'create' | 'fetch' | null;
}





// ------- API REQUEST -------

export interface CreateShowPayload {
    movieId: string;
    screenId: string;
    startTime: string;
    basePrice: number;
}




// ------- API RESPONSE -------

export interface ScreenShowsResponse extends BaseResponse {
    showsByDate: ShowsByDate

}


export interface ShowsByDate {
    [date: string]: Show[];
}