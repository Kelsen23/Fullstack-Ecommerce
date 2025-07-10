import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";
import {
  addFavoriteToLocalStorage,
  removeFavoriteFromLocalStorage,
  getFavoritesFromLocalStorage,
} from "../../Utils/localStorage";
import { useEffect } from "react";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorited = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, []);

  const toggleFavorites = () => {
    if (isFavorited) {
      removeFavoriteFromLocalStorage(product._id);
      dispatch(removeFromFavorites(product._id));
    } else {
      addFavoriteToLocalStorage(product);
      dispatch(addToFavorites(product));
    }
  };

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer"
    >
      {isFavorited ? <FaHeart className="text-pink-500" /> : <FaRegHeart />}
    </div>
  );
};

export default HeartIcon;
