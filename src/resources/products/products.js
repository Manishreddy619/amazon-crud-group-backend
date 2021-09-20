import express from "express";
import multer from "multer";
import uniqid from "uniqid";
import createHttpError from "http-errors";
import { productsValidator } from "./productsValidation.js";
import { validationResult } from "express-validator";

import { readProducts, writeProducts, saveImages } from "../../utilis.js";
const productsRouter = express.Router();

productsRouter.post("/", multer().single("productImg"), productsValidator, async (req, res, next) => {
    const errorsList = validationResult(req);
    if (!errorsList.isEmpty()) {
      next(createHttpError(400, { message: errorsList }));

    } else {
      try {
        await saveImages(req.file.originalname, req.file.buffer);
        const newProduct = {
          ...req.body,
          imageUrl: `http://localhost:3002/products/images/${req.file.originalname}`,
          id: uniqid(),
          createdAt: new Date(),
        };
        // console.log(newProduct)
        const productsJSON = await readProducts();
        productsJSON.push(newProduct);
        await writeProducts(productsJSON);
        console.log("PRODUCTS JSON", productsJSON);
        res.status(201).send(newProduct);

      } catch (error) {
        next(createHttpError(403), "Some required fields are missing!");
      }
    }
  }
);

productsRouter.put("/:productId", multer().single("productImg"), productsValidator, async (req, res, next) => {
    const errorsList = validationResult(req);
    if (!errorsList.isEmpty()){
        next(createHttpError(400, { message: errorsList }));
    } else {
        try {
          const productsJSON = await readProducts();
          const productIndex = productsJSON.findIndex(
            (product) => product.id === req.params.productId
          );
          if (productIndex !== -1) {
            const previousData = productsJSON[productIndex];
            const updatedData = {
              ...previousData,
              ...req.body,
              imageUrl: `http://localhost:3002/products/images/${req.file.originalname}`,
              updatedAt: new Date(),
              id: req.params.productId,
            };
            productsJSON[productIndex] = updatedData;
            await writeProducts(productsJSON);
            res.send(updatedData);
          } else {
            next(createHttpError(404), `No product found with id ${product.id}`);
          }
        } catch (error) {
          next(error);
        }
    }
  }
);

export default productsRouter;
