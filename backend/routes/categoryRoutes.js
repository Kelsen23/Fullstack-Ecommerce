import express from "express";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  listCategory,
} from "../controllers/categoryController.js";
const router = express.Router();

router.route("/").post(authenticate, authorizedAdmin, createCategory);
router.route("/:categoryId").put(authenticate, authorizedAdmin, updateCategory);
router
  .route("/:categoryId")
  .delete(authenticate, authorizedAdmin, deleteCategory);
router.route("/categories").get(listCategory);

export default router;
