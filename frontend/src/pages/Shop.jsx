import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setChecked,
  setProducts,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productByBrand = filteredProductsQuery.data.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => setPriceFilter(e.target.value);

  return (
    <>
      <div className="ml-[4rem] mx-auto px-4">
        <div className="flex md:flex-row gap-4">
          <div className="p-3 mt-2 mb-2 w-full md:w-[16rem] bg-gray-50 rounded shadow">
            <h2 className="text-center text-white bg-black py-1 rounded-full mb-3 text-sm">
              Filter By Categories
            </h2>

            <div className="p-2">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`cat-${c._id}`}
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 accent-pink-600 rounded focus:ring-pink-500"
                    />
                    <label
                      htmlFor={`cat-${c._id}`}
                      className="ml-2 text-sm font-medium"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-center text-white bg-black py-1 rounded-full mb-3 text-sm">
              Filter By Brands
            </h2>

            <div className="p-2">
              {uniqueBrands?.map((brand, idx) => (
                <div key={idx} className="flex items-center mb-3">
                  <input
                    type="radio"
                    id={`brand-${brand}`}
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4 accent-pink-600 rounded focus:ring-pink-500"
                  />
                  <label
                    htmlFor={`brand-${brand}`}
                    className="ml-2 text-sm font-medium"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>

            <h2 className="text-center text-white bg-black py-1 rounded-full mb-3 text-sm">
              Filter By Price
            </h2>

            <div className="p-2">
              <input
                type="number"
                placeholder="Enter Price"
                value={priceFilter}
                step={0.5}
                min={0.5}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition duration-150"
              />
            </div>

            <div className="p-5 pt-0">
              <button
                className="w-full border my-4"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="p-3">
            <h2 className="mb-2">{products?.length} Products</h2>
            <div className="flex flex-wrap">
              {products?.length < 1 ? (
                <Loader />
              ) : (
                products?.map((p) => (
                  <div className="p-3" key={p._id}>
                    <ProductCard product={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
