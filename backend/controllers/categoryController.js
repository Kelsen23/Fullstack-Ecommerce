import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";

const createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name?.trim().toLowerCase();

  if (!name) {
    const error = new Error("Please provide a name for category.");
    error.statusCode = 400;
    throw error;
  }

  const categoryExists = await Category.findOne({ name });
  if (categoryExists)
    return res.status(400).json({ error: "Category already exists." });

  try {
    const newCategory = await Category.create({ name });
    res.status(201).json({
      _id: newCategory._id,
      name: newCategory.name,
    });
  } catch (error) {
    if (error.statusCode === 11000) {
      return res.status(400).json({ error: "Category already exists." });
    }
    throw error;
  }
});

export { createCategory };
