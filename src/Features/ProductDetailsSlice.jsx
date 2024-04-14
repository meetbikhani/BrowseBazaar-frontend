import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ProductDetails: {},
  loader: true
}

export const counterSlice = createSlice({
  name: 'productdetails',
  initialState,
  reducers: {
    getproductdetails: (state,action) => {
      state.loader = false
        state.ProductDetails=action.payload ;
    },
    setproductdetailsloader: (state, action) => {
      state.loader = action.payload;
    }
  },
})


export const { getproductdetails, setproductdetailsloader } = counterSlice.actions

export default counterSlice.reducer