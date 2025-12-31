import type { Movie, MovieResponse } from "../../features/movies/moviesTypes";
import type { BaseResponse } from "../../redux/commonTypes/commonTypes";
import { API_ROUTES } from "../core/apiRoutes";
import axiosInstance from "../core/axiosInstance";

export class MovieApi {

    static fetchMovies = async (): Promise<MovieResponse> => {
        try {
            const response = await axiosInstance.get(API_ROUTES.MOVIE.FETCH_MOVIES);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Failed to fetch movies');
        }
    };

    static createMovie = async (payload: Movie): Promise<BaseResponse> => {
        try {

            const response = await axiosInstance.post(API_ROUTES.MOVIE.CREATE_MOVIE, payload);

            return response.data

        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Failed to create movie')
        }
    }
}
