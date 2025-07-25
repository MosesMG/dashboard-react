const TextInput = ({ label, type, required = false, ...props }) => {
    return (
        <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor={props.id}>
                {label}
            </label>
            <input
                className="w-full px-4 py-2 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                type={type}
                onChange={props.onChange}
                {...props}
                required={required}
            />
        </div>
    );
};

export default TextInput;
