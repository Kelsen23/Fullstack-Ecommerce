export const addFavoriteToLoacalStorage = (product) => {
  const favorites = getFavoritesFromLocalStorage();
  if (!favorites.some((p) => product._id === p._id)) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(product));
  }
};

export const removeFavoriteFormLocalStorage = (productId) => {
  const favorites = getFavoritesFromLocalStorage();
  const updatedFavorites = favorites.filter(
    (product) => product._id !== productId
  );
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};

export const getFavoritesFromLocalStorage = () => {
  const favoritesJSON = localStorage.getItem("favorites");
  return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};
