import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchMyScreens } from "../features/theaterAdmin/screen/screenThunk";
import type { Screen } from "../features/movieDetail/movieDetailTypes";
import { showToast } from "../utils/showToast";
import { clearScreenMessage } from "../features/theaterAdmin/screen/screenSlice";

const TheaterAdminHome = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { theater, user } = useAppSelector((state) => state.auth);
    const { screens, loading, error, success } = useAppSelector((state) => state.screens);

    useEffect(() => {
        if (!loading && !success) {
            dispatch(fetchMyScreens());
        }
    }, [theater, dispatch]);

    useEffect(() => {
        if (error) {
            showToast(error, "error")
        }
        dispatch(clearScreenMessage());
    }, [error]);

    const handleCreateScreen = () => {
        navigate("/screens/create");
    };

    const handleViewScreen = (screen: Screen) => {
        navigate(`/screens/shows`, { state: { screen } });
    };

    if (!theater) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 max-w-md text-center">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">No Theater Found</h2>
                    <p className="text-gray-400">Please contact the system administrator for assistance.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
                        Welcome back, {user?.name}
                    </h1>
                    <p className="text-gray-400 text-lg">Manage your theater and screens</p>
                </div>

                {/* Theater Info Card */}
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 md:p-8 mb-8 shadow-2xl hover:shadow-blue-900/20 transition-all duration-300">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white">{theater.name}</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                <div className="flex items-center gap-2 text-gray-300">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-sm">{theater.location || "N/A"}</span>
                                </div>

                                <div className="flex items-center gap-2 text-gray-300">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    <span className="text-sm">{theater.city || "N/A"}</span>
                                </div>

                                <div className="flex items-center gap-2 text-gray-300">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                    </svg>
                                    <span className="text-sm font-semibold">{screens.length} Screen{screens.length !== 1 ? 's' : ''}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleCreateScreen}
                            className="cursor-pointer bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-green-900/50 transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
                        >
                            <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add New Screen
                        </button>
                    </div>
                </div>

                {/* Screens Section */}
                <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                        Your Screens
                    </h3>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-400 text-lg">Loading screens...</p>
                        </div>
                    </div>
                ) : screens.length === 0 ? (
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 border-dashed rounded-2xl p-12 text-center">
                        <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                            </svg>
                        </div>
                        <h4 className="text-xl font-semibold text-white mb-2">No Screens Yet</h4>
                        <p className="text-gray-400 mb-6">Get started by adding your first screen</p>
                        <button
                            onClick={handleCreateScreen}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 inline-flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Create Screen
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {screens.map((screen) => (
                            <div
                                key={screen.screenId}
                                onClick={() => handleViewScreen(screen)}
                                className="group bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700 hover:border-blue-500/15 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/30 transform hover:scale-101 hover:-translate-y-1"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-102 transition-transform duration-300">
                                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                        </svg>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>

                                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                                    {screen.name}
                                </h4>

                                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                    Click to manage shows and bookings
                                </p>

                                <div className="mt-4 pt-4 border-t border-gray-700 group-hover:border-gray-600 transition-colors duration-300">
                                    <div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-blue-400 transition-colors duration-300">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        View Details
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TheaterAdminHome;