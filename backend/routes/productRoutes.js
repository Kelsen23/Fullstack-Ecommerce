import express from "express";
import formidable from "express-formidable";
const router = express.Router();

import {
  addProduct,
  updateProduct,
  deleteProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filteredProducts
} from "../controllers/productController.js";

import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizedAdmin, formidable(), addProduct);

router.route("/allproducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, addProductReview);
router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizedAdmin, formidable(), updateProduct)
  .delete(authenticate, authorizedAdmin, deleteProduct);

router.route("/filtered-products").post(filteredProducts);

export default router;
