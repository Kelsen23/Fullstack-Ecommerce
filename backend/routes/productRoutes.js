import express from "express";
import formidable from "express-formidable";
const router = express.Router();

import { addProduct } from "../controllers/productController.js";

import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router.route("/").post(authenticate, authorizedAdmin, formidable(), addProduct);

export default router;
