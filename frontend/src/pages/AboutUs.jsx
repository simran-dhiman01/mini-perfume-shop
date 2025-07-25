import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className='font-poppins'>
        {/* Hero Section */}
        <div className="relative h-[300px]">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-white text-center pt-32">
            <h1 className="text-5xl font-bold">About Scentique</h1>
            <p className="mt-4 text-xl">Crafting Memories Through Fragrance</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Mission Statement */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Story</h2>
            <span className="block h-[2px] w-[250px] bg-black mt-2 mx-auto"></span>
            <h4 className='text-center mt-5 text-bold text-pink-600 text-xl'>Listen to your nose. Always!</h4>
            <p className='mt-8 text-lg leading-relaxed max-w-3xl mx-auto'>
              At <span className='font-bold'>SCENTIQUE,</span> we believe that every fragrance tells a story — a quiet whisper of elegance, emotion, and essence. Our scents are thoughtfully crafted, blending inspiration from nature, art, and timeless beauty to help you create unforgettable moments.
            </p>
            <p className='mt-4 text-lg leading-relaxed max-w-3xl mx-auto'>
              Each bottle of SCENTIQUE holds more than a fragrance — it holds a memory waiting to be made.
            </p>
          </div>

          {/* Key Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
              <div className="text-4xl mb-4 text-center">💎</div>
              <h3 className="text-xl font-bold text-center text-pink-500 mb-4">Luxury Scents, Accessible to All</h3>
              <p className="text-gray-600">
                <span className="font-bold">SCENTIQUE</span> is committed to offering luxurious perfumes at honest prices. Our creations feature premium compositions designed to linger — capturing attention and hearts alike.
              </p>
            </div>

            <div className="p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
              <div className="text-4xl mb-4 text-center">🌿</div>
              <h3 className="text-xl font-bold text-center text-pink-500 mb-4">Crafted with Premium Ingredients</h3>
              <p className="text-gray-600">
                We partner with renowned perfumers across India, sourcing rare and exquisite ingredients from South Africa, Spain, and Australia. This global blend ensures that every SCENTIQUE fragrance carries a depth and complexity that is truly one of a kind.
              </p>
            </div>

            <div className="p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
              <div className="text-4xl mb-4 text-center">✨</div>
              <h3 className="text-xl font-bold text-center text-pink-500 mb-4">Skin-Friendly and Pure</h3>
              <p className="text-gray-600">
                Our formulations are clean, gentle, and free from artificial coloring. SCENTIQUE perfumes are dermatologically safe for all skin types — though we always recommend a patch test before use.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-gray-50 rounded-xl p-12 mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">🎯</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Quality First</h3>
                  <p className="text-gray-600">We never compromise on the quality of our ingredients or the craftsmanship of our perfumes.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-3xl">🌍</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                  <p className="text-gray-600">We are committed to sustainable practices in sourcing and packaging.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-3xl">💝</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Customer Care</h3>
                  <p className="text-gray-600">Your satisfaction and experience with our products is our top priority.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-3xl">🎨</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Innovation</h3>
                  <p className="text-gray-600">We continuously explore new scents and techniques to create unique fragrances.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Experience the Scentique Difference</h2>
            <p className="text-lg text-gray-600 mb-8">Discover our collection of premium fragrances crafted with passion and precision.</p>
            <button className="bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition-colors">
              <Link to="/products">Explore Our Collection</Link>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutUs
