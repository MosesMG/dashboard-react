export interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    changeType: 'up' | 'down';
    icon: React.ReactNode;
    iconBg: string;
}

export interface SalesRecord {
    id: number;
    customer: {
        name: string;
        email: string;
        avatar: string;
    };
    product: string;
    date: string;
    amount: string;
    status: 'completed' | 'pending' | 'failed';
}
