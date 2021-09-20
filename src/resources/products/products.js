import express from 'express';

import { readProducts, writeProducts, saveImages } from '../../utilis.js';
const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {});

export default productsRouter;
