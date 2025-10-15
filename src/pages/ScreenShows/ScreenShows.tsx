import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchScreenShows } from "../../features/theaterAdmin/shows/showThunk";
import type { Screen, Show } from "../../features/movieDetail/movieDetailTypes";
import { clearSeatStates } from "../../features/seats/seatsSlice";

interface LocationState {
    screen: Screen;
}

const ScreenShowsPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { showsByDate, loading, screenId } = useAppSelector(state => state.shows);
    const { showId: reduxShowId } = useAppSelector(state => state.seats);

    const location = useLocation();
    const screen = (location.state as LocationState)?.screen;

    useEffect(() => {
        if (screen && !loading && screen.screenId !== screenId) {
            dispatch(fetchScreenShows(screen.screenId));
        }
    }, [dispatch, screen, loading]);

    const handleViewSeats = (showId: string) => {
        if (reduxShowId !== showId) {
            dispatch(clearSeatStates());
        }
        navigate(`/shows/seats`, { state: { showId } });
    };

    // if (loading) {
    //     return (
    //         <div className="flex flex-col flex-1 items-center justify-center gap-4">
    //             <div className="relative">
    //                 <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
    //                 <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500/20 border-b-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
    //             </div>
    //             <p className="text-lg text-gray-300 font-medium">Loading shows...</p>
    //         </div>
    //     );
    // }

    const hasShows = showsByDate && Object.keys(showsByDate).length > 0;

    return (
        <div className=" px-4 py-8 md:py-12">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="group cursor-pointer flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors duration-300"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-md font-medium">Back</span>
                    </button>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                Shows Schedule
                            </h1>
                            <div className="flex items-center gap-2 text-gray-400">
                                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                    </svg>
                                </div>
                                <span className="text-lg font-semibold text-gray-300">{screen?.name}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate("/screens/shows/create", { state: { screen } })}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 cursor-pointer text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-green-900/50 transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
                        >
                            <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Create Show
                        </button>
                    </div>
                </div>

                {loading ? (<div className="flex flex-col flex-1 items-center  justify-center gap-4">
                    <div className="flex items-center justify-center py-16">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-400 text-lg">Loading shows...</p>
                        </div>
                    </div>
                </div>)
                    :
                    !hasShows ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 border-dashed rounded-2xl p-12 text-center max-w-md">
                                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">No Shows Scheduled</h2>
                                <p className="text-gray-400 mb-6">Start by creating your first show for this screen</p>
                                <button
                                    onClick={() => navigate("/screens/shows/create", { state: { screen } })}
                                    className="bg-blue-600 hover:bg-blue-500 cursor-pointer text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 inline-flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Create First Show
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-10">
                            {Object.entries(showsByDate).map(([date, shows]) => (
                                <div key={date} className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-gradient-to-r from-indigo-900 to-blue-900 px-5 py-2 rounded-xl shadow-lg">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span className="text-white font-bold text-lg">{date}</span>
                                            </div>
                                        </div>
                                        <div className="bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700">
                                            <span className="text-gray-300 text-sm font-medium">{shows.length} Show{shows.length !== 1 ? 's' : ''}</span>
                                        </div>
                                        <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
                                    </div>

                                    {/* Shows Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {shows.map((show: Show) => (
                                            <div
                                                key={show.showId}
                                                className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700 hover:border-blue-500/15 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-blue-900/15 transition-all duration-300 transform hover:scale-102 hover:-translate-y-1 flex flex-col"
                                            >
                                                {/* Movie Title */}
                                                <div className="mb-4">
                                                    <h3 className="font-bold text-xl text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                                                        {show.movie?.title}
                                                    </h3>
                                                </div>

                                                {/* Show Time */}
                                                <div className="flex items-center gap-2 mb-4 bg-gray-700/50 rounded-lg px-3 py-2">
                                                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4"></path>
                                                            <circle cx="12" cy="12" r="10"></circle>
                                                        </svg>
                                                    </div>
                                                    <span className="font-semibold text-white">
                                                        {new Date(show.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>

                                                {/* Price */}
                                                <div className="flex items-center gap-2 mb-4">
                                                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-3 py-1 rounded-lg border border-green-500/30">
                                                        <span className="font-bold text-green-400">₹{show.basePrice}</span>
                                                    </div>
                                                    <span className="text-gray-400 text-sm">Base Price</span>
                                                </div>

                                                {/* Seat Stats */}
                                                <div className="flex gap-3 mb-5 bg-gray-700/30 rounded-lg p-3">
                                                    <div className="flex-1 flex flex-col items-center">
                                                        <span className="text-gray-300 font-bold text-lg">{show.totalSeats}</span>
                                                        <span className="text-gray-500 text-xs font-medium">Total</span>
                                                    </div>
                                                    <div className="w-px bg-gray-700"></div>
                                                    <div className="flex-1 flex flex-col items-center">
                                                        <span className="text-green-400 font-bold text-lg">{show.bookedSeats}</span>
                                                        <span className="text-gray-500 text-xs font-medium">Booked</span>
                                                    </div>
                                                    <div className="w-px bg-gray-700"></div>
                                                    <div className="flex-1 flex flex-col items-center">
                                                        <span className="text-blue-400 font-bold text-lg">{show.availableSeats}</span>
                                                        <span className="text-gray-500 text-xs font-medium">Available</span>
                                                    </div>
                                                </div>

                                                {/* View Seats Button */}
                                                <button
                                                    onClick={() => handleViewSeats(show.showId)}
                                                    className="mt-auto bg-gradient-to-r from-indigo-900 to-blue-900 hover:from-indigo-900 hover:to-blue-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-900/50 flex items-center justify-center gap-2 group/btn cursor-pointer"
                                                >
                                                    <span>View Seats</span>
                                                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
            </div>
        </div>
    );
};

export default ScreenShowsPage;