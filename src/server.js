import express from 'express';

import { join } from 'path';

import productsRouter from './resources/products/products.js';
import ReviewsRouter from './resources/reviews/reviews.js';
import cors from 'cors';

const server = express(); ///

const PORT = 3002; /// port is declared

const publicFolderPath = join(process.cwd(), 'public');

server.use(express.static(publicFolderPath));
server.use(cors());
server.use(express.json());

//// endpoints router
////// listening to server
server.use('/products', productsRouter);
server.use('/reviews', ReviewsRouter);
server.listen(PORT, () => {
	console.log(`we are listening on ${PORT}`);
});

// server.on('error', () => {
// 	console.log(error);
// });
