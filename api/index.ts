import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import usersRouter from './routers/usersRouter';
import productsRouter from './routers/productsRouter';

import config from "./config";

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());


app.use('/products', productsRouter);
app.use('/users', usersRouter);

const run = async () => {
    await mongoose.connect(config.mongoose.db);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
        console.log('disconnected');
    });
};

void run();


