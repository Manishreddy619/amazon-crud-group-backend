import { Router } from 'express';
import express from "express";
import uniqid from "uniqid";
import createHttpError from "http-errors";
import { readReviews, writeReviews, readProducts } from '../../utilis.js';
import { productsReviewsValidation } from './reviewsValidation.js';
import { validationResult } from "express-validator";

const ReviewsRouter = express.Router();

ReviewsRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await readReviews();

    res.send(reviews);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

ReviewsRouter.get("/:_id", async (req, res, next) => {
  try {
    const paramsID = req.params._id;
    const reviews = await readReviews();
    const review = reviews.find((p) => p._id === paramsID);
    if (review) {
      res.send(review);
    } else {
      res.send(
        createHttpError(
          404,
          `The Product Review with the id: ${paramsID} was not found.`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

ReviewsRouter.post("/product/:_id", productsReviewsValidation, async (req, res, next) => {
    try {
      const errorList = validationResult(req);
      if (errorList.isEmpty()) {
        const paramsID = req.params._id;
        const products = await readProducts();
        const product = products.find((p) => p._id === paramsID);
        if (product) {
          const reqBody = req.body;

          const reviews = await readReviews();
          const newReview = {
            _id: uniqid(),
            comment: reqBody.comment,
            rate: reqBody.rate,
            productId: product._id,
            createdAt: new Date(),
          };
          reviews.push(newReview);
          await writeReviews(reviews);

          res.status(201).send(newReview);
        } else {
          res.send(
            createHttpError(
              404,
              `The Product with the id: ${paramsID} was not found.`
            )
          );
        }
      } else {
        next(createHttpError(400, { errorList }));
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

ReviewsRouter.put("/:_id", productsReviewsValidation, async (req, res, next) => {
    try {
      const errorList = validationResult(req);
      if (errorList.isEmpty()) {
        const paramsID = req.params._id;
        const reviews = await readReviews();
        const reviewToUpdate = reviews.find(
          (p) => p._id === paramsID
        );

        const updatedReview = {
          ...reviewToUpdate,
          ...req.body,
        };

        const remainingreviews = reviews.filter(
          (p) => p._id !== paramsID
        );

        remainingreviews.push(updatedReview);
        await writeReviews(remainingreviews);

        res.send(updatedReview);
      } else {
        next(createHttpError(400, { errorList }));
      }
    } catch (error) {
      next(error);
    }
  }
);

ReviewsRouter.delete("/:_id", async (req, res, next) => {
  try {
    const paramsID = req.params._id;
    const reviews = await readReviews();
    const review = reviews.find((p) => p._id === paramsID);
    if (review) {
      const remainingReviews = reviews.filter(
        (p) => p._id !== paramsID
      );

      await writeReviews(remainingReviews);

      res.send({
        message: `The Product Review with the id: ${review._id} was deleted`,
        removedItem: review,
      });
    } else {
      next(
        createHttpError(
          404,
          `The product review with the id: ${paramsID} was not found`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

export default ReviewsRouter;

