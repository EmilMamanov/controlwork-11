import React, { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from "../../app/store.ts";
import {fetchProductById, deleteProduct} from "./productsThunk.ts";
import {useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../users/usersSlice.ts";
import {Button} from "@mui/material";
import { Card, CardContent, CardHeader, CardMedia, Grid, styled } from '@mui/material';
import imageNotAvailable from '../../assets/images/imageNotAvailable.jpg';

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '25%',
});

const ProductDetails: React.FC = () => {
    const { productId } = useParams() as {productId: string};
    const dispatch = useDispatch();

    const product = useSelector((state: RootState) => state.products.products[0]);
    const user = useAppSelector(selectUser);
    const cardImage = imageNotAvailable;


    useEffect(() => {
        dispatch(fetchProductById(productId));
    }, [dispatch, productId]);

    const handleDeleteProduct = () => {
        dispatch(deleteProduct(productId));
    };


    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <Grid item sm md={6} lg={4}>
            <Card sx={{width: '50%'}}>
                <CardHeader title={product.title}/>
                <CardContent>{product.description}</CardContent>
                <CardContent>{product.price} сом</CardContent>
                <CardContent>{product.category}</CardContent>
                <ImageCardMedia image={cardImage} title={product.title}/>
            {user ? (
                <Button color="primary" onClick={handleDeleteProduct}>
                    delete
                </Button>
            ) : (
                <div>Связаться с продавцом</div>
            )}
                </Card>
        </Grid>
    );
};

export default ProductDetails;
