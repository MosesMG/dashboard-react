export interface User {
    name: string;
    email: string;
    avatar: string;
    role: string;
}

export interface PostsProps {
    id: number;
    title: string;
    description: string;
    status: boolean;
}
