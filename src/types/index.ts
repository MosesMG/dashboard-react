export interface User {
    name: string;
    email: string;
    avatar: string;
    role: string;
}

export interface PostsProps {
    _id?: string;
    title: string;
    description: string;
    status: boolean;
}
