import { useState } from "react";
import { TheaterApi } from "../api/endpoints/theaterApi";

export interface CreateTheaterPayload {
    name: string;
    location: string;
    city: string;
    state: string;
    email: string;
    password: string;
}

const CreateTheater = () => {
    const [formData, setFormData] = useState<CreateTheaterPayload>({
        name: "",
        location: "",
        city: "",
        state: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = "Theater name is required";
        if (!formData.location.trim()) newErrors.location = "Location is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.state.trim()) newErrors.state = "State is required";

        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";

        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);
        setSuccessMessage("");

        try {
            await TheaterApi.createTheater(formData);

            setSuccessMessage("Theater created successfully!");
            setFormData({
                name: "",
                location: "",
                city: "",
                state: "",
                email: "",
                password: "",
            });
            setErrors({});
        } catch (error: any) {
            setErrors({ general: error.message || "Failed to create theater" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Create Theater</h1>
                    <p className="text-gray-400">Add a new theater to the system</p>
                </div>

                {/* Form Card */}
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {errors.general && <p className="text-red-500 text-center">{errors.general}</p>}
                        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

                        {/* Theater Name */}
                        <InputField
                            label="Theater Name *"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., PVR Cinemas 2"
                            error={errors.name}
                        />

                        {/* Location */}
                        <InputField
                            label="Location *"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g., MG Road, Near Metro Station"
                            error={errors.location}
                        />

                        {/* City and State */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="City *"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="e.g., Bengaluru"
                                error={errors.city}
                            />
                            <InputField
                                label="State *"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="e.g., Karnataka"
                                error={errors.state}
                            />
                        </div>

                        {/* Email */}
                        <InputField
                            label="Email *"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="e.g., contact2@pvrcinemas.com"
                            error={errors.email}
                        />

                        {/* Password */}
                        <InputField
                            label="Password *"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Minimum 6 characters"
                            error={errors.password}
                        />

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-4 rounded-lg hover:from-indigo-700 hover:to-blue-700 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {isSubmitting ? "Creating Theater..." : "Create Theater"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

interface InputFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    error?: string;
}

const InputField = ({ label, name, value, onChange, placeholder, type = "text", error }: InputFieldProps) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-4 py-3 bg-gray-900/50 border ${error ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
);

export default CreateTheater;
