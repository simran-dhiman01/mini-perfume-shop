import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import reviewReducer from './reviewSlice'

const store = configureStore({
  reducer: {
    products: productReducer,
    reviews: reviewReducer,
  },
}); 
export default store