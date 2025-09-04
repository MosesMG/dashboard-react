import React, { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { INotification } from "../types/ui";

interface NotifContextType {
    notifications: INotification[];
    addNotification: (message: string, duration?: number) => void;
    removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotifContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<INotification[]>([]);

    const addNotification = useCallback((message: string, duration = 4000) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newNotification = { id, message, duration };

        setNotifications(prev => [...prev, newNotification]);

        setTimeout(() => {
            removeNotification(id);
        }, duration);
    }, []);

    const removeNotification = useCallback((id: string) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    }, []);

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification doit être utilisée à l'intérieur NotificationProvider");
    }
    return context;
};
