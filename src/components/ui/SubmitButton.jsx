const SubmitButton = ({ action }) => {
    return (
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white font-semibold uppercase rounded-md shadow-sm hover:bg-blue-700 transition duration-200 hover:cursor-pointer">
            {action}
        </button>
    )
}

export default SubmitButton;
