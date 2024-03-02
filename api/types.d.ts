import {Model} from "mongoose";

export interface UserFields {
    username: string;
    password: string;
    token: string;
    displayName: string;
    phone: number;
}

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

export interface ProductMutation {
    user: string;
    title: string;
    description: string;
    price: number;
    image: string | null;
    category: string;
}

type UserModel = Model<UserFields, {}, UserMethods>;