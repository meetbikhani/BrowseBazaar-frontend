import { configureStore } from '@reduxjs/toolkit'
import ProductSliderSlice from '../Features/ProductSliderSlice'
import CategorySlice from '../Features/CategorySlice'
import SubCategorySlice from '../Features/SubCategorySlice'
import FilterProductSlice from '../Features/FilterProductSlice'
import ProductDetailsSlice from '../Features/ProductDetailsSlice'
import RelatedSlice from '../Features/RelatedSlice'
import CartSlice from '../Features/CartSlice'
import SearchSlice from '../Features/SearchSlice'



export const store = configureStore({
  reducer: {
    product : ProductSliderSlice,
    category : CategorySlice,
    subcategory : SubCategorySlice,
    filterproduct : FilterProductSlice,
    productDetails : ProductDetailsSlice,
    related : RelatedSlice,
    cart: CartSlice,
    search: SearchSlice
  },
})	
