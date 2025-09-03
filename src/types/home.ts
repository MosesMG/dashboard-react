export interface IBreadcrumbItem {
    name: string;
    link: string;
}

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

export interface PostProps {
    _id?: string;
    title: string;
    content: string;
    author: string;
    date: string;
    status: boolean;
}

export interface ICategorie {
    _id?: string;
    name: string;
    description: string
}
