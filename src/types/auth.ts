import type { User } from "./user";

export interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    getUser: (id: string) => Promise<User>;
}

export interface LoginResponse {
    message: string;
    body: {
        token: string;
        user: User;
    };
}

export interface RegisterResponse {
    message: string;
    body: {
        token: string;
        newUser: User;
    };
}
