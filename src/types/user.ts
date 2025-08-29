export interface User {
    id: string;
    name: string;
    email: string;
}

export interface JwtProps {
    id: string;
    role: string;
    exp: number;
}
