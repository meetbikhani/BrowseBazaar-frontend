import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  product: [],
  
}

export const counterSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    getproducts: (state,action) => {
       
       state.product=action.payload ;
       
    },
    
  },
})


export const { getproducts } = counterSlice.actions

export default counterSlice.reducer