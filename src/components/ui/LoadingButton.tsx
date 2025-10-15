type Props = {
    loading: boolean;
    text: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
};

const LoadingButton = ({ loading, text, onClick, type = "submit" }: Props) => {
    return (
        <button
            type={type}
            disabled={loading}
            onClick={onClick}
            className={`mt-4 bg-green-500 text-white font-semibold py-3 rounded-lg transition-colors flex justify-center items-center gap-2
        ${loading
                    ? "cursor-not-allowed"
                    : " hover:bg-green-600 cursor-pointer"
                }`}
        >
            {loading && (
                <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                </svg>
            )}
            {loading ? "Processing..." : text}
        </button>
    );
};

export default LoadingButton;
