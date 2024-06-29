export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    role_id: number;
}

export interface Credentials {
    username: String;
    password: String;
}

export interface RegisterUser {
    username: String;
    email: String;
    password1: String;
    password2: String;
    is_nutritionist: boolean;
}

export interface LoggedInUser {
    id: number;
    username: string;
    email: string;
    role: string;
    role_id: number;
}