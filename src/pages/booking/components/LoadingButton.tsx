import React from "react";

type LoadingButtonProps = {
    text: string;
    loadingText?: string;
    loading?: boolean;
    onClick: () => void;
    disabled?: boolean;
    color?: "red" | "green" | "blue" | "gray";
};

const colorClasses: Record<string, string> = {
    red: "bg-red-600 hover:bg-red-700",
    green: "bg-green-600 hover:bg-green-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    gray: "bg-gray-600 hover:bg-gray-700",
};

const LoadingButton: React.FC<LoadingButtonProps> = ({
    text,
    loadingText,
    loading = false,
    onClick,
    disabled = false,
    color = "blue",
}) => {
    return (
        <button
            className={`px-6 py-3 text-white font-semibold rounded-xl shadow-lg transition
        flex items-center justify-center gap-2 cursor-pointer
        ${colorClasses[color]}
        loading:opacity-50 disabled:cursor-not-allowed
      `}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading && (
                <svg
                    className="w-5 h-5 animate-spin"
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
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    ></path>
                </svg>
            )}
            {loading ? loadingText || text : text}
        </button>
    );
};

export default LoadingButton;
