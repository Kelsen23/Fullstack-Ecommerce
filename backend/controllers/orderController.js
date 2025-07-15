import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

function calcPrices(items) {
  const itemsPrice = items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxRate = 0.15;
  const taxPrice = parseFloat((itemsPrice * taxRate).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
}

const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items provided.");
  }

  const itemsFromDB = await Product.find({
    _id: { $in: orderItems.map((x) => x._id) },
  });

  const dbOrderItems = orderItems.map((itemFromClient) => {
    const matchingItemFromDB = itemsFromDB.find(
      (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
    );

    if (!matchingItemFromDB) {
      res.status(400);
      throw new Error("Product not found.");
    }

    const { _id, ...rest } = itemFromClient;

    return {
      ...rest,
      product: _id,
      price: matchingItemFromDB.price,
    };
  });

  const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
    calcPrices(dbOrderItems);

  const newOrder = await Order.create({
    orderItems: dbOrderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  res.status(201).json(newOrder);
});

const getAllOrders = asyncHandler(async (req, res) => {
  const allOrders = await Order.find({});
  res.status(200).json(allOrders);
});

const getUserOrders = asyncHandler(async (req, res) => {
  const userOrders = await Order.find({ user: req.user._id });
  res.status(200).json(userOrders);
});

const countTotalOrders = asyncHandler(async (req, res) => {
  const totalOrders = await Order.countDocuments();
  res.status(200).json({
    totalOrders,
  });
});

const calculateTotalSales = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  res.json({ totalSales });
});

const calculateTotalSalesByDate = asyncHandler(async (req, res) => {
  const salesByDate = await Order.aggregate([
    {
      $match: {
        isPaid: true,
      },
    },

    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
        },
        totalSales: { $sum: "$totalPrice" },
      },
    },
  ]);

  res.status(200).json(salesByDate);
});

const findOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "username email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }
});

const markOrderAsPaid = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const foundOrder = await Order.findById(id);

  if (!foundOrder) {
    const error = new Error("Order not found.");
    error.statusCode = 404;
    throw error;
  } else {
    foundOrder.isPaid = true;
    foundOrder.paidAt = Date.now();
    foundOrder.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await foundOrder.save();
    res.status(200).json(updatedOrder);
  }
});

export {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
};
