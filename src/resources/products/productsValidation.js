import { body } from "express-validator"

export const productsValidator = [
  body("name").exists().withMessage("name is mandatory"),
  body("description").exists().withMessage("description is mandatory"),
  body("brand").exists().withMessage("brand is mandatory"),
  body("category").exists().withMessage("category is mandatory"),
  body("price").exists().isNumeric().withMessage("Please write a number").withMessage("price is mandatory")
]