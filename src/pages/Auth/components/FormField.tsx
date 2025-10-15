
type Props = {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;

}

const FormField = ({
    id,
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    required = false,
}: Props) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={id} className="text-gray-700 font-medium mb-1">
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
            />
        </div>
    )
}

export default FormField