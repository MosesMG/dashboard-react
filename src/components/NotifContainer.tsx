import React from "react";
import { useNotification } from "../context/NotificationContext";
import { Info, X } from "lucide-react";

export const NotifContainer: React.FC = () => {
    const { notifications, removeNotification } = useNotification();

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className="flex items-center justify-between px-4 py-3 mb-3 rounded-lg shadow-lg max-w-sm animate-slide-in bg-cyan-50 border border-cyan-200 text-cyan-800"
                >
                    <div className="flex items-center">
                        <span className="mr-2 text-lg"><Info className="h-5 w-5" /></span>
                        <span className="text-sm font-semibold">{notification.message}</span>
                    </div>
                    <button
                        onClick={() => removeNotification(notification.id)}
                        className="ml-3 text-lg leading-none hover:opacity-70 transition-opacity"
                        aria-label="Fermer"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}
