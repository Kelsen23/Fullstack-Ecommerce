import express from "express";
const router = express.Router();

import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getAllOrders,
  getUserOrder,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
} from "../controllers/orderController.js";

router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, authorizedAdmin, getAllOrders);
router.route("/mine").get(authenticate, getUserOrder);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calculateTotalSalesByDate);
router.route("/:id").get(authenticate, authorizedAdmin, findOrderById);
router.route("/:id/pay").put(authenticate, authorizedAdmin, markOrderAsPaid);
router
  .route("/:id/deliver")
  .put(authenticate, authorizedAdmin, markOrderAsDelivered);

export default router;
