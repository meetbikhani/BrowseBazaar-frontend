import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  FilterProducts: [],
  loader: true
}

export const counterSlice = createSlice({
  name: 'filterproducts',
  initialState,
  reducers: {
    getfilterproducts: (state,action) => {
        state.loader = false;
        state.FilterProducts=action.payload ;
    },
    setloader: (state,action) => {
        state.loader = action.payload ;
    },
  },
})


export const { getfilterproducts, setloader } = counterSlice.actions

export default counterSlice.reducer