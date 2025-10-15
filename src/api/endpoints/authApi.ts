import type { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from "../../features/auth/authTypes";
import { API_ROUTES } from "../core/apiRoutes";
import axiosInstance from "../core/axiosInstance";

export class AuthApi {

    static loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
        try {
            const response = await axiosInstance.post(API_ROUTES.AUTH.LOGIN, payload);
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message || "Failed to login";
            throw new Error(message);
        }
    };

    static registerUser = async (payload: RegisterPayload): Promise<RegisterResponse> => {
        try {
            const response = await axiosInstance.post(API_ROUTES.AUTH.REGISTER, payload);
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message ?? "Failed to Register";
            throw new Error(message);
        }
    };
}
