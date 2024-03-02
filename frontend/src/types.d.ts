export interface RegisterMutation {
    username: string;
    password: string;
    displayName: string;
    phone: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface User {
    _id: string;
    username: string;
    token: string;

}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface RegisterResponse {
    message: string;
    user: User;
}

export interface GlobalError {
    error: string;
}

export interface Product {
    _id: string;
    title: string;
    description: string;
    image: string | null;
    user: string;
    price: string;
    category: string;
}

export interface ProductMutation {
    title: string;
    description: string;
    image?: File | null;
    category: string;
    price: string;
}
