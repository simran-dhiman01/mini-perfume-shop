import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setError, setReviews, setSubmitting, setSubmitError, addReview } from '../store/reviewSlice';
import axios from 'axios';
import { REVIEW_API } from '../api/constant.js';

// Review Card Component
const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-800">{review.name}</h3>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-5 h-5 ${
                  index < review.rating ? 'text-black' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <span className="text-gray-500 text-sm">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="text-gray-600">{review.comment}</p>
    </div>
  );
};

// Main Reviews Component
const Reviews = ({ productId }) => {
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const dispatch = useDispatch();
  const { reviews, loading, error, isSubmitting, submitError } = useSelector((state) => state.reviews);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(`${REVIEW_API}/${productId}`);
        if (response.data.success) {
          // Sort reviews by createdAt in descending order (newest first)
          const sortedReviews = response.data.reviews.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          dispatch(setReviews(sortedReviews));
        } else {
          dispatch(setError(response.data.message || 'Failed to load reviews'));
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        dispatch(setError('Failed to load reviews. Please try again later.'));
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !comment.trim()) {
      dispatch(setSubmitError('Please fill in all fields'));
      return;
    }

    try {
      dispatch(setSubmitting(true));
      const response = await axios.post(`${REVIEW_API}/${productId}`, {
        name,
        comment,
        rating
      });
      
      if (response.data.success) {
        // Add the new review at the beginning of the array
        dispatch(addReview(response.data.newReview));
        setComment('');
        setName('');
        setRating(5);
        setShowReviewForm(false);
      } else {
        dispatch(setSubmitError(response.data.message || 'Failed to submit review'));
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      if (error.response) {
        dispatch(setSubmitError(error.response.data.message || 'Failed to submit review'));
      } else {
        dispatch(setSubmitError('Failed to submit review. Please try again later.'));
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          {showReviewForm ? 'Cancel' : 'Write a Review'}
        </button>
      </div>
      
      {/* Review Form */}
      {showReviewForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your name"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="rating" className="block text-gray-700 font-medium mb-2">Rating</label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>
                  {value} {value === 1 ? 'Star' : 'Stars'}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">Your Review</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              rows="4"
              placeholder="Write your review here..."
            ></textarea>
          </div>

          {submitError && (
            <p className="text-red-600 mb-4">{submitError}</p>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-gray-600 text-center">No reviews yet. Be the first to review this product!</p>
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;
