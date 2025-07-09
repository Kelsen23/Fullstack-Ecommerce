import SmallProduct from "../pages/Products/SmallProduct";
import { useGetTopProductQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductQuery();

  if (isLoading) return <Loader />;
  if (error)
    return <h1 className="text-red-500 text-center">Something went wrong.</h1>;

  return (
    <div className="px-8 py-6">
      <div className="hidden xl:flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-2">
          {data.map((product) => (
            <SmallProduct key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
