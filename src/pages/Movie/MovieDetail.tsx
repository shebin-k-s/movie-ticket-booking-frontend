import MovieCard from "../Home/components/MovieCard";
import DateCard from "./components/DateCard";
import TheaterCard from "./components/TheaterCard";
import TimeCard from "./components/TimeCard";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useEffect } from "react";
import { fetchShowsByMovie } from "../../features/movieDetail/movieDetailThunk";
import SeatSelection from "./components/SeatSelection";

import {
    setSelectedDate,
    setSelectedScreen,
    setSelectedShow,
    setSelectedTheater,
} from "../../features/movieDetail/movieDetailSlice";
import ScreenCard from "./components/ScreenCard";

const MovieDetail = () => {
    const { selectedTheater, selectedScreen, selectedDate, selectedShow } =
        useAppSelector((state) => state.movieDetail);

    const { selectedMovie, theaters, loading } = useAppSelector(
        (state) => state.movieDetail
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (selectedMovie) {
            dispatch(fetchShowsByMovie(selectedMovie.movieId??''));
        }
    }, [selectedMovie]);

    

    if (!selectedMovie) {
        return (
            <div className="flex flex-1 justify-center items-center h-full text-white text-xl mb-40">
                No movie selected
            </div>
        );
    }
    console.log("movie rendering");
    

    return (
        <div>
            <div className="flex flex-col-reverse md:flex-row m-5 gap-10">
                <div className="md:w-7/12 flex flex-col gap-3 md:gap-8">
                    {/* --- Theaters --- */}
                    <div>
                        <h2 className="font-medium text-white text-3xl mb-4">
                            Theaters
                        </h2>
                        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                            {loading ? (
                                <div className="w-8 h-8 ml-7 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : theaters.length === 0 ? (
                                <div className="text-gray-400 text-lg ml-7 py-2">
                                    No theaters available
                                </div>
                            ) : (
                                theaters.map((theater) => (
                                    <TheaterCard
                                        key={theater.theaterId}
                                        theater={theater}
                                        selected={
                                            selectedTheater?.theaterId ===
                                            theater.theaterId
                                        }
                                        onClick={() =>
                                            dispatch(setSelectedTheater(theater))
                                        }
                                    />
                                ))
                            )}
                        </div>
                    </div>

                    {/* --- Screens --- */}
                    {selectedTheater && (
                        <div>
                            <h2 className="font-medium text-white text-3xl mb-4">
                                Screens
                            </h2>
                            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                                {selectedTheater.screens.map((screen) => (
                                    <ScreenCard
                                        key={screen.screenId}
                                        screen={screen}
                                        selected={
                                            selectedScreen?.screenId ===
                                            screen.screenId
                                        }
                                        onClick={() =>
                                            dispatch(setSelectedScreen(screen))
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- Dates --- */}
                    {selectedScreen && (
                        <div>
                            <h2 className="font-medium text-white text-3xl mb-4">
                                Dates
                            </h2>
                            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                                {selectedScreen.dates.map((d) => (
                                    <DateCard
                                        key={d.date}
                                        date={d.date}
                                        selected={selectedDate === d.date}
                                        onClick={() =>
                                            dispatch(setSelectedDate(d.date))
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- Times --- */}
                    {selectedScreen && selectedDate && (
                        <div>
                            <h2 className="font-medium text-white text-3xl mb-4">
                                Times
                            </h2>
                            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                                {selectedScreen.dates
                                    .find((d) => d.date === selectedDate)
                                    ?.shows.map((show) => (
                                        <TimeCard
                                            key={show.showId}
                                            show={show}
                                            selected={
                                                selectedShow?.showId ===
                                                show.showId
                                            }
                                            onClick={() =>
                                                dispatch(setSelectedShow(show))
                                            }
                                        />
                                    ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* --- Movie Info Sidebar --- */}
                <div className="md:w-5/12 flex flex-col items-center gap-6 mt-10 md:mt-0">
                    <MovieCard key={selectedMovie?.movieId} movie={selectedMovie} />
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3 sm:p-4 shadow-xl">
                        <h1 className="font-bold text-lg sm:text-xl text-white mb-2 leading-tight">
                            {selectedMovie.title}
                        </h1>
                        <p className="text-gray-300 text-xs leading-relaxed mb-3">
                            {selectedMovie.description}
                        </p>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between py-2 border-b border-gray-700/50">
                                <span className="text-gray-400 text-xs font-medium">
                                    Release Date
                                </span>
                                <span className="text-white text-xs font-semibold">
                                    {selectedMovie.releaseDate}
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-700/50">
                                <span className="text-gray-400 text-xs font-medium">
                                    Duration
                                </span>
                                <span className="text-white text-xs font-semibold">
                                    {selectedMovie.duration} min
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-gray-400 text-xs font-medium">
                                    Genre
                                </span>
                                <span className="text-white text-xs font-semibold">
                                    {selectedMovie.genre}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Seat Selection --- */}
            <div className="flex items-center">
                {selectedScreen && selectedDate && selectedShow && (
                    <div className="mx-auto p-5 overflow-x-auto">
                        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-lg p-4 shadow-2xl w-min">
                            <div className="text-center mb-4">
                                <h2 className="text-xl font-bold text-white mb-2">
                                    Select Your Seats
                                </h2>
                                <p className="text-gray-400 text-sm">
                                    Choose your preferred seating
                                </p>
                            </div>
                            <SeatSelection showId={selectedShow.showId} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieDetail;
