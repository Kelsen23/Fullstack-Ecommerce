import express from "express";
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").post(createCategory);

export default router;
