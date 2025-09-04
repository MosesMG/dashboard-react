import React from 'react';
import { useSocket } from '../hooks/useSocket';

interface Props {
    userId: string;
}

export const AlertSystem: React.FC<Props> = ({ userId }) => {
    const { alerts, isConnected, markAsRead } = useSocket(userId);

    const getAlertColor = (type: string) => {
        switch (type) {
            case 'error': return 'bg-red-100 border-red-400 text-red-700';
            case 'warning': return 'bg-yellow-100 border-yellow-400 text-yellow-700';
            case 'success': return 'bg-green-100 border-green-400 text-green-700';
            default: return 'bg-blue-100 border-blue-400 text-blue-700';
        }
    };

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            <div className={`text-sm px-2 py-1 rounded ${isConnected ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                {isConnected ? 'Connecté' : 'Déconnecté'}
            </div>

            {alerts.map((alert) => (
                <div
                    key={alert.id}
                    className={`max-w-sm p-4 border rounded shadow-lg ${getAlertColor(alert.type)}`}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-bold">{alert.title}</h4>
                            <p className="text-sm">{alert.message}</p>
                        </div>
                        <button
                            onClick={() => markAsRead(alert.id)}
                            className="ml-2 text-xl leading-none"
                        >
                            ×
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
