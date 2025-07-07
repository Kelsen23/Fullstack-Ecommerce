import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, quantity, brand } = req.fields;

  switch (true) {
    case !name:
      return res.json({ error: "Name is required." });
    case !description:
      return res.json({ error: "Description is required." });
    case !price:
      return res.json({ error: "Price is required." });
    case !category:
      return res.json({ error: "Category is required." });
    case !quantity:
      return res.json({ error: "Quantity is required." });
    case !brand:
      return res.json({ error: "Brand is required." });
  }

  const product = await Product.create({ ...req.fields });
  res.json(product);
});

export { addProduct };
