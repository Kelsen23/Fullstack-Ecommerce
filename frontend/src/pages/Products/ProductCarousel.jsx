import { useGetTopProductQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 xl:block lg:block md:block">
      {isLoading ? null : error ? (
        <Message variant="error">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countStock,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[30rem]"
                />

                <div className="w-[20rem] flex">
                  <div>
                    <div className="flex-col justify-between">
                      <h2>{name}</h2>
                      <p>${price}</p>
                    </div>
                    <p className="mt-4 w-[25rem]">
                      {description.substring(0, 200)}...
                    </p>
                  </div>

                  <div className="flex justify-between w-[20rem]">
                    <div>
                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaStore className="mr-2" /> Brand: {brand}
                      </h1>

                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaClock className="mr-2" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>

                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaStar className="mr-2" /> Reviews: {numReviews}
                      </h1>
                    </div>

                    <div>
                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaStar className="mr-2" /> Ratings:{""}{" "}
                        {Math.round(rating)}
                      </h1>

                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaShoppingCart className="mr-2" /> Quantity:{""}{" "}
                        {quantity}
                      </h1>

                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaBox className="mr-2" /> In Stock: {countStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
