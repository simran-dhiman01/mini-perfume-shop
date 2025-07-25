import React, { useState, useEffect, useRef } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useParams, useLocation } from 'react-router-dom';
import Reviews from '../components/Reviews';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setError, setSelectedProduct } from '../store/productSlice';
import axios from 'axios';
import { PRODUCT_API } from '../api/constant.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Layout component to wrap common elements
const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

// Status component for loading, error, and not found states
const Status = ({ type, message }) => (
  <div className="text-center py-10">
    {type === 'loading' && (
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
    )}
    <p className={`mt-4 ${type === 'error' ? 'text-red-600' : 'text-gray-600'}`}>
      {message}
    </p>
  </div>
);

const ProductDetails = () => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const shareMenuRef = useRef(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct: product, loading, error } = useSelector((state) => state.products);

  // Get the current URL for sharing
  const shareUrl = window.location.href;

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(`${PRODUCT_API}/${id}`);
        const productData = response.data.product || response.data;
        if (!productData) {
          throw new Error('Product data not found in response');
        }
        dispatch(setSelectedProduct(productData));
      } catch (error) {
        if (error.response?.status === 404) {
          dispatch(setError('Product not found'));
        } else if (error.response?.status === 500) {
          dispatch(setError('Server error. Please try again later.'));
        } else {
          dispatch(setError(error.message || 'Failed to load product details. Please try again later.'));
        }
      }
    };

    if (id) {
      fetchProduct();
    } else {
      dispatch(setError('No product ID provided'));
    }
  }, [id, dispatch]);

  const shareOptions = [
    {
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" />
        </svg>
      ),
      onClick: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
      }
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.934 4.934 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.924 4.924 0 00-8.38 4.49A13.978 13.978 0 011.67 3.149 4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.229-.616v.062a4.93 4.93 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.417A9.869 9.869 0 010 21.543a13.978 13.978 0 007.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0024 4.557z" />
        </svg>
      ),
      onClick: () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(product?.name)}`, '_blank');
      }
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      onClick: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(`${product?.name} ${shareUrl}`)}`, '_blank');
      }
    },
    {
      name: 'Copy Link',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
      ),
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(shareUrl);
          alert('Link copied to clipboard!');
        } catch (err) {
          console.error('Failed to copy link:', err);
        }
      }
    }
  ];

  // Show error if there is one
  if (error) {
    return (
      <Layout>
        <Status type="error" message={error} />
      </Layout>
    );
  }

  // Show loading only on initial load
  if (loading && !product) {
    return (
      <Layout>
        <Status type="loading" message="Loading product details..." />
      </Layout>
    );
  }

  // If no product and not loading, show not found
  if (!product) {
    return (
      <Layout>
        <Status type="not-found" message="Product not found" />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 mt-10 md:p-8'>
        {/* image gallery section */}
        <div className='w-full max-w-[600px] mx-auto'>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}

            navigation
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            className="w-full aspect-square">
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`${product.name} - Image ${index + 1}`}
                  className="w-full h-full object-contain p-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* product details section */}
        <div className='p-4 md:p-8 w-full max-w-xl sm:max-w-2xl md:max-w-4xl'>
          <div className='font-poppins space-y-6'>
            <div className='space-y-2'>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-800'>{product.name}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    {product.inStock ? (
                      <>
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-green-600 my-2 font-medium">In Stock</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-red-600 my-2 font-medium">Out of Stock</span>
                      </>
                    )}
                  </div>
                  {product.bestSeller && (
                    <p className='text-red-600 font-semibold text-lg'>#Best Seller</p>
                  )}
                </div>
                {/* Share Button */}
                <div className="relative" ref={shareMenuRef}>
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </button>

                  {/* Share Menu Dropdown */}
                  {showShareMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                      {shareOptions.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            option.onClick();
                            setShowShareMenu(false);
                          }}
                          className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                          {option.icon}
                          {option.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>

            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <h2 className='text-2xl font-semibold text-gray-800'>Price :</h2>
                {product.salePrice ? (
                  <div className='flex items-center gap-2'>
                    <p className='line-through text-gray-600'>{product.price} Rs.</p>
                    <span className='text-2xl font-semibold text-red-600'>{product.salePrice} Rs.</span>
                  </div>
                ) : (
                  <span className='text-2xl font-semibold'>{product.price} Rs.</span>
                )}
                 <span className='text-gray-500'>Tax Included.</span>
              </div>
             

              <div className='border-b border-gray-300 rounded-2xl'></div>

              <div className='space-y-2'>
                <h2 className='text-xl font-semibold text-gray-800'>Top Notes</h2>
                <div className='flex gap-10 md:gap-16'>
                  <p className='text-gray-600 text-lg'>{product.notes}</p>
                  <span className='inline-block px-4 py-1 bg-red-600 text-white rounded-3xl'>
                    {product.category}
                  </span>
                </div>
              </div>
              <div className='border-b border-gray-300 rounded-2xl shadow-lg'></div>

              <div className='space-y-2'>
                <h2 className='text-xl font-semibold text-gray-800'>Available Sizes</h2>
                <div className='flex flex-wrap gap-2'>
                  {product.sizes.map((size, index) => (
                    <span
                      key={index}
                      className='px-4 py-1 bg-gray-200 rounded-lg text-gray-700'
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
              <div className='border-b border-gray-300 rounded-2xl shadow-lg'></div>

              <div className='space-y-2'>
                <h2 className='text-xl font-semibold text-gray-800'>Description</h2>
                <p className='text-gray-600 text-lg'>{product.description}</p>
              </div>
              <div className='border-b border-gray-300 rounded-2xl'></div>

              {/* Buy Now Button */}
              <button className='w-full bg-pink-600 text-white py-2  rounded-lg hover:bg-pink-700 transition-colors text-lg font-semibold'>
                Buy Now
              </button>
              <div className='border-b border-gray-300 shadow-lg rounded-2xl'></div>

            </div>
          </div>
        </div>
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
        </div>
      )}

      <Reviews productId={id} />
    </Layout>
  );
};

export default ProductDetails;
