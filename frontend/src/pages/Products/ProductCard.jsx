import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";
import { MdReadMore } from "react-icons/md";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="max-w-sm relative rounded-lg shadow-sm">
      <section className="relative">
        <Link to={`/product/${product._id}`}>
          <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">
            {product.brand}
          </span>
          <img
            className="cursor-pointer w-full h-[170px] object-cover rounded"
            src={product.image}
            alt={product.name}
          />
        </Link>
        <HeartIcon className="absolute top-3 right-3 z-10" product={product} />
      </section>

      <div className="p-2">
        <div className="flex flex-col bg-white justify-between">
          <h5 className="mb-2 text-xl font-semibold">{product?.name}</h5>

          <p className="font-semibold text-pink-500">
            {product?.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>

          <p className="mb-3">{product?.description?.substring(0, 60)} ...</p>

          <section className="flex justify-between items-center">
            <Link
              to={`/product/${product._id}`}
              className="flex items-center px-3 py-2 font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300"
            >
              Read More
              <MdReadMore className="ml-2" size={20} />
            </Link>

            <button
              className="p-2 rounded-full flex items-center px-3 py-2 bg-pink-700 text-white cursor-pointer"
              onClick={() => addToCartHandler(product, 1)}
            >
              <AiOutlineShoppingCart size={20} />
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
