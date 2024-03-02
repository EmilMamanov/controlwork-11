import { Container, CssBaseline } from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import Register from './features/users/Register';
import Login from "./features/users/Login.tsx";
import AppToolbar from "./components/UI/AppToolBar.tsx";
import Products from "./features/products/Products.tsx";
import CategoryProducts from "./features/products/components/CategoryProducts.tsx";
import ProductForm from "./features/products/components/ProductForm.tsx";
import ProductDetails from "./features/products/ProductDetails.tsx";

const App = () => {

    return (
        <>
            <CssBaseline/>
            <header>
                <AppToolbar/>
            </header>
            <main>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path="/register" element={<Register/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="*" element={<h1>Not Found</h1>} />
                        <Route path="/" element={<Products />} />
                        <Route path="/products/category/:category" element={<CategoryProducts />} />
                        <Route path="/products/create" element={<ProductForm />} />
                        <Route path="/products/:productId" element={<ProductDetails />} />
                    </Routes>
                </Container>
            </main>
        </>
    );
};

export default App;
