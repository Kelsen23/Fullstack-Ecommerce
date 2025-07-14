import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createOrder = asyncHandler(async (req, res) => {
  res.send("Hello from orderController");
});

export { createOrder };
