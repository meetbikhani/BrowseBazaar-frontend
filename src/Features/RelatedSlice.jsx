import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  Related: [],
  loader: true,
}

export const counterSlice = createSlice({
  name: 'related',
  initialState,
  reducers: {
    getrelated: (state,action) => {
       
       state.Related=action.payload ;
       state.loader = false; 
    },
    setloader: (state,action) => {
       state.loader = action.payload ;
    },
  },
})


export const { getrelated, setloader, clearrelated } = counterSlice.actions

export default counterSlice.reducer