import type { MovieResponse } from "../../features/movies/moviesTypes";
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
}
