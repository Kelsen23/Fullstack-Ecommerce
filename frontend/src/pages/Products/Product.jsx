import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `${import.meta.env.VITE_BASE_URL}${product.image}`;

  return (
    <div className="w-[30rem] ml-[2rem] p-3 relative">
      <img
        src={imageUrl}
        alt={product.name}
        className="w-[20rem] h-[13rem] rounded"
      />
      <HeartIcon product={product} />

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center w-[20rem]">
            <div className="text-lg">{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
