import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import findEmptyField from "../utils/findEmptyField.js";
import mongoose from "mongoose";

const addProduct = asyncHandler(async (req, res) => {
  const requiredFields = [
    "name",
    "image",
    "description",
    "price",
    "category",
    "quantity",
    "brand",
  ];

  const errorMessage = findEmptyField(req.fields, requiredFields);
  if (errorMessage) {
    return res.status(400).json({ error: errorMessage });
  }

  const product = await Product.create({ ...req.fields });
  res.json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const requiredFields = [
    "name",
    "image",
    "description",
    "price",
    "category",
    "quantity",
    "brand",
  ];

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid product id." });
  }

  const errorMessage = findEmptyField(req.fields, requiredFields);
  if (errorMessage) {
    return res.status(400).json({ error: errorMessage });
  }

  const product = await Product.findByIdAndUpdate(
    id,
    { ...req.fields },
    { new: true }
  );

  if (!product) {
    return res.status(404).json({ error: "Product not found." });
  } else {
    res.status(200).json(product);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid product id." });
  }

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    res.status(404).json({ error: "Product not found." });
  } else {
    res.status(200).json({
      message: "Successfully deleted product",
      deletedProduct: product,
    });
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  const pageSize = 6;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword }).limit(pageSize);

  res.json({
    products,
    page: 1,
    pages: Math.ceil(count / pageSize),
    hasMore: false,
  });
});

const fetchProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid product id." });
  }

  const foundProduct = await Product.findById(id);

  if (!foundProduct) {
    return res.status(404).json({ error: "Product doesn't exist." });
  } else {
    res.json(foundProduct);
  }
});

export {
  addProduct,
  updateProduct,
  deleteProduct,
  fetchProducts,
  fetchProductById,
};
