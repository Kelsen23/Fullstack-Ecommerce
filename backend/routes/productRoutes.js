import express from "express";
import formidable from "express-formidable";
const router = express.Router();

import { addProduct, updateProduct } from "../controllers/productController.js";

import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router.route("/").post(authenticate, authorizedAdmin, formidable(), addProduct);
router
  .route("/:id")
  .put(authenticate, authorizedAdmin, formidable(), updateProduct);

export default router;
