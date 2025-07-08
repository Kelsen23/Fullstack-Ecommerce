import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import AdminMenu from "./AdminMenu";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const ProductUpdate = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");

  const navigate = useNavigate();

  const { data: categories = [], isLoading } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name || "");
      setDescription(productData.description || "");
      setPrice(productData.price?.toString() || "");
      setQuantity(productData.quantity?.toString() || "");
      setBrand(productData.brand || "");
      setImage(productData.image || "");
      setStock(productData.countStock?.toString() || "");
      setCategory(productData.category || "");
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Item added successfully");
      setImage(res.image);
    } catch (error) {
      toast.error("Item added successfully");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      description.trim() === "" ||
      brand.trim() === "" ||
      category.trim() === "" ||
      image.trim() === "" ||
      price === "" ||
      quantity === "" ||
      stock === ""
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", Number(price));
      formData.append("category", category);
      formData.append("quantity", Number(quantity));
      formData.append("brand", brand);
      formData.append("countStock", Number(stock));

      const res = await updateProduct({
        productId: params._id,
        formData,
      }).unwrap();

      toast.success(`${res.name} successfully updated`);
      navigate("/admin/allproductslist");
    } catch (error) {
      console.error(error);
      toast.error(
        error?.data?.error || error?.error || "Failed to update product"
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(params._id).unwrap();
      navigate("/admin/allproductslist");
      toast.success("Successfully deleted product");
    } catch (error) {
      toast.error(
        error?.data.error || error?.error || "Failed to delete product"
      );
    }
  };

  if (isLoading || !productData || !productData.name) return <Loader />;
  if (!productData) return <p className="p-4">Product not found</p>;

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12 text-xl font-bold mb-4">Create Product</div>

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
                />
              </div>
            </div>

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="p-2 mb-3 border rounded-lg w-[95%]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                />
              </div>

              <div>
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  className="p-4 mb-3 w-[30rem] border rounded-lg block"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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

            <div className="flex gap-2">
              <button
                type="submit"
                className="py-4 px-10 mt-5 text-white rounded-lg text-lg font-bold bg-green-600 hover:bg-green-700 transition"
              >
                Update
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="py-4 px-10 mt-5 text-white rounded-lg text-lg font-bold bg-pink-600 hover:bg-pink-700 transition"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
