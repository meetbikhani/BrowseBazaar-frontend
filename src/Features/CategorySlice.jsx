import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  newCategory: [],
  loader: true,
}

export const counterSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getcategory: (state,action) => {
       state.loader = false; 
       state.newCategory=action.payload ;
    },
  },
})


export const { getcategory } = counterSlice.actions

export default counterSlice.reducer