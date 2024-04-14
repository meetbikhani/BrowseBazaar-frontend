import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newArrivalProducts: [],
  trendingProducts: [],
  loader: true,
};

export const counterSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getproducts: (state, action) => {
      if (action.payload[0].attributes.type === "newArrival")
        state.newArrivalProducts = action.payload;
      else if (action.payload[0].attributes.type === "trending")
        state.trendingProducts = action.payload;
      state.loader = false;
    },
    
  },
});

export const { getproducts,  } = counterSlice.actions;

export default counterSlice.reducer;
