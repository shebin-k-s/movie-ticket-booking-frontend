import type { BaseResponse } from "../../redux/commonTypes/commonTypes";

export interface MoviesState {
    movies: Movie[];
    loading: boolean;
    error: string | null;
    success: boolean;
    event: 'fetch' | 'create' | null;
    successMessage: string | null;


}


export interface Movie {
    movieId?: string,
    title: string,
    genre: string,
    releaseDate: string,
    duration: number,
    rating: number,
    description: string,
    posterUrl: string,
}



// ------ API RESPONSE TYPES ------
export interface MovieResponse extends BaseResponse {
    movies: Movie[]
}