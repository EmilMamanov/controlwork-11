import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product, ProductMutation } from '../../types';
import axiosApi from '../../axiosApi';
import {RootState} from "../../app/store.ts";

export const fetchProducts = createAsyncThunk<Product[]>(
    'products/fetchAll',
    async () => {
        const productsResponse = await axiosApi.get<Product[]>('/products');
        return productsResponse.data;
    }
);




export const createProduct = createAsyncThunk<void, ProductMutation, {state: RootState}>(
    'products/create',
    async  (data, {getState}) => {
        try {
            const token = getState().users.user?.token;
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('price', data.price);
            formData.append('category', data.category);


            if (data.image) {
                formData.append('image', data.image);
            }

            if (data.description) {
                formData.append('description', data.description);
            }

            const response = await axiosApi.post('/products', formData, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
            });

            console.log('ответ создания', response.data);
        } catch (error) {
            console.error('ошибка', error);
            throw error;
        }
    }
);


export const fetchCategory = createAsyncThunk<Product[], string>(
    'products/fetchCategory',
    async (category) => {
        const categoryProductsResponse = await axiosApi.get<Product[]>(`/products/category/${category}`);
        return categoryProductsResponse.data;
    }
);

export const fetchCategoryProducts = createAsyncThunk<Product[], string>(
    'products/fetchByCategory',
    async (category: string) => {
        const productsResponse = await axiosApi.get<Product[]>(`/products/category/${category}`);
        return productsResponse.data;
    }
);
