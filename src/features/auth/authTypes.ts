import type { BaseResponse, User } from "../../redux/commonTypes/commonTypes";
import type { Theater } from "../movieDetail/movieDetailTypes";

// ------- SLICE TYPE ----------
export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    success: boolean;
    theater: Theater | null;
    successMessage: string | null;
}




// ----- API REQUEST TYPES ----- 

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}


// ------ API RESPONSE TYPES ------
export interface LoginResponse extends BaseResponse {
    user: User;
    theater: Theater;
    accessToken: string;
    refreshToken: string;
}
export interface RegisterResponse extends BaseResponse {
}