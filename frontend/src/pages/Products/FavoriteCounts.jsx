import { useSelector } from "react-redux";

const FavoriteCounts = () => {
  const favorites = useSelector((state) => state.favorites);
  let favoriteCount = favorites.length;

  return (
    <div>
      {favoriteCount > 0 && (
        <span className="px-1 py-0 flex items-center justify-center text-sm bg-pink-500 rounded-full">
          {favoriteCount}
        </span>
      )}
    </div>
  );
};

export default FavoriteCounts;
