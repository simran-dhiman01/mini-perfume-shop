import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    bestSellers: [],
    saleProducts: [],
    selectedProduct: null,
    loading: false,
    error: null,
    isInitialized: false
  },
  reducers: {
    setLoading: (state, action) => {
      if (!state.isInitialized) {
        state.loading = action.payload;
      }
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
      state.isInitialized = true;

      // Get best sellers (limited to 4)
      state.bestSellers = action.payload
        .filter(product => product.bestSeller === true)
        .slice(0, 4);

      // Get sale products (limited to 4)
      state.saleProducts = action.payload
        .filter(product => product.sale === true)
        .slice(0, 4);
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearProducts: (state) => {
      state.products = [];
      state.bestSellers = [];
      state.saleProducts = [];
      state.selectedProduct = null;
    }
  }
});

// Export actions
export const { setLoading, setError, setProducts, setSelectedProduct, clearProducts } = productSlice.actions;

export default productSlice.reducer; 