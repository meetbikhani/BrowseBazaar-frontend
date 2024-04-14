import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  newSubCategory: [],
  loader: true,
}

export const counterSlice = createSlice({
  name: 'subcategory',
  initialState,
  reducers: {
    getsubcategory: (state,action) => {
        state.loader = false
       state.newSubCategory=action.payload ;
    },
    setsubcategoryloader: (state,action) => {
      state.loader = action.payload ;
  },
  },
})


export const { getsubcategory, setsubcategoryloader } = counterSlice.actions

export default counterSlice.reducer