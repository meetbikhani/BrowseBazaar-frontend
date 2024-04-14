import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { json } from "react-router-dom";

const initialState = {
  products: JSON.parse(localStorage.getItem("cart")) || [],
  total: JSON.parse(localStorage.getItem("total")) || 0,
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtocart: (state, action) => {
      const item = state.products.find(
        (item) => item.title === action.payload.title
      );
      if (item) {
        item.quantity = action.payload.quantity;
      } else {
        state.products.push(action.payload);
        let cart = JSON.parse(localStorage.getItem("cart"));
        let total = JSON.parse(localStorage.getItem("total"));
        cart = [...cart, action.payload];
        total += action.payload.price * action.payload.quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("total", JSON.stringify(total));
        toast.success("Item added successfully");
        
      }
    },
    removefromcart: (state, action) => {
      const prod = state.products.find((item) => item.id === action.payload.id);
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
      if (prod) state.total -= prod.price * prod.quantity;
    },
    resetcart: (state, action) => {
      state.products = [];
      state.total = 0;
    },
    getTotal: (state, action) => {
      var sum = 0;
      state.products.forEach((item) => (sum += item.price * item.quantity));
      state.total = sum;
    },
    setProductQuantity: (state, action) => {
      const index = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      if (action.payload.quantity >= 1) {
        state.products[index].quantity = action.payload.quantity;
        if(action.payload.flag){
          console.log(state.total)
          state.total += state.products[index].price;
          console.log(state.total)
        }else {
        state.total -= state.products[index].price;
        }
      }
      else {
        state.products[index].quantity = 1;
      }
    },
  },
});

export const {
  addtocart,
  removefromcart,
  resetcart,
  getTotal,
  setProductQuantity,
} = counterSlice.actions;

export default counterSlice.reducer;
