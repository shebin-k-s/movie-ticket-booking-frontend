import type { BaseResponse } from "../../redux/commonTypes/commonTypes";

export interface MoviesState {
    movies: Movie[];
    loading: boolean;
    error: string | null;
    success:boolean;


}


export interface Movie {
    movieId: string,
    title: string,
    genre: string,
    releaseDate: string,
    duration: 181,
    rating: string,
    description: string,
    posterUrl: string,
}



// ------ API RESPONSE TYPES ------
export interface MovieResponse extends BaseResponse {
    movies: Movie[]
}