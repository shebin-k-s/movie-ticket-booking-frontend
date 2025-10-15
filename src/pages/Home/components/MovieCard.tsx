import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { setSelectedMovie } from "../../../features/movieDetail/movieDetailSlice";
import type { Movie } from "../../../features/movies/moviesTypes";

type Props = {
    movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    
    return (
        <div
            onClick={() => {
                dispatch(setSelectedMovie(movie))

                navigate('/movie-detail')
            }
            }
            className="w-[250px] h-[408px] cursor-pointer transform transition-transform duration-300 hover:scale-104">
            <div className="h-22/24 rounded-2xl">
                <img
                    src={movie.posterUrl}
                    alt="movie-img"
                    className='w-full h-full object-fill rounded-xl'
                />

            </div>
            <div className="flex items-center justify-center h-2/24">
                <h2 className="text-white font-bold">
                    {movie.title}
                </h2>

            </div>
        </div>
    )
}

export default MovieCard