import MovieCard from './components/MovieCard'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { fetchMovies } from '../../features/movies/moviesThunk'
import { clearSelectedMovie } from '../../features/movieDetail/movieDetailSlice'

type Props = {}

const Home = ({ }: Props) => {

    const { movies, loading, success } = useAppSelector(state => state.movies)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!success) {
            dispatch(fetchMovies())
        }

    }, [loading])

    useEffect(() => {
        dispatch(clearSelectedMovie());
    }, [dispatch]);
    return (
        <div className="flex-1 flex flex-col w-ful">
            <div className='flex items-center justify-center mb-10'>
                <h1 className='text-white font-bold text-3xl'>Now Showing</h1>

            </div>

            {loading ? (
                <div className="flex flex-1 justify-center items-center mb-20">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : movies.length === 0 ? (
                <div className="flex flex-1 justify-center items-center mb-20 text-white">
                    No movies available
                </div>
            ) : (
                <div className="max-w-7xl mx-auto px-4 gap-10 grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {movies.map(movie => (
                        <MovieCard key={movie.movieId} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home