import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    updateProduct: (state, { payload }) => {
      state.products = state.products.map((product) =>
        product._id === payload.id 
          ? { ...product, quantity: product.quantity + payload.quantity }
          : product
      )
      state.total += payload.quantity < 1 ? -payload.price : payload.price
    },
deleteProduct: (state, { payload }) => {
      state.quantity -= 1
      state.products = state.products.filter(
        ({ _id: id }) =>
          id !== payload.id
      )
      state.total -= payload.totalPrice
    },
    initializeCart: (state) => {
      state.quantity = 0
      state.products = []
      state.total = 0
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
 
});

export const { addProduct, updateProduct, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;