import {Router} from "express";
import Product from "../models/Product";
import auth, { RequestWithUser } from "../auth";
import {uploadItemImage} from "../multer";
import mongoose from "mongoose";


const productsRouter = Router();

productsRouter.post(
    '/',
    auth,
    uploadItemImage.single('image'),
    async (req: RequestWithUser, res, next) => {
    try {

        const productData  = {
            user: req.user?._id,
            title: req.body.title,
            description: req.body.description,
            price: parseFloat(req.body.price),
            image: req.file ? req.file.filename : null,
            category: req.body.category,
        };

        const product = new Product(productData);

        await product.save();

        return res.send(product);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }

        next(e);
    }
});

productsRouter.get('/', async (_req, res, next) => {
    try {
        const products = await Product.find();

        return res.send(products);
    } catch (err) {
        return next(err);
    }
});

productsRouter.get('/:productId', async (req, res, next) => {
    try {
        const product = await Product
            .findById(req.params.productId)
            .populate('user', 'displayName phone');

        if (!product) {
            return res.status(404).send({ message: 'Товар не найден' });
        }

        return res.send(product);
    } catch (err) {
        return next(err);
    }
});




export default productsRouter;