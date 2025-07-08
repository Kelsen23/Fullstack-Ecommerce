import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const res = await createProduct(productData).unwrap();

      toast.success(`${res.name} successfully created`);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(
        error?.data?.error || error?.error || "Failed to create product"
      );
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      console.log("Uploaded image path from backend:", res.image);

      setImage(res.image);
      setImageUrl(
        `${import.meta.env.VITE_BASE_URL}${res.image.replace(/\\/g, "/")}`
      );
    } catch (error) {
      toast.error(
        error?.data?.error || error?.error || "Image upload failed"
      );
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12 text-xl font-bold mb-4">Create Product</div>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="text-black border-1 px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-10 bg-white">
              {image ? "Image Selected" : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="p-3">
            <div className="flex flex-wrap">
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg block"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="ml-10">
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg block"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              <div>
                <label htmlFor="quantity">Quantity</label>
                <input
                  id="quantity"
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg block"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>

              <div className="ml-10">
                <label htmlFor="brand">Brand</label>
                <input
                  id="brand"
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg block"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </div>
            </div>

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="p-2 mb-3 border rounded-lg w-[95%]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <div className="flex justify-between">
              <div>
                <label htmlFor="stock">Count In Stock</label>
                <input
                  id="stock"
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg block"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  min={0}
                  required
                />
              </div>

              <div>
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  className="p-4 mb-3 w-[30rem] border rounded-lg block"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="py-4 px-10 mt-5 text-white rounded-lg text-lg font-bold bg-pink-600 hover:bg-pink-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
