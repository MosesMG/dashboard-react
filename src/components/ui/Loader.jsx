const Loader = ({ text = 'CHARGEMENT...' }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                {/* Spinner principal */}
                <div className="relative mb-4">
                    <div className="w-14 h-14 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                    {/* Point central avec pulsation */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                </div>

                {/* Texte avec animation */}
                <p className="text-gray-700 font-semibold">{text}</p>

                {/* Points animés */}
                <div className="flex justify-center space-x-3 mt-5">
                    <div className="w-3 h-3 bg-gray-600 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-3 h-3 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </div>
        </div>
    )
}

export default Loader;
