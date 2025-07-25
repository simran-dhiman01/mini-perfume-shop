import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import { useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setLoading, setError, setProducts } from '../store/productSlice'
import axios from 'axios'
import { PRODUCT_API } from '../api/constant'

const CategoryProduct = () => {
  const dispatch = useDispatch();
  const { products, bestSellers, saleProducts, loading, error } = useSelector((state) => state.products);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setLoading(true));
        let url = PRODUCT_API;
        
        // Handle different category cases
        if (category) {
          if (category === 'sale') {
            url = `${PRODUCT_API}?sale=true`;
          } else if (['men', 'women', 'unisex'].includes(category.toLowerCase())) {
            // Capitalize first letter for category
            const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
            url = `${PRODUCT_API}?category=${formattedCategory}`;
          }
        }
        const response = await axios.get(url);
      
        if (response.data.success) {
          dispatch(setProducts(response.data.products));
        } else {
          dispatch(setError(response.data.message || 'No products found in this category'));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        if (error.response) {
          dispatch(setError(error.response.data.message || 'Failed to load products'));
        } else if (error.request) {
          dispatch(setError('No response from server. Please check your connection.'));
        } else {
          dispatch(setError('Failed to load products. Please try again later.'));
        }
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProducts();
  }, [dispatch, category]);

  // Function to format category title
  const formatCategoryTitle = (cat) => {
    if (!cat) return 'All Products';
    if (cat === 'sale') return 'Best Fragrances At Lowest Prices';
    return `${cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()} Fragrances`;
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Category Title */}
        <h2 className="text-3xl font-bold text-center mb-8">
          {formatCategoryTitle(category)}
        </h2>
        
        {error ? (
          <div className="text-center py-10 text-red-600">
            {error}
          </div>
        ) : (
          <div>
            {loading && products.length === 0 ? (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : (
              <>
                {products.length === 0 ? (
                  <p className="text-center text-gray-600">No products found in this category.</p>
                ) : (
                  <div>
                    <p className="text-center mb-4">Number of products: {products.length}</p>
                    <div className="relative">
                      {loading && (
                        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
                        </div>
                      )}
                      <ProductCard 
                        products={products} 
                        bestSellers={bestSellers}
                        saleProducts={saleProducts}
                        category={category}
                        showAllProducts={!category}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default CategoryProduct
