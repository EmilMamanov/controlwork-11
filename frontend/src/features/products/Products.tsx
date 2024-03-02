import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectProducts } from './productsSlice.ts';
import { useEffect } from 'react';
import { fetchProducts } from './productsThunk.ts';
import ProductItem from './components/ProductItem';
import {selectUser} from "../users/usersSlice.ts";

const Products = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const user = useAppSelector(selectUser);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h4">Products</Typography>
                </Grid>
                <Grid item>
                    {user ? (
                        <Button color="primary" component={Link} to="/products/create">
                            Add product
                        </Button>
                    ) : (
                        <div>Register or login to add a product</div>
                    )}

                </Grid>
            </Grid>
            <Grid item container spacing={2}>
                {products.map(product => (
                    <ProductItem
                        key={product._id}
                        _id={product._id}
                        title={product.title}
                        image={product.image}
                        user={product.user}
                        price={product.price}
                    />
                ))}
            </Grid>
        </Grid>
    );
};

export default Products;