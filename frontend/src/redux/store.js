import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import favoriteReducer from "./features/favorites/favoriteSlice";
import { getFavoritesFromLocalStorage } from "../Utils/localStorage";
import cartReducer from "./features/cart/cartSlice";
import shopReducer from "./features/shop/shopSlice";

const initialFavorites = getFavoritesFromLocalStorage() || [];

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoriteReducer,
    cart: cartReducer,
    shop: shopReducer,
  },
  preloadedState: {
    favorites: initialFavorites,
  },
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
export default store;
