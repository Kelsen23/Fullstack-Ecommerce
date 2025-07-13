import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import {
  useGetProductByIdQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import { useState } from "react";
import Product from "./Product";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { _id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review successfully published");
    } catch (error) {
      console.error("Error creating review.");
      toast.error(
        error?.data?.error || error?.error || "Error creating review."
      );
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
    toast.success("Item added to cart");
  };

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
            <div className="flex flex-col justify-center">
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
                  <p className="text-5xl my-4 font-extrabold">
                    ${product.price}
                  </p>

                  <div className="flex gap-18 items-center  justify-between mt-5 w-[20rem]">
                    <div>
                      <h1 className="flex whitespace-nowrap items-center mb-6">
                        <FaStore className="mr-2" /> Brand: {product.brand}
                      </h1>
                      <h1 className="flex whitespace-nowrap items-center mb-6">
                        <FaClock className="mr-2" /> Added:{" "}
                        {moment(product.createdAt).fromNow()}
                      </h1>
                      <h1 className="flex whitespace-nowrap items-center mb-6">
                        <FaStar className="mr-2" /> Reviews:{" "}
                        {product.numReviews}
                      </h1>
                    </div>

                    <div>
                      <h1 className="flex whitespace-nowrap items-center mb-6">
                        <FaStar className="mr-2" /> Ratings:{" "}
                        {product.rating.toFixed(2)}
                      </h1>

                      <h1 className="flex whitespace-nowrap items-center mb-6">
                        <FaShoppingCart className="mr-2" /> Quantity:{" "}
                        {product.quantity}
                      </h1>

                      <h1 className="flex whitespace-nowrap items-center mb-6">
                        <FaBox className="mr-2" /> Count In Stock:{" "}
                        {product.countStock}
                      </h1>
                    </div>
                  </div>

                  <div className="flex justify-between flex-wrap">
                    <Ratings
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />

                    {product.countStock > 0 && (
                      <div>
                        <select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                          className="p-2 w-[6rem] rounded-md bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition duration-150 ease-in-out text-gray-700"
                        >
                          {[...Array(product.countStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      className="flex items-center gap-2 bg-pink-600 text-white py-2 px-4 rounded-lg mt-5 md:mt-0 cursor-pointer"
                      onClick={addToCartHandler}
                      disabled={product.countStock < 1}
                    >
                      <MdOutlineAddShoppingCart size={18} />
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-[5rem] flex flex-wrap items-start justify-between ml-[10rem]">
                <ProductTabs
                  loadingProductReview={loadingProductReview}
                  userInfo={userInfo}
                  submitHandler={submitHandler}
                  rating={rating}
                  setRating={setRating}
                  comment={comment}
                  setComment={setComment}
                  product={product}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
