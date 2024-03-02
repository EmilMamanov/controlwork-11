import {Product} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchProducts, fetchCategory, fetchCategoryProducts, createProduct, deleteProduct, fetchProductById} from './productsThunk.ts';
import {RootState} from '../../app/store';

interface ProductsState {
    products: Product[];
    fetchLoading: boolean;
    createLoading: boolean;
    deleteLoading: boolean | string;
}

const initialState: ProductsState = {
    products: [],
    fetchLoading: false,
    createLoading: false,
    deleteLoading: false,
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, {payload: products}) => {
            state.fetchLoading = false;
            state.products = products;
        });

        builder.addCase(createProduct.pending, (state) => {
            state.createLoading = true;
        });

        builder.addCase(createProduct.fulfilled, (state) => {
            state.createLoading = false;
        });

        builder.addCase(createProduct.rejected, (state) => {
            state.createLoading = false;
        });

        builder.addCase(fetchCategory.fulfilled, (state, { payload }) => {
            state.fetchLoading = false;
            state.products = payload;
        });
        builder.addCase(fetchCategory.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchCategoryProducts.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchCategoryProducts.fulfilled, (state, { payload: products }) => {
            state.fetchLoading = false;
            state.products = products;
        });

        builder.addCase(fetchProductById.pending, (state) => {
            state.fetchLoading = true;
        });

        builder.addCase(fetchProductById.fulfilled, (state, { payload: product }) => {
            state.fetchLoading = false;
            state.products = [product];
        });

        builder.addCase(fetchProductById.rejected, (state) => {
            state.fetchLoading = false;
        });

        builder.addCase(deleteProduct.pending, (state, {meta}) => {
            state.deleteLoading = meta.arg;
        });

        builder.addCase(deleteProduct.fulfilled, (state) => {
            state.deleteLoading = false;
        });

        builder.addCase(deleteProduct.rejected, (state) => {
            state.deleteLoading = false;
        });
    },
});

export const productsReducer = productsSlice.reducer;
export const selectDeleteProductLoading = (state: RootState) => state.products.deleteLoading;

export const selectProducts = (state: RootState) => state.products.products;