import express from 'express';

import { join } from 'path';
import {
	BadRequest,
	unAuthorized,
	notfound,
	forbiden,
	serverside,
} from './errorHandlers.js';
import productsRouter from './resources/products/products.js';
import ReviewsRouter from './resources/reviews/reviews.js';
import cors from 'cors';
import { notfound } from './errorHandlers.js';

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

server.use(unAuthorized);
server.use(BadRequest);
server.use(notfound);
server.use(forbiden);
server.use(serverside);
server.listen(PORT, () => {
	console.log(`we are listening on ${PORT}`);
});

// server.on('error', () => {
// 	console.log(error);
// });
