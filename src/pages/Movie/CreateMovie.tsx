import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { showToast } from "../../utils/showToast";
import { createMovie } from "../../features/movies/moviesThunk";
import { clearMessages } from "../../features/movies/moviesSlice";

const CreateMovie = () => {
    const dispatch = useAppDispatch();

    const { loading, successMessage, error, event } = useAppSelector((state) => state.movies);

    const [form, setForm] = useState({
        title: "",
        genre: "",
        duration: "",
        rating: "",
        releaseDate: "",
        description: "",
        posterUrl: "",
    });

    useEffect(() => {
        if (event === "fetch") return;

        if (successMessage) {
            showToast("Movie created successfully!", "success");
            setForm({
                title: "",
                genre: "",
                duration: "",
                rating: "",
                releaseDate: "",
                description: "",
                posterUrl: "",
            });
            dispatch(clearMessages());
        }

        if (error) {
            showToast(error, "error");
            dispatch(clearMessages());
        }
    }, [successMessage, error, dispatch, event]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { title, genre, duration, rating, releaseDate, description, posterUrl } = form;

        if (!title || !genre || !duration || !rating || !releaseDate || !description || !posterUrl) {
            showToast("All fields are required", "error");
            return;
        }

        dispatch(
            createMovie({
                title,
                genre,
                duration: Number(duration),
                rating: Number(rating),
                releaseDate,
                description,
                posterUrl,
            })
        );
    };

    return (
        <div className="w-[95%] md:w-[70%] lg:w-[45%] mx-auto p-6">
            <div className="border border-gray-600 rounded-2xl shadow-xl p-8 space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-100">Add New Movie</h1>
                <p className="text-center text-gray-400">Enter details to add a new movie</p>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Title */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-300">Movie Title</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                            placeholder="Enter movie title"
                        />
                    </div>

                    {/* Genre */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-300">Genre</label>
                        <input
                            type="text"
                            name="genre"
                            value={form.genre}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                            placeholder="e.g. Drama, Action, Comedy"
                        />
                    </div>

                    {/* Duration */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-300">Duration (in minutes)</label>
                        <input
                            type="number"
                            name="duration"
                            value={form.duration}
                            onChange={handleChange}
                            onWheel={(e) => e.currentTarget.blur()}
                            min="0"
                            className="w-full p-3 rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                        />
                    </div>

                    {/* Rating */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-300">Rating (out of 10)</label>
                        <input
                            type="number"
                            name="rating"
                            value={form.rating}
                            onChange={handleChange}
                            onWheel={(e) => e.currentTarget.blur()}
                            step="0.1"
                            min="0"
                            max="10"
                            className="w-full p-3 rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                        />
                    </div>

                    {/* Release Date */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-300">Release Date</label>
                        <input
                            type="datetime-local"
                            name="releaseDate"
                            value={form.releaseDate}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-300">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full p-3 rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                            placeholder="Enter short movie description"
                        ></textarea>
                    </div>

                    {/* Poster URL */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-300">Poster</label>
                        <input
                            type="text"
                            name="posterUrl"
                            value={form.posterUrl}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                            placeholder="Paste image URL"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={event === 'create' && loading}
                        className="w-full py-3 cursor-pointer rounded-lg bg-green-500 hover:bg-green-600 font-semibold text-white transition disabled:opacity-60"
                    >
                        {event === 'create' && loading ? "Creating..." : "Create Movie"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default CreateMovie;
