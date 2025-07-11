import { useSelector } from "react-redux";
import { useParams, Link, useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import {
  useGetProductByIdQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import { useState } from "react";
import Product from "./Product";

const ProductDetails = () => {
  const { _id: productId } = useParams();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    refetch,
    isLoading,
    error,
  } = useGetProductByIdQuery(productId);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  return (
    <>
      <div>
        <Link
          to={redirect}
          className="font-semibold hover:underline ml-[10rem]"
        >
          Go Back
        </Link>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="error">
            {error?.data?.message || error.message}
          </Message>
        ) : (
          <>
            <div className="flex w-full justify-center mt-[2rem]">
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-[35rem] h-[25rem] mr-[2rem] rounded"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">{product.name}</h2>
                  <HeartIcon product={product} />
                </div>

                <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem]">
                  {product.description}
                </p>
                <p className="text-5xl my-4 font-extrabold">${product.price}</p>

                <div className="flex items-center justify-between mt-5 w-[20rem]">
                  <div>
                    <h1 className="flex items-center mb-6">
                      <FaStore className="mr-2" /> Brand: {product.brand}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaClock className="mr-2" /> Added:{" "}
                      {moment(product.createdAt).fromNow()}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaStar className="mr-2" /> Reviews: {product.numReviews}
                    </h1>
                  </div>

                  <div>
                    <h1 className="flex items-center mb-6">
                      <FaStar className="mr-2" /> Ratings: {product.rating}
                    </h1>

                    <h1 className="flex items-center mb-6">
                      <FaShoppingCart className="mr-2" /> Quantity: {product.quantity}
                    </h1>

                    <h1 className="flex items-center mb-6">
                      <FaBox className="mr-2" /> Count In Stock: {product.countStock}
                    </h1>
                  </div>
                </div>

                <div className="flex justify-between flex-wrap">

                </div>

              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
