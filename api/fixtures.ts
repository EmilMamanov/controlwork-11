import mongoose from 'mongoose';
import config from './config';
import Product from './models/Product';
import User from './models/User';

const dropCollection = async (
    db: mongoose.Connection,
    collectionName: string,
) => {
    try {
        await db.dropCollection(collectionName);
    } catch (e) {
        console.log(`Collection ${collectionName} was missing, skipping drop...`);
    }
};

const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;

    const collections = ['users', 'products'];

    for (const collectionName of collections) {
        await dropCollection(db, collectionName);
    }

    const [user1, user2, user3] = await User.create(
        {
            username: 'user1',
            password: '123',
            token: '27f1dd05-fa85-45fe-b444-d420c82c4dcb',
            displayName: 'Трус',
            phone: 123456,
        },
        {
            username: 'user2',
            password: '123',
            token: '6dc0e5ac-5f55-4137-8ebb-9a1ba79289ad',
            displayName: 'Балбес',
            phone: 654321,
        },
        {
            username: 'user3',
            password: '123',
            token: '74acbc3a-1689-400f-9c6e-19b2c9bd53bb',
            displayName: 'Бывалый',
            phone: 123654,
        }
    );

    const [product1, product2, product3] = await Product.create(
        {
            user: user1._id,
            title: 'Отвёртка',
            description: 'светится',
            price: 20.0,
            image: "fixtures/otvertka.jpg",
            category: 'tech',
        },
        {
            user: user2._id,
            title: 'Баскетбольный мяч',
            description: 'Подходит для улицы и зала',
            price: 30.0,
            image: "fixtures/basketball.jpg",
            category: 'sports',
        },
        {
            user: user3._id,
            title: 'Стул',
            description: 'Деревянный, но удобный',
            price: 25.0,
            image: "fixtures/stul.jpg",
            category: 'furniture',
        }
    );

    await db.close();
};

void run();