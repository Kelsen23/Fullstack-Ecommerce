import { useState } from "react";
import { Form, Link } from "react-router-dom";
import { useGetTopProductQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";
import Ratings from "./Ratings";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductQuery();
  const [activeTabs, setActiveTabs] = useState(1);

  if (isLoading) return <Loader />;

  const handleTabClick = (tabNumber) => setActiveTabs(tabNumber);

  return (
    <div className="flex flex-col md:flex-row">
      <section className="mr-[5rem]">
        <div
          className={`flex-1 whitespace-nowrap p-4 cursor-pointer text-lg ${
            activeTabs === 1 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(1)}
        >
          Write Your Review
        </div>

        <div
          className={`flex-1 whitespace-nowrap p-4 cursor-pointer text-lg ${
            activeTabs === 2 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(2)}
        >
          All Reviews
        </div>

        <div
          className={`flex-1 whitespace-nowrap p-4 cursor-pointer text-lg ${
            activeTabs === 3 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(3)}
        >
          Related Products
        </div>
      </section>

      <section>
        {activeTabs === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="my-4">
                  <label
                    htmlFor="rating"
                    className="block text-lg font-medium mb-2"
                  >
                    Rating
                  </label>
                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full xl:w-[40rem] p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition duration-150 ease-in-out"
                  >
                    <option value="">Select</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>

                <div className="my-4">
                  <label
                    htmlFor="comment"
                    className="block text-lg font-medium mb-2"
                  >
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    placeholder="Type your comment here✨💬"
                    rows="4"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full xl:w-[40rem] p-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition duration-150 ease-in-out resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className={`w-fit bg-pink-600 cursor-pointer hover:bg-pink-700 text-white py-2 px-6 rounded-lg font-semibold transition duration-200 ${
                    loadingProductReview ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loadingProductReview ? "Submitting..." : "Submit"}
                </button>
              </form>
            ) : (
              <p>
                Please <Link to="/login">Sign In</Link> to write a review
              </p>
            )}
          </div>
        )}
      </section>

      <section>
        {activeTabs === 2 && (
          <>
            <div>{product.reviews.length === 0 && <p>No reviews yet.</p>}</div>

            <div>
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="p-4 rounded-lg bg-gray-50 xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5"
                >
                  <div className="flex justify-between">
                    <strong className="text-[#B0B0B0]">{review.name}</strong>
                    <p className="text-[#B0B0B0]">{review.createdAt.substring(0, 10)}</p>
                  </div>

                  <p className="my-4">{review.comment}</p>
                  <Ratings value={review.rating} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <section>
        {
          activeTabs === 3 && (
            <section className="ml-[4rem] flex flex-wrap">
              {!data ? (
                <Loader />
              ) : (
                data.map((product) => (
                  <div key={product._id}>
                    <SmallProduct product={product} />
                  </div>
                ))
              )}
            </section>
          )
        }
      </section>
    </div>
  );
};

export default ProductTabs;
