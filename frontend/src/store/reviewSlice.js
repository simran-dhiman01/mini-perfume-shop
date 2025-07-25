import { createSlice } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    loading: false,
    error: null,
    isSubmitting: false,
    submitError: null
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setReviews: (state, action) => {
      state.reviews = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    setSubmitError: (state, action) => {
      state.submitError = action.payload;
      state.isSubmitting = false;
    },
    addReview: (state, action) => {
      state.reviews.unshift(action.payload);
      state.isSubmitting = false;
      state.submitError = null;
    },
    clearReviews: (state) => {
      state.reviews = [];
      state.error = null;
      state.submitError = null;
    }
  }
});

// Export actions
export const {
  setLoading,
  setError,
  setReviews,
  setSubmitting,
  setSubmitError,
  addReview,
  clearReviews
} = reviewSlice.actions;

export default reviewSlice.reducer; 