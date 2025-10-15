import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { showToast } from "../../utils/showToast";
import { fetchMovies } from "../../features/movies/moviesThunk";
import { fetchMyScreens } from "../../features/theaterAdmin/screen/screenThunk";
import { createShow } from "../../features/theaterAdmin/shows/showThunk";
import { clearShowsMessage } from "../../features/theaterAdmin/shows/showSlice";

const CreateShow = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const screen = location.state?.screen;
    const screenId = screen?.screenId;

    const { movies, loading: movieLoading, success: movieSuccess } = useAppSelector((state) => state.movies);
    const { screens, loading: screenLoading, success: screenSuccess } = useAppSelector((state) => state.screens);
    const { loading, successMessage, error, event } = useAppSelector((state) => state.shows);

    const [form, setForm] = useState({
        movieId: "",
        screenId: screenId || "",
        startTime: "",
        basePrice: "",
    });

    useEffect(() => {
        if (!movieSuccess) dispatch(fetchMovies());
        if (!screenId && !screenSuccess) dispatch(fetchMyScreens());
    }, [dispatch, movieSuccess, screenSuccess, screenId]);

    useEffect(() => {
        if (event === 'fetch') return;
        if (successMessage) {
            setForm({ movieId: '', screenId: '', startTime: '', basePrice: '' });
            showToast("Show created successfully!", "success");
            dispatch(clearShowsMessage());
        }
        if (error) {
            showToast(error, "error");
            dispatch(clearShowsMessage());

        }
    }, [successMessage, error, dispatch, event]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { movieId, screenId, startTime, basePrice } = form;

        if (!movieId || !screenId || !startTime || !basePrice) {
            showToast("All fields are required", "error");
            return;
        }

        dispatch(
            createShow({
                movieId,
                screenId,
                startTime: new Date(startTime).toISOString(),
                basePrice: Number(basePrice),
            })
        );
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="border border-gray-600 rounded-2xl shadow-xl p-8 space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-100">Create New Show</h1>
                <p className="text-center text-gray-400">Fill in the details below to schedule a new show</p>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Movie */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-300">Select Movie</label>
                        <select
                            name="movieId"
                            value={form.movieId}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                        >
                            <option value="">Select a movie</option>
                            {movieLoading ? (
                                <option disabled>Loading movies...</option>
                            ) : (
                                movies.map((m) => (
                                    <option key={m.movieId} value={m.movieId}>
                                        {m.title}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>

                    {/* Screen */}
                    {!screenId && (
                        <div className="flex flex-col">
                            <label className="mb-1 font-semibold text-gray-300">Select Screen / Hall</label>
                            <select
                                name="screenId"
                                value={form.screenId}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                            >
                                <option value="">Select a screen</option>
                                {screenLoading ? (
                                    <option disabled>Loading screens...</option>
                                ) : (
                                    screens.map((s) => (
                                        <option key={s.screenId} value={s.screenId}>
                                            {s.name}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                    )}

                    {screenId && screen && (
                        <div className="flex flex-col">
                            <label className="mb-1 font-semibold text-gray-300">Screen</label>
                            <div className="w-full p-3 rounded-lg border border-gray-700 text-white">{screen.name}</div>
                        </div>
                    )}

                    {/* Start Time */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-300">Start Time</label>
                        <input
                            type="datetime-local"
                            name="startTime"
                            value={form.startTime}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                        />
                    </div>

                    {/* Base Price */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-300">Base Price (₹)</label>
                        <input
                            type="number"
                            name="basePrice"
                            value={form.basePrice}
                            onChange={handleChange}
                            onWheel={(e) => e.currentTarget.blur()}
                            min="0"
                            className="w-full p-3 rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 cursor-pointer rounded-lg bg-green-500 hover:bg-green-600 font-semibold text-white transition disabled:opacity-60"
                    >
                        {loading ? "Creating..." : "Create Show"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default CreateShow;
