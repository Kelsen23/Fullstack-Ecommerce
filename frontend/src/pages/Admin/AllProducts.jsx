import { Link } from "react-router";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "../Admin/AdminMenu";
import Loader from "../../components/Loader";
import { GrUpdate } from "react-icons/gr";

const AllProducts = () => {
  const { data: products, isLoading, error } = useAllProductsQuery();

  if (isLoading) return <Loader />;
  if (error) return <div>Error Loading Products</div>;

  return (
    <div className="container mx-[9rem]">
      <AdminMenu />
      <div className="flex flex-col md:flex-row">
        <div className="p-3">
          <div className="ml-[2rem] text-xl font-bold h-12">
            All Products ({products.length})
          </div>

          <div className="flex flex-wrap justify-around items-center">
            {products.map((product) => (
              <div key={product._id} className="mb-4 overflow-hidden flex">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${product.image}`}
                  alt={product.name}
                  className="w-[10rem] object-cover"
                />

                <div className="p-4 flex flex-col justify-around">
                  <div className="flex justify-between">
                    <h5 className="text-xl font-semibold mb-2">
                      {product?.name}
                    </h5>

                    <p className="text-gray-400 text-sm">
                      {moment(product.createdAt).format("MMMM Do YYYY")}
                    </p>
                  </div>

                  <p className="text-gray-400 xl:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                    {product?.description?.substring(0, 160)}...
                  </p>

                  <div className="flex justify-between">
                    <Link
                      to={`/admin/product/update/${product._id}`}
                      className="inline-flex gap-4 items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                    >
                      Update Product <GrUpdate />
                    </Link>
                    <p className="text-xl">
                      Price:{" "}
                      <span className="text-gray-500 ml-1 font-semibold">
                        ${product.price}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
