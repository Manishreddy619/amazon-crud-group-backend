import express from 'express';

import {
	readProducts,
	writeProducts,
	saveImages,
	readReviews,
} from '../../utilis.js';
const productsRouter = express.Router();
import createHttpError from 'http-errors';
//////////////get products
productsRouter.get('/', async (req, res, next) => {
	try {
		const products = await readProducts();
		res.status(200).send(products);
	} catch (error) {
		next(error);
	}
});
productsRouter.get('/:id', async (req, res, next) => {
	try {
		const products = await readProducts();
		const filteredproduct = products.findIndex(
			(product) => product.id === req.params.id,
		);
		console.log(filteredproduct);
		if (filteredproduct !== -1) {
			const requiredproduct = products.find(
				(product) => product.id === req.params.id,
			);
			res.status(200).send(requiredproduct);
		}
		if (filteredproduct === -1) {
			// res.send('not found');
			next(createHttpError(404, `id ${req.params.id} not found `));
		}
	} catch (error) {
		next(error);
	}
});
productsRouter.get('/:id/reviews', async (req, res, next) => {
	try {
		const reviews = await readReviews();
		const filteredReview = reviews.findIndex(
			(review) => review.productId === req.params.id,
		);
		if (filteredReview !== -1) {
			const requiredReview = reviews.find(
				(product) => product.productId === req.params.id,
			);
			res.status(200).send(requiredReview);
		}
	} catch (error) {
		next(error);
	}
});
productsRouter.delete('/:id', async (req, res, next) => {
	try {
		const products = await readProducts();
		const filteredProducts = products.filter(
			(product) => product.id !== req.params.id,
		);
		const checkId = products.findIndex(
			(product) => product.id === req.params.id,
		);
		console.log(checkId);
		if (parseInt(checkId) !== -1) {
			writeProducts(filteredProducts);
			res.status(204).send();
		} else {
			next(createHttpError(404, `id ${req.params.id} not found `));
		}
	} catch (error) {
		next(error);
	}
});

export default productsRouter;
