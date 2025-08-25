import { X } from "lucide-react";
import React, { useEffect, useRef, useState, type ReactNode } from "react";

interface DialogProps {
    title: string;
    onClose: () => void;
    children: ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ onClose, title, children }) => {
    const [animated, setAnimated] = useState<boolean>(false);
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimated(true)
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className={`fixed inset-0 bg-black transition-opacity duration-300 ${animated ? 'opacity-50' : 'opacity-0'}`}></div>

            <div
                ref={dialogRef}
                className={`relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4
                    transition-all duration-300 ease-outtransform
                    ${animated ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                `}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-400">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl hover:cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Dialog;
