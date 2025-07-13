import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      shippingAddress: {},
      paymentMethod: "PayPal",
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { user, rating, numReviews, reviews, ...item } = action.payload;
      const itemExists = state.cartItems.find((x) => x._id === item._id);

      if (itemExists) {
        state.cartItems = state.cartItem.map((x) =>
          x._id === itemExists._id ? item : x
        );
      } else {
        state.cartItems.push(item);
      }
    },
  },
});
