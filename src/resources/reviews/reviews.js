import { Router } from 'express';

import { readReviews, writeReviews } from '../../utilis.js';
const ReviewsRouter = Router();

ReviewsRouter.get('/', async (req, res, next) => {});

export default ReviewsRouter;
