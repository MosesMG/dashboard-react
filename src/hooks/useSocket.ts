import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Alert {
    id: string;
    title: string;
    message: string;
}

export const useSocket = (userId: string) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const newSocket = io('http://localhost:3000');

        newSocket.on('connect', () => {
            setIsConnected(true);
            newSocket.emit('joinUser', userId);
        });

        newSocket.on('disconnect', () => {
            setIsConnected(false);
        });

        newSocket.on('newAlert', (alert: Alert) => {
            setAlerts(prev => [alert, ...prev]);
        });

        newSocket.on('alertMarkedRead', (alertId: string) => {
            setAlerts(prev => prev.filter(alert => alert.id !== alertId));
        });

        setSocket(newSocket);

        return () => newSocket.close();
    }, [userId]);

    const markAsRead = (alertId: string) => {
        socket?.emit('markAlertRead', alertId);
    };

    return { socket, alerts, isConnected, markAsRead };
};
