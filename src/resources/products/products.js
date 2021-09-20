import express from 'express';

import { readProducts, writeProducts, saveImages } from '../../utilis.js';
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
