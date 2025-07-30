const Modal = ({ onClose, title, children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50"></div>

            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="flex items-center justify-between p-4 border-b border-gray-400">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {title}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl hover:cursor-pointer">
                        <i className="fa fa-times"></i>
                    </button>
                </div>

                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
