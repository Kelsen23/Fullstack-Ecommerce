import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";
import mongoose from "mongoose";

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

const updateCategory = asyncHandler(async (req, res) => {
  const name = req.body.name?.trim().toLowerCase();
  const { categoryId } = req.params;

  if (!name) {
    const error = new Error("Please provide a name.");
    error.statusCode = 400;
    throw error;
  }
  if (!categoryId) {
    const error = new Error("Please provide a category id.");
    error.statusCode = 400;
    throw error;
  }

  const existingCategory = await Category.findOne({ name });
  if (existingCategory && existingCategory._id.toString() !== categoryId) {
    const error = new Error("Category with provided name already exists.");
    error.statusCode = 400;
    throw error;
  }

  const categoryToUpdate = await Category.findById(categoryId);

  if (!categoryToUpdate)
    return res
      .status(404)
      .json({ error: "Category with provided id doesn't exist." });
  else {
    try {
      categoryToUpdate.name = name;
      const updatedCategory = await categoryToUpdate.save();
      res.status(200).json({
        _id: updatedCategory._id,
        name: updatedCategory.name,
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "Category already exists." });
      }
      throw error;
    }
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  if (!categoryId) {
    const error = new Error("Please provide a category id.");
    error.statusCode = 400;
    throw error;
  }

  const existingCategory = await Category.findById(categoryId);
  if (!existingCategory) {
    const error = new Error("Category with provided id doesn't exist.");
    error.statusCode = 404;
    throw error;
  }

  await Category.deleteOne({ _id: categoryId });
  res.json({
    message: "Successfully deleted category",
    deletedCategory: {
      _id: existingCategory._id,
      name: existingCategory.name,
    },
  });
});

const listCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

const readCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  if (!categoryId) {
    const error = new Error("Please provide a category id.");
    error.statusCode = 400;
    throw error;
  }

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(404).json({ error: "Category not found." });
  }

  const foundCategory = await Category.findById(categoryId);

  if (!foundCategory) {
    return res.status(404).json({ error: "Category not found." });
  }

  res.status(200).json({
    _id: foundCategory._id,
    name: foundCategory.name,
  });
});

export {
  createCategory,
  updateCategory,
  deleteCategory,
  listCategory,
  readCategory,
};
