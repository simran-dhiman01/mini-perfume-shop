import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { setLoading, setError, setProducts } from '../store/productSlice'
import Banner from '../components/Banner'
import axios from 'axios'
import { PRODUCT_API } from '../api/constant'

const Home = () => {
  const dispatch = useDispatch();
  const { bestSellers, saleProducts, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(PRODUCT_API);
        dispatch(setProducts(response.data.products));
      } catch (error) {
        dispatch(setError('Failed to load products. Please try again later.'));
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Banner/>
      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-600">
          {error}
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <ProductCard 
            bestSellers={bestSellers}
            saleProducts={saleProducts}
          />
        </div>
      )}
      <Footer />
    </div>
  )
}

export default Home
