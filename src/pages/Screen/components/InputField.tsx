import React from "react";

type Props = {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    type?: "text" | "number";
    label?: string;
    min?: number;
};

const InputField: React.FC<Props> = ({ value, onChange, placeholder, type = "text", label, min }) => {
    return (
        <div className="mb-3">
            {label && <label className="block text-sm mb-1 text-gray-300">{label}</label>}
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                min={type === "number" ? min : undefined}
                onWheel={(e) => e.currentTarget.blur()}
                className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

        </div>
    );
};

export default InputField;
