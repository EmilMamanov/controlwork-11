import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectProducts } from '../productsSlice.ts';
import { fetchCategoryProducts } from '../productsThunk.ts';
import ProductItem from '../components/ProductItem';
import { useParams } from 'react-router-dom';

const CategoryProducts: React.FC = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);

    const { category } = useParams();

    useEffect(() => {
        dispatch(fetchCategoryProducts(category));
    }, [dispatch, category]);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Typography variant="h4">{`Products in ${category} category`}</Typography>
            </Grid>
            <Grid item container spacing={2}>
                {products.map((product) => (
                    <ProductItem
                        key={product._id}
                        id={product._id}
                        title={product.title}
                        image={product.image}
                        user={product.user}
                    />
                ))}
            </Grid>
        </Grid>
    );
};

export default CategoryProducts;
