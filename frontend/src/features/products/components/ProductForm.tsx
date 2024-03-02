import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Grid, TextField, MenuItem} from '@mui/material';
import { ProductMutation } from '../../../types';
import FileInput from './FileInput';
import { useAppDispatch } from '../../../app/hooks';
import { createProduct } from '../productsThunk';


const ProductForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const [state, setState] = useState<ProductMutation>({
        title: '',
        description: '',
        image: null,
        category: '',
        price: '',

    });

    const submitFormHandler = (e: FormEvent) => {
        e.preventDefault();
        console.log('Submit button clicked');
        dispatch(createProduct(state));
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const fileInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setState((prevState) => ({ ...prevState, [name]: files[0] as File }));
        }
    };

    return (
        <form autoComplete="off" onSubmit={submitFormHandler}>
            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                    <TextField
                        select
                        id="category"
                        label="Category"
                        value={state.category}
                        onChange={inputChangeHandler}
                        name="category"
                        required
                    >
                        {['sports', 'tech', 'furniture', 'other'].map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs>
                    <TextField
                        id="title"
                        label="Title"
                        value={state.title}
                        onChange={inputChangeHandler}
                        name="title"
                        required
                    />
                </Grid>

                <Grid item xs>
                    <TextField
                        multiline
                        rows={3}
                        id="description"
                        label="Description"
                        value={state.description}
                        onChange={inputChangeHandler}
                        name="description"
                    />
                </Grid>

                <Grid item xs>
                    <TextField
                        type="number"
                        id="price"
                        label="Price"
                        value={state.price}
                        onChange={inputChangeHandler}
                        name="price"
                        required
                    />
                </Grid>

                <Grid item xs>
                    <FileInput label="Image" name="image" onChange={fileInputChangeHandler} />
                </Grid>

                <Grid item xs>
                    <Button type="submit" color="primary" variant="contained">
                        Create
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ProductForm;
